// 这里定义一个类，用于底部的返回
// 这个类的作用就是 创建一个类，把所有的观测方法都封装到观测的内部

import { arrayMethods } from "./array";

// 什么时候用类：封装、继承就会想到类，这里的类就是对属性观测的类
class Observer{
  constructor(value){
    console.log(value)
    // 值到这里的就都是一个对象，而不是一个null或者是一个123123
    // 这里就要开始对这个对象进行劫持了，即value
    // 使用defineProperty 重新定义属性
    // 定义的属性可能是数组也可能是对象，用walk()方法内部实现来重新定义

    // 开始添加对数组的判断操作
    if(Array.isArray(value)){
      // 这里进来的即是数组了，这里希望能对数组的方法和改变数组内容的方法进行重写
      // 希望调用push shift unshift splice sort reverse pop,这些只要调用了，肯定说明这个数据变化了
      // 故进行函数劫持/切片编程
      // 因为在调用方法的时候将这些方法重写了，那么怎么重写呢
      // 这里单独去创建一个array.js去单独搞这件事情

      // 将array.js的变量arrayMethods放进来
      // 并让当前的属性可以通过量 找到 刚才最后更新好的函数
      // 怎么找，数组调的是push，调的是自己的push，concat就调原来的
      
      value.__proto__ =  arrayMethods

      // 数组中可能还含有对象，故观测数组中的对象类型，对象变化也要做一些事情
      // 观测对象数组里的属性
      this.observeArray(value);
    }else{ // 不是数组走以前的逻辑
      this.walk(value);
    }
    
  }
  observeArray(value){
    // 对数组里的每一项的对象都进行观测
    value.forEach(item =>{
      // 每一项都进行观测，然后观测数组中的对象类型
      // 相当于循环数组里的每一项，然后再进行观测 
      observer(item);
    })
  }
  walk(data){
    // 获取对象的key
    let keys = Object.keys(data);
    keys.forEach(key=>{
      // 把数据定义成响应式的数据
      // 给data数据定义key这个属性，然后值是当前对象里定义的值
      defineReactive(data,key,data[key]); // Vue.util.defineReactive
    })
  }
}
// 这里现在只能做了一层的get和set，即内部的参数与没有get和set方法，只有最外层的有
function defineReactive(data,key,value){
  // 这里增加一个递归，来实现对多层的对象也能进行观测
    // 如果值是对象类型，再进行观测 
  observer(value)
    Object.defineProperty(data,key,{
      get(){
        console.log('用户获取值了')
        return value
      },
      set(newValue){
        console.log('用户设置值了')
        // 为什么要用value = newValue呢，如果用
        // data[key] = value 则会造成死循环 会造成一个闭包！故这里借助第三个变量value进行修改
        if(newValue == value ) return
        // 这里多了一行监控，是因为在设置值的时候，也需要对该值进行是否是对象的拦截判断，如果是对象
        // 则应该进行观测，添加对应的方法
        // 如果用户将值改为对象，则继续监控
        observer(newValue)
        // 用第个值（外部值）赋值
        value = newValue
      }
    })
}
// 做观测的入口
// 导出一个方法，对外暴露
export function observer(data) {
    // 调用了该方法，该方法内部调用definePropery来进行数据的劫持
    console.log(data) // 会货到到data对象，现在主要流程就是开始对这个data进行劫持
    // 这边的data必须是对象才可以进行观测,不是对象（123123）就返回
    // type null 也是object
    if(typeof data !== 'object' || data !== null){
      return;
    }
    // 接下来就是去观测这个对象，这里专门写一个类来进行观测，因为观测的对象
    // 可能是要观测数组，也可能是观测对象，也可能是其它的一些方法，现在要将
    // 这些方法耦合在一起做成一个功能，这时候就应该使用一个类
    return new observer(data)

}