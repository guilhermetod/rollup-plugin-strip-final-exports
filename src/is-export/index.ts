import type { BaseNode, Expression, MemberExpression, Super } from 'estree';
import type { NormalizedOutputOptions } from 'rollup';

import utils from '@src/is-export/utils';

const isModuleExportsMemberExpression = (expression: Expression | Super): boolean => (
  utils.isMemberExpression(expression)
  && utils.isModuleExportsExpression(expression)
);

const isCJSExportsAssignment = (memberExpression: MemberExpression): boolean => (
  utils.isExportsIdentifier(memberExpression.object)
  || utils.isModuleExportsExpression(memberExpression)
  || isModuleExportsMemberExpression(memberExpression.object)
);

const isCJSModuleExportStatement = (node: BaseNode): boolean => (
  utils.isAssignmentStatement(node)
  && utils.isMemberExpression(node.expression.left)
  && isCJSExportsAssignment(node.expression.left)
);

const isESModuleExportStatement = (node: BaseNode): boolean => [
  'ExportAllDeclaration',
  'ExportDefaultDeclaration',
  'ExportNamedDeclaration',
].includes(node.type);

const isCJSExport = (node: BaseNode, rollupOptions: NormalizedOutputOptions): boolean => (
  rollupOptions.format === 'cjs'
  && isCJSModuleExportStatement(node)
);

const isESModuleExport = (node: BaseNode, rollupOptions: NormalizedOutputOptions): boolean => (
  rollupOptions.format === 'es'
  && isESModuleExportStatement(node)
);

export default (node: BaseNode, rollupOptions: NormalizedOutputOptions): boolean => (
  isCJSExport(node, rollupOptions)
  || isESModuleExport(node, rollupOptions)
);
