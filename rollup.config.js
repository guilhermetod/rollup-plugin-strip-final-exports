import del from 'rollup-plugin-delete';
import ts from 'rollup-plugin-ts';

import { dependencies, main, module } from './package.json';

const createOutput = (config) => ({
  preferConst: true,
  ...config,
});

export default {
  input: 'src/index.ts',
  external: Object.keys(dependencies),
  output: [
    createOutput({
      file: module,
      format: 'es',
    }),
    createOutput({
      exports: 'auto',
      file: main,
      format: 'cjs',
    }),
  ],
  plugins: [
    del({ targets: 'dist' }),
    ts({ tsconfig: 'tsconfig.build.json' }),
  ],
};
