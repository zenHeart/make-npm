## 验证 npm 的常用命令


## 构建命令
* `npm init` 初始化 `package.json`
* `npm ci` 用于持续集成,好于 `npm install`,详见 <https://docs.npmjs.com/cli/ci.html>
* `npm publish` 发布包
* `npm run-script` 发布包
* `npm shrinkwrap` 发布包
* `npm install` 安装包
* `npm start` 开启应用
* `npm stop` 停止应用
* `npm restart` 重启应用
* `npm uninstall` 删除包
* `npm update` 升级包
* `npm version` 修改包版本
* `npm build` 若编写 c++ 扩展,可能采用 `node-gyp` 进行编译,例如 node-sass 属于构建命令
* `npm rebuild` 重新编译


## 配置命令
* `npm config` 配置选项
* `npm owner` 添加维护者
* `npm dist-tag` 打标签
* `npm hook` 实现观察某个仓库的变化
* `npn prefix` 显示初始模块安装目录
* `npm profile` 设置 registry 信息
* `npm root` 显示模块安装路径
* `npm whoami` 显示用户信息
* `npm cache` 本地 npm 包的缓存配置
* `npm completion` 控制 npm 命令的自动补全功能
* `npm dedupe` 精简 `node_modules` 下的包结构
* `npm prune` 清理 `node_modules` 下的无用包
* `npm edit` 用于编辑本地安装的包模块
* `npm team` 团队配置
* `npm star` 类似 github star
* `npm unstar` 类似 github unstar
*  [ ] `npm explore` 在安装的模块中执行命令

## 调试命令
* `npm doctor` 检查 npm 是否正常运行
* `npm link` 方便本地调试包
* `npm pack` 打包当前内容
  * `--dry-run`  显示会打包内容


## 帮助命令
* `npm bugs <包名>` 跳转到仓库对应 bug 页面
* `npm repo <包名>` 显示仓库地址
* `npm search` 查找包
* `npm help-search <text>` 在 npm 帮助文档中查询相关信息
* `npm view <包名>` 显示包信息

