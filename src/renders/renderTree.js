import { flattenDeep } from 'lodash';

const arr = ['dfsdf: 1', 'dasdd: 2'];

export const isObject = val => val === Object(val);

const defaultGap = 2;

const getGap = (place, treeDeep) => {
  switch (place) {
    case 'beforeNode': {
      return ' '.repeat(defaultGap + treeDeep * defaultGap * 2);
    }
    case 'beforeObject': {
      return treeDeep === 0 ? ' '.repeat(defaultGap * 3) : getGap('beforeNode', treeDeep);
    }
    case 'beforeLastCurlBrace': {
      return ' '.repeat(treeDeep * defaultGap * 2);
    }
    default:
      break;
  }
  return defaultGap;
};

const objectToString1 = (obj, gap) => {
  const objectAsString = Object.keys(obj).map((key) => {
    if (isObject(obj[key])) {
      return objectToString1(obj[key]);
    }
    return `${gap}${key}: ${obj[key]}`;
  });
  return objectAsString.join('\n');
};

const toString = (value, gapBeforeNode, gapBeforeObject) => (
  isObject(value) ? `{\n${gapBeforeNode}${objectToString1(value, gapBeforeObject)}\n  ${gapBeforeNode}}` : `${value}`
);

const renderTree = (ast) => {
  console.log(flattenDeep(arr));
  const iter = (tree, depth = 0) => {
    const gapBeforeNode = getGap('beforeNode', depth);
    const gapBeforeObject = getGap('beforeObject', depth);
    const stringsStore = {
      node: node => `${gapBeforeNode}  ${node.key}: ${iter(node.children, depth + 1)}`,
      added: node => `${gapBeforeNode}+ ${node.key}: ${toString(node.currentValue, gapBeforeNode, gapBeforeObject)}`,
      removed: node => `${gapBeforeNode}- ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}`,
      changed: node => [
        `${gapBeforeNode}+ ${node.key}: ${toString(node.currentValue, gapBeforeNode, gapBeforeObject)}`,
        `${gapBeforeNode}- ${node.key}: ${toString(node.previousValue, gapBeforeNode, gapBeforeObject)}`,
      ],
      unchanged: node => `${gapBeforeNode}  ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}`,
    };
    const result = tree.map(element => stringsStore[element.type](element));
    return flattenDeep(['{', ...result, `${getGap('beforeLastCurlBrace', depth)}}`]).join('\n');
  };
  return `${iter(ast)}\n`;
};

export default renderTree;
