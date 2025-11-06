module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow casting to Guid using `as`',
    },
    schema: [], // no options
  },
  create(context) {
    return {
      TSAsExpression(node) {
        if (
          node.typeAnnotation &&
          node.typeAnnotation.type === 'TSTypeReference' &&
          node.typeAnnotation.typeName.type === 'Identifier' &&
          node.typeAnnotation.typeName.name === 'UUID'
        ) {
          context.report({
            node,
            message:
              'Do not cast to UUID using "as". Use parseGuid instead.',
          });
        }
      },
    };
  },
};
