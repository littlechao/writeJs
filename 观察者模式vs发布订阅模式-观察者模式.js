// 1. 观察者模式：
// --目标对象Subject:
// 维护观察者列表observeList
// 定义添加观察者方法
// 当自身发生变化后，通过调用自己notify方法依次通知每个观察者执行update

// 观察者Observe需要实现update方法，供目标对象调用。update方法中可以执行之定义的业务逻辑

// [什么是观察者模式？]-当对象存在一对多的依赖关系时，其中一个对象的状态发生该百年，所有依赖他的对象都会收到通知，这既是观察者模式
class Observe {
  constructor(name) {
    this.name = name;
  }
  updated({ taskType, taskInfo }) {
    if (taskType === "route") {
      console.log(`${this.name}不需要日常任务`);
      return;
    }
    this.goToTask(taskInfo);
  }
  goToTask(info) {
    console.log(`${this.name}去任务大殿抢${info}任务 `);
  }
}

class Subject {
  constructor() {
    this.observeList = [];
  }
  addObserve(observe) {
    this.observeList.push(observe);
  }
  notify(task) {
    console.log("发布五星任务");
    this.observeList.forEach((observe) => observe.updated(task));
  }
}

const subject = new Subject();
const stu1 = new Observe("张三");
const stu2 = new Observe("李四");

subject.addObserve(stu1);
subject.addObserve(stu2);

const warTask = {
  taskInfo: "war",
  taskInfo: "猎杀时刻",
};

subject.notify(warTask);
