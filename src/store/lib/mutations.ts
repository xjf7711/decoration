import { IState } from './state';
export default {
  addItem(state: IState, payload: string) {
    state.items.push(payload);

    return state;
  },
  clearItem(state: IState, index: number) {
    state.items.splice(index, 1);

    return state;
  }
};
