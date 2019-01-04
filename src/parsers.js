import yaml from 'js-yaml';
import ini from 'ini';

const parsersStore = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.decode,
};

export default (data, dataType) => parsersStore[dataType](data);
