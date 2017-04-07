<h1 align="center">ava-jsverify</h1>

<p align="center">
  <a title='License' href="https://raw.githubusercontent.com/imranolas/ava-jsverify/master/LICENSE">
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' />
  </a>
  <a href="https://badge.fury.io/js/ava-jsverify">
    <img src="https://badge.fury.io/js/ava-jsverify.svg" alt="npm version" height="18">
  </a>
</p>

<h4 align="center">
  An interface for running
  <a href="https://github.com/jsverify/jsverify">jsverify</a> tests with  <a href="https://github.com/avajs/ava">AVA</a>
</h4>

***

## Getting started
#### NPM
`$ npm install ava-jsverify --save`
#### Yarn
`$ yarn add ava-jsverify`

## Usage

`ava-jsverify` exports a `check` function to be passed to ava's `test` function. `check` performs broadly the same task as `jsc#checkforall`, except that it also exposes ava's test api for assertions. You should continue to use the jsverify and ava API's with the exception of `check`.

```js
const test = require('ava');
const jsc = require('jsverify');
const { check } = require('ava-jsverify');

test(
  'generates',
  check(jsc.integer, jsc.string, (t, x, y) => {
    t.is(typeof x, 'number');
    t.is(typeof y, 'string');
  })
);
```

## Output

On a test failure the shrunken fail case will be displayed after the test description and between the parentheses. In the example below the smallest failure has been identified as `0`
```sh
3 passed
1 failed

generates with plan ( 0 )

/ava-jsverify/test/check.test.js:30

 29:     t.plan(2);
 30:     t.true(x >= 1);
 31:     t.is(typeof x, 'number');

Value is not `true`:

  false

x>=1
=> false

x
=> 0
```
