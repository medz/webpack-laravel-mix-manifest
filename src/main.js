import TransformFunction from './transform';

/*export */class WebpackLaravelMixManifest {

  /**
   * 插件构造函数入口.
   *
   * @param {String} options.filename 文件名称
   * @param {Function} options.transform 转换处理方法
   *
   * @author Seven Du <shiweidu@outlook.com>
   */
  constructor({ filename = 'mix-manifest.json', transform = TransformFunction } = {}) {
    this.filename = filename;
    this.transform = transform;
  }

  apply(compiler) {
    compiler.plugin('emit', (curCompiler, next) => {

      // Get stats.assetsByChunkName
      // **Note**: In future, could pass something like `{ showAssets: true }`
      // to the `getStats()` function for more limited object returned.
      const { assetsByChunkName } = curCompiler.getStats().toJson();
      const mixManifestString = this.transform(assetsByChunkName);

      curCompiler.assets[this.filename] = {
        source: () => mixManifestString,
        size: () => mixManifestString.length
      };

      next();
    });
  }
}

export const transform = TransformFunction;

export default WebpackLaravelMixManifest;
