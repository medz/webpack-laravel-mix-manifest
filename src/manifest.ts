import Path from 'path';
import { StatsCompilation } from 'webpack';

export class Manifest {
  /**
   * Generated manifest record.
   * @type {Record<string, string>}
   */
  protected manifest: Record<string, string>;

  /**
   * Create a new manifest.
   */
  constructor() {
    this.manifest = {};
  }

  /**
   * Transform the Webpack stats into the shape we need.
   * @param state Value of webpack stats to json output.
   */
  transform(stats: StatsCompilation): this {
    const assets = this.flattenAssets(stats);
    Object.keys(assets).forEach((entryName) => {
      this.add(assets[entryName], entryName);
    });
    return this;
  }

  /**
   * Using this manifest built to string.
   */
  rebuild(): string {
    return JSON.stringify(this.manifest, null, 2);
  }

  /**
   * Add the given path to the manifest file.
   * @param paths Need given paths.
   * @param entryName output entry name.
   */
  add(paths: string[] | string, entryName: string): this {
    if (Array.isArray(paths) || typeof paths === 'object') {
      let children = paths;
      if (!Array.isArray(paths) && typeof paths === 'object') {
        children = Object.values(paths);
      }
      children.forEach((path) => this.add(path, entryName));
      return this;
    }

    // search original in path.
    const path = this.normalizePath(paths);
    const original = path.replace(/\?.*/, '');

    // Get basename and file extension.
    const basename = Path.basename(original);
    const extension = Path.extname(original);

    // Generate key and save it to manifest.
    const key = original.replace(
      basename,
      Path.basename(entryName + extension),
    );
    this.manifest[key] = path;

    return this;
  }

  /**
   * Flatten the generated stats assets into an ollection.
   * @param stats Value of webpack stats to json output.
   */
  flattenAssets(stats: StatsCompilation): Record<string, string | string[]> {
    return Object.assign({}, stats.assetsByChunkName);
  }

  /**
   * Prepare the provided path for processing.
   * @param path Need normalize path string.
   */
  normalizePath(path: string): string {
    let newPath = path.replace(/\\/g, '/').replace(/\/+/g, '/');
    if (!newPath.startsWith('/')) {
      return '/' + newPath;
    }

    return newPath;
  }
}
