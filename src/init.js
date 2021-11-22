import { initState } from "./state";

export function initMixin(Vue){ // 拓展原型
    Vue.prototype._init = function (options){
        // Vue的初始化
        // Vue里面会把用户填的所有属性都放到当前的实例上-index.html中的let vm
        const vm = this; // this就是当前new 出来的实例
        // 给实例上加上一些属性，即用户传过来的所有选项
        vm.$options  = options; // 这里是把内部的options放到实例上，提供index.html进行访问

        // vue里面核心特性 响应式数据原理 不是MVVM，因为$ref是可以跳过数据去更新视图的

        // 初始化状态（将数据做一个初始化的劫持，当我改变数据时应该更新视图
        // vue组件中有很多状态 data props watch computed
        // 这里先做状态初始化，然后对不同的属性做不同的处理
        // 新建一个state.js 做状态的初始化
        initState(vm);


        
    }
}