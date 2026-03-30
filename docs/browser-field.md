# package.json browser 字段详解

> browser 字段用于指定包的浏览器端入口文件，让打包工具在构建浏览器版本时使用正确的文件。

## 1. browser 字段的作用

browser 字段解决了一个核心问题：**同一 npm 包在 Node.js 和浏览器环境中需要不同的入口文件**。

```
场景：
- 你发布的包有 Node.js 版本（使用 fs/path 模块）
- 也有浏览器版本（使用 fetch/window）
- browser 字段告诉打包工具："这是浏览器端应该用的文件"
```

## 2. 基本语法

### 2.1 字符串格式（单入口）

```json
{
  "name": "my-package",
  "main": "dist/index.cjs.js",
  "browser": "dist/index.browser.js"
}
```

### 2.2 对象格式（多文件映射）

```json
{
  "name": "my-package",
  "main": "dist/index.cjs.js",
  "browser": {
    "module": "dist/index.esm.js",
    "default": "dist/index.umd.js",
    "./submodule": "dist/submodule.browser.js"
  }
}
```

## 3. 字段含义

| 字段 | 作用 |
|------|------|
| `default` | 默认浏览器入口 |
| `module` | ESM 格式入口 |
| `./submodule` | 替换特定子模块 |

## 4. 使用场景

### 4.1 条件替换

```json
{
  "browser": {
    "fs": false,
    "path": false,
    "./internal": "dist/internal.browser.js"
  }
}
```

- 设置为 `false`：告诉打包工具这个模块在浏览器中不存在
- 字符串值：替换为指定的文件

### 4.2 完整示例

```json
{
  "name": " универсальный-pkg",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "browser": {
    "module": "dist/index.browser.esm.js",
    "default": "dist/index.browser.umd.js"
  }
}
```

## 5. 与 main/exports 的区别

| 字段 | 用途 | 优先级 |
|------|------|--------|
| `main` | Node.js 默认入口 | 最低 |
| `module` | ESM 格式入口 | 中 |
| `exports` | 条件导出（最新） | 最高 |
| `browser` | 浏览器专用入口 | 特殊 |

```json
{
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "browser": "dist/browser/index.js",
  "exports": {
    "import": "dist/esm/index.js",
    "require": "dist/cjs/index.js"
  }
}
```

## 6. 浏览器环境检测

打包工具会根据构建目标判断是否使用 browser 字段：

```javascript
// webpack 使用 browser 字段的条件：
// 1. target 为 web
// 2. 或者明确配置了 browser target

// 示例：webpack 配置
module.exports = {
  resolve: {
    // 优先使用 browser 字段
    preferBrowserResolution: true
  }
};
```

## 7. 常见问题

### Q1: 同时存在 main、module、browser，优先级是什么？

```
exports > browser > module > main
```

### Q2: browser 字段在 Node.js 中会生效吗？

**不会**。browser 字段仅在打包工具构建浏览器版本时生效，Node.js 运行时仍然使用 main/exports。

### Q3: 如何在代码中检测环境？

```javascript
// ❌ 不推荐
const isBrowser = typeof window !== 'undefined';

// ✅ 推荐：使用打包工具的 tree-shaking
import fs from 'fs'; // 打包工具会自动处理
```

## 8. 参考资源

- [browser-field-spec](https://gist.github.com/defunctzombie/4339901)
- [Webpack resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolvemainfields)
- [Rollup node-resolve plugin](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
