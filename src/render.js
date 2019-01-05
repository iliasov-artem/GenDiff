
const isObject = val => val === Object(val);

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

const render = (ast) => {
  const iter = (tree, depth = 0) => {
    const gapBeforeNode = getGap('beforeNode', depth);
    const gapBeforeObject = getGap('beforeObject', depth);
    const stringsStore = {
      node: node => `${gapBeforeNode}  ${node.key}: ${iter(node.children, depth + 1)}`,
      added: node => `${gapBeforeNode}+ ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}`,
      removed: node => `${gapBeforeNode}- ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}`,
      changed: node => `${gapBeforeNode}+ ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}\n${gapBeforeNode}- ${node.key}: ${toString(node.beforeValue, gapBeforeNode, gapBeforeObject)}`,
      unchanged: node => `${gapBeforeNode}  ${node.key}: ${toString(node.value, gapBeforeNode, gapBeforeObject)}`,
    };
    const getString = node => stringsStore[node.status];
    const result = tree.map(element => getString(element)(element));
    return ['{', ...result, `${getGap('beforeLastCurlBrace', depth)}}`].join('\n');
  };
  return `${iter(ast)}\n`;
};

export default render;
