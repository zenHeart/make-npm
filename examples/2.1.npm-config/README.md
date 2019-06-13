# npm 配置级别
该示例说明 npm 的配置级别及配置优先级

## 验证配置级别
1. 编辑用户配置
   
   ```bash
   # 打开 npmrc 用户配置
   vi `npm get userconfig`
   # 在配置中添加 test_user_conf = user
   ```
2. 编辑全局配置
   
   ```bash
   # 打开全局配置
   vi `npm get globalconfig`
   # 在配置中添加 test_global_conf = global
   ```

3. 运行 `npm c ls -l`,会看到如下输出

   ```ini
    ; cli configs
    ...
    user-agent = "npm/6.9.0 node/v10.15.3 darwin x64"

    ; project config /Users/zenheart/code/work/make-ppt/examples/2.1.npm-config/.npmrc
    arr = ["1","2"]
    foo = "bar"
    s = {"a":"1"}

    ; userconfig /Users/zenheart/.npmrc
    ...
    test_user_conf = "user"

    ; globalconfig /Users/zenheart/.nvm/versions/node/v10.15.3/etc/npmrc
    test_global_conf = "global"

    ; default values
    access = null
    ...
   ```

可以看到 npm 将配置按照 
1. cli(运行时)配置
2. 项目配置
3. 用户配置
4. 全局配置
5. 内置配置(默认配置) 的形式进行输出

如若运行 `npm run config:show` 你还会看到在 `environment configs`

## 配置优先级
若出现相同的配置项,则会前面的配置会覆盖后续配置
运行 `npm run config:level` 可以看到如下类似如下输出

```ini
; cli configs
baz = "foo"
foo = "overwrite"
...
; project config /Users/zenheart/code/work/make-ppt/examples/2.1.npm-config/.npmrc
arr = ["1","2"]
; foo = "bar" (overridden)
```

可以看到命令中会在添加新的 `baz` 配置,此外 `foo` 配置覆盖了项目下的 `.npmrc` 中的相同配置项
