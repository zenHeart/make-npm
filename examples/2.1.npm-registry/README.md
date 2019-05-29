# npm registry

本地搭建一个 npm registry

## verdaccio
参看 [verdaccio](https://github.com/verdaccio/verdaccio)

1. 全局安装 verdaccio `npm i -g verdaccio`
2. 运行服务 `verdaccio`
3. 访问 <http://localhost:4873/>

可能出现的问题 **dyld: Symbol not found: _usdt_create_provider**

1. 删除 `brew uninstall --force binutils`
2. 重新编译模块 `npm rebuild`

## 参考资料
* [cnpm 主站源码](https://github.com/cnpm/cnpmjs.org)
* [npm registry 旧版主站源码](https://github.com/npm/npm-registry-couchapp)
* [npm registry api](https://github.com/npm/registry)