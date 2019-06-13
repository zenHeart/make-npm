# npm-cli

参看此示例理解命令行工具的使用。
该示例采用了如下工具

* **commander** 命令行工具
* **chalk** 终端实现彩色输出
* **semver** 版本检查工具
* **didYouMean** 用来判断文本相似性工具,需理解编辑距离
* **debug** 终端调试输出工具
* **marked-man** 生成 man 文档


## 尝试完成如下功能
1. 实现基于账户创建密码,并保存到特定文件
2. 实现利用 `pw list` 显示所有账户信息 `pw list <account>` 显示特定账户信息

> 你可以默认将该文件保存到 `$HOME/.account` 文件里