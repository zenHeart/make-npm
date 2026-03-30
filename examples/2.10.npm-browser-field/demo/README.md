# browser 字段演示

本目录包含两个对比示例包：

## 目录结构

```
demo/
├── with-browser/          # 有 browser 字段的包
│   ├── package.json
│   └── src/
│       ├── index.js       # 统一入口
│       ├── browser-entry.js  # 浏览器专用入口
│       └── node-entry.js  # Node.js 专用入口
└── without-browser/       # 没有 browser 字段的包
    ├── package.json
    └── src/
        └── index.js       # 唯一的入口文件
```

## 运行方式

1. 安装依赖：

```bash
cd with-browser
npm install

cd ../without-browser
npm install
```

2. 使用 webpack 打包并观察差异：

```bash
# 打包 with-browser（会使用 browser 字段）
npx webpack with-browser/src/index.js with-browser/dist/bundle.js

# 打包 without-browser（使用 main 字段）
npx webpack without-browser/src/index.js without-browser/dist/bundle.js
```

## 关键差异

| 特性 | with-browser | without-browser |
|------|--------------|-----------------|
| Node.js 环境 | 使用 node-entry.js | 使用 index.js |
| 浏览器环境 | 使用 browser-entry.js | 使用 index.js |
| main 字段 | src/index.js | src/index.js |
| browser 字段 | src/browser-entry.js | 无 |

## 验证结果

查看打包后的 bundle 内容：

```bash
# 查看 with-browser 的打包结果
cat with-browser/dist/bundle.js | grep "getEnv"

# 查看 without-browser 的打包结果
cat without-browser/dist/bundle.js | grep "getEnv"
```

- `with-browser` 的 bundle 中 `getEnv` 返回 `'browser'`
- `without-browser` 的 bundle 中 `getEnv` 返回 `'node (no browser field)'`
