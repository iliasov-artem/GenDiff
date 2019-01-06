import renderTree from './renderTree';
import renderPlain from './renderPlain';

const renderersStore = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (ast, type) => renderersStore[type](ast);
