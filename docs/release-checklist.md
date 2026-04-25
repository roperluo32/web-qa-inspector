# Web QA Inspector 发布前 Checklist

## 代码质量

- [x] TypeScript typecheck 通过。
- [x] ESLint 通过。
- [x] Vitest 单元测试通过。
- [x] Playwright E2E 测试通过。
- [x] Chrome 构建通过。
- [x] Edge 构建通过。
- [x] Firefox 构建通过。
- [x] 插件包内不包含账号、远程授权或商业化配置。

## 功能质量

- [x] 可以扫描本地 fixture 页面。
- [x] 可以检测 SEO 问题。
- [x] 可以检测链接问题。
- [x] 可以检测图片问题。
- [x] 可以检测可访问性基础问题。
- [x] 可以检测 JSON-LD 问题。
- [x] HTML / CSV 报告导出免费可用。
- [x] 扫描历史可保存。
- [x] 多语言切换可用。

## 隐私和权限

- [x] 权限用途已记录。
- [x] 页面内容默认不上传。
- [x] 扫描由用户主动触发。
- [x] 隐私政策草稿已准备。
- [x] 正式支持邮箱替换完成。
- [ ] 正式隐私政策 URL 部署完成。

## 上架材料

- [x] 商店文案草稿已准备。
- [x] 发布 checklist 已准备。
- [x] 基础图标已生成。
- [x] 商店截图已生成。
- [x] 多语言商品展示图已生成。
- [ ] 官网 / landing page 待准备。

## 多语言与商店素材

- [x] Manifest 已支持 `en`, `zh_CN`, `zh_TW`, `ja`, `ko`, `de`, `fr`, `es`, `pt_BR`。
- [x] Popup / Options 已支持语言切换。
- [x] 商店文案已生成多语言版本。
- [x] 每种语言已生成 1280x800 商品展示图。
- [x] E2E 已验证默认英文界面和中文切换。
