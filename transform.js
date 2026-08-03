const recast = require('recast');
const { default: j } = require('jscodeshift');

function transform(file, api) {
  const ast = recast.parse(file.source);
  const functionPaths = j(ast).find(j.FunctionDeclaration);
  const variablePaths = j(ast).find(j.VariableDeclaration);

  // add types to function parameters and return
  functionPaths.forEach(path => {
    path.node.params.forEach(param => {
      param.typeAnnotation = j.typeAnnotation(j.identifier('number'));
    });
    path.node.returnType = j.typeAnnotation(j.identifier('number'));
  });

  // add types to variable declarations
  variablePaths.forEach(path => {
    path.node.declarations.forEach(declaration => {
      declaration.typeAnnotation = j.typeAnnotation(j.identifier('number'));
    });
  });

  return recast.print(ast).code;
}
