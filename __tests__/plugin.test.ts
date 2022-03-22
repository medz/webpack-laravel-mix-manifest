import { it, expect } from '@jest/globals';
import { WebpackLaravelMixManifest } from '../src';

it('Test constructor', () => {
    const plugin = new WebpackLaravelMixManifest;
    expect(plugin.endpoint).toBe('mix-manifest.json');

    const plugin2 = new WebpackLaravelMixManifest('test');
    expect(plugin2.endpoint).toBe('test');

    const plugin3 = new WebpackLaravelMixManifest(undefined);
    expect(plugin3.endpoint).toBe('mix-manifest.json');
});
