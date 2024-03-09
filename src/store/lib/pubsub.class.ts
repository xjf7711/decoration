// 订阅和注册
export class PubSub {
  private readonly events: { [propName: string]: Array<(data: any) => any> };

  constructor() {
    this.events = {};
  }

  subscribe(event: string, callback: (data: any) => any) {
    if (!this.events.hasOwnProperty(event)) {
      this.events[event] = [];
    }
    return this.events[event].push(callback);
  }

  publish(event: string, data: any = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }
    return this.events[event].map(callback => callback(data));
  }
}
