import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import ini from 'ini';

const actionsStore = {
  json: data => JSON.parse(data),
  yaml: data => yaml.safeLoad(data),
  ini: data => ini.decode(data),
};

export default (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath).slice(1);
  return actionsStore[extension](fileContent);
};
