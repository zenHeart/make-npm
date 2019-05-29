# npm registry

本地搭建一个 npm registry

## verdaccio
参看 [verdaccio](https://github.com/verdaccio/verdaccio)

1. 安装依赖 `npm i`
2. 执行 `npm run registry`

> 实际上可以全局安装此 registry

可能出现的问题:

### dyld: Symbol not found: _usdt_create_provider**

1. 删除 `brew uninstall --force binutils`
2. 重新编译模块 `npm rebuild`

> 详细配置参见 <https://verdaccio.org/docs/en/configuration>

### one of uplinks is down,refuse publish
查找配置文件的 `uplinks` 替换为内网 registry

 ```yaml
 uplinks:
 npmjs:
     url: http://maven.paic.com.cn/repository/npm
 ```

## 简化 registry 管理
假设有多个 registry 需要管理,这里提供如下解决方案,
1. 编写一个 alias 用于切换 registry 
    
    ```bash
    # 内网采用 pnpm 命令
    pnpm='npm --registry=http://maven.paic.com.cn/repository/npm'
    ```

2. 若需要保存多个 registry ,安装 nrm `npm i -g nrm`
3. 若除了 registry 还需管理多份不同的配置文件,使用 `npmrc`
   1. 全局安装 npmrc `npm i -g npmrc`
   2. 创建 local npmrc `npmrc -c local`
   3. 添加本地 registry `npm config set registry http://localhost:4873/`
   4. 后续正常使用即可

    > 详见 <https://docs.npmjs.com/configuring-your-registry-settings-as-an-npm-enterprise-user>

## 延伸阅读
* [cnpm 主站源码](https://github.com/cnpm/cnpmjs.org)
* [npm registry 旧版主站源码](https://github.com/npm/npm-registry-couchapp)
* [pnpm](https://pnpm.js.org/)