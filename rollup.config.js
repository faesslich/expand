import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

const baseConfig = {
    input: 'src/expand.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env']
        }),
        resolve(),
        commonjs(),
        postcss({
            extract: true,
            minimize: true,
            sourceMap: true,
            use: ['sass']
        })
    ]
};

const umdConfig = [
    {
        ...baseConfig,
        output: {
            file: 'dist/expand.umd.js',
            format: 'umd',
            name: 'Expand'
        }
    },
    {
        ...baseConfig,
        output: {
            file: 'dist/expand.umd.min.js',
            format: 'umd',
            name: 'Expand',
            plugins: [terser()]
        }
    }
];

const esModuleConfig = [
    {
        ...baseConfig,
        output: {
            file: 'dist/expand.js',
            format: 'esm'
        }
    },
    {
        ...baseConfig,
        output: {
            file: 'dist/expand.min.js',
            format: 'esm',
            plugins: [terser()]
        }
    }
];

export default [...umdConfig, ...esModuleConfig];
