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
  An interface for running jsverify tests with AVA
</h4>

***

## Getting started

`$ npm install ava-jsverify --save`
or
`$ yarn add ava-jsverify`

## Usage

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
