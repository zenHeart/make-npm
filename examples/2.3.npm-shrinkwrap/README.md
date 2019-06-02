# npm-shrinkwrap.json
该示例说明 npm-shrinkwrap.json 的作用

## npm-shrinkwrap 验证
1. 修改示例 2.2 的 index.js 如下
```js
const helloWorld = require('hello-world')

module.exports = {
	lock() {
		console.log('npm-lock package');
		console.log('internal use hello-world',helloWorld.hello();)
	}
}
```
2. 执行如下语句
```bash
# 切换到 npm-lock 目录并发布此模块到本地 registry
cd ../2.2.npm-lock && npm run publish
# 切换回项目目录安装模块 npm-lock 并运行
cd -  && npm i && npm start
```

> 此时会运行失败,显示 `TypeError: helloWorld.hello is not a function`

原因如下:
1. `npm-lock` 包依赖 `hello-world` 的范围为 `^1.0.0`
2. 采用 `npm i` 安装 `npm-lock` 时,根据此模块的 `package.json` 中版本限制 `^1.0.0`,会安装最新的 `hello-world` 1.0.1
3. 由于 `hello-world` 模块 `1.0.0` 相比 `1.0.1` 将接口名从 `hello` 变为 `hi` 运行 `npm-lock` 模块失败

> 避免此错误的方法是在发布 `npm-lock` 模块时执行 `npm shrinkwrap` 并将此文件发布到仓库
 
结合示例 `2.2` 和 `2.3` 希望你完全理解 `package-lock.json` 和 `npm-shrinkwrap.json` 的区别

总结如下:
1. `package-lock.json` 用于锁定版本
2. `npm-shrinkwrap.json` 功能和 `package-lock.json` 相同,但是可以发布,用于避免他人在使用包时,
由于第三方包的破坏性更新导致的不可用

