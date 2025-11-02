module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // placeholder for your custom rule
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-as-guid': {
          create(context) {
            return {
              TSAsExpression(node) {
                if (
                  node.typeAnnotation &&
                  node.typeAnnotation.typeName &&
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
        },
      },
    },
  ],
};
