//call() 方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数
var foo = {
  val: 1,
  // bar: function() {  //在foo上挂在了一个属性
  //     console.log(this.value)
  // }
};

const bar = function (a, b) {
  console.log(this.val, a, b);
};

bar.call(foo);

// 模拟实现
foo.fn = bar;
foo.fn();
delete foo.fn;

// call(fn,a,b,c)
Function.prototype.myCall = function (context) {
  context.fn = this || window; //this -> bar   context -> foo
  let arg = [...arguments].slice(1);
  let res = context.fn(...arg);
  delete context.fn;
  return res;
};
bar.myCall(foo, 1, 2);
