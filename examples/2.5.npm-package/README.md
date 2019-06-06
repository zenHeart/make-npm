# package.json
详细讲解 package.json 的各种配置项
参考 [package-json](https://docs.npmjs.com/files/package.json.html)

## 所有字段列表
* `name` 包名,作为 require 的模块 id
  * 命名尽量简短,具有描述性,关联包采用 scope 或 monorepo 的方式
* `version` 包的版本说明
  * 详见 [语义化版本规范](https://semver.org/lang/zh-CN/)
  * 版本控制 [npm 版本控制](https://docs.npmjs.com/misc/semver.html)
* `description` 描述包的概念,便于 `npm search` 查找
* `keywords` 包的关键字,便于 `npm search` 查找
* `homepage` 项目主站,`npm home` 会打开次配置
  > 实际上 `npm home` 是 `npm docs` 的 alias
* `bugs` bugs 地址,支持如下配置项
  * `url` bug 地址
  * `email` 邮箱地址
  > 可采用 `npm bugs` 打开此 url,`npm issues` 为其alias
* `license` 许可证,采用 [choose license](https://choosealicense.com/) 选择许可证
* `author` 作者信息字段,可以采用 `作者名 <邮箱> (主页)` 的方式描述,也可拆分为如下字段
  * `name` 作者名
  * `email` 邮箱
  * `url` 主页
* `contributors` 设置贡献者,采用数组模式
* `files` 需要纳入 `npm publish` 的文件列表,配合 `.npmignore` 使用,支持`glob` 模式
* `main` `require` 导入模块的入口文件配置
* `browser` `require` 浏览器端入口
* `bin` cli 工具入口
  * 若只有路径则 `name` 作为命令名
  * 若为 `bin:{key:value}` 格式则 key 为命令名
  * 全局命令安装在 `${prefix}/bin`
  * 本地命令安装在 `node_modules/bin`
  * 本地命令安装在 `node_modules/bin`
  * 5.2 版本使用 `npx` 运行命令
* `man` 设置 `man <package>` 的文档地址
  * 详见 [man](https://docs.npmjs.com/files/package.json.html#man)
* `directories` 设定符合 commonjs 的目录的地址,包含如下配置
  * `lib` 库目录路径
  * `bin` 二进制目录路径
  * `man` man 文档目录路径
  * `doc` 项目文档目录路径
  * `example` 项目范例目录路径
  * `test` 项目测试目录路径
* `repository` 仓库地址,可采用 `npm repo` 打开,进一步支持如下配置项
  * `type` 仓库类型 `svn` 或 `git`
  * `url` 仓库地址
  * `directory` 若为子目录则配置此项
* `scripts` 包的钩子及自定义脚本
  * 详见 [npm scripts](https://docs.npmjs.com/misc/scripts)
* `config` 设定运行配置,npm 脚本能运行时可通过 `npm_package_config_*` 的方式访问
* `dependencies` 包的生产依赖
  * 包支持各种模式,包括本地包
  * 注意版本控制
* `devDependencies` 包的开发依赖
* `peerDependencies` 包的运行依赖
  * 可以参考 [Peer Dependencies](https://nodejs.org/es/blog/npm/peer-dependencies/) 进行理解
* `bundledDependency` 包的绑定说明,需完善
* `optionalDependencies` 包的生产依赖的可选包
* `engines` 说明包运行的 nodejs 限制,支持版本限定描述符,支持如下字段
  *  `node` 版本说明
  *  `npm` 版本说明
  > 默认不符合会抛出警告,配置 `engine-strict = true` 会报错
* `os` 设置包支持的平台
  > 采用数组列出,支持 `!` 取反
* `cpu` 设置包支持的 cpu 架构
  > 配置规则同 os
* `private` 设为 true 后,无法采用 `publish` 发布
* `private` 设为 true 后,无法采用 `publish` 发布 npm  registry 除非设定了特定的 `registry`
* `publishConfig` 设置包发布的配置
  > 详细配置参见 [npm config](https://docs.npmjs.com/misc/config)

> 此外还可以包含用户自定义的任何字段,当使用  `npm-scripts`  运行时配置可从 `process.env` 中获取