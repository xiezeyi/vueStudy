// 做观测的入口
// 导出一个方法，对外暴露
export function observer(data) {
    // 调用了该方法，该方法内部调用definePropery来进行数据的劫持
    console.log(data) // 会货到到data对象，现在主要流程就是开始对这个data进行劫持
}