# 项目巡检记录

本项目是 Jekyll 静态博客，核心源码集中在以下目录：

- `_posts/`：文章源文件。
- `_layouts/`、`_includes/`：页面布局和公共模板。
- `css/`、`js/`、`images/`：站点运行时静态资源，保留历史公开路径。
- `krpano/`：历史全景展示资源，保留历史公开路径。
- `modules/`：独立展示模块，当前包含 `xiaowanle/` 和 `tools/`。

## 当前已收敛

- `_site/`、`node_modules/`、`.jekyll-cache/`、`vendor/bundle/` 已经通过 `.gitignore` 排除，且未被 Git 跟踪。
- 统一保留 `.prettierrc.json`，避免 `.prettierrc` 和 `.prettierrc.json` 两套格式规则互相覆盖。
- 新增 `.editorconfig`，统一换行、缩进和文件末尾换行。
- Jekyll 构建排除了开发配置、依赖、脚本源目录，避免把非站点文件复制到 `_site/`。
- 模板已补充基础语义和性能优化：`lang`、图片尺寸、外链 `rel`、脚本 `defer`、去除 `document.write`。
- 文章文件名已统一为 `YYYY-MM-DD-kebab-case.md`；被重命名文章均保留原 `permalink`，避免历史访问链接随文件名变化。
- 根目录结构已收敛：独立模块迁移到 `modules/`，本地脚本迁移到 `scripts/`，本地运行笔记迁移到 `docs/`，并移除空的旧 ESLint 配置。
- `krpano/` 中已清理 `tour_testingserver*`、`.swf` 和 `tour.xml - backup-*.xml`。入口页已调整为 HTML5-only；后续若重新生成 krpano 项目，应继续避免提交测试服务、Flash fallback 和自动备份文件。
- 已将 `images/posts/wenzikong/*.gif`、`images/posts/excel_list/ExcelList.gif` 转为动画 WebP；压缩小玩乐模块视频；并将小玩乐画廊图与 krpano 文章展示图切换为更轻量的 WebP。
- 已将 `css/main.css` 正式迁移为 `src/styles/main.scss` 的构建产物；`npm run styles:build` 会直接生成站点实际引用的 `css/main.css`，并移除未使用的 `_includes/styles/main.css` 产物链路。

## 维护提醒

- 后续若重新生成 krpano 项目，应继续避免提交测试服务、Flash fallback 和自动备份文件。
