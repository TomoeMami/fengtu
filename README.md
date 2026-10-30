# 缝图 · 长图拼接

一个纯前端的长图拼接工具：把多张图片按顺序竖向拼成一张长图，全部在浏览器本地完成，图片不会上传到任何服务器。

**🔗 在线使用：https://blog.prayhand13013.top/fengtu/**

## 特点

- **单文件**：整个应用只有一个 `index.html`，无外部依赖，可离线打开
- **本地处理**：基于 Canvas 拼接与导出，图片不离开你的设备
- **免安装**：直接用浏览器打开即可使用

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
