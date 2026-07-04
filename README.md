<p align="center">
  <img src="docs/assets/logo-small.png" alt="Marqen" width="96" height="96">
</p>

<h1 align="center">Marqen</h1>

<p align="center">
  <strong>一个给普通写作者使用的本地文档编辑器。</strong>
  <br>
  像写普通文档一样写教程、笔记、产品文档、说明书和文章，不必先理解 Markdown、文件路径或排版规则。
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2f6f68" alt="MIT License"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/node-%3E%3D20.19-47636a" alt="Node.js >= 20.19"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-7c5f3f" alt="macOS Windows Linux"></a>
</p>

<p align="center">
  <a href="#适合谁">适合谁</a>
  <span> · </span>
  <a href="#能做什么">能做什么</a>
  <span> · </span>
  <a href="#下载与安装">下载与安装</a>
  <span> · </span>
  <a href="#本地开发">本地开发</a>
  <span> · </span>
  <a href="#贡献">贡献</a>
</p>

![Marqen editor preview](docs/assets/marktext.png)

## 为什么做 Marqen

很多人写的是「文档」，不是「Markdown 文件」。

他们要完成的是一份清楚的教程、一篇能发出去的文章、一份团队交接说明，或一段带图片和表格的产品文档。Marqen 的目标是把结构化写作变得更直接：打开、书写、插图、插表、检查版式、导出，而不是让用户先学习语法、资源目录、渲染模式和兼容性差异。

Marqen 仍然保留 Markdown 作为轻量、可移植的底层格式，但它不应该成为普通用户的心智负担。

## 适合谁

| 用户 | Marqen 帮你省掉什么 |
| --- | --- |
| 写教程、说明书、FAQ 的人 | 不用手写语法，也能得到稳定的标题、列表、表格和图片排版。 |
| 写产品文档、交接文档的人 | 本地保存，结构清楚，导出方便，适合反复修改和沉淀。 |
| 写学习笔记、研究笔记的人 | 支持公式、代码块、图表等复杂内容，但日常书写仍然保持简单。 |
| 不想被复杂排版打断的人 | 少一些按钮和样式陷阱，把注意力留给内容本身。 |

Marqen 不想成为一个程序员优先的 Markdown 编辑器，也不想成为一个充满格式按钮的传统文字处理器。它更像一张安静、可靠、懂结构的写作桌面。

## 能做什么

### 专注写作

![Focus mode](packages/website/public/docs/assets/focus.gif)

- 实时呈现最终文档效果，减少「源码/预览」来回切换。
- 支持专注模式、打字机模式和多种主题。
- 标题、列表、引用、分割线等结构通过直观操作完成。

### 插入图片、链接和表格

| 图片工具 | 表格工具 |
| --- | --- |
| ![Image tools](packages/website/public/docs/assets/marktext-image-popup.png) | ![Table tools](packages/website/public/docs/assets/marktext-table-tools.png) |

- 从剪贴板粘贴图片，或从本地选择图片。
- 创建和调整表格，不必手写管道符。
- 链接、图片、表格都有贴近内容的编辑工具。

### 导出和交付

![Export PDF settings](packages/website/public/docs/assets/marktext-export-pdf.png)

- 导出 PDF 和 HTML，适合分享、归档或发布。
- 主题和导出样式保持一致，减少交付前的返工。
- 本地优先，文档和资源留在自己的电脑上。

### 处理复杂内容

![Quick insert](packages/website/public/docs/assets/marktext-quick-insert.png)

- 支持公式、代码块、图表、任务列表等结构化内容。
- 对高级内容提供显示和编辑能力，但默认界面保持克制。
- 面向普通写作者隐藏实现细节，面向高级用户保留可控性。

## 下载与安装

Marqen 面向 macOS、Windows 和 Linux。发布包准备好后，可以从 [GitHub Releases](https://github.com/marqen/marqen/releases) 下载对应平台的安装文件。

| 平台 | 说明 |
| --- | --- |
| macOS | 支持 Apple Silicon 和 Intel Mac，建议下载对应架构的安装包。 |
| Windows | 支持 Windows 10 / 11，建议使用安装向导。 |
| Linux | 计划提供 AppImage、deb、rpm 等常见格式。 |

如果暂时没有适合你系统的构建包，可以从源码运行或构建。

## 本地开发

### 环境要求

- Node.js >= 20.19.0
- pnpm >= 10
- macOS、Windows 或 Linux

### 启动桌面应用

```bash
pnpm install
pnpm dev
```

### 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动桌面应用开发环境。 |
| `pnpm build` | 构建桌面应用。 |
| `pnpm build:mac` | 构建 macOS 安装包。 |
| `pnpm build:win` | 构建 Windows 安装包。 |
| `pnpm build:linux` | 构建 Linux 安装包。 |
| `pnpm test` | 运行测试。 |
| `pnpm typecheck` | 运行类型检查。 |
| `pnpm check` | 运行 lint 和类型检查。 |

## 项目结构

```text
.
├── packages/
│   ├── desktop/   Electron 桌面应用
│   ├── muya/      新版编辑器核心
│   ├── muyajs/    旧版编辑器兼容层
│   └── website/   文档与官网
├── docs/          README 图片和文档资源
├── scripts/       构建、许可和本地化脚本
└── package.json   工作区入口
```

## 设计原则

- 面向用户意图命名：图片、表格、导出 PDF，而不是语法名词。
- 默认隐藏实现细节：Markdown、路径、资源目录和兼容性设置只在需要时出现。
- 让文档成为中心：工具应该安静、可预测，不抢走写作注意力。
- 保持输出可信：用户看到什么，就应该能稳定导出、打印或发送。

## 贡献

欢迎参与 Marqen 的开发、测试、文档和设计改进。比较适合开始的方向：

- 改善普通用户可见的文案和交互。
- 补充图片、表格、导出、粘贴等核心写作流程的测试。
- 简化偏技术化的设置项和菜单命名。
- 修复跨平台安装、构建和文件处理问题。

提交改动前建议运行：

```bash
pnpm check
pnpm test
```

## 致谢

Marqen 基于 MarkText 和 Muya 的长期工作继续演进。感谢原项目作者、贡献者，以及所有推动开源写作工具变得更好的人。

## 许可证

[MIT](LICENSE)
