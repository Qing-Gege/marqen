---
target: overall interaction
total_score: 22.5
p0_count: 0
p1_count: 3
timestamp: 2026-06-14T17-34-23Z
slug: overall-interaction
---
# Marqen Overall Interaction Critique

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2.5 | Save/editor status exists, but image asset handling, export confidence, and background resource safety are not visible enough. |
| 2 | Match System / Real World | 2 | Main menus are moving toward ordinary document language, but quick insert and preferences still expose Markdown/editor concepts. |
| 3 | User Control and Freedom | 3 | Basic editing and menu control are likely strong; advanced paths still create uncertainty around images/resources. |
| 4 | Consistency and Standards | 2 | Insert/right-click/menu copy is improving, but quick insert, title bar labels, and preference categories use different mental models. |
| 5 | Error Prevention | 2 | Hidden assets direction helps, but missing-image recovery and “pictures travel with document” reassurance are not explicit. |
| 6 | Recognition Rather Than Recall | 2 | Many actions require knowing slash/hover/keyboard-driven editor conventions; abbreviations and syntax examples increase recall burden. |
| 7 | Flexibility and Efficiency | 3 | Shortcuts, quick insert, and editor affordances help experienced users. They need a nontechnical surface label layer. |
| 8 | Aesthetic and Minimalist Design | 2 | Too many inherited technical settings and Markdown-shaped insertion choices remain for the stated less-is-more product. |
| 9 | Error Recovery | 2 | Likely generic file/image/export failures; user-facing repair paths are not yet central. |
| 10 | Help and Documentation | 2 | Product needs task-first writing help; inherited Markdown-oriented help would weaken the positioning. |
| **Total** | | **22.5/40** | **Promising but still internally conflicted** |

## Anti-Patterns Verdict

LLM assessment: Marqen does not look like a generic AI-made landing page. The risk is different: it still feels like a forked developer editor wearing a simpler coat. The biggest tells are not decorative visuals, but inherited mental models: syntax samples, technical category names, shortcut-first command discovery, and preference panels that read like app internals.

Deterministic scan: 4 warnings found. Two side-tab accent borders in image uploader CSS, one layout-property animation in preference sidebar, and one likely false-positive broken image warning in printService.ts. The side-tab warnings matter because the image workflow is already a sensitive area for this product: a technical-looking image settings panel will reduce trust.

Browser overlays: skipped because Browser automation was not exposed in this session. Assessment used source inspection and deterministic scan.

## Overall Impression

The product direction is right, and recent cleanup has moved the visible shell closer to Marqen. But the interaction contract is not unified yet. A nontechnical user can start writing, then hit a secondary surface that suddenly speaks Markdown, path, block, shortcut, or configuration language. That is the trust break.

The single biggest opportunity is to make every default path answer one question: “What document action am I doing?” not “What editor primitive am I invoking?”

## What's Working

1. The product positioning is strong: lightweight local documents, automatic layout, less chaos than Word, less technical than Markdown editors.
2. Moving Picture/Table into Insert and right-click is the correct mental model. That is where Word-like users will look first.
3. Preferences have already been reduced to General / Editor / Theme, which is a good direction compared with inherited MarkText breadth.

## Priority Issues

### [P1] Deep UI still exposes Markdown syntax and block internals
Why it matters: The quick insert menu still says Paragraph / Header / Table Block and shows examples like #, ---, | |, >, - [x]. This directly contradicts the “ordinary document” positioning.
Fix: Rewrite quick insert/front menu copy around task names: 正文, 大标题, 小标题, 分割线, 图片, 表格, 引用, 编号列表, 项目列表, 待办清单. Remove syntax subtitles entirely or replace them with plain-language outcomes.
Suggested command: $impeccable clarify

### [P1] Image workflow lacks enough Word-like reassurance
Why it matters: Users will paste, drag, insert, move, rename, and share documents like Word. If image storage is hidden but not explained through interaction feedback, users may not know whether pictures are safe.
Fix: Keep hidden assets. Add subtle save feedback such as “图片已随文档保存”; provide missing-image recovery copy; ensure Insert > Picture, paste, drag-drop, and right-click all lead to the same safe path.
Suggested command: $impeccable harden

### [P1] Preferences are smaller, but not yet product-shaped
Why it matters: Preferences are where inherited technical complexity often resurfaces. If settings feel like an engineer panel, Marqen stops feeling like a simple document tool.
Fix: Reframe categories as 通用 / 写作 / 外观 / 导出 / 图片 / 高级, with 高级 collapsed or hidden. Keep default preferences to choices ordinary users understand. Remove spelling entirely if that is now product direction.
Suggested command: $impeccable distill

### [P2] First-run and empty states undersell the primary workflow
Why it matters: “Start with a blank document” is calm, but too thin. The product needs immediate confidence: create, open, recent, import, export/share expectations.
Fix: Keep the empty state quiet, but make it taskful: 新建文档, 打开文档, 最近文档, maybe 导入文档. Avoid marketing copy; use action-first onboarding.
Suggested command: $impeccable onboard

### [P2] Menu IA still mixes insertion, formatting, and editor operations
Why it matters: Insert should mean “add something to the document.” Promote/demote heading and similar operations belong to structure/format, not Insert. Mixing them increases cognitive load.
Fix: Make top-level IA task-based: 文件, 编辑, 插入, 排版, 视图, 窗口, 偏好设置, 帮助. Keep Insert for 图片/表格/链接/公式/分割线. Move heading changes to 排版 or contextual toolbar.
Suggested command: $impeccable shape

## Persona Red Flags

First-time nontechnical writer: Starts writing successfully, but slash/quick insert exposes #, >, | | and “Block” terms. This creates the feeling that the app expects hidden technical knowledge.

Word migrant: Looks for 图片 and 表格 under 插入, which is now being fixed. But they also expect pasted images to be safely embedded or carried with the document, not dependent on visible folders or paths.

Occasional sharer: Writes a document mainly to send, print, or export. Export/share is not yet prominent enough as a core success path compared with editor controls.

## Minor Observations

- Title/status abbreviations like W/C/P/A are efficient for MarkText users but unclear for Marqen’s intended users.
- Hardcoded English in editor menus is an i18n and product-tone problem, not just a translation bug.
- The image uploader has visual anti-patterns from detector output: thick left accent borders and instructional command snippets feel too technical.
- Formula display can remain, but formula editing should be presented as “插入公式 / 编辑公式” with a guided UI, not LaTeX-first.

## Questions to Consider

- What would the app look like if every visible label avoided Markdown, path, source, block, and compatibility terms by default?
- Should Export/Share be promoted to a first-class workflow alongside writing, instead of being a final menu action?
- Which advanced capabilities are truly product-critical for ordinary document writers, and which are only inherited because MarkText had them?
