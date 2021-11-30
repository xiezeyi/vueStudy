// 这里要重写数组的方法，故先将数组原本的方法都取出
// 拿到数组原型上的方法 （原来的方法）
let oldArrayProtoMethods  = Array.prototype;

// 将这些方法继承一下 声明一个方法,将单签的arrayMethods.__proto__ = oldArrayProtoMethods
// Object.create是es5的方法
export let arrayMethods = Object.create(oldArrayProtoMethods)
// 这七个方法可以改变数组本身的状态，数组的新增和删除等
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
// 需要将这些方法进行重写
methods.forEach(method => {
  // 拿到一个个方法，将方法定义在arrayMethods上,将这些方法等于一个函数
  arrayMethods[method] = function(...args){
    // 调用的时候说到底还是要改变数据的，故还是要调用原来的方法对数组进行操作
    // 这里就拦截到数据了，即可以对数据进行一些操作或进行一些逻辑的处理
    // 什么逻辑的处理呢？主要就是 更新视图
    console.log("更新视图")
    // 如push 或pop则会返回一个数量
    console.log("数组方法被调用了")
    // apply是传参数的使用，因为调用arguments时候可能是多个，this指arrayMethods，即当前数组，谁调用的this就值谁（外层指向index.js的value
    // 这里将arguments换成了...args,即将类数组换成了数组类型args
    const result = oldArrayProtoMethods[methods].apply(this,args)
    
    // 数组也可能往里面放新对象，即push一个对象，此时push的时候由于对象是直
    // 接由数组方法设置进去的，故该对象不会有get和set的劫持，所以需要在方法
    // 调用时候对数据再进行一个拦截

    let inserted;  // 要插入的数据
    let ob = this.__ob__; // 观测标识,ob指向 value:this中的this ，这个this指实例，实例上有该方法
    switch(method){
      case 'push': // arr.push({a:1,{b:2}})
      case 'unshift'://这两个方法都是追加，追加的内容可能是对象类型，应该
      // 再次被进行劫持
        inserted = args;
        break;
      case 'splice': //vue.$set的原理就是接触splice的方法，对象是另外一个
      // 有删除 有添加 有修改
        inserted = args.slice(2); // arr.splice(0,1,{a,1})在0的索引，删除一个，新增一个对象
      default:
        break;
    }
    // inserted如果有被赋值可能，就观测一下
    if(inserted) 
    // 这里的this 因为当前的 方法
      ob.observeArray(inserted) // 给数组新增的值也要进行观测
    return result;
  }
})