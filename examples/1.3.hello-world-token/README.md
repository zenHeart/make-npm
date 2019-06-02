# 使用真实的 NPM
1.2 演示了如何向本地 `registry` 发布 npm 包,
实际上采用真实的 `npm` 发包过程基本相同,但是存在细微差别。

npm 存在 registry 分为用户版和企业版,此外按照包的访问权限又分为公共包和私有包,
此外为了更便于包的管理还包含,`scope` 包的概念,详细的使用权限参看此地址:
[npm 包和模块](https://docs.npmjs.com/package-scope-access-level-and-visibility)

这里会对免费的类型的包发布做介绍

> 本质上这些包都是一样的,只是存在不同类型的访问控制,使用基本一致

注意下属操作修改 `package.json` 中的 `name` 和 `author` 字段,避免由于包名重复导致无法发布

## 用户公共包
1. 创建一个 npm 账户
   * 网页注册,参看 <https://docs.npmjs.com/creating-a-new-npm-user-account>
   * 命令行注册,使用 `npm adduser`,具体参看 <https://docs.npmjs.com/cli/adduser.html>
2. 可以采用  `npm whoami` 验证自己是否登录
3. 发布包 `npm publish` 即可

可能的问题 **verify my email when I publish a package**,记得验证你的邮箱
参见 <https://github.com/npm/npm/issues/18315>

> 注意将 package.json 替换为你的个人信息!!!

下次发布流程如下:
1. 终端使用 `npm login` 登录,具体参看 <https://docs.npmjs.com/cli/adduser.html>
	> 实际上 login 是 adduser 的 alias 命令
2. 可以采用  `npm whoami` 验证自己是否登录
3. 发布包 `npm publish` 即可


## ci 发布
假设采用持续集成发布包,为了避免远程登录可采用 token 的方式自动发布,流程如下:

1. 创建发布 token,参看 <https://docs.npmjs.com/creating-and-viewing-authentication-tokens>
	*  命令 ··详见 <https://docs.npmjs.com/cli/token.html>
2. 在项目中集成 `npmrc` 配置文件，参考 <https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow>
3. `npm publish`

> ci 发布的意义在于避免输入用户名和密码

## scope 包的发布
scope 包和普通包基本相同只是携带一个 `@<scope>` 的命名空间,i