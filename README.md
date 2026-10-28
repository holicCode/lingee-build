# 羽毛球主视觉 Web 界面（T1000425）

以羽毛球为主视觉的单页展示界面：页面中心呈现结构清晰的羽毛球（软木球头 + 放射状羽裙），配合统一的深空霓虹视觉风格、光影动效（光晕呼吸、羽片微摆、粒子漂浮）与响应式布局。

## 技术栈

- React 19 + Vite 7
- 纯 CSS 关键帧动画 + 结构化 SVG 主视觉，无业务数据与持久化状态

## 本地运行

```bash
npm install
npm run dev
```

启动后浏览器访问 Vite 输出的本地地址（默认 `http://localhost:5180`，以实际启动输出为准）。

## 构建与预览

```bash
npm run build    # 生产构建
npm run preview  # 预览构建产物
```

## 页面结构

- `src/App.jsx` — 页面布局、羽毛球 SVG 主视觉（羽片放射角度、编织线圈、球头渐变与高光）
- `src/index.css` — 视觉主题、动效关键帧与响应式断点
- `public/favicon.svg` — 羽毛球图标
