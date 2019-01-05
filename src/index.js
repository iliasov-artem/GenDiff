import path from 'path';
import fs from 'fs';
import parse from './parsers';
import getAst from './ast';
import render from './render';

const genDiff = (pathToFile1, pathToFile2, format = 'plain') => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileExtension1 = path.extname(pathToFile1).slice(1);
  const fileAsObject1 = parse(fileContent1, fileExtension1);
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const fileExtension2 = path.extname(pathToFile2).slice(1);
  const fileAsObject2 = parse(fileContent2, fileExtension2);
  const ast = getAst(fileAsObject1, fileAsObject2);
  const renderedAst = render[format](ast);
  return renderedAst;
};

export default genDiff;
