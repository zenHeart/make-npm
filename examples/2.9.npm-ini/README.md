# npm init
详细讲解 npm init 命令的使用技巧。


## 默认配置
直接运行 `npm init -y`,会将 `.npmrc` 中的默认作者信息填入 package.json 。
你也可以用 `npm config` 将初始化默认值写入用户配置

此外 `npm init` 支持自定义 init,只需配置 `init-module` 指向一个 `init.js` 即可.
删除 `package.json` 重新运行 `npm init` 及采用该询问初始化 `package.json`


## initializer
可以自定义 `create-xx` 的工具包用于初始化种子工程
当采用 `npm init xx` 时会出现等同于执行 `npx create-xx` 命令,映射关系如下

* npm init foo -> npx create-foo
* npm init @usr/foo -> npx @usr/create-foo
* npm init @usr -> npx @usr/create

尝试执行如下命令

```bash
# 等效为 npx init create-html ,该命令会创建一个 index.html
npm init html 
# 创建多个 html 模板 index1 index2 index10
npm init html index{1..10}
```

自定义 `create-xx` 的 npm 包后续你面可以使用 `npm init xx` 的方式创建属于自己的模板工程了