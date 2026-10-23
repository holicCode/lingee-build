# 哭脸界面（WorkItem wi-t1000353）

在浏览器中展示一个哭脸表情图形页面：圆形脸部、眼睛、下垂的嘴角与自眼部垂落的泪滴，打开页面即可直接查看。

## 技术栈

- React 19 + Vite 7 + TypeScript（SPA，无路由、无状态管理、无后端）
- 哭脸图形以声明式内联 SVG 实现，`viewBox` 保证任意视口下等比缩放

## 运行方式

```bash
npm install
npm run dev      # 启动开发服务器，浏览器打开输出的本地 URL 即可查看
```

构建与本地预览：

```bash
npm run build    # 类型检查 + 生成静态产物到 dist/
npm run preview  # 本地预览构建结果
```

开发自检：

```bash
npm run typecheck  # TypeScript 项目引用类型检查
npm run test       # Vitest 单元测试（jsdom）
```

## 页面结构

- `index.html`：挂载点，页面标题“哭脸界面”
- `src/main.tsx`：应用入口，渲染根组件
- `src/App.tsx`：哭脸 SVG 组件（脸/眼/嘴/泪滴）
- `src/index.css`：居中布局与图形尺寸
