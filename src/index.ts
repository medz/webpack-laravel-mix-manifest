import { sources, WebpackPluginInstance, Compiler, Compilation } from 'webpack';
import { Manifest } from './manifest';

export { Manifest }
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

    get compilationHookTap() {
        return {
            name: this.constructor.name,
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        }
    }

    /**
     * Webpack plugin entry.
     * @param compiler webpack compiler
     */
    apply(compiler: Compiler): void {
        compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
            compilation.hooks.processAssets.tap(this.compilationHookTap, () => this.hookTapFn(compilation));
        });
    }

    hookTapFn(compilation: Compilation) {
        const stats = compilation.getStats().toJson();
        const manifest = this.createManifest()
            .transform(stats)
            .rebuild();
        compilation.emitAsset(this.endpoint, new sources.RawSource(manifest, false));
    }

    /**
     * Create a manifest instance.
     */
    createManifest(): Manifest {
        return new Manifest();
    }
}
