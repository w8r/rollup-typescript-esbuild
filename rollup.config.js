import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import esbuild from "rollup-plugin-esbuild";
import glsl from "rollup-plugin-glsl";

/* eslint-disable import/no-default-export */
const config = {
  input: "./src/index.ts",
  output: {
    name: "UMDBundleName",
    sourcemap: !process.env.MINIFY,
  },
  external: [], // eslint-disable-line global-require
  plugins: [
    glsl({
      include: "src/**/*.glsl",
    }),
    json(),
    // typescript({
    //   tsconfig: "tsconfig.prod.json"
    // }),

    esbuild({
      minify: process.env.MINIFY,
      sourceMap: !process.env.MINIFY,
      target: "es2016",
      loaders: {
        glsl: "text",
      },
    }),

    //babel({ babelHelpers: "bundled" }),
    commonjs(),
    resolve(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

if (process.env.MINIFY) {
  config.plugins.push(terser());
}

export default config;
