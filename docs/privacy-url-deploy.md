# 隐私政策 URL 发布说明

当前隐私政策页面已经准备在：

```text
site/privacy.html
```

推荐使用 GitHub Pages 发布。

## 建议仓库名

```text
web-qa-inspector
```

如果 GitHub 用户名是 `roperluo`，并使用仓库名 `web-qa-inspector`，发布后的隐私政策 URL 通常是：

```text
https://roperluo.github.io/web-qa-inspector/privacy.html
```

注意：该 URL 需要在仓库推送并启用 GitHub Pages 后才会真实可访问。

## 已准备的自动部署文件

```text
.github/workflows/pages.yml
```

推送到 GitHub 后，在仓库 Settings -> Pages 中选择 GitHub Actions 部署即可。

## 当前阻塞

本机没有 `gh` CLI，且当前 SSH key 对 GitHub 返回 `Permission denied (publickey)`，所以无法直接创建仓库或推送发布。完成 GitHub 登录/授权后，可以继续由 AI 推送并确认公开 URL。
