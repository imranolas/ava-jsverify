const test = require('ava');
const jsc = require('jsverify');
const { check } = require('../');

test(
  'generates',
  check(jsc.integer, jsc.string, (t, x, y) => {
    t.is(typeof x, 'number');
    t.is(typeof y, 'string');
  })
);

test('supports returning a boolean', check(jsc.integer, (t, x) => t.is(typeof x, 'number')));

test(
  'generates with options',
  check(
    jsc.nat,
    (t, x) => {
      t.true(x >= 0);
    },
    { tests: 10 }
  )
);

test(
  'generates with plan',
  check(jsc.nat, (t, x) => {
    t.plan(2);
    t.true(x >= 0);
    t.is(typeof x, 'number');
  })
);
