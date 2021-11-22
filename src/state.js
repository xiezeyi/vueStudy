import { observer } from "./observer/index";

export function initState(vm){
    // 这里刚刚有挂载一个vm.$options,即用户传过来的所有选项
    
    // 拿到所有选项
    const opts = vm.$options
    // 针对不同的情况做不同的初始化

    if(opts.props){
        // 如果当前选项有props 则进行初始化
        initProps(vm);
    }
    if(opts.data){ 
        // 如果当前选项有data,则对data进行初始化
        initData(vm);
    }



}

function initProps(vm){

}
function initData(vm) {  
    // 需要拿到vm.$options.data,即把当前传入数据拿到
    let data = vm.$options.data

    // vm不能直接打印出data 这里定义一个vm._data来获取到_data从而获取data对象
    vm._data = data = typeof data == 'function'?data.call(vm):data;

    // 这个data 可能是函数 也可能是对象
    // 如果是函数，那么就让他执行call(),这里为什么是call 
    // 因为要执行的话，这里的this肯定是当前的实例，即vm
    // 没传  那就是data 就是个对象
    typeof data == 'function'?data.call(vm):data
    // 有了这么一个对象，那么就要对其进行响应式的处理，即通过劫持进行处理
    // 数据的劫持方案， 
    // 对象object.defineProperty,其中 definePropery可以
    // 重新定义对象的get方法和set方法，当它获取时可以做一些事，当它设置的 
    // 时候可以做一些事
    // 数组 单独处理的

    // data肯定是一个对象，但data里面就有可能放数组了，故这里不做判断了
    // 专门写一个模块，这个模块是做响应式数据原理的。
    // observer/index.js 观测这个对象（里面做劫持）
    observer(data) 
}