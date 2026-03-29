# npm browser 字段

> 指定包的浏览器端入口文件，当打包工具构建浏览器版本时使用。

## 1. 作用

`browser` 字段用于告诉打包工具（如 webpack、rollup、browserify）该包的**浏览器端入口文件**是什么。

当打包工具构建 Node.js 版本时使用 `main` 字段指定的文件，而当构建**浏览器版本**时，会优先使用 `browser` 字段指定的文件。

## 2. 格式一：字符串（单入口）

最简单的形式，直接指定浏览器端的入口文件路径。

```json
{
  "name": "my-package",
  "main": "dist/index.cjs.js",
  "browser": "dist/index.browser.js"
}
```

适用场景：包在 Node.js 和浏览器端共用同一套代码，只是入口文件不同。

## 3. 格式二：对象（多环境映射）

对象格式可以针对不同的模块路径进行精确映射，常用于：

- 替换 Node.js 特有模块（如 `fs`、`path`、`net`）
- 提供浏览器端的 polyfill 或 mock
- 针对不同构建目标使用不同实现

### 3.1 替换整个包的入口

```json
{
  "main": "dist/index.cjs.js",
  "browser": "dist/index.browser.js"
}
```

### 3.2 替换特定子模块

```json
{
  "name": "react-dom",
  "main": "index.js",
  "browser": {
    "./server.js": "./server.browser.js"
  }
}
```

react-dom 使用此方式，当在浏览器环境时，`require('react-dom/server')` 会被替换为 `require('react-dom/server.browser')`。

### 3.3 多环境映射（browser field spec）

browser field spec 引入了 `browser`、`default`、`module` 三个键：

```json
{
  "name": "my-package",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "browser": {
    "module": "dist/index.esm.browser.js",
    "default": "dist/index.umd.js"
  }
}
```

含义：

| 字段 | 含义 |
|------|------|
| `module` | ESM 格式的浏览器入口（供支持 ESM 的打包工具使用） |
| `default` | UMD/普通格式的浏览器入口（兜底） |

> 注意：`module` 字段并非 npm 标准字段，而是打包工具社区约定俗成的字段。

## 4. 与 main/exports 的区别

| 字段 | 作用环境 | 标准化程度 | 打包工具支持 |
|------|----------|------------|--------------|
| `main` | Node.js | npm 标准 | 所有打包工具 |
| `browser` | 浏览器 | 非官方标准，browser field spec | webpack、rollup、browserify |
| `exports` | Node.js / 浏览器 | npm 官方标准（9+) | 现代打包工具 |

### 配合使用示例

```json
{
  "name": "isomorphic-fetch",
  "main": "dist/node-fetch.cjs.js",
  "browser": "dist/browser-fetch.js",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "browser": "./dist/browser/index.js"
    }
  }
}
```

当同时存在 `exports` 和 `browser` 时：
- **现代打包工具**（webpack 5+、rollup 3+）优先使用 `exports`
- **旧版打包工具**（webpack 4、browserify）会fallback 到 `browser`

## 5. webpack 中的应用

webpack 会读取 `browser` 字段来决定模块解析：

```js
// webpack.config.js
module.exports = {
  // target 设为 web（默认），webpack 会使用 browser 字段
  target: 'web',
  resolve: {
    // 通过 alias 直接替换
    alias: {
      // 等同于 browser 字段的作用
      'fs': false,  // 在浏览器中不可用
    }
  }
}
```

### webpack 如何解析 browser 字段

webpack 解析顺序（以 `import 'pkg/subpath'` 为例）：

```
1. 检查 exports 字段（package.json exports）
2. 检查 browser 字段（browser field spec）
3. 检查 main 字段
4. 查找 index.js
```

## 6. rollup 中的应用

rollup 通过 `@rollup/plugin-node-resolve` 支持 `browser` 字段：

```js
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyBundle'
  },
  plugins: [
    resolve({
      // 优先使用 browser 字段
      browser: true
    })
  ]
};
```

设置 `browser: true` 后，rollup 会优先解析 `browser` 字段指定的文件。

## 7. browserify 中的应用

browserify 是最早支持 `browser` 字段的打包工具，也是 browser field spec 的提出者。

```bash
# browserify 会自动读取 package.json 的 browser 字段
browserify index.js -o bundle.js
```

如果模块 B 声明了 `"browser": "dist/b.js"`，则 `require('B')` 会被解析为 `dist/b.js`。

## 8. browser field spec 核心要点

browser field spec（由 substack 提出，详见 [gist](https://gist.github.com/defunctzombie/4339901)）的核心规则：

1. **字段值为字符串**：直接作为浏览器端入口
2. **字段值为对象**：键为模块路径，值为替换路径
3. **值为 `false`**：表示该模块在浏览器中不可用，打包时会抛出错误或被忽略
4. **值为对象且包含 `default`**：`default` 作为兜底入口，`module` 供 ESM 环境使用

### 示例：替换 Node.js 模块

```json
{
  "name": "my-pkg",
  "main": "index.js",
  "browser": {
    "fs": false,
    "path": "./browser/path.js",
    "net": "./browser/net.js"
  }
}
```

在浏览器构建时，`require('fs')` 会被替换为 `false`（不可用），而 `require('path')` 会使用 `./browser/path.js`。

## 9. 实际案例：react-dom

react-dom 的 package.json 展示了 `browser` 字段的实际应用：

```json
{
  "name": "react-dom",
  "main": "index.js",
  "browser": {
    "./server.js": "./server.browser.js",
    "./unstable-fizz.js": "./unstable-fizz.browser.js"
  }
}
```

这样当在浏览器中使用 `require('react-dom/server')` 时，会实际加载 `server.browser.js` 而非 `server.js`。

## 10. 总结

- `browser` 字段是浏览器端打包的入口声明，非 npm 官方标准但是事实标准
- 字符串格式适用于简单场景，对象格式适用于需要精确替换子模块的场景
- 现代项目推荐**同时配置 `exports` 和 `browser`**：`exports` 供现代打包工具使用，`browser` 作为向后兼容
- 理解 `browser` 字段有助于解决「包在 Node.js 正常但在浏览器报错」的问题
