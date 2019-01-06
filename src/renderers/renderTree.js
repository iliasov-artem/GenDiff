import { flattenDeep, isObject } from 'lodash';

const defaultGap = 2;

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
  const iter = (tree, depth = 0) => {
    const gapBeforeNode = ' '.repeat(defaultGap + depth * defaultGap * 2);
    const gapBeforeObject = depth === 0 ? ' '.repeat(defaultGap * 3) : gapBeforeNode;
    const gapBeforeBrace = ' '.repeat(depth * defaultGap * 2);
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
    return flattenDeep(['{', ...result, `${gapBeforeBrace}}`]).join('\n');
  };
  return `${iter(ast)}\n`;
};

export default renderTree;
