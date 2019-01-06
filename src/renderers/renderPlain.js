import { isObject, flattenDeep } from 'lodash';

const getCurrentValue = node => (isObject(node.currentValue) ? '[complex value]' : node.currentValue);
const getPreviousValue = node => (isObject(node.previousValue) ? '[complex value]' : node.previousValue);

const stringsStore = {
  node: (node, key, func) => func(node.children, `${key}${node.key}.`),
  added: (node, key) => `Property ${key}${node.key} was added with value: ${getCurrentValue(node)}`,
  removed: (node, key) => `Property ${key}${node.key} was removed`,
  changed: (node, key) => `Property ${key}${node.key} was updated. From ${getPreviousValue(node)} to ${getCurrentValue(node)}`,
};

const render = (node, key) => (
  flattenDeep(node.filter(item => item.type !== 'unchanged').map(item => stringsStore[item.type](item, key, render)))
);

export default ast => `${render(ast, '').join('\n')}\n`;
