# Webpack Laravel Mix Manifest

![Node.js Package](https://github.com/medz/webpack-laravel-mix-manifest/workflows/Node.js%20Package/badge.svg)
![Node.js CI](https://github.com/medz/webpack-laravel-mix-manifest/workflows/Node.js%20CI/badge.svg)
[![version](https://badgen.net/npm/v/webpack-laravel-mix-manifest)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)
[![license](https://badgen.net/github/license/medz/webpack-laravel-mix-manifest)](https://github.com/medz/webpack-laravel-mix-manifest)
[![downloads](https://badgen.net/npm/dt/webpack-laravel-mix-manifest)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)

A webpack plugin that generates Laravel framework compatible `mix-manifest.json` file.

> If you are using `webpack` 2 or 3 then install version `1.x` instead.

**The plug-in version corresponding to the webpack version**

| webpack version | plugin version |
|:----:|:----:|
| `2.x` or `3.x` | [1.0.x](https://github.com/medz/webpack-laravel-mix-manifest/tree/v1.0) |
| `4.x` | [2.1.x](https://github.com/medz/webpack-laravel-mix-manifest/tree/v2.1) or [v2.2](https://github.com/medz/webpack-laravel-mix-manifest/tree/v2.2) |
| `5.0` | `3.0` - current branch |

## Use Case

If you are not using [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) to bundle your assets in Laravel php framework, 
and you still want to utilize `mix()` helper method, this plugin can help you in generating `mix-manifest.json`

Supported: 

- [x] TypeScript
- [x] ECMAScript 2015+ or Babel
- [x] CommonJS

## Installation

The plugin is available via npm:

```shell
npm install webpack-laravel-mix-manifest --save-dev
```
If you are using yarn:

```shell
yarn add webpack-laravel-mix-manifest --dev
```

## Examples

### Using the ES module (Babel) webpack configuration usage

```js
import { WebpackLaravelMixManifest } from 'webpack-laravel-mix-manifest';

export default {
    plugins: [
        // Write out mix-manifest.json to build directory.
        new WebpackLaravelMixManifest()
    ]
};
```

Example 👉 [ES module(Babel) Example](examples/dev-es-module)

### Using CommonJS webpack configuration usage

```js
const { WebpackLaravelMixManifest } = require('webpack-laravel-mix-manifest');

module.exports = {
    plugins: [
        // Write out mix-manifest.json to build directory.
        new WebpackLaravelMixManifest()
    ]
};
```

Example 👉 [CommonJS Example](examples/dev-commonjs-module)

### Laravel usage

Assume that the generated `public/mix-manifest.json` content is:

```json
{
  "/js/main.js": "/js/main-be4b86e10e835384d714.js"
}
```

Blade usage:

```blade
<script src="{{ mix('js/main.js') }}"></script>
```

Browser output:

```html
<script src="/js/main-be4b86e10e835384d714.js"></script>
```

## Configuration options

You can customize the name of the generated JSON file name.

```js
new WebpackLaravelMixManifest('mix-manifest.json');
```

## License

This package follows the MIT open source agreement.
