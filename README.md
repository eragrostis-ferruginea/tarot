# Tarot AI - 塔罗牌占卜应用

一款融合神秘学与 AI 技术的塔罗牌占卜 Web 应用。

## 功能特性

- 🃏 **完整塔罗牌库**: 78 张塔罗牌的详细信息与解读
- 🔮 **多种牌阵**: 支持单张占卜、三张牌阵、十字牌阵
- 🤖 **AI 智能解析**: 支持自定义 API 接入（兼容 OpenAI 格式）
- ✨ **精美动画**: 星空粒子背景、卡片翻转动画
- 🎨 **神秘主题**: 暗黑神秘学风格设计

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 3
- Framer Motion 动画库
- Zustand 状态管理
- React Router DOM

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 配置 AI API

1. 打开应用后点击「设置」页面
2. 填入你的 API 配置：
   - **Endpoint**: `https://api.deepseek.com/v1/chat/completions`
   - **API Key**: 你的 API 密钥
   - **Model**: `deepseek-v4-flash` 或 `deepseek-v4-pro`

支持的 API 服务：
- DeepSeek
- OpenAI
- 通义千问（兼容模式）
- 其他兼容 OpenAI 格式的服务

## 项目结构

```
src/
├── components/     # 通用组件
├── data/           # 塔罗牌数据
├── pages/          # 页面组件
├── services/       # API 服务
├── stores/         # 状态管理
└── types/          # 类型定义
```

## License

MIT