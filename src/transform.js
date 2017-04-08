import path from 'path';

const transform = (asstes = {}) => {
  let manifest = {};

  for (let name in asstes) {
    let files = asstes[name];
    if (typeof files === 'string') {
      files = [files];
    }

    for (let index in files) {
      const filename = files[index];
      const dirname = path.dirname(filename);
      const extname = path.extname(filename);

      let key = `/${dirname}/${name}${extname}`;
      if (dirname === '.') {
        key = `/${name}${extname}`;
      }

      manifest[key] = `/${filename}`;
    }
  }

  return JSON.stringify(manifest, null, 2);
};

export default transform;
