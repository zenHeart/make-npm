# npm scripts
详细讲解 npm scripts 的使用技巧

## 内置钩子
npm 内置一系列钩子,在触发运行特定的 npm 命令时会触发,
详细资料参见 [npm scripts](https://docs.npmjs.com/misc/scripts) 
这里按照类型和执行顺序描述如下(排在前面的钩子先执行)
### 发布钩子
当发布包是时触发,虽然有些钩子有其他触发条件,
但是整个钩子是为发布服务的

* `prepublish` 打包发布之前,用于执行一些预编译操作,触发条件包括
  * `npm i` 不携带任何参数
  * `npm pack` 手动打包触发
  * `npm publish` 触发
* `prepare` 触发条件同上
* `prepublishOnly` 触发条件为
  * `npm publish`
* `prepack` 打包之前,触发条件
  * `npm pack` 手动打包触发
  * `npm publish`触发
* `postpack` 打包之后
  * `npm pack` 手动打包触发
  * `npm publish` 触发
* `publish,postpublish` 包发布之后,触发条件
  * `npm publish`

### 安装钩子
* `preinstall` 包安装之前触发,触发条件
  * `npm i`
* `install, postinstall` 安装完成后触发,对于一些需要编译的底层模块会使用此钩子

### 卸载钩子
* `preuninstall, uninstall` 卸载之前触发此钩子
  * `npm un`
* `postuninstall`  卸载完成后触发

### 版本控制钩子
* `preversion` 修改 `packgae.json` version 字段之前触发,触发条件
  * `npm version`
* `version` 修改 `packgae.json` version 字段之后,git 提交之前触发
* `postversion` 修改 `packgae.json` version 字段之后,git 提交之后触发

### 其他工具钩子
* `pretest, test, posttest` 测试钩子,触发条件
  * `npm test`
* `prestop, stop, poststop` 停止钩子,触发条件
  * `npm stop`
* `prestart, start, poststart` 启动钩子,触发条件
  * `npm start`
* `prerestart, restart, postrestart` 重启钩子,触发条件
  * `npm restart`
* `preshrinkwrap, shrinkwrap, postshrinkwrap` 锁定钩子,触发条件
  * `npm shrinkwrap`


> 你可以结合实际情况,使用上述内置钩子完成一系列自动化动作

注意秩序保证所有的钩子为可执行文件即可,你可以采用如下方式定义钩子
确保钩子具有良好的可读性。

```json
{ 
"scripts" :
{ 
	"install" : "scripts/install.js", 
	"postinstall" : "scripts/install.js", 
	"uninstall" : "scripts/uninstall.js"
}
}
```

若期望安装任何包时均触发上述钩子,在 `node_modules/.hooks/{eventname}` 配置钩子即可

> 确保 {eventname} 为可执行文件


## 自定义脚本
npm 除了为内置命令提供了丰富的钩子,`scripts` 对自定义脚本也支持钩子,例如运行 `npm run custom` 会输出如下内容

```
...
> echo preCustom
preCustom
...
> echo custom
custom
...
> echo postcustom
postcustom
```

可以看到对于自定义的脚本 `scripts` 提供了 `pre<脚本名>` 和 `post<脚本名>` 的钩子

> **注意使用时该钩子区分大小写!!!**

可以利用 `--` 向自定一脚本传参运行 `npm run custom -- 自定义参数` 在观察输出


如果存在一类自定义脚本采用 `xx:xx` 的方式组织,例如 

```json
{
	"scripts":{
		"docs:build":"xxx",
		"docs:deploy":"xxx"
	}
}
```

## 环境变量
使用 `node index.js` 和 `npm start` 的区别在于,npm 帮助你预加载了大量的环境变量,典型的特性如下:

1. 会在 `PATH` 中添加当前 `node_modules/.bin` 目录,方便你引用本地命令行工具
2. 会将 `npmrc` 上的所有配置加载到为 `npm_config_xxx` 的变量,你也可以利用 `process.env` 进行使用
3. `package.json` 中的配置会以 `npm_package_xxx` 的方式存在
4. npm 提供了 `npm_lifecycle_event` 环境变量,来显示当前处于哪一个运行钩子



## 其他技巧
npm scripts 虽然方便,但是由于 `package.json` 无法添加注释,对于复杂脚本,建议放置在 `scripts` 目录然后在
`package.json` 中进行引用,如果需要更复杂的进程控制,推荐使用如下包

* [nps](https://www.npmjs.com/package/nps) 利用 js 管理 `package.json` 的 scripts ,利于添加注释和进行进程控制
* forever,supervisor,pm2 等为进程管理工具,用于控制 js 的运行,部署等事宜,酌情使用
