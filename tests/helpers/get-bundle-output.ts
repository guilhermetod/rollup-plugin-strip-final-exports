import { join } from 'path';

import commonJS from '@rollup/plugin-commonjs';
import { ModuleFormat, rollup } from 'rollup';

import stripFinalExports from '@src/index';
import disableTreeShaking from '@tests/helpers/disable-tree-shaking-plugin';
import { specsFolder } from '@tests/helpers/specs-folder';

const sourceFile = join(specsFolder, 'say-hello.js');

export async function getBundleOutput(filename: string, format: ModuleFormat): Promise<string> {
  const input = join(specsFolder, format, filename);

  const bundle = await rollup({
    input,
    plugins: [
      commonJS(),
      stripFinalExports(),
      disableTreeShaking(sourceFile),
    ],
  });

  const { output } = await bundle.generate({ format, exports: 'auto', preferConst: true });

  return output[0].code;
}
