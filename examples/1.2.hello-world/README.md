# hello world
验证 npm 发布,执行如下命令

## 首次发布
```bash
# 创建 npm 账户并登陆
npm adduser --registry <url>

# 验证登录成功
npm whoami --registry <url>

# 进入范例 examples/1.2.hello-world 
# 修改 name,author 字段后发布包
npm publish --registry <url>
```

> 若登录失败下次采用 `npm login` 登录
> **注意 login 是 adduser 的 alias**

## 修改后发布
修改 [](./index.js#L2) 导出方法名 `hello` 为 `hi`
执行如下语句

```bash
# 升级补丁版本
npm version patch
# 发布
npm publish
```
