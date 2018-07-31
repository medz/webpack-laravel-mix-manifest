# webpack-laravel-mix-manifest

[![license](https://img.shields.io/npm/l/webpack-laravel-mix-manifest.svg)](https://github.com/medz/webpack-laravel-mix-manifest)
[![version](https://img.shields.io/npm/v/webpack-laravel-mix-manifest.svg)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)
[![Build Status](https://travis-ci.org/medz/webpack-laravel-mix-manifest.svg?branch=master)](https://travis-ci.org/medz/webpack-laravel-mix-manifest)
[![Build status](https://ci.appveyor.com/api/projects/status/03vskuss6wny910u?svg=true)](https://ci.appveyor.com/project/medz/webpack-laravel-mix-manifest)
[![downloads](https://img.shields.io/npm/dt/webpack-laravel-mix-manifest.svg)](https://www.npmjs.com/package/webpack-laravel-mix-manifest)

Use the webpack build information to generate the laravel-mix function compatibility information file.

> The `2.0` version **Only Support** `webpack` 4, If you using `webpack` 2 or 3 version `1.0`.

## Scenes to be used

Do not use *laravel* default front-end tool to use **wenpack** built in the case, would like to be compatible with laravel auxiliary `mix` function to do the alias quotation of static packaging resources.

Laravel's way is to need a **mix-manifest.json** file to do the alias configuration, this plugin just solves this problem.

## Installation

The plugin is available via npm:

```shell
npm i webpack-laravel-mix-manifest --save-dev
```
You can also use yarn:

```shell
yarn add webpack-laravel-mix-manifest --dev
```

## Examples

### Using the ES6 (babel) webpack configuration usage:

```js
import WebpackLaravelMixManifest from 'webpack-laravel-mix-manifest';

export default {
    plugins: [
        // Write out 「mix-manifest.json」 to build directory.
        new WebpackLaravelMixManifest()
    ]
};

```

### Laravel template

Assume that the generated mix-manifest.json content is:
```json
{
  "/app.js": "/ashdgahdhasd6as7dasdh.js"
}
```

Use:

```html
<script src="{{ mix('app.js') }}"></script>
```

Output:

```html
<script src="/ashdgahdhasd6as7dasdh.js"></script>
```

### Basic

```js

let WebpackLaravelMixManifest = require('webpack-laravel-mix-manifest');

module.exports = {
    plugins: [
        // Write out 「mix-manifest.json」 to build directory.
        new WebpackLaravelMixManifest()
    ]
};

```

### More

If you do not want to use a compiled plugin, you can use the original plugin code:

```js
import WebpackLaravelMixManifest from 'webpack-laravel-mix-manifest/src/main.js';

export default {
    plugins: [
        // Write out 「mix-manifest.json」 to build directory.
        new WebpackLaravelMixManifest()
    ]
};
```

> It should be noted that the plug-in source code using ES6 syntax development, so you want to ensure that your webpack configuration file is also used ES6 (babel) configuration.

## API

The plugin provides a custom state file name configuration and a custom conversion method. The two APIs allow the user to customize the configuration to generate the configuration after writing the file and the converted state method.

```js
const options = {
    filename: 'mix-manifest.json',
    transform: function (assets) {
        // todo.
    }
};
new WebpackLaravelMixManifest(options);
```

### filename

The name of the file used for custom writing.

The default write name is `mix-manifest.json`.

```
new WebpackLaravelMixManifest({
    filename: 'custom.json'
});
```

### transform

Customize the conversion from the webpack assets.

The default conversion method is [src/transform.js](src/transform.js).

The default conversion method is also exposed to the outside and is convenient to call it in its own logic.

```js
import { transform } from 'webpack-laravel-mix-manifest';
```

When you call the webpack-laravel-mix-manifest plugin, the custom conversion interface is as follows:

```js
new WebpackLaravelMixManifest({
    transform: function (asstes) {
        // todo.
    }
});
```

> `asstes` is the resource for` webpack` 's packaging.
>
> Warning: The output of transform should be a String, not an object. On Node v4.x if you return a real object in transform, then webpack will break with a TypeError. Just adding a simple JSON.stringify() around your object is usually what you need to solve any problems.

## LICENSE

This package follows the MIT open source agreement.
