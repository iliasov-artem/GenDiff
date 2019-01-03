import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const actionsStore = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
};

export default (filePath) => {
  const fileContent = fs.readFileSync(filePath);
  const extension = path.extname(filePath).slice(1);
  console.log(extension);
  return actionsStore[extension](fileContent);
};
