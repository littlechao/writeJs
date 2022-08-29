let request = function (id) {
  return new Promise((resolve, reject) => {
    //随机一个执行时间
    let time = Math.floor(10000 * Math.random());
    setTimeout(() => {
      resolve(id);
    }, time);
  });
};
let idArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let idArrayFn = idArray.map((item) => request(item));

// let done = Promise.race(idArrayFn);

// done.then((res) => {
//   console.log(res, "---done---", done, idArrayFn[0], idArrayFn[0] == done);
// });

class Schedule {
  constructor(requestPipe, maxNum) {
    this.list = requestPipe;
    this.reqPool = [];
    this.reqPoolIndex = [];
    this.maxNum = maxNum;
    while (this.reqPool.length < maxNum) {
      this.add();
    }
    this.run();
  }

  add() {
    let item = this.list.shift();
    this.reqPool.push(item);
  }

  run() {
    if (this.list.length == 0) return;
    let done = Promise.race(this.reqPool);
    console.log(this.reqPool, "---done---", done);
    done.then((res) => {
      this.reqPool.splice(0, 1);
      this.add();
      this.run();
    });
  }
}

let ScheduleFn = new Schedule(idArrayFn, 3);
