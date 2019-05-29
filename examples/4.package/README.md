# 详解 package.json
* `name` 包名
* `version` 版本,语义化
* `description`  描述,用于 `npm search`
* `keywords`  关键字,用于 `npm search`
* `homepage`  项目主页
* `bugs` bug 地址,用于 `npm bugs`
  * `url` bug 地址
  * `email` bug  email 地址
* `licenses` 许可证
* `author` 作者
* `maintainers` 维护者
* `contributors` 贡献者
* `email` 作者邮箱
* `url` 作者主站
* `url` 作者主站
* `files` 指定包所包含的文件,默认为所有,有一些文件不会忽略,详见 [文件忽略](https://docs.npmjs.com/files/package.json.html#files)
* `main` 指定模块 id 入口文件
* `browser` 在浏览器端使用的入口文件,告知用户浏览器端使用方式
* `bin` 二进制入口文件,创建键对应的符号链接指向入口文件,若不采用键值对则使用 name 作为符号链接
* `man` 命令行的 man 手册,详见 <https://docs.npmjs.com/files/package.json.html#files>
* `directories` commonjs 包目录结构
  * `lib` 库文件地址
  * `bin` 二进制目录
  * `man` man 目录
  * `doc` 文档目录
  * `example` 示例目录
  * `test` 测试目录
* `repository` 仓库地址,注意 **monorepo** 结构对应地址采用 `directory` 指定
* `scripts` 运行脚本,默认值为 `{"start": "node server.js"}`,若有 `binding.gyp` 默认会编译
* `config`  参数,会转换为 `npm_package_config_<键名>`
* `dependencies` 生产依赖包,重点支持
  * `registry` 中的包
  * git 地址中的包,支持 has 值
  * 本地包,支持离线开发
  > 详见 <https://docs.npmjs.com/files/package.json.html#dependencies>
* `devDependencies` 开发依赖
* `peerDependencies` 若依赖
* `bundleDependencies` 捆绑依赖
* `optionalDependencies` 替代包,当依赖无法正常安装时
* `engines` 指定支持的 node 和 npm 版本
* `os` 指定支持的 os 版本,清单由 `process.platform`  确定
* `cpu` 指定支持的 cpu,由 `process.arch`  确定,
* `private` 组织提交到 public 对于私有包很重要
* `publishConfig` 发布参数的配置
