import { PubSub } from './pubsub.class';
export default class Store {
  private actions: {[propName: string]: (...rest: any[])=>any};
  private mutations: {[propName: string]: (...rest: any[])=>any};
  private state: {[propName: string]: string};
  private status: string;
  private events: PubSub;
  constructor(params: {[propName: string]: any}) {
    this.actions = {};
    this.mutations = {};
    this.state = {};
    this.status = 'resting';
    this.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      this.actions = params.actions;
    }

    if (params.hasOwnProperty('mutations')) {
      this.mutations = params.mutations;
    }

    this.state = new Proxy((params.state || {}), {
      set: (state, key: string, value) => {
        state[key] = value;
        console.log(`stateChange: ${key}: ${value}`);
        this.events.publish('stateChange', this.state);
        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }
        this.status = 'resting';
        return true;
      }
    });
  }
  dispatch(actionKey: string, payload: any) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }
    console.groupCollapsed(`ACTION: ${actionKey}`);
    this.status = 'action';
    this.actions[actionKey](this, payload);
    console.groupEnd();
    return true;
  }
  commit(mutationKey: string, payload: any) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }
    this.status = 'mutation';
    const newState = this.mutations[mutationKey](this.state, payload);
    this.state = Object.assign(this.state, newState);
    return true;
  }
}
