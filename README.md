# Naive Admin Pro

基于 Vue 3 + TypeScript + Vite + Naive UI 的现代化中后台管理系统模板

## ✨ 特性

- 🚀 **现代技术栈**: Vue 3 + TypeScript + Vite 构建
- 🎨 **UI 框架**: 基于 Naive UI 组件库，简洁美观
- 📱 **响应式设计**: 支持多种设备尺寸适配
- 🔐 **权限管理**: 完整的认证和授权体系
- 🌍 **国际化**: 内置多语言支持
- 📊 **数据可视化**: 支持图表和数据展示
- 🎭 **Mock 数据**: 开发阶段数据模拟
- 🛠 **开发工具**: ESLint + Prettier + TypeScript 代码规范
- 🎯 **自动化**: 组件和 API 自动导入
- 🎨 **原子化 CSS**: UnoCSS 原子化样式引擎

## 🔧 技术栈

### 核心框架
- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型支持
- **Vite** - 下一代前端构建工具

### UI 和样式
- **Naive UI** - Vue 3 组件库
- **UnoCSS** - 原子化 CSS 引擎
- **Less/Sass** - CSS 预处理器

### 状态管理和路由
- **Pinia** - Vue 状态管理库
- **Vue Router** - Vue.js 官方路由
- **Pinia Plugin Persistedstate** - Pinia 持久化插件

### 工具库
- **VueUse** - Vue 组合式函数集合
- **Lodash-es** - JavaScript 实用工具库
- **Axios** - HTTP 客户端
- **Vue I18n** - 国际化解决方案

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Mock.js** - 数据模拟
- **Unplugin Auto Import** - 自动导入
- **Unplugin Vue Components** - 组件自动导入

## 📦 项目结构

```
src/
├── adapter/          # 适配器层
├── api/             # API 接口管理
├── assets/          # 静态资源
├── components/      # 公共组件
├── enums/           # 枚举定义
├── hooks/           # 组合式函数
├── layout/          # 布局组件
├── locales/         # 国际化文件
├── plugins/         # 插件配置
├── router/          # 路由配置
├── settings/        # 应用配置
├── store/           # 状态管理
├── styles/          # 全局样式
├── types/           # 类型定义
├── utils/           # 工具函数
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 应用入口
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 7.0.0 (推荐)

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 🛠 开发指南

### 代码规范

项目使用 ESLint + Prettier 进行代码规范管理：

- 使用 TypeScript 进行类型检查
- 遵循 Vue 3 组合式 API 规范
- 统一的代码格式化规则

### 组件开发

- 优先使用组合式 API
- 组件使用 TypeScript 编写
- 遵循单文件组件 (SFC) 规范
- 支持组件自动导入

### 状态管理

使用 Pinia 进行状态管理：

```typescript
// store/modules/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 状态管理逻辑
})
```

### 路由配置

使用 Vue Router 4 进行路由管理，支持：

- 路由懒加载
- 路由守卫
- 动态路由

### API 管理

统一的 API 管理方式：

```typescript
// api/user.ts
import { request } from '@/utils/request'

export const getUserInfo = () => {
  return request.get('/user/info')
}
```

## 🌍 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

## 📮 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](../../issues)
- 发送邮件至 [280023382@qq.com]

## 页面截图
登录
[登录](./docs/登录.png)
表单生成
[表单生成](./docs/表单生成示例.png)
组件使用示例
[组件使用示例](./docs/组件使用示例.png)
