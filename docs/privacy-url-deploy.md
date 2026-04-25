# 隐私政策 URL 部署说明

GitHub 仓库：

- https://github.com/roperluo32/web-qa-inspector

GitHub Pages workflow 已部署成功：

- https://github.com/roperluo32/web-qa-inspector/actions

## 当前 Pages 状态

仓库已启用 GitHub Pages，部署方式为 GitHub Actions。

GitHub API 返回的 Pages 地址是：

- http://blog.homecpp.com/web-qa-inspector/

注意：当前 GitHub 账号似乎配置了账号级自定义域名，因此 `https://roperluo32.github.io/web-qa-inspector/` 会自动重定向到 `http://blog.homecpp.com/web-qa-inspector/`。截至当前检查，本机访问 `blog.homecpp.com` 返回空响应，因此暂不建议把该地址作为商店隐私政策 URL。

## 临时可访问 URL

如果商店审核允许使用 GitHub 文件页面，可以临时使用：

- https://github.com/roperluo32/web-qa-inspector/blob/main/site/privacy.html

如果需要直接读取 HTML 文件内容，可以使用：

- https://raw.githubusercontent.com/roperluo32/web-qa-inspector/main/site/privacy.html

或者 CDN 备用：

- https://cdn.jsdelivr.net/gh/roperluo32/web-qa-inspector@main/site/privacy.html

## 推荐上线前处理

正式提交商店前，建议修复 GitHub Pages 自定义域名或改用独立域名托管隐私政策页面。目标是获得一个稳定 HTTPS 页面，例如：

- https://roperluo32.github.io/web-qa-inspector/privacy.html
- https://your-domain.com/web-qa-inspector/privacy.html

如果继续使用 GitHub Pages，需要检查账号或仓库的 Pages custom domain 设置，确保域名 DNS 和 HTTPS 都正常。
