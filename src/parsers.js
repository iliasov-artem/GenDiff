import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const formatsStore = [
  {
    format: '.json',
    method: arg => JSON.parse(arg),
  },
  {
    format: '.yaml',
    method: arg => yaml.safeLoad(arg),
  },
];

const getAction = fileExtension => formatAction
  .find(({ format }) => format === fileExtension).func;

export default (pathToFile) => {
  const obj = fs.readFileSync(pathToFile);
  const fileFormat = path.extname(pathToFile);
  return getAction(fileFormat)(obj);
};
