import { readdirSync } from 'fs';
import { join } from 'path';

import { getBundleOutput } from '@tests/helpers/get-bundle-output';
import { specsFolder } from '@tests/helpers/specs-folder';

const cjsFolder = join(specsFolder, 'cjs');
const esmFolder = join(specsFolder, 'esm');

describe('Strip final exports', () => {
  it.each(readdirSync(cjsFolder))('should strip CommonJS final exports from "%s"', async (input) => {
    expect(await getBundleOutput(input, 'cjs')).toMatchSnapshot();
  });

  it.each(readdirSync(esmFolder))('should strip ESModules final exports from "%s"', async (input) => {
    expect(await getBundleOutput(input, 'esm')).toMatchSnapshot();
  });
});
