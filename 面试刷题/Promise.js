/*
 * @Description: Promise
 * @Author: WaynePeng
 * @Date: 2020-03-06 15:49:44
 * @LastEditTime: 2020-03-06 15:54:37
 * @LastEditors: WaynePeng
 */
// Promise 翻译过来就是承诺的意思，这个承诺会在未来有一个确切的答复，并且该承诺有三种状态，分别是：

// 等待中（pending）
// 完成了 （resolved）
// 拒绝了（rejected）
// 这个承诺一旦从等待状态变成为其他状态就永远不能更改状态了，也就是说一旦状态变为 resolved 后，就不能再次改变

new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})

// 当我们在构造 Promise 的时候，构造函数内部的代码是立即执行的
new Promise((resolve, reject) => {
  console.log('new Promise') // new Promise
  resolve('success')
})
console.log('finifsh') // finifsh
// new Promise ---> finifsh

// Promise 实现了链式调用，也就是说每次调用 then 之后返回的都是一个 Promise，并且是一个全新的 Promise，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装

