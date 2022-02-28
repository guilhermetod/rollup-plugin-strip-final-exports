import { Plugin, ResolveIdResult } from 'rollup';

export default (sourceFile: string): Plugin => ({
  name: 'No tree shake',
  async resolveId(source, importer): Promise<ResolveIdResult> {
    const resolved = await this.resolve(source, importer, { skipSelf: true });

    if (resolved?.id === sourceFile) {
      return {
        moduleSideEffects: 'no-treeshake',
        id: resolved.id,
      };
    }

    return null;
  },
});
