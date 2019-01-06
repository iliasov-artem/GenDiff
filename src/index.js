import path from 'path';
import fs from 'fs';
import parse from './parsers';
import getAst from './ast';
import render from './renderers';

const genDiff = (pathToFirstConfig, pathToSecondConfig, format = 'tree') => {
  const firstConfigContent = fs.readFileSync(pathToFirstConfig, 'utf-8');
  const firstConfigExtension = path.extname(pathToFirstConfig).slice(1);
  const firstConfigTree = parse(firstConfigContent, firstConfigExtension);
  const secondConfigContent = fs.readFileSync(pathToSecondConfig, 'utf-8');
  const secondConfigExtension = path.extname(pathToSecondConfig).slice(1);
  const secondConfigTree = parse(secondConfigContent, secondConfigExtension);
  const ast = getAst(firstConfigTree, secondConfigTree);
  const renderedAst = render(ast, format);
  return renderedAst;
};

export default genDiff;
