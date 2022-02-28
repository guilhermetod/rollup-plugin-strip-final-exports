import { walk } from 'estree-walker';
import MagicString from 'magic-string';
import { AcornNode, Plugin, RenderChunkHook } from 'rollup';

import isExport from '@src/is-export';

interface StripExportsOptions {
  sourceMap?: boolean;
}

export default (stripExportsOptions: StripExportsOptions = {}): Plugin => ({
  name: 'Strip final exports',
  renderChunk(sourceCode, chunk, rollupOptions): ReturnType<RenderChunkHook> {
    const ast = this.parse(sourceCode);

    const magicString = new MagicString(sourceCode);

    walk(ast, {
      enter(node) {
        if (isExport(node, rollupOptions)) {
          const { start, end } = node as AcornNode;
          magicString.remove(start, end);
        }
      },
    });

    const code = magicString.toString();
    const map = stripExportsOptions.sourceMap ? magicString.generateMap() : null;

    return { code, map };
  },
});
