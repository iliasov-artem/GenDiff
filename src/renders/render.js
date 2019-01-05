import renderTree from './renderTree';
import renderPlain from './renderPlain';

const rendersStore = {
  tree: renderTree,
  plain: renderPlain,
  json: JSON.stringify,
};

export default rendersStore;
