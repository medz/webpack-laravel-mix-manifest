# Webpack Laravel Mix Manifest

![Node.js Package](https://github.com/medz/webpack-laravel-mix-manifest/workflows/Node.js%20Package/badge.svg)
![Node.js CI](https://github.com/medz/webpack-laravel-mix-manifest/workflows/Node.js%20CI/badge.svg)
[![Build status](https://ci.appveyor.com/api/projects/status/03vskuss6wny910u?svg=true)](https://ci.appveyor.com/project/medz/webpack-laravel-mix-manifest)
[![version](https://badgen.net/npm/v/webpack-laravel-mix-manifest)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)
[![license](https://badgen.net/github/license/medz/webpack-laravel-mix-manifest)](https://github.com/medz/webpack-laravel-mix-manifest)
[![downloads](https://badgen.net/npm/dt/webpack-laravel-mix-manifest)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)

A webpack plugin that generates Laravel framework compatible `mix-manifest.josn` file.

> If you are using `webpack` 2 or 3 then install version `1.x` instead.

## Use case
If you are not using [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) to bundle your assets in Laravel php framework, 
and you still want to utilize `mix()` helper method, this plugin can help you in generating `mix-manifest.json`

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

### Using the ES6 (babel) webpack configuration usage:

```js
import { WebpackLaravelMixManifest } from 'webpack-laravel-mix-manifest';

export default {
    plugins: [
        // Write out mix-manifest.json to build directory.
        new WebpackLaravelMixManifest()
    ]
};
```

### Using CommonJS webpack configuration using:

```js
const { WebpackLaravelMixManifest } = require('webpack-laravel-mix-manifest');

module.exports = {
    plugins: [
        // Write out mix-manifest.json to build directory.
        new WebpackLaravelMixManifest()
    ]
};
```

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
