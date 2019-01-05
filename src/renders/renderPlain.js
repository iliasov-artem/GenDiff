import { isObject } from './renderTree';

const renderPlain = (ast) => {
  const iter = (data, key) => {
    const currentValue = node => (isObject(node.currentValue) ? '[complex value]' : node.currentValue);
    const previousValue = node => (isObject(node.previousValue) ? '[complex value]' : node.previousValue);
    const stringsStore = {
      node: node => iter(node.children, `${key}${node.key}.`),
      added: node => `Property ${key}${node.key} was added with value: ${currentValue(node)}`,
      removed: node => `Property ${key}${node.key} was removed`,
      changed: node => `Property ${key}${node.key} was updated. From ${previousValue(node)} to ${currentValue(node)}`,
    };
    const result = data.filter(node => node.type !== 'unchanged').map(element => stringsStore[element.type](element)).join('\n');
    return result;
  };
  return `${iter(ast, '')}\n`;
};

export default renderPlain;
