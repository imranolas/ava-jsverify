var jsc = require('jsverify');
var inspect = require('util').inspect;

exports.check = check;

function check(/*...args, propertyFn, [options,] */) {
  // Gather arguments:
  // - gen, gen, propFn, options
  // - gen, gen, propFn
  var i = 0;
  var n = arguments.length - 1;
  var options = arguments[n].constructor === Object ? arguments[n] : {};
  var propertyFn = arguments[n].constructor === Object ? arguments[n - 1] : arguments[n];
  var argGens = [];
  for (; i < n; i++) {
    argGens.push(arguments[i]);
  }

  // Current stack used for failing tests without errors.
  var callingStack = {};
  Error.captureStackTrace(callingStack, check);

  return function(t) {
    var test = this;

    // Build property
    var fn = propertyFn.bind(test, t);
    function jsc$property() {
      // Reset assertions and plan before every run.
      test.assertError = undefined;
      test.assertions = [];
      test.planCount = null;
      test.assertCount = 0;
      test.planStack = null;

      var result = fn.apply(null, arguments);

      // Check plan after every run.
      test.verifyPlan();

      if (test.assertError) {
        throw test.assertError;
      }

      return true;
    }

    var property = jsc.forall.apply(jsc, argGens.concat([jsc$property]));

    // Run jsc
    options.quiet = true;
    var checkResult = jsc.check(property, options);

    // Report results
    if (checkResult.exc) {
      var shrunk = checkResult.counterexample; // shrunk
      var result = checkResult.exc;

      test.title += ' ' + printArgs(shrunk);
      if (result instanceof Object) {
        test.assertError = cleanStack(result);
      } else {
        var error = test.assertError.message;
        error.stack = callingStack.stack;
        error.actual = result;
        error.expected = true;
        error.operator = '===';
        test.assertError = error;
      }
    }
  };
}

function printArgs(args) {
  return '(' + inspect(args, { depth: null, colors: true }).slice(1, -1) + ')';
}

function cleanStack(error) {
  var stack = error.stack.split('\n');
  for (var i = 1; i < stack.length; i++) {
    if (stack[i].indexOf('jsc$property') !== -1) {
      break;
    }
  }
  error.stack = stack.slice(0, i).join('\n');
  return error;
}
