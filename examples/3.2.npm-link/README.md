# npm link
在本地进行包开发时期望能够实时使用该包进行验证。
此时可以采用 `npm link` 创建一个包的软连接来验证包的使用

这里假设 package1 为正在开发的包,local-use 为使用本地包的应用。
则执行如下操作

```bash
# 进入 package 包的目录
cd package1
# 创建该包的全局链接,此命令会在 `npm root -g` 的目录创建指向当前目录的软链接
npm link
# 进入 local-use 目录
cd local-use
# 创建链接该全局包的软链接,此处会在 local-use 路径创建指向全局包的软链接
npm link package1
# 运行 index.js,此时即可实时调试本地包
npm run start
```

> 上述流程可简化为,直接进入 local-use 目录直接执行 `npm link ../package1` 即可,该命令会自动执行全局连接和本地连接流程


命令行工具也可如此使用,执行如下命令

```bash
# 进入包2
cd package2
# 该命令会自动将 bin 下的命令以短链接的方式连接到 `npm bin -g` 对应的路径 
npm link
# 此时进入任意目录,运行 _echo 
_echo hello world
```

> 你可尝试修改 package2 中的任意内容,由于是软链接目录会同步修改

你可以用 `npm unlink` 取消上述链接操作。

更详细的使用参见 [npm link](https://docs.npmjs.com/cli/link)

此外为了验证本地包的打包效果可使用 `npm pack` 创建打包文件。
也可利用 `npm pack --dry-run`  查看打包内容。