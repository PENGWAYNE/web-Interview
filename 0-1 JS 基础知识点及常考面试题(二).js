/*
 * @Description: JS 基础知识点及常考面试题二
 * @Author: WaynePeng
 * @Date: 2020-03-05 17:50:01
 * @LastEditTime: 2020-03-06 08:21:01
 * @LastEditors: WaynePeng
 */
// == vs ===
// ==  => 双等号对于不同类型的值进行比较会把他们转化成相同的类型，然后对值进行比较
// ===  => 严格等于如果比较的值类型不相同就会直接返回 false 如果类型相同，会继续比较值是否相等，如果值相等就返回 true，否则返回 false
console.log('== vs ===')
console.log(1 == '1') // true
console.log(1 === '1') // false

// 闭包
console.log('########## 闭包 ##########')
// 闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包 => 在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log('零', i)
  }, 1000)
}
// 首先因为 setTimeout 是个异步函数，所以会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6

// 解决办法有三种:
// 第一种是使用闭包的方式
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log('一', j)
    }, 1000)
  })(i)
}
// 在上述代码中，我们首先使用了立即执行函数将 i 传入函数内部，这个时候值就被固定在了参数 j 上面不会改变，当下次执行 timer 这个闭包的时候，就可以使用外部函数的变量 j，从而达到目的

// 第二种就是使用 setTimeout 的第三个参数，这个参数会被当成 timer 函数的参数传入
for (var i = 1; i <= 5; i++) {
  setTimeout(
    j => {
      console.log('二', j)
    },
    1000,
    i
  )
}

// 第三种就是使用 let 定义 i 了来解决问题
for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log('三', i)
  }, 1000)
}

// 深浅拷贝
console.log('########## 深浅拷贝 ##########')
// 浅拷贝
// 首先可以通过 Object.assign 来解决这个问题，很多人认为这个函数是用来深拷贝的。其实并不是，Object.assign 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝
let a = {
  a: 1,
  b: 2,
  c: 3,
  d: Symbol('4'),
  e: undefined,
  f: null,
  g: '',
  h: function() {}
}
let b = Object.assign({}, a)
console.log(b) // { a: 1, b: 2, c: 3, d: Symbol(4), e: undefined, f: null, g: '', h: [Function: h] }
b.a = 10
console.log(a.a) // 1

// 另外我们还可以通过展开运算符 ... 来实现浅拷贝
let c = { ...a }
console.log(c) // { a: 1, b: 2, c: 3, d: Symbol(4), e: undefined, f: null, g: '', h: [Function: h] }
c.a = 10
console.log(a.a) // 1

// 如果对象中包含包含对象时，我们就需要用到深拷贝，潜拷贝遇到对象只是拷贝地址
// 这个问题通常可以通过 JSON.parse(JSON.stringify(object)) 来解决
let e = JSON.parse(JSON.stringify(a))
console.log(e) // { a: 1, b: 2, c: 3, f: null, g: '' }
e.a = 10
console.log(a.a) // 1

try {
  let cycle = {
    a: 1,
    b: cycle.b
  }
  console.log(object)
} catch (error) {
  console.log('我报错了,', error.name + '---' + error.message) // ReferenceError---Cannot access 'cycle' before initialization
}

// ⚠️该方法有局限性:
// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数(函数也会被忽略)
// 不能解决循环引用的对象

// 如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 MessageChannel

// 原型
console.log('######### 原型 ##########')
// JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。根据定义，null 没有原型，并作为这个原型链中的最后一个环节