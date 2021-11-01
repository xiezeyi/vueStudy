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
}