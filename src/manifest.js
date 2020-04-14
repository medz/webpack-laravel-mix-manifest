const collect = require('collect.js');
const path = require('path');

class Manifest {
    /**
     * Create a new Manifest instance.
     *
     * @param {string} name
     */
    constructor(name) {
        this.manifest = {};
        this.name = name;
    }

    rebuild() {
        return JSON.stringify(this.manifest, null, 2);
    }

    /**
     * Add the given path to the manifest file.
     *
     * @param {string} filePath
     */
    add(filePaths, entryName) {
        if (typeof filePaths === 'string') {
            filePaths = [filePaths];
        }

        for (let index in filePaths) {
            let filePath = filePaths[index];
            filePath = this.normalizePath(filePath);

            let original = filePath.replace(/\?.*/, '');
            original = original.replace(path.basename(original), entryName + path.extname(original));

            this.manifest[original] = filePath;
        }

        return this;
    }

    /**
     * Transform the Webpack stats into the shape we need.
     *
     * @param {object} stats
     */
    transform(stats) {
        this.flattenAssets(stats).each(this.add.bind(this));

        return this;
    }

    /**
     * Flatten the generated stats assets into an array.
     *
     * @param {Object} stats
     */
    flattenAssets(stats) {
        let assets = Object.assign({}, stats.assetsByChunkName);
        
        return collect(assets);
    }

    /**
     * Prepare the provided path for processing.
     *
     * @param {string} filePath
     */
    normalizePath(filePath) {
        filePath = filePath.replace(/\\/g, '/');

        if (!filePath.startsWith('/')) {
            filePath = '/' + filePath;
        }

        return filePath;
    }
}

module.exports = Manifest;
