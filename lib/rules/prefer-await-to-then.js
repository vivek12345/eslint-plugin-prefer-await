module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer await over .then chains',
      url: 'https://eslint.org/docs/rules/prefer-await-to-then'
    }
  },
  create: function(context) {
    function isTopLevelScoped() {
      return context.getScope().block.type === 'Program';
    }
    function isInsideAwaitOrYield() {
      context.getAncestors().some(parent => {
        return parent.type === 'AwaitExpression' || parent.type === 'YieldExpression';
      });
    }
    return {
      MemberExpression: function(node) {
        if (isInsideAwaitOrYield() || isTopLevelScoped()) return;
        if (node.property.name === 'then') {
          context.report({
            message: 'Please avoid using .then in promises, instead use the new cool await syntax',
            node,
            loc: node.property.loc
          });
        }
      }
    };
  }
};
