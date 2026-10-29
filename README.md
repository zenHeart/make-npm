# 创建 NPM 包

该教程讲解如下知识

1. NPM 的基本架构
2. NPM 的配置及命令行
3. 如何开发 NPM 包
   1. 命令行包
   2. 同构包
   3. monorepo 包
4. NPM 最佳实践


项目演示 PPT 采用 [reveal.js](https://www.npmjs.com/package/reveal.js) 使用 webpack 进行编译.

构建环境需要 Node.js 18.12 或更高版本，首次运行先执行 `npm install`。
主题样式在 `template.pug` 中配置，演示插件在 `index.js` 中注册。

常用命令如下

```bash
# 本地开发模式,局域网可访问
npm run ppt
# 本地编译
npm run ppt:build
# 校验章节、静态资源和开发服务
npm run ppt:test
# 部署编译结果到 github pages
npm run ppt:deploy
```


