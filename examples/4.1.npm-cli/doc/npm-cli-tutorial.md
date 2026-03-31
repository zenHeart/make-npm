# npm 编写命令行工具完整教程

> 通过 `bin` 字段和 npm 生态构建可全局执行的命令行工具

---

## 目录

- [一、核心机制](#一核心机制)
- [二、快速开始](#二快速开始)
- [三、commander.js 完整指南](#三commanderjs-完整指南)
- [四、chalk 终端彩色输出](#四chalk-终端彩色输出)
- [五、inquirer 交互式提示](#五inquirer-交互式提示)
- [六、完整项目模板](#六完整项目模板)
- [七、调试与发布](#七调试与发布)
- [八、最佳实践](#八最佳实践)

---

## 一、核心机制

### 1.1 bin 字段原理

`package.json` 的 `bin` 字段建立**命令名 → 入口文件**的映射：

```json
{
  "name": "my-cli",
  "bin": {
    "mycli": "./bin/mycli.js"
  }
}
```

当全局安装时（`npm install -g`），npm 会：
1. 读取 `bin` 字段
2. 创建符号链接到系统命令路径（如 `/usr/local/bin/mycli`）
3. 自动添加 shebang 执行权限

### 1.2 Shebang

入口文件顶部必须添加 shebang：

```js
#!/usr/bin/env node
// 入口文件内容...
```

作用：告诉操作系统用 `node` 解释器执行此脚本。

### 1.3 本地调试

```bash
# 方式一：在项目目录执行（推荐开发阶段）
npm link
# 取消 link
npm unlink

# 方式二：直接软链接
ln -s $(pwd)/bin/mycli.js /usr/local/bin/mycli

# 方式三：使用 npx（无需安装）
npx mycli create foo
```

---

## 二、快速开始

### 2.1 创建项目

```bash
mkdir my-cli && cd my-cli
npm init -y
```

### 2.2 目录结构

```
my-cli/
├── bin/
│   └── mycli.js       # 入口文件（shebang + commander）
├── lib/
│   └── create.js      # 命令实现逻辑
├── package.json
└── README.md
```

### 2.3 package.json 配置

```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "description": "我的 CLI 工具",
  "main": "index.js",
  "bin": {
    "mycli": "./bin/mycli.js"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "dependencies": {
    "commander": "^11.0.0",
    "chalk": "^4.1.2",
    "inquirer": "^8.0.0"
  }
}
```

### 2.4 入口文件模板

```js
#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')

// 版本（通常从 package.json 读取）
program.version(require('../package.json').version)

// 子命令：create
program
  .command('create <name>')
  .description('创建一个新项目')
  .option('-t, --template <type>', '项目模板', 'default')
  .action((name, options) => {
    console.log(chalk.green(`Creating ${name} with template ${options.template}`))
    // 调用 lib/create.js
  })

// 帮助信息
program.on('--help', () => {
  console.log()
  console.log('Examples:')
  console.log(`  $ mycli create my-app ${chalk.gray('# 创建新项目')}`)
})

program.parse(process.argv)
```

---

## 三、commander.js 完整指南

### 3.1 基本用法

```js
const { program } = require('commander')

program
  .name('mycli')
  .version('1.0.0')
  .usage('<command> [options]')
  .description('我的 CLI 工具')

program.parse()
```

### 3.2 选项类型

| 类型 | 示例 | 说明 |
|------|------|------|
| 布尔 | `--debug` | `program.debug === true` |
| 值 | `-n <name>` | `program.name === 'xxx'` |
| 默认值 | `-p 3000` | 可省略值 |
| 多个值 | `-o <a> <b>` | 转为数组 |
| 变长 | `-o <files...>` | 无限多值 |

```js
// 布尔选项
program.option('-d, --debug', 'enable debug mode')
// 带值选项
program.option('-n, --name <name>', 'project name', 'default-name')
// 数字选项
program.option('-p, --port <number>', 'port number', Number, 3000)
// 多种值选项
program.option('-o, --option <items...>', 'multiple values')
// 可选值（带方括号表示值可选）
program.option('-c, --config [path]', 'config file path')
```

### 3.3 子命令

```js
// 方式一：链式调用（适用于简单命令）
program
  .command('init')
  .description('初始化项目')
  .action(() => { /* ... */ })

// 方式二：独立文件（适用于复杂命令）
program
  .command('create <project>', { isDefault: true })
  .description('创建新项目')
  .option('-t, --template <type>', '模板类型')
  .action((project, options) => { /* ... */ })

// 方式三：addEventListener（监听帮助选项）
program.command('build')
  .option('-p, --prod', 'production build')
  .on('--help', () => {
    console.log('\nExamples:')
    console.log('  $ mycli build --prod')
  })
  .action(() => { /* ... */ })
```

### 3.4 参数验证

```js
program
  .command('install <package>')
  .option('-S, --save', 'add to dependencies')
  .action((pkg, options) => {
    if (!pkg) {
      console.error(chalk.red('Error: package name is required'))
      process.exit(1)
    }
    // ...
  })

// 自定义验证
program
  .command('serve <port>')
  .validate(({ port }) => {
    if (port < 1 || port > 65535) {
      return chalk.red('Port must be between 1 and 65535')
    }
    return true
  })
  .action(({ port }) => {
    console.log(`Starting server on port ${port}`)
  })
```

---

## 四、chalk 终端彩色输出

### 4.1 基础用法

```js
const chalk = require('chalk')

console.log(chalk.red('Error!'))
console.log(chalk.green('Success!'))
console.log(chalk.blue('Info'))
console.log(chalk.yellow('Warning'))
```

### 4.2 组合样式

```js
// 链式调用
console.log(chalk.red.bold('Error:'))
console.log(chalk.blue.underline('https://example.com'))

// 背景色
console.log(chalk.white.bgRed(' Error '))
console.log(chalk.black.bgYellow(' Warning '))

// 模板字符串
const name = 'World'
console.log(chalk`Hello {green ${name}}!`)

// 多重样式
console.log(chalk.cyan | chalk.white.bold('Status:'))
```

### 4.3 常用样式

| 方法 | 效果 | 方法 | 效果 |
|------|------|------|------|
| `bold` | 加粗 | `dim` | 暗淡 |
| `italic` | 斜体 | `underline` | 下划线 |
| `strikethrough` | 删除线 | `hidden` | 隐藏 |
| `red` | 红色 | `green` | 绿色 |
| `blue` | 蓝色 | `yellow` | 黄色 |
| `cyan` | 青色 | `magenta` | 品红 |
| `white` | 白色 | `gray` | 灰色 |

### 4.4 动态颜色（多主题支持）

```js
const themes = {
  light: {
    error: chalk.red,
    success: chalk.green,
    info: chalk.blue
  },
  dark: {
    error: chalk.keyword('orange'),
    success: chalk.keyword('lime'),
    info: chalk.cyan
  }
}

const theme = themes[process.env.THEME] || themes.light
console.log(theme.error('Error message'))
```

---

## 五、inquirer 交互式提示

### 5.1 安装

```bash
npm i inquirer
```

### 5.2 基础用法

```js
const inquirer = require('inquirer')

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '项目名称：',
      default: 'my-app'
    },
    {
      type: 'list',
      name: 'template',
      message: '选择模板：',
      choices: ['React', 'Vue', 'Angular', 'Vanilla']
    },
    {
      type: 'confirm',
      name: 'install',
      message: '是否安装依赖？',
      default: true
    }
  ])
  console.log(answers)
}
```

### 5.3 输入类型

| 类型 | 用途 | 关键配置 |
|------|------|----------|
| `input` | 文本输入 | `default`, `validate`, `filter` |
| `number` | 数字输入 | `validate`（检查数字范围） |
| `confirm` | 是/否确认 | `default`（true/false） |
| `list` | 单选列表 | `choices` |
| `rawlist` | 数字索引单选 | `choices` |
| `checkbox` | 多选列表 | `choices`, `checked` |
| `password` | 密码输入 | `mask`（遮掩字符） |
| `editor` | 启动编辑器 | `postfix`（文件扩展名） |

### 5.4 高级用法

```js
// 密码输入
{
  type: 'password',
  name: 'token',
  message: '输入 GitHub Token：',
  mask: '*'
}

// 多选
{
  type: 'checkbox',
  name: 'features',
  message: '选择功能（多选）：',
  choices: [
    'TypeScript',
    'ESLint',
    'Prettier',
    { name: 'Vitest', checked: true }
  ]
}

// 动态 choices（基于前一个答案）
{
  type: 'list',
  name: 'framework',
  message: '选择框架：',
  choices: async (answers) => {
    const repos = await fetchRepos(answers.org)
    return repos.map(r => r.name)
  }
}

// 验证
{
  type: 'input',
  name: 'email',
  message: '输入邮箱：',
  validate: (value) => {
    const pass = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    if (pass) return true
    return '请输入有效的邮箱地址'
  }
}
```

### 5.5 交互式选择器（List）

```js
// 复杂交互示例
{
  type: 'list',
  name: 'action',
  message: '选择操作：',
  choices: [
    { name: '🚀 创建新项目', value: 'create' },
    { name: '📦 安装依赖', value: 'install' },
    { name: '🔧 配置项目', value: 'config' },
    new inquirer.Separator('--- 其他 ---'),
    { name: '❌ 退出', value: 'exit' }
  ]
}
```

---

## 六、完整项目模板

### 6.1 入口文件（bin/mycli.js）

```js
#!/usr/bin/env node

const { program } = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const create = require('../lib/create')
const pkg = require('../package.json')

program.name('mycli').version(pkg.version)

program
  .command('create <name>')
  .description('创建一个新项目')
  .option('-t, --template <type>', '项目模板', 'default')
  .option('-p, --port <port>', '端口号', Number, 3000)
  .action(async (name, options) => {
    try {
      // 交互式确认
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `确认创建项目 ${chalk.cyan(name)}？`,
          default: true
        }
      ])
      if (!confirm) {
        console.log(chalk.yellow('已取消'))
        return
      }
      await create(name, options)
      console.log(chalk.green('✅ 项目创建成功！'))
    } catch (error) {
      console.error(chalk.red('❌ 创建失败：'), error.message)
      process.exit(1)
    }
  })

// 配置命令
program
  .command('config')
  .description('查看/修改配置')
  .option('-g, --get <key>', '获取配置项')
  .option('-s, --set <key> <value>', '设置配置项')
  .action((options) => {
    // 实现配置管理
  })

program.on('--help', () => {
  console.log()
  console.log('Examples:')
  console.log(`  $ mycli create my-app ${chalk.gray('# 创建项目')}`)
  console.log(`  $ mycli config --get user.name ${chalk.gray('# 查看配置')}`)
})

program.parse()
```

### 6.2 核心逻辑（lib/create.js）

```js
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

async function create(name, options) {
  const { template, port } = options
  const targetDir = path.resolve(process.cwd(), name)

  // 1. 检查目录是否存在
  if (fs.existsSync(targetDir)) {
    throw new Error(`目录 ${name} 已存在`)
  }

  // 2. 创建项目目录
  console.log(chalk.blue('📁 创建项目目录...'))
  fs.ensureDirSync(targetDir)

  // 3. 生成文件
  console.log(chalk.blue('📝 生成文件...'))
  const templateDir = path.join(__dirname, `../templates/${template}`)
  await fs.copy(templateDir, targetDir)

  // 4. 更新 package.json
  const pkg = fs.readJsonSync(path.join(targetDir, 'package.json'))
  pkg.name = name
  pkg.port = port
  fs.writeJsonSync(path.join(targetDir, 'package.json'), pkg, { spaces: 2 })

  return targetDir
}

module.exports = create
```

---

## 七、调试与发布

### 7.1 本地调试

```bash
# 方式一：npm link（推荐）
cd my-cli
npm link
# 取消
npm unlink

# 方式二：使用 cross-env 设置环境变量
cross-env DEBUG=my-cli:* mycli create app

# 方式三：VSCode 调试
# .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [{
    "type": "node",
    "runtimeExecutable": "${workspaceFolder}/bin/mycli.js",
    "args": ["create", "my-app"],
    "console": "integratedTerminal"
  }]
}
```

### 7.2 调试输出

```js
const debug = require('debug')
const log = debug('mycli:create')
const error = debug('mycli:error')

log('Creating project: %s', name)
error('Failed: %O', err)

// 使用：DEBUG=mycli:* node bin/mycli.js create app
```

### 7.3 发布到 npm

```bash
# 1. 登录
npm login

# 2. 检查 package.json
# 确保 name、version、description 正确
# 确保 bin 字段正确

# 3. 发布（打标签）
npm version patch  # 1.0.0 -> 1.0.1
npm publish       # 发布到 npm
npm publish --tag beta  # 发布测试版

# 4. 验证
npm view my-cli   # 查看包信息
npm install -g my-cli  # 全局安装测试
```

### 7.4 README 编写

```bash
# 安装 standard-version 自动生成 CHANGELOG
npm i -D standard-version

# 生成 CHANGELOG
npx standard-version

# 发布
git tag v1.0.0
git push origin v1.0.0
npm publish
```

---

## 八、最佳实践

### 8.1 错误处理

```js
// lib/utils.js
const chalk = require('chalk')

function error(message, details) {
  console.error(chalk.red('Error:'), message)
  if (details) {
    console.error(chalk.gray(details))
  }
  process.exit(1)
}

function warn(message) {
  console.log(chalk.yellow('⚠️  Warning:'), message)
}

function success(message) {
  console.log(chalk.green('✅'), message)
}

module.exports = { error, warn, success }
```

### 8.2 版本检查

```js
const semver = require('semver')
const pkg = require('../package.json')

function checkNodeVersion() {
  const required = pkg.engines.node
  if (!semver.satisfies(process.version, required)) {
    console.error(
      chalk.red(`Node.js 版本不满足要求。`) +
      chalk.blue(`\n要求版本：${required}`) +
      chalk.gray(`\n当前版本：${process.version}`)
    )
    process.exit(1)
  }
}
checkNodeVersion()
```

### 8.3 进度条

```js
const chalk = require('chalk')

function progress(current, total, message) {
  const percent = Math.round((current / total) * 100)
  const bar = '█'.repeat(Math.round(percent / 5)) + '░'.repeat(20 - Math.round(percent / 5))
  process.stdout.write(`\r${chalk.cyan(bar)} ${percent}% ${message}`)
  if (current === total) {
    console.log()
  }
}

// 使用
for (let i = 0; i <= 100; i += 10) {
  progress(i, 100, '安装依赖')
}
```

### 8.4 检查更新

```js
const { execSync } = require('child_process')
const chalk = require('chalk')

async function checkUpdate(pkgName, currentVersion) {
  try {
    const latest = execSync(`npm view ${pkgName} version`, { encoding: 'utf8' }).trim()
    if (latest !== currentVersion) {
      console.log(
        chalk.yellow(`⚠️  发现新版本 ${pkgName}@${latest}（当前 ${currentVersion}）`)
      )
      console.log(`   运行 ${chalk.cyan(`npm i -g ${pkgName}`)} 更新`)
    }
  } catch (e) {
    // 忽略错误
  }
}
```

### 8.5 命令自动补全（Bash/Zsh）

```js
// 添加到入口文件末尾
if (process.argv[2] === 'completion') {
  const { complete } = require('commander')
  complete(program, (partial, argv) => {
    // 返回可能的补全选项
    if (argv.length === 0) return ['create', 'config', 'help']
    return []
  })
  return
}
```

---

## 相关资源

- commander 文档: https://github.com/tj/commander.js
- chalk 文档: https://github.com/chalk/chalk
- inquirer 文档: https://github.com/SBoudrias/Inquirer.js
- npm bin 字段: https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin
