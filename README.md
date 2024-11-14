# esbuild-external-global

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]

This is a function that defines the [esbuild](https://esbuild.github.io/) options alias for some external global variables

## Installation

```bash
npm install esbuild-external-global
```

## Usage

```js
const esbuild = require("esbuild");
const { externalGlobal } = require("esbuild-external-global");

const externalReact = externalGlobal({
  react: "window.React",
});

esbuild
  .build(
    externalReact({
      entryPoints: [path.resolve(__dirname, "fixtures/react/index.tsx")],
      bundle: true,
      write: false,
    }),
  )
  .then(() => {
    console.log("Build succeeded");
  })
  .catch(() => {
    console.error("Build failed");
  });
```

## Why not use plugins?

There is no difference in essence [esbuild#337](https://github.com/evanw/esbuild/issues/337#issuecomment-754840414), except that plugins in esbuild cannot be called by pipes [esbuild#1902](https://github.com/evanw/esbuild/issues/1902). In order not to affect other existing plugins, we use aliases instead.

[build-img]: https://github.com/noyobo/esbuild-external-global/actions/workflows/ci.yml/badge.svg
[build-url]: https://github.com/noyobo/esbuild-external-global/actions/workflows/ci.yml
[downloads-img]: https://img.shields.io/npm/dt/esbuild-external-global
[downloads-url]: https://www.npmtrends.com/esbuild-external-global
[npm-img]: https://img.shields.io/npm/v/esbuild-external-global
[npm-url]: https://www.npmjs.com/package/esbuild-external-global
[issues-img]: https://img.shields.io/github/issues/noyobo/esbuild-external-global
[issues-url]: https://github.com/noyobo/esbuild-external-global/issues
[codecov-img]: https://codecov.io/gh/noyobo/esbuild-external-global/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/noyobo/esbuild-external-global
[commitizen-img]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
