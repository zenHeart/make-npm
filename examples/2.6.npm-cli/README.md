## 验证 npm 的常用命令


## 构建命令
* `npm init` 初始化 `package.json`
* `npm ci` 用于持续集成,好于 `npm install`,详见 <https://docs.npmjs.com/cli/ci.html>
* `npm publish` 发布包
* `npm run-script` 发布包
* `npm shrinkwrap` 发布包
* `npm install` 安装包
* `npm uninstall` 删除包
* `npm update` 升级包
* `npm version` 修改包版本

## 配置命令
* `npm config` 配置选项
* `npm owner` 添加维护者
* `npm dist-tag` 打标签
* `npm hook` 实现观察某个仓库的变化
* `npn prefix` 显示初始模块安装目录
* `npm profile` 设置 registry 信息
* `npm root` 显示模块安装路径
* `npm whoami` 显示用户信息

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


## 存疑命令
*  [ ] `npm build` ?
*  [ ] `npm rebuild` 重新编译 c++ 插件
*  [ ] `npm cache` 控制本地缓存
*  [ ] `npm completion` 控制本地缓存
*  [ ] `npm dedupe` 精简包结构
*  [ ] `npm prune` 删除无关宝
*  [ ] `npm edit` 编辑安装的模块
*  [ ] `npm explore` 在安装的模块中执行命令
*  [ ] `npm restart` 不清楚
*  [ ] `npm team` 
*  [ ] `npm star` 不清楚
*  [ ] `npm unstar` 不清楚
*  [ ] `npm stars` 不清楚