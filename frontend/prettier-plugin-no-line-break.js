module.exports = {
    parsers: {
      "babel": {
        parse: function(text, parsers, opts) {
          const prettierConfig = { ...opts };

          const ast = parsers.babel.parse(text, prettierConfig);

          ast.program.body.forEach(node => {
            if (node.type === 'VariableDeclaration' && node.declarations[0].init?.type === 'ObjectExpression') {
              node.declarations[0].init.properties.forEach(prop => {
                prop.loc.start.line = prop.loc.end.line;
              });
            }
          });

          return ast;
        },
        astFormat: "babel",
      },
    },
  };