export function proxy(vm,data,key){
  // 取当前这个对象去配的时候，其实走的方法是get
  Object.defineProperty(vm,key,{ // vm.a
    // 那就让他去vm.data上去取
    get(){
      return vm[data][key]; // vm.data.a
    },
    set(newValue){ // vm.a = 100
      vm[data][key] = newValue // vm._data.a =100
    }
  })
  // 这个方法可以算是一个公共方法，故将它放到工具js中
}
export function defineProperty(target,key,value){
  Object.defineProperty(target,key,{ 
    enumerable:false,
    configurable:false,
    value:this
  })
}