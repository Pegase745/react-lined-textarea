import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';

const pkg = require('./package.json');

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.ts',
  plugins: [
    // Exclude `peerDependencies` in the bundle
    external(),
    // Locate & bundle `node_modules`
    nodeResolve(),
    // Convert `commonJS` modules to `ES6`
    // Rollup only deals with `es` modules by default
    commonjs(),
    // Extract css
    postcss({
      modules: true,
      extract:
        env === 'production'
          ? `dist/${pkg.name}.min.css`
          : `dist/${pkg.name}.css`,
      minimize: env === 'production',
    }),
    // Must come after `resolve`
    // https://github.com/ezolenko/rollup-plugin-typescript2/issues/66
    typescript({ cacheRoot: './.ts_cache' }),
  ],
};

if (env === 'esm' || env === 'cjs') {
  config.output = {
    format: env,
    sourcemap: true,
    indent: false,
  };
}

if (env === 'development' || env === 'production') {
  config.output = {
    format: 'umd',
    name: 'ReactLinedTextArea',
    indent: false,
    sourcemap: true,
    globals: {
      react: 'React',
    },
  };

  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  );
}

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );

  config.plugins.push(filesize());
}
export default config;
