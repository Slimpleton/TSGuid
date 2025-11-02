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
          node.typeAnnotation.typeName.name === 'Guid'
        ) {
          context.report({
            node,
            message:
              'Do not cast to Guid using "as". Use parseGuid or parseExactGuid instead.',
          });
        }
      },
    };
  },
};
