// new Vue({})

import { initMixin } from "./init";

// es6的类的写法 一个整体

// 导出一个类
// 这么写等等可以为这个类进行扩展
// es6的类的写法 一般是一个整体
// 写的方法 原型的方法 都放在这里
// 这里也可以用class Vue的写法
// class Vue{
//     a(){

//     }
// }
// 这里用的是以前的构造函数的写法
// 感觉上是在给构造函数的原型上进行扩展
// 这里可能含有一些选项，即在new的时候传过来的一个对象,即new Vue里的内容
function Vue(options){
    // 传过来后就可以进行一个初始化的操作了
    this._init(options); // 入口方法 做初始化操作。这样一写就是类的实例上的方法
                            // 而且后面也会讲组件，组件也会用到这个方法，所以应该把
                            // 这个方法做成一个公共方法，这样大家都可以去使用这个方法
    console.log(options)
}
// 这里可以把这些扩展的方法分到不同的文件里
// _init要做成一个公共方法，这里给vue的构造函数上加上一个属性，叫_init是一个函数
// 此时这个方法可以称为 初始化方法
// 为了解耦，我们可以将这个初始化方法作为基础的，写成一个个插件进行对原型的拓展
// init.js  这就是一个插件
// Vue.prototype._init = function (options){

// }
// 使用init.js 这个插件到此处 调这个方法时把Vue穿进去，就会在里面去执行这个函数
// 然后给这个原型上挂上这个初始化方法，即做了一个拆分
initMixin(Vue)

// 把这个类导出
export default Vue;