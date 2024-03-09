/**
 * 常用的 API 包括：
 *
 * j(file.source)：将源代码解析为 AST 并返回根节点。
 *
 * root.find(j.Node)：在 AST 中查找与指定类型匹配的节点。
 *
 * node.replaceWith(node)：用指定的节点替换当前节点。
 *
 * root.toSource(options)：将 AST 转换回字符串，并根据需要调整缩进和格式。
 *
 * j.program(body, sourceType)：创建 AST 根节点。
 *
 * j.identifier(name)：创建标识符节点，例如变量名或函数名。
 *
 * j.literal(value)：创建字面量节点，例如字符串或数字。
 *
 * j.callExpression(callee, args)：创建函数调用节点。
 */

module.exports = function(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // 将所有 var 声明语句替换为 let 或 const
  // 有效 没有处理 var a,b,c 这种带逗号的
  root.find(j.VariableDeclaration, {kind: 'var'}).forEach((path) => {
    // j(path).replaceWith(j.variableDeclaration(
    //   path.node.kind === 'var' ? 'const' : 'let',
    //   path.node.declarations,
    // ));
    const declarations = path.node.declarations.map(declarator =>
      j.variableDeclaration('let', [declarator])
    );
    j(path).replaceWith(declarations);
  });
  // 查找所有的变量声明语句，并替换为let声明语句
  // root.find(j.VariableDeclaration).forEach(path => {
  //   if (path.node.kind === 'var') {
  //     const declarations = path.node.declarations.map(declarator =>
  //       j.variableDeclaration('let', [declarator])
  //     );
  //     j(path).replaceWith(declarations);
  //   }
  // });
  // 将for循环中的计数器变量声明从const改为let
  root.find(j.ForStatement).forEach(path => {
    const init = path.node.init;
    if (init && init.kind === 'const') {
      init.kind = 'let';
    }
  });
  // 查找所有 console.log() 语句的节点
  root
    .find(j.CallExpression, {
      callee: {
        property: { name: 'log' },
        object: { name: 'console' }
      }
    })
    // 删除找到的所有节点
    .remove();

  // 查找所有标识符名为 a 的节点，并且将其替换为 goto。
  // Use atLeastOne option to throw error if no nodes found
  root
    .find(j.Identifier, { name: 'a' })
    // .atLeastOne()
    // .filter(p => {
    //   /* condition to check if p should be replaced */
    // })
    .replaceWith(j.identifier('goto'));


  return root.toSource({
      quote: 'single', trailingComma: true, quoteProps: 'consistent', tabWidth: 2,
      reuseWhitespace: false, es5: false, lineTerminator: '\n', wrapColumn: 0, flowObjectCommas: false,
      arrayBracketSpacing: true, objectCurlySpacing: true, arrowParensAlways: false, parser: undefined,
      generator: undefined, comment: false, compact: false, concise: false, jsonCompatibleStrings: false,
      indentStyle: 'space', tabSize: 2, lineSeparator: undefined, includeComments: false,
      sourceFileName: undefined, sourceMapName: undefined, quoteType: 'single',
      trailingFunctionCommas: false, objectShorthand: true, arrowParens: 'avoid',
      flowCommas: false, flowObjectPattern: true, quoteTransform: undefined,
      reuseSameIndent: false, flowTypeAnnotations: false, objectCurlySameLine: false,
      semi: true, flowTypeGuessers: [],
      explicitTypes: false, ensureES5: false, numericLiteralSeparator: undefined,
      wrapJSXExpressions: false, padding: true, newlineAfterParens: false, spaceBeforeFunctionParen: false,
      eol: undefined, inputSourceMap: undefined, nativeMethod: false, quoteStyle: 'single',
      noTrailingWhitespace: false, noSpaceEmptyFn: true, noLineBreaksAroundComments: false,
      singleQuote: true, jsxBracketSameLine: false, trailingCommaOnly: false, preferConst: false,
      arrowSpacing: true, jsescOption: {}, file: undefined, sourceMap: false, noSemicolon: false,
      noSpaceInParen: true, usingTabs: false, wrap: false, lineTerminatorStyle: '\n',
      objectPropertySameLine: false, htmlOptions: {}, noParenthesis: false, noQuote: false,
      tab: '', useTabs: false, noSemicolonRecursive: false, returnLastStatement: true,
      noImplicitConvert: false, adapter: undefined, silent: true});

}
