import { Manifest } from '../src/manifest';

it('Test constructor', () => {
    const manifest = new Manifest();
    expect(manifest).toBeInstanceOf(Manifest);
});

it('Test add method', () => {
    const manifest = new Manifest();
    manifest.add('1', '2');

    const data = {"/2": "/1"};
    expect(manifest.rebuild()).toBe(JSON.stringify(data, null, 2));

    const manifest1 = new Manifest().add(['a', 'b'], 'c');
    const data1 = {"/c": "/b"};
    const str = JSON.stringify(data1, null, 2);

    expect(manifest1.rebuild()).toBe(str);
});

// See https://github.com/medz/webpack-laravel-mix-manifest/issues/18
it(`Test add entity is unix path symbol #18`, () => {
    const manifest = new Manifest();
    const entityName = 'demo/test/word';
    const paths = ['demo/test/word-haha.js', 'demo/test/word-test.css'];
    const data = manifest.add(paths, entityName).rebuild();

    expect(data).toBe(JSON.stringify({
        [`/${entityName}.js`]: `/demo/test/word-haha.js`,
        [`/${entityName}.css`]: `/demo/test/word-test.css`,
    }, null, 2));
});

it('Test transform method', () => {
    const stats = {
        assetsByChunkName: {
            'a': 'b'
        }
    }
    const manifest = new Manifest();
    manifest.transform(stats);

    const data = {"/a": "/b"};
    const str = JSON.stringify(data, null, 2);

    expect(manifest.rebuild()).toBe(str);
});

it('Test transform method 2', () => {
    const stats = {
        assetsByChunkName: {
            'other-chunk': [
                'other-chunk.js?id=11111',
                'other-chunk.hjahahahhaha.css'
            ],
        }
    }
    const manifest = new Manifest();
    manifest.transform(stats);

    const data = {
        '/other-chunk.js': '/other-chunk.js?id=11111',
        '/other-chunk.css': '/other-chunk.hjahahahhaha.css'
    };
    const str = JSON.stringify(data, null, 2);

    expect(manifest.rebuild()).toBe(str);
});

it('Test rebuild method', () => {
    const manifest = new Manifest();
    expect(manifest.rebuild()).toBe(JSON.stringify({}, null, 2));
});

it('Test flattenAssets method', () => {
    const data = {a: "b"};
    const stats = {
        assetsByChunkName: data,
    }

    const manifest = new Manifest();
    const result = manifest.flattenAssets(stats);

    expect(result).toStrictEqual(data);
});

it('Test normalizePath method', () => {
    const manifest = new Manifest();

    expect(manifest.normalizePath('/')).toBe('/');
    expect(manifest.normalizePath('//')).toBe('/');
    expect(manifest.normalizePath('//\/\\\///\\/')).toBe('/');
    expect(manifest.normalizePath('//a/////////b\\\\\///c//d//1')).toBe('/a/b/c/d/1');
});
