import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input:'./src/index.js', // 入口 以这个入口进行打包
    output:{
        // 打包出的方法和属性最后要放到window上，因为vue的话最后是可以new Vue的
        // 那么这个vue肯定是window上的一个变量
        
        // 支持amd 不是amd也会把当前变量挂到window上
        format:'umd',// 模块化的类型 esModule common.js模块
        // 输出的名字
        name:'Vue',// 全局变量的名字
        // 输出的文件名
        // 如果是umd格式，那么就打包到dist目录下的umd,后面就是打包后的js名字
        file:'dist/umd/vue.js',
        // 这里可能要需要将es6转换成es5,故要配置一个sourcemap
        // 把转换后的代码和转换前的代码做上一个映射表，
        // 这样可以去调试转换后的代码
        soucemap:true
    },
    // 很多插件 故是个数组，需要在这里告知是使用babel进行转换
    plugins:[
        // 插件 插件里面需要传一些参数，比如说
        babel({
            // 需要去排除某个文件夹，比如说node_modulees文件夹下
            // 有很多js，但不需要转义，所以我们可以用这个exclude
            exclude:'node_modules/**' ,// 表示node_modules所有的文件都不进行转义 

            //babel一般都会配置一个babelrc(目录中可以看到)
        }),
        // 最终还要启动一个静态服务
        serve({
            // 默认运行的时候回弹出浏览器
            // open:true,
            
            // 打开浏览器 端口是3000
            port:3000,
            contentBase:'', // 相对于哪个目录打开，空字符串表示以当前目录为基准
            openPage:'/index.html' // 默认打开的页面 打开的页面是谁

        })
    ]
}