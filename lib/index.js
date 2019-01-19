const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules

module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: {
    recommended: {
      rules: {
        'prefer-await/prefer-await-to-then': 2
      }
    }
  }
};
