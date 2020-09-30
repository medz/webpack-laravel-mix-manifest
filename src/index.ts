import webpack from 'webpack';
import { Manifest } from './manifest';

export { Manifest }
export class WebpackLaravelMixManifest extends webpack.Plugin {
    /**
     * Create the webpack plugin.
     * @param endpoint Laravel `mix` helper used filename.
     */
    constructor(
        /**
         * Laravel framework `mix` helper filename,
         * By default `mix-manifest.json`.
         */
        private readonly endpoint: string = 'mix-manifest.json',
    ) {
        super();
    }

    /**
     * Webpack plugin entry.
     * @param compiler webpack compiler
     */
    apply(compiler: webpack.Compiler): void {
        compiler
            .hooks
            .emit
            .tap(
                WebpackLaravelMixManifest.name,
                this.hookTapCompilationHandler.bind(this),
            );
    }

    /**
     * Create a manifest instance.
     */
    protected createManifest(): Manifest {
        return new Manifest(this.endpoint);
    }

    /**
     * Webpack plugin hook handler.
     * @param compilation webpack compilation
     */
    protected hookTapCompilationHandler(
        compilation: webpack.compilation.Compilation,
    ) {
        const stats = compilation.getStats().toJson();
        const manifest = this.createManifest()
            .transform(stats)
            .rebuild();
        compilation.assets[this.endpoint] = {
            source: () => manifest,
            size: () => manifest.length,
        }
    }
}
