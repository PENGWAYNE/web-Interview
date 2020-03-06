/*
 * @Description: 原型和原型链
 * @Author: WaynePeng
 * @Date: 2020-03-06 09:11:56
 * @LastEditTime: 2020-03-06 15:23:03
 * @LastEditors: WaynePeng
 */
// 1. 为什么需要原型及原型链
function Person(name, age) {
  this.age = age
  this.name = name
  this.eat = function() {
    return `我叫${name},今年${age},正在吃饭！`
  }
}
let p1 = new Person('person1', 12)
let p2 = new Person('person2', 24)

console.log(p1.eat === p2.eat) // false

// 这样会比较占用空间，我们将eat方法提取出来，让他们共用

function Person1(name, age) {
  this.age = age
  this.name = name
}
Person1.prototype.eat = function() {
  return `我叫${name},今年${age},正在吃饭！`
}
let p3 = new Person1('person3', 12)
let p4 = new Person1('person4', 24)

console.log(p3.eat === p4.eat) // true

// 通过原型 prototype 让两个实例对象指向相同的位置

// Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
// Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
// Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
// 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
// 函数的 prototype 是一个对象，也就是原型
// 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链

// ⚠️ __proto__ 、prototype傻傻分不清楚？ 记住以下两点:
// 1. __proto__是每个对象都有的一个属性，而prototype是函数才会有的属性。
// 2. __proto__指向的是当前对象的原型对象，而prototype指向的，是以当前函数作为构造函数构造出来的对象的原型对象

// call
let fn1 = function() {
  console.log('fn1')
  this.num = 111
  console.log(this.num)
  this.sayHi = function() {
    console.log('sayHi')
  }
}
let fn2 = function() {
  console.log('fn2')
  this.num = 222
  console.log(this.num)
  this.sayHello = function() {
    console.log('sayHello')
  }
}

fn1.call(fn2) // fn1   1
console.log(fn1.num) // undefined
try {
  fn1.sayHi()
} catch (error) {
  console.log(error.name + ':' + error.message) // TypeError:fn1.sayHi is not a function
}
try {
  fn1.sayHello()
} catch (error) {
  console.log(error.name + ':' + error.message) // TypeError:fn1.sayHello is not a function
}

console.log(fn2.num) // 111
try {
  fn2.sayHello()
} catch (error) {
  console.log(error.name + ':' + error.message) // TypeError:fn2.sayHello is not a function
}
fn2.sayHi() // sayHi

