import type { AssignmentExpression, BaseNode, ExpressionStatement, Identifier, Literal, MemberExpression } from 'estree';

interface AssignmentStatement extends ExpressionStatement {
  expression: AssignmentExpression;
}

const isExpressionStatement = (node: BaseNode): node is ExpressionStatement => node.type === 'ExpressionStatement';

const isIdentifier = (node: BaseNode): node is Identifier => node.type === 'Identifier';

const isLiteral = (node: BaseNode): node is Literal => node.type === 'Literal';

const isMemberExpression = (node: BaseNode): node is MemberExpression => node.type === 'MemberExpression';

const isAssignmentStatement = (node: BaseNode): node is AssignmentStatement => (
  isExpressionStatement(node)
  && node.expression.type === 'AssignmentExpression'
);

const isModuleIdentifier = (node: BaseNode): boolean => (
  isIdentifier(node)
  && node.name === 'module'
);

const isExportsIdentifier = (node: BaseNode): boolean => (
  isIdentifier(node)
  && node.name === 'exports'
);

const isExportsLiteral = (node: BaseNode): boolean => (
  isLiteral(node)
  && node.value === 'exports'
);

const isModuleExportsWithIdentifier = (memberExpression: MemberExpression): boolean => (
  isModuleIdentifier(memberExpression.object)
  && isExportsIdentifier(memberExpression.property)
);

const isModuleExportsWithLiteral = (memberExpression: MemberExpression): boolean => (
  isModuleIdentifier(memberExpression.object)
  && isExportsLiteral(memberExpression.property)
);

const isModuleExportsExpression = (memberExpression: MemberExpression): boolean => (
  isModuleExportsWithIdentifier(memberExpression)
  || isModuleExportsWithLiteral(memberExpression)
);

export default {
  isAssignmentStatement,
  isExportsIdentifier,
  isMemberExpression,
  isModuleExportsExpression,
  isModuleIdentifier,
};
