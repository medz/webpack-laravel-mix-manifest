const path = require('path');
const URL = require('url').URL;

module.exports = function (assets = {}) {
  let manifest = {};

  for (let name in assets) {
    let files = assets[name];
    if (typeof files === 'string') {
      files = [files];
    }

    for (let index in files) {
      const filename = files[index];
      const dirname = path.dirname(filename);
      let extname = path.extname(filename);

      // Determine if the name already contains a file extension.
      const matchResults = new RegExp(extname.replace('.', '\\.') + '$').exec(name);

      // If that file extension found within the name matches the target output
      // file name, then we can skip setting the ext name. 
      if(matchResults && matchResults.length > 0) {
        const foundExt = matchResults[0];

        if(foundExt === extname) {
          extname = '';
        }
      }

      name = new URL(name, 'file:').pathname.replace(/^\/(.*)/, '$1');
      let key = `/${dirname}/${name}${extname}`;
      if (dirname === '.') {
        key = `/${name}${extname}`;
      }

      manifest[key] = `/${filename}`;
    }
  }

  return JSON.stringify(manifest, null, 2);
};
