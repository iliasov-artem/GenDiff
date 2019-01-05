
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

const renderTree = (ast) => {
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
    const result = tree.map(element => stringsStore[element.status](element));
    return ['{', ...result, `${getGap('beforeLastCurlBrace', depth)}}`].join('\n');
  };
  return `${iter(ast)}\n`;
};

const renderPlain = (ast) => {
  const iter = (data, key) => {
    const currentValue = node => (isObject(node.value) ? '[complex value]' : node.value);
    const previousValue = node => (isObject(node.beforeValue) ? '[complex value]' : node.beforeValue);
    const stringsStore = {
      node: node => iter(node.children, `${key}${node.key}.`),
      added: node => `Property ${key}${node.key} was added with value: ${currentValue(node)}`,
      removed: node => `Property ${key}${node.key} was removed`,
      changed: node => `Property ${key}${node.key} was updated. From ${previousValue(node)} to ${currentValue(node)}`,
    };
    const result = data.filter(node => node.status !== 'unchanged').map(element => stringsStore[element.status](element)).join('\n');
    return result;
  };
  return `${iter(ast, '')}\n`;
};

const rendersStore = {
  tree: renderTree,
  plain: renderPlain,
};

export default rendersStore;
