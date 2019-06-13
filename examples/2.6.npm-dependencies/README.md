# dependencies
详细说明 npm 各种 dependencies 的区别

## [dependencies](https://docs.npmjs.com/files/package.json.html#dependencies)
产品依赖, `npm i <package>` 是默认安装路径
执行如下语句:
```bash
# 切换到 npm-dependencies
cd npm-dependencies
# 初始化并安装 hello-world 模块
# 默认在 dependency 中添加了 hello-world 模块
npm init -y && npm i hello-world
```

> 注意 `npm install` 对于 require 的模块中的 `package.json` 文件只会读取,`dependencies` 依赖进行安装

一个典型的错误是对于 `npm publish` 的包错误的将 `dependencies` 添加到了 `devDependencies` 中,导致
应用此模块时,由于上述机制,运行代码时出现 `xx 模块未安装的提示` 

此外 `dependencies` 支持各种模式,例如 `git` 等
在上述示例的基础上执行如下命令

```bash
# 安装本地模块
npm i ../package1

# 安装一个基于 git 地址的模块,也支持 git+ssh 等多种方式
npm i git+file://${PWD}/../hello.git
# 支持安装特定版本,采用 hash 模式
npm un hello && npm i git+file://${PWD}/../hello.git#e0ae796
# 采用 tag 模式
npm un hello && npm i  git+file://${PWD}/../hello.git#next

# 采用 tgz 包安装
# 采用 tar czfv 的方式打包一个包然后发送给别人安装即可
npm un hello && npm i ../hello.tgz 
```

更详细的模式详见 [dependencies 配置](https://docs.npmjs.com/files/package.json.html#dependencies)

此外对于版本的范围限定阅读 [semver 说明](https://docs.npmjs.com/misc/semver)

## devDependencies 
开发依赖,采用 `npm i —D` 安装,切换到 `devDependencies` 目录,执行如下命令

```bash
# 会在 package.json devDependencies 中安装开发依赖
npm init -y && npm i -D ../package1
```

阅读官方文档理解生产依赖和开发依赖区别 [dependencies 和 devDependencies](https://docs.npmjs.com/specifying-dependencies-and-devdependencies-in-a-package-json-file)

## peerDependencies
该依赖用于开组件或插件包的过程中,可以参考如下博文理解 [peerDependencies](https://nodejs.org/es/blog/npm/peer-dependencies/)
切换到 `package-peerDependencies`执行如下命令

```bash
npm i
```

此时观察输出会显示如下警告:
> npm WARN vue-plugin1@1.0.0 requires a peer of vue@^2.4
.1 but none is installed. You must install peer depend
encies yourself.

npm 会提示里此插件正常工作依赖于 vue


## optionalDependencies
可选的依赖是,`dependency` 模块安装失败的备选方案.
即使 `optionalDependencies` 不存在 npm 也不会提示安装失败。

进入 `package-optionalDependencies` 执行如下命令

```bash
npm i
```

由于 `package1` 模块不存在 npm 会提示安装错误

在 package.json 中添加如下内容:

```js
  "optionalDependencies": {
    "package1": "file:../package1"
  },
```

重新执行 `npm i`,此时 npm 会采用 `optionalDependencies` 中的模块进行安装

典型的作用如下:
1. 给某个依赖一个额外的下载选择,静默安装错误
	> 例如在项目运行存在多个 `registry` 时,希望默认采用 npm 包,若 registry 环境切换,则使用新 registry 的同名包
2. 当安装依赖不符合需求或加载有错误时,采用替代包避免错误,此示例来源于 [npm optional](https://docs.npmjs.com/files/package.json.html#optionaldependencies) 说明。你可以参看 [](./package-optionalDependencies/index.js) 进行理解


## bundledDependencies
捆绑依赖,会将当前 `node_modules` 中引入的模块,也打包到 `npm publish` 中。
典型的使用场景如下,假设 `package1` 为生产依赖,但在开发过程中你需要对 `package1` 进行深度定制。
你又不想额外在开发一个 `package1` 的新包,此时在 `package.json` 进行如下设置

```json
"bundledDependencies":["package1"]
```

npm 会在你发布包时将本地的 `package1` 一起打包
参看示例 [](./package-bundleDependencies) 
