import path from 'path';

export default function (asstes = {}) {
  const asstesKeys = Object.keys(asstes);
  const asstesValues = Object.values(asstes);

  const manifest = asstesKeys.reduce((manifest, name, index) => {

    let files = asstesValues[index];
    if (typeof asstesValues[index] === 'string') {
      files = [files];
    }

    files = [...files];

    return files.reduce((manifest, filename) => {
      const dirname = path.dirname(filename);
      const extname = path.extname(filename);

      let key = `/${dirname}/${name}${extname}`;
      if (dirname === '.') {
        key = `/${name}${extname}`;
      }

      manifest[key] = `/${filename}`;

      return manifest;
    }, manifest);
  }, {});

  return JSON.stringify(manifest, null, 2);
};
