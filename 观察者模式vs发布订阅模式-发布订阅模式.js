// 发布订阅模式
// 任务发布者-publisher
// 中介功能--Event Channel
//   1.维护任务类型，以及每种任务下的订阅情况
//   2.给订阅者提供订阅服务 - subscribe功能
//   3.当发布任务后，中介给所有订阅者发布任务
// 任务接收者--Subscriber

// 发布订阅模式主要用来处理不同系统组件的交流信息，即使这些组件不知道对方的存在

// [什么时发布订阅模式?]-基于一个事件通道，希望接受通知的对象Subscribe通过自定义事件订阅主题，被激活事件的对象Publisher通过发布主题事件通知各个订阅主题的subscriber对象
class PubSub {
  constructor() {
    //事件中心
    // 存储格式 { warTsk:[],routeTask:[]}
    // 每种事件下存放其订阅者的回调函数
    this.events = [];
  }
  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }

  publish(type, args) {
    console.log(this.events[type]);
    if (this.events[type]) {
      this.events[type].forEach((cb) => cb(args));
    }
  }

  unsubscribe(type, cb) {
    if (this.events[type]) {
      const cbIndex = this.events[type].findIndex((e) => e === cb);
      console.log(cbIndex);
      if (cbIndex != -1) {
        this.events[type].splice(cbIndex, 1);
      }
      if (this.events[type].length == 0) {
        delete this.events[type];
      }
    }
  }

  unsubscribeAll() {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

let pubsub = new PubSub();

let fun = function (taskInfo) {
  console.log("宗门殿发布战斗任务，任务信息:" + taskInfo);
};
// 弟子一订阅战斗任务
pubsub.subscribe("warTask", fun);
pubsub.subscribe("warTask", function (taskInfo) {
  console.log("宗门殿发布战斗任务，任务信息1:" + taskInfo);
});
// 弟子二订阅战斗任务
pubsub.subscribe("routeTask", function (taskInfo) {
  console.log("宗门殿发布日常任务，任务信息:" + taskInfo);
});
// 弟子三订阅全类型任务
pubsub.subscribe("allTask", function (taskInfo) {
  console.log("宗门殿发布五星任务，任务信息:" + taskInfo);
});

pubsub.unsubscribe("warTask", fun);
pubsub.publish("warTask", "猎杀时刻");
