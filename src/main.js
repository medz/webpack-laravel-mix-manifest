const Manifest = require('./manifest');

class WebpackLaravelMixManifest {
  constructor(name = 'mix-manifest.json') {
    this.name = name;
  }

  /**
   * Apply the plugin.
   *
   * @param {Object} compiler
   */
  apply(compiler) {
    compiler.hooks.emit.tap('WebpackLaravelMixManifest', (compilation) => {
      let stats = compilation.getStats().toJson();
      let manifestContents = (new Manifest(this.name)).transform(stats).rebuild();
      compilation.assets[this.name] = {
        source: () => manifestContents,
        size: () => manifestContents.length,
      };
    });
  }
}

module.exports = WebpackLaravelMixManifest;
