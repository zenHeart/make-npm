# zenheart-hello-world
npm 测试包

## 本地发包
1. 创建一个 npm 账户
   * 网页注册,参看 <https://docs.npmjs.com/creating-a-new-npm-user-account>
   * 命令行注册,使用 `npm adduser`,具体参看 <https://docs.npmjs.com/cli/adduser.html>
2. 终端使用 `npm login` 登录,具体参看 <https://docs.npmjs.com/cli/adduser.html>
	> 实际上 login 是 adduser 的 alias 命令

	可以采用  `npm whoami` 验证自己是否登录

3. 发布包 `npm publish` 即可

可能的问题 **verify my email when I publish a package**,记得验证你的邮箱
参见 <https://github.com/npm/npm/issues/18315>

> 注意将 package.json 替换为你的个人信息!!!

## ci 发布
1. 创建发布 token,参看 <https://docs.npmjs.com/creating-and-viewing-authentication-tokens>
	*  命令 ··详见 <https://docs.npmjs.com/cli/token.html>
2. 在项目中集成 `npmrc` 配置文件，参考 <https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow>
3. `npm publish`