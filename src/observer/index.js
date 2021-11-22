// 这里定义一个类，用于底部的返回
class Observer{
  constructor(value){
    console.log(value)
    // 值到这里的就都是一个对象，而不是一个null或者是一个123123
    // 这里就要开始对这个对象进行劫持了，即value
    // 使用defineProperty 重新定义属性
    // 定义的属性可能是数组也可能是对象，用walk()方法内部实现来重新定义
    this.walk(value);
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
    if(typeof data !== 'object' && data !== null){
      return;
    }
    // 接下来就是去观测这个对象，这里专门写一个类来进行观测，因为观测的对象
    // 可能是要观测数组，也可能是观测对象，也可能是其它的一些方法，现在要将
    // 这些方法耦合在一起做成一个功能，这时候就应该使用一个类
    return new observer(data)

}