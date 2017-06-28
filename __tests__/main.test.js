import WebpackLaravelMixManifest from '../src/main';

test('Test mix manifest default file name[mix-manifest.json].', () => {
  const MixManifest = new WebpackLaravelMixManifest();
  expect(MixManifest.filename).toEqual('mix-manifest.json');
});

test('Test mix manifest custom file name.', () => {
  const filename = 'test.json';
  const MixManifest = new WebpackLaravelMixManifest({
    filename: filename,
  });
  expect(MixManifest.filename).toEqual(filename);
});

test('Test full apply', () => {
  let string = 'test';
  (new WebpackLaravelMixManifest({
    filename: string,
    transform: () => string,
  })).apply(new class {
    plugin(name, call) {
      expect(name).toBe('emit');

      let curCompiler = {
        assets: [],
        getStats: () => ({
          toJson: () => ({
            assetsByChunkName: {
              'app.js': 'app.js'
            }
          })
        })
      };

      call(curCompiler, () => {
        const source = curCompiler.assets[string];
        expect(source.source()).toEqual(string);
        expect(source.size()).toEqual(string.length);
      });
    }
  });
});
