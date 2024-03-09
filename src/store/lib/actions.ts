import Store from './store.class';

export default {
  addItem(context: Store, payload: any) {
    context.commit('addItem', payload);
  },
  clearItem(context: Store, payload: any) {
    context.commit('clearItem', payload);
  }
};
