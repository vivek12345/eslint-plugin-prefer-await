module.exports = {
  meta: {
    description: 'Eslint rule to show error when non-declared variable/functions are accessed from window',
    category: 'problem'
  },
  create: function(context) {
    let globalScope;
    function isGlobalProperty(node) {
      return globalScope.variables.some(variable => {
        return variable.name === node.name;
      });
    }
    return {
      Program: function() {
        globalScope = context.getScope();
      },
      MemberExpression: function(node) {
        if (node.object.name === 'window' && !isGlobalProperty(node.property)) {
          context.report({
            message: '{{propertyName}} scope piggybacks on {{objectName}} to extend the global scope',
            node,
            data: {
              propertyName: node.property.name,
              objectName: node.object.name
            }
          });
        }
      }
    };
  }
};
