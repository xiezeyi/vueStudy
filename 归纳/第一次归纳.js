import { initMixin } from "../src/init"
import { observer } from "../src/observer"
import { arrayMethods } from "../src/observer/array"

index.js  
//写了一个vue的构造函数
//可以扩展原型的方法，默认new 一个Vue 会进行一个初始化
init.js
// 初始化核心的逻辑就是做了一步，初始化状态，属性 方法 数据
// 这里主要先考虑的是数据，数据用户可能是函数也可能是对象，
state.js
// 这里将结果拿到后，挂载到vm._data，为了用户能方便取值
// 做了一层代理
// 并且对数据进行了观测，观测的原则是
// 1是对象 2没有被观测的才观测
observer/index.js
// 给每一个对象都增加一个观测的实例__ob__
// 如果是数组就把数组里的方法全部重写，并且把数组里的每个对象都进行
// 一次劫持
// 如果不是数组是对象，就重新的把key value用def..方法进行代理，如果值还是对象
// 则再去代理，如果改的值是对象的话，也要进行一次代理，如果调的是数组的方法，
// 就会走到arrayMethods方法
array.js
// 这七个能改变原数组的方法都进行重写，如果新增数据也是对象类型的话
// 把新增的数据拿到inserted ，并且再去通过当前的值上的__ob__属性拿到当前的observer.index.js下的
// observer实例，去调它的observeArray再对他进行观测，这样对象及时是新增的也可以被拦截到
