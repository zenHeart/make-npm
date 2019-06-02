# npm-shrinkwrap.json
该示例说明 npm-shrinkwrap.json 的作用

## npm-shrinkwrap 验证
修改示例 2.2 的 index.js 如下
```js

```

1. 安装依赖并运行应用
   
```bash
# 安装依赖并运行
# --no-save 不生成 packge-lock.json 
npm i hello-world@1.0.0 --no-save && npm start
```

2. 模拟他人安装包,并运行
```bash
# 安装依赖并运行
rm -rf node_modules && npm i --no-save && npm start
```

> 此时会运行失败,显示 `TypeError: helloWorld.hello is not a function`

原因如下:
1. 首次安装依赖包时,由于此时安装的依赖 `hello-world` 为 1.0.0 的版本可以正常运行
2. 他人安装时 `npm i`,根据 `package.json` 中版本限制 `^1.0.0` 会安装最新的 `hello-world` 1.0.1
3. 由于 `hello-world` 模块 `1.0.0` 相比 `1.0.1` 将接口名从 `hello` 变为 `hi` 导致出现上述错误

尝试执行如下语句:

```bash
# 模拟首次安装
rm -rf node_modules && npm i hello-world@1.0.0  && npm start
# 模拟他人安装此包,此时构建不会失败
rm -rf node_modules && npm i && npm start
```

> **`package-locke.json` 基于版本锁定,保证多人开发时安装的版本一致性.避免了由于依赖的破坏性更新导致的构建失败**

注意上述方法也不保证安全,假设用户执行 `npm update` 会根据 `package.json` 版本范围描述自动更新 `package-locke.json` 中的版本,虽然不同用户安装的版本均相同,也出现上述问题,此时采用如下解决方案
在 `package.json` 中对于特定依赖明确描述版本号,不使用版本范围符号,或者配置 [save-excat](https://docs.npmjs.com/misc/config#save-exact) 选项