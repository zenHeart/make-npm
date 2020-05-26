# lerna
详解 lerna 包的使用

## 基本概念
通过 ppt 理解 monorepo 的作用后
lerna 核心概念:

1. 包模式版本模式
   1. `Fixed/Locked mode` 所有包采用同样的版本管理在 `lerna.json` 进行配置
   2. `independent` 每个包独立管理版本

2. 包过滤,lerna 支持 `--scope` 过滤哪些包执行 npm 命令.例如 `lerna exec npm run hi --scope package1` 只有包 1 执行此命令

详细过滤语法参见 [scope](https://github.com/lerna/lerna/tree/master/core/filter-options)


## 快速入门
1. 初始化仓库

	```bash
	# 安装固定版本
	lerna init --exact

	# 创建一个包 package1 package2
	lerna create package1 -y
	lerna create package2 -y
	lerna create package3 -y
	```
	> 快捷执行使用 'npm run init'


2. 将 package1 添加到其他包
   
   ```bash
   # 会自动添加该包到 packeg2,package3
   lerna add package1
   ```

3. 确保先远程提交成功

   ```bash
   # 交互式发布版本
   lerna publish
   ```


## 独立版本依赖问题
当采用 `"version": "independent"` 管理依赖时。
假设内部包之间有依赖,执行 `lerna version` 会自动处理依赖之间的版本问题。
示例如下:

假设 `p1` 依赖 `p2` 则当 p2 修改时,即使 p1 没有变化,也会由于 p2 的升级
使得 `p1` 的 `package.json` 中的 `p2` 依赖自动升级从而出发 p1 包的更新。

