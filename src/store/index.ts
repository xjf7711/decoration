import actions from './lib/actions.js';
import mutations from './lib/mutations.js';
import { state } from './lib/state.js';
import Store from './lib/store.class';

export default new Store({
  actions,
  mutations,
  state
});
