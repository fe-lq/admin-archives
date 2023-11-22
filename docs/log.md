# 工作日志

## 7月4日 Todo

1. 添加doc/log.md文件记录每次开发的功能和预留的todo;

- [x] 封装axios, (待完善)
- [x] 配置菜单路由;
- [ ] 封装常用业务组件;
- [ ] 自定义loader监控异步组件;
- [ ] 封装日志钩子;
- [ ] 完善国际化和主题切换;
- [ ] 完善技术总结文档;

## 7月11日

1. 添加了支持sass和jsx依赖，封装部分axios，待接口规范完成再完善封装

## 11月22

1. 使用garfish改成微应用，微应用中配置的基本路由地址一定要有基座分发下来的，为了统一路径且便于维护微应用
2. 适用scss改变组件样式的注意事项

```typescript
  // 如果是全局scss变量且在组件的style标签内有使用可以使用如下方式注入
  // 在vite.config.ts或者vue.config.ts中配置，其中mixin.scss文件放入变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/scss/mixin.scss";`
      }
    }
  },

  /**
   * 如果用自定义scss改变组件样式，最好在全局的main.ts中引用scss样式文件
   * 因为如上配置只有在组件使用style标签时才生效,变量文件使用如上配置更好
   * 魔改组件样式需加父节点选择器
   * 在scss文件中如下：
   */
  // global.scss, 在全局main.ts中引用无效，因为会被组件样式覆盖
  .el-button--primary {
    --el-button-hover-bg-color: black;
  }
  .el-button--small {
    --el-button-size: 36px;
  }
  // 在全局main.ts中引用有效
  :root {
    .el-button--primary {
    --el-button-hover-bg-color: black;
    }
    .el-button--small {
      --el-button-size: 36px;
    }
  }
  // 深度修改组件样式根据官方文档使用:deep(.el-button){}，之前的三种方式>>>、/deep/、::v-deep已弃用
```
