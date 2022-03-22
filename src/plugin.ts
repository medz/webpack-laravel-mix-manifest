import { sources, WebpackPluginInstance, Compiler, Compilation } from 'webpack';
import { Manifest } from './manifest';

/**
 * Webpack plugin that generates a manifest file.
 * 
 * @param endpoint Options for the plugin.
 */
export class WebpackLaravelMixManifest implements WebpackPluginInstance {
    /**
     * Create the webpack plugin.
     * @param endpoint Laravel `mix` helper used filename.
     */
    constructor(
        /**
         * Laravel framework `mix` helper filename,
         * By default `mix-manifest.json`.
         */
        public readonly endpoint: string = 'mix-manifest.json',
    ) {}

    protected get compilationHookTap() {
        return {
            name: this.constructor.name,
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        }
    }

    /**
     * Webpack plugin entry.
     * @param compiler webpack compiler
     */
    public apply(compiler: Compiler): void {
        compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tap(this.compilationHookTap, () => this.hookTapFn(compilation));
        });
    }

    protected hookTapFn(compilation: Compilation): void {
        const stats = compilation.getStats().toJson();
        const manifest = this.createManifest()
            .transform(stats)
            .rebuild();
        compilation.emitAsset(this.endpoint, new sources.RawSource(manifest, false));
    }

    /**
     * Create a manifest instance.
     */
    protected createManifest(): Manifest {
        return new Manifest();
    }
}
