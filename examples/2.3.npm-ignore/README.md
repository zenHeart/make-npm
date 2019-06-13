# npm  ignore 的使用
利用 `.npmignore` 控制 `npm publish` 时忽略哪些文件到 registry.

详细内容参见 [npmignore](https://docs.npmjs.com/misc/developers.html#keeping-files-out-of-your-package)

## npmignore 存在

运行 `npm pack --dry-run` ,可以在发布时查看哪些文件将会打包,避免错误发布。

此外在 `package.json` 中可以利用 `files` 字段设定需要被发布的文件,该配置会覆盖 `.npmignore` 的忽略配置

在 `package.json` 中添加如下字段

```json
"files":[
	"server.js",
	"demo.js"
]
```

重新运行 `npm pack --dry-run` 可看到 `server.js` 和 `demo.js` 也被纳入发布文件中,即使被添加到了忽略配置中。

## npmignore 不存在
假设 `.npmignore` 不存在则 npm 使用 `.gitignore` 内容作为忽略文件

你可已修改 `.npmignore` 为 `.npmignore` 再运行 `npm pack --dry-run` 验证结果

> **注意若两个文件同时存在,只会采用 .npmignore 中的作为忽略内容**

有一些文件用于不会忽略,详见  [files](https://docs.npmjs.com/files/package.json.html#files)