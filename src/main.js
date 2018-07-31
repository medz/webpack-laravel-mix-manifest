/**
 * Create the plugin class.
 * @param { filename: string|null, transform: Function|null } options
 */
function WebpackLaravelMixManifest({ filename = null, transform = null } = {}) {
  this.filename = filename ? filename : 'mix-manifest.json';
  this.transform = transform instanceof Function ? transform : require('./transform');
}

/**
 * The plugin apply.
 * @param {Object} compiler
 */
WebpackLaravelMixManifest.prototype.apply = function(compiler) {
  compiler.hooks.emit.tap('WebpackLaravelMixManifest', (compilation) => {

    let stats = compilation.getStats().toJson();
    let manifest = this.transform(Object.assign({}, stats.assetsByChunkName));

    compilation.assets[this.filename] = {
      source: () => manifest,
      size: () => manifest.length,
    };
  });
};

module.exports = WebpackLaravelMixManifest;
