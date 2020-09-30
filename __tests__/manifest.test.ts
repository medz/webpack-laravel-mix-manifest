import webpack from 'webpack';
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

it('Test transform method', () => {
    const stats: webpack.Stats.ToJsonOutput = {
        _showErrors: false,
        _showWarnings: false,
        errors: [],
        warnings: [],
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

it('Test rebuild method', () => {
    const manifest = new Manifest();
    expect(manifest.rebuild()).toBe(JSON.stringify({}, null, 2));
});

it('Test flattenAssets method', () => {
    const data = {a: "b"};
    const stats: webpack.Stats.ToJsonOutput = {
        _showErrors: false,
        _showWarnings: false,
        errors: [],
        warnings: [],
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
