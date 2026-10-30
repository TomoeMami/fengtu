# 缝图 · 长图拼接

一个纯前端的长图拼接工具：把多张图片按顺序竖向拼成一张长图，全部在浏览器本地完成，图片不会上传到任何服务器。

**🔗 在线使用：https://blog.prayhand13013.top/fengtu/**

## 特点

- **单文件应用**：页面本身只有一个 `index.html`，无外部依赖
- **可安装 / 离线**：符合 PWA 标准，可安装到桌面或主屏幕，断网也能打开使用
- **本地处理**：基于 Canvas 拼接与导出，图片不离开你的设备
- **免安装**：不安装也能直接用浏览器打开

## 安装为应用

用 Chrome / Edge 打开上面的在线地址，地址栏右侧会出现「安装」按钮；iOS Safari 则通过「分享 → 添加到主屏幕」。
安装后从桌面或主屏幕启动，是独立窗口、没有地址栏，断网也能正常工作。

## 本地运行

```bash
git clone git@github.com:TomoeMami/fengtu.git
cd fengtu
# 直接用浏览器打开 index.html，或起一个静态服务器：
python3 -m http.server 8000
```

然后访问 http://localhost:8000

## 部署

推送到 `main` 分支后，由 GitHub Actions（`.github/workflows/static.yml`）自动发布到 GitHub Pages。
