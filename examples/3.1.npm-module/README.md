# 模块
此示例说明 `exports` 和 `module.exports` 的区别
当前使用 node 版本为 `v11.13.0`


1. 运行 `npm run debug`
2. 单步调试代码,require 会调用内部 [mod.require](https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/internal/modules/cjs/helpers.js#L14) 方法返回的结果,源码为 
3. 进一步调用了 [Module._load(id, this, /* isMain */ false)](https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/internal/modules/cjs/loader.js#L575)`,注意
4. 会先尝试从 `Module._cache` 提取模块信息,该缓存就是基于文件路径的键值对,值就是模块对象
5. 再尝试从原生模块系统提取模块,此处不赘述
6. 若均不存在创建一个新的模块对象,模块对象代码参见 [Module](https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/internal/modules/cjs/loader.js#L105),核心代码如下
	```js
	function Module(id, parent) {
        this.id = id;
        this.exports = {};
        this.parent = parent;
        updateChildren(parent, this, false);
        this.filename = null;
        this.loaded = false;
        this.children = [];
	}
	```
7. 然后缓存模块 `Module._cache` 
8. 调用 [tryModuleLoad](https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/internal/modules/cjs/loader.js#L604) 方法编译模块 
9.  内部调用 [Module.prototype.load(filename)](https://github.com/nodejs/node/blob/29867f35d89c9cc0ef1ea7dfdecd6361dc00a7c1/lib/internal/modules/cjs/loader.js#L664) 的方法编译模块 
10. 核心函数使用 `module._compile(stripBOM(content), filename);`
11. 函数内部使用 `compileFunction` 将文件内容包裹后装换为函数,赋值给 `compiledWrapper`,可等效理解为如下内容
	> 该函数参见 [vm.compileFunction](https://nodejs.org/docs/latest-v11.x/api/all.html#vm_vm_compilefunction_code_params_options)

    ```js
    compileFunction = function (exports, require, module, __filename, __dirname) {
      module.exports = {
        hi (name) {
          console.log (`hi ${name}`);
        },
      };

      exports = () => console.log ('hello world');
    }
    ```
12. 在执行如下代码即可编译该模块
	```js
	var dirname = path.dirname(filename);
    var require = makeRequireFunction(this);
    var result;
    var exports = this.exports;
    var thisValue = exports;
    var module = this;
    if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, thisValue, exports,
                              require, module, filename, dirname);
    } else {
    result = compiledWrapper.call(thisValue, exports, require, module,
                                  filename, dirname);
    }
	```

13. 注意通过上述流程,可以看到 `exports` 实际上就是 `module.exports` 的引用,而实际导出的是 `module.exports` 所以
若直接修改 `exports` 会导致引用丢失！


> 实际上通过上述分析你可以看到 module 对象上有一些很有用的私有方法例如 `module._compile` 利用此内部方法实现 js 脚本编译

此外你可以打印 `module.construct.prototype` 查看 `Module` 构造器上定义了那些方法



## 调试
如何调试 node 详见 [node debug](https://nodejs.org/de/docs/guides/debugging-getting-started/)
调试原理基于 [ Chrome DevTools Protocol ](https://chromedevtools.github.io/devtools-protocol/) 

运行如下命令进行调试

```bash
npm run debug
```

> 注意你也可以很方便的调试命令行工具

```bash
# 采用 node inspect `which <命令>`  的方式调试任意命令, which 用来查找命令对应的路径,例如调试 npm
node inspect `which npm`
```


> 通过源码调试尝试理解如下问题

1. 为什么 module.js `exports.say` 无效,它修改的到底是哪个对象？
2. 为什么 module1.js 可以工作,尝试比较 `this === exports`？
3. 为什么 module2.js 会返回空对象,谁创建的？为什么 module2.json 不会加载?
4. 模块之间循环应用会发生什么？