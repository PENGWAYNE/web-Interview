/*
 * @Description: JS 基础知识点及常考面试题一
 * @Author: WaynePeng
 * @Date: 2020-03-04 10:38:33
 * @LastEditTime: 2020-03-05 17:50:26
 * @LastEditors: WaynePeng
 */
console.log('########### 原始类型 ############')
// 1. 原始（Primitive）类型
// 在 JS 中，存在着 7 种原始值，分别是：
// (1). number
// (2). string
// (3). boolean
// (4). null
// (5). undefined
// (6). symbol
// (7). BigInt (es10)

// 原始类型都是以值的方式储存，是没有可以调用的函数的

console.log('1'.toString()) // "1"
// '1' 调用 toString 方法 实际是将 '1' 转换为了 String 类型

// JS 的 number 类型是浮点类型的，在使用中会遇到某些 Bug，比如 0.1 + 0.2 !== 0.3。string 类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变

// 另外对于 null 来说，很多人会认为他是个对象类型，其实这是错误的。虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object

console.log('############# 对象类型 #############')
// (1). 对象（Object）类型 => 除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）
let arr1 = []
let arr2 = arr1
arr2.push(1, 2, 3)
console.log(arr1) // [ 1, 2, 3 ]

// 对象的赋值是地址的赋值，arr2 = arr1 此时他们指向同一块地址，当其中一个改变时，另外一个也会跟着改变

// typeof vs instanceof
// typeof 基本类型除 null 之外都可以正确的识别，对于对象而言，除了函数都会显示 object
// 基本数据类型
console.log(typeof 'abc') // string
console.log(typeof 123) // number
console.log(typeof undefined) // undefined
console.log(typeof true) // boolean
console.log(typeof Symbol()) // symbol

console.log(typeof null) // object

// 对象
console.log(typeof []) // object
console.log(typeof {}) // object
console.log(typeof (new Date())) // object

console.log(typeof function() {}) // function

// 如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof，因为内部机制是通过原型链来判断的

let Person = function(name) {
  this.name = name || undefined
  this.sayHi = function() {
    console.log(`我是 ${ this.name }`)
  }
}

let WaynePeng = new Person('WaynePeng')
WaynePeng.sayHi() // 我是 WaynePeng
console.log(WaynePeng instanceof Person) // true

let str = 'hello world !'
console.log(str instanceof String) // false

let str1 = new String('hello world !')
console.log(str1 instanceof String) // true

// 我们可以发现原始的数据类型是无法通过 instanceof 直接判断的

// 我们可以通过自定义 instanceof 的行为去判断基本数据类型

class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}

console.log(str instanceof PrimitiveString) // true

// 因为可以自定义 instanceof 所以，instanceof 也不是百分之百可信的

console.log('############# 类型转换 #############')
// 类型转换
// 在 JS 中类型转换只有三种情况，分别是：
// 转换为布尔值
// 转换为数字
// 转换为字符串

// (1). 转换为布尔值 => 在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象  

// (2). 对象转原始类型
// 对象在转换类型的时候，会调用内置的 [[ToPrimitive]] 函数，对于该函数来说，算法逻辑一般来说如下：

// 如果已经是原始类型了，那就不需要转换了
// 如果需要转字符串类型就调用 x.toString()，转换为基础类型的话就返回转换的值。不是字符串类型的话就先调用 valueOf，结果不是基础类型的话再调用 toString
// 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
// 如果都没有返回原始类型，就会报错
// 当然你也可以重写 Symbol.toPrimitive ，该方法在转原始类型时调用优先级最高
let a = {
  valueOf() {
    return 1
  },
  toString() {
    return '2'
  },
  [Symbol.toPrimitive]() {
    return 3
  }
}
console.log(1 + a) // 4

// (3). 四则运算符
console.log('########## 四则运算 ##########')
// 加法运算符不同于其他几个运算符，它有以下几个特点：
// 运算中其中一方为字符串，那么就会把另一方也转换为字符串
// 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
console.log(1 + '1') // 11
console.log(true + false) // 1
console.log(true + [1, 2, 3]) // true1,2,3

// 你可能也会在一些代码中看到过 + '1' 的形式来快速获取 number 类型
console.log(1 + +'a') // NaN
console.log('1' + + 'a') // 1NaN
// 1 + + 'a' => 运算 +'a' 得到 NaN, 数字 1 与 数字 NaN 结果为 NaN
// '1' + + 'a' => 运算 +'a' 得到 NaN, 字符串 '1' 与 数字 NaN 结果为 1NaN

// 除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字
console.log(1 * '3') // 3
console.log(2 * [2]) // 4
console.log(2 * 'a') // NaN
// NaN 与任何数字运算都会得到 NaN

// (4). 比较运算符
// 如果是对象，就通过 toPrimitive 转换对象
// 如果是字符串，就通过 unicode 字符索引来比较

// (5). this
console.log('######## this #########')
var b = 'ccc'
function foo() {
  console.log(this.b)
}

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()

// 对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
// 对于 obj.foo() 来说，我们只需要记住，谁调用了函数，谁就是 this，所以在这个场景下 foo 函数中的 this 就是 obj 对象
// 对于 new 的方式来说，this 被永远绑定在了 c 上面，不会被任何方式改变 this

// 箭头函数其实是没有 this 的，箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this。在这个例子中，因为包裹箭头函数的第一个普通函数是 a，所以此时的 this 是 window。另外对箭头函数使用 bind 这类函数是无效的

// 最后种情况也就是 bind 这些改变上下文的 API 了，对于这些函数来说，this 取决于第一个参数，如果第一个参数为空，那么就是 window

// ⚠️ 关于this指向的优先级 => 首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变

