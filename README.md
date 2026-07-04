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
  <a href="https://github.com/Qing-Gege/marqen/releases"><img src="https://img.shields.io/badge/download-GitHub%20Releases-47636a" alt="Download Marqen"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-7c5f3f" alt="macOS Windows Linux"></a>
</p>

<p align="center">
  <a href="#适合谁">适合谁</a>
  <span> · </span>
  <a href="#能做什么">能做什么</a>
  <span> · </span>
  <a href="#下载与安装">下载与安装</a>
  <span> · </span>
  <a href="#第一次打开">第一次打开</a>
  <span> · </span>
  <a href="#参与项目">参与项目</a>
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

- 实时呈现最终文档效果，减少「编辑/预览」来回切换。
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

Marqen 面向 macOS、Windows 和 Linux。你不需要安装开发工具，也不需要使用命令行。

打开 [GitHub Releases](https://github.com/Qing-Gege/marqen/releases)，进入最新版本，在页面下方的 **Assets** 区域下载适合自己电脑的安装文件。

| 平台 | 说明 |
| --- | --- |
| macOS | Apple Silicon 电脑下载带 `arm64` 的 `.dmg`；Intel Mac 下载带 `x64` 的 `.dmg`。打开后把 Marqen 拖到“应用程序”。 |
| Windows | 下载带 `setup` 的 `.exe` 安装包，双击后按安装向导继续。 |
| Linux | 优先下载 `.AppImage`；如果你熟悉自己的发行版，也可以选择 `.deb` 或 `.rpm`。 |

如果你不确定该下载哪个文件，可以先看文件名里的系统名称：`mac`、`win`、`linux`。

## 第一次打开

### macOS

Marqen 目前的安装包还没有 Apple 开发者签名。第一次打开时，macOS 可能会提示“无法验证开发者”。

遇到这种提示时，可以在“系统设置”里允许打开，或在“应用程序”中按住 Control 键点击 Marqen，再选择“打开”。之后就可以正常使用。

### Windows

如果系统出现安全提醒，请确认安装包来自 [Qing-Gege/marqen Releases](https://github.com/Qing-Gege/marqen/releases)，再继续安装。

### Linux

`.AppImage` 是便携版，适合先试用；`.deb` 和 `.rpm` 更适合安装到系统应用列表中。

## 常见问题

### 我需要学习 Markdown 吗？

不需要。Marqen 会用 Markdown 保存文档，但日常使用时你可以像写普通文档一样操作标题、列表、图片和表格。

### 我的文档会上传到云端吗？

不会。Marqen 是本地文档编辑器，文档默认保存在你的电脑上。

### 适合用它写什么？

教程、说明书、产品文档、交接文档、学习笔记、文章草稿，以及需要图片、表格、公式或代码片段的长文档。

## 设计原则

- 面向用户意图命名：图片、表格、导出 PDF，而不是语法名词。
- 默认隐藏实现细节：Markdown、路径、资源目录和兼容性设置只在需要时出现。
- 让文档成为中心：工具应该安静、可预测，不抢走写作注意力。
- 保持输出可信：用户看到什么，就应该能稳定导出、打印或发送。

## 参与项目

欢迎参与 Marqen 的开发、测试、文档和设计改进。比较适合开始的方向：

- 改善普通用户可见的文案和交互。
- 补充图片、表格、导出、粘贴等核心写作流程的测试。
- 简化偏技术化的设置项和菜单命名。
- 改善跨平台安装、打开和文件处理体验。

README 会始终优先服务普通用户；开发者相关的环境准备和测试说明会放在贡献文档里，避免干扰只想下载安装包的用户。

## 致谢

Marqen 基于 MarkText 和 Muya 的长期工作继续演进。感谢原项目作者、贡献者，以及所有推动开源写作工具变得更好的人。

## 许可证

[MIT](LICENSE)
