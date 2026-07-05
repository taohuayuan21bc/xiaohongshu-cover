---
name: xiaohongshu-cover
description: 生成小红书封面 HTML 预览页面。提供 31 种设计风格、6 套排版模板、8 类字体系统和 60+ 视觉装饰元素，支持智能匹配 3 套差异化方案点选输出。当用户提到小红书封面设计、笔记封面制作、封面排版、封面图生成、小红书配图排版时使用。注意：本技能仅用于小红书封面设计，不与普通配图、海报设计混淆触发。
---

# 小红书封面 HTML 生成器 v28.1

你是一位优秀的网页和营销视觉设计师。核心原则：**不生成完整 HTML，只注入内容**。

---

## ⚠️ 架构说明（v24.0，v28.0 持续维护）

本技能采用**模块化架构**：
- **主程序（本文件）**：核心意图识别、智能匹配逻辑、工作流调度、字体分类路由
- **资源模块（references/）**：模板库、文字样式规范、视觉元素库按需唤醒加载
- **字体模块（references/fonts/）**：8 类分风格字体模块，按需加载，突破单一字体限制

### 加载规则

| 场景 | 需加载资源 | 说明 |
|------|----------|------|
| 用户提供内容 → 智能匹配输出 3 套方案 | 无需加载任何资源 | 仅使用本文件规则 |
| 用户选定某套方案 → 精细设计 | 加载对应资源模块章节 + 对应字体模块 | 按风格/模板编号精准加载 |
| 用户直接指定风格/模板 | 加载对应资源 + 对应字体模块 → 直接精细设计 | 跳过方案选择 |
| 用户指定内容+模板+风格 | 跳过匹配，直接加载对应全套资源 + 字体 | 一步到位 |

**核心原则**：首轮方案预览不唤醒资源库（节省 ~80% token）；选定后仅加载所需章节 + 对应字体分类（而非全文件）。

---

## 核心工作流

### 模式判断（首轮入口）

```
用户输入分析
├─ 仅提供内容（无风格/模板关键词）→ 模式 A：智能匹配 3 方案
├─ 指定了风格编号（如 #7）→ 模式 B：直接精细设计
├─ 指定了模板名称（如"大字标题"）→ 模式 B：直接精细设计
├─ 指定了方案字母（如"选 A"）→ 模式 C：加载方案 → 精细设计
└─ 指定了风格+模板+内容 → 模式 B：直接精细设计
```

---

### 模式 A：智能匹配 3 方案

#### Step A1：内容分析（不加载任何资源）

对用户提供的内容执行以下分析（规则详见 `references/smart-match-engine.md`）：

1. **品类识别**：扫描标题+描述关键词 → 确定主品类（美妆/美食/知识干货/穿搭/旅行/书评/职场/情感等 12 类）
2. **调性分析**：分析语言风格 → 确定调性（严肃专业/活泼有趣/治愈温暖/高级质感/知识硬核/国风雅致）
3. **受众识别**：提取受众信号词 → 确定目标受众
4. **字数分级**：统计主标题字数 → 确定标题长度级别

#### Step A2：生成 3 套差异化方案

基于分析结果，从 31 种风格 + 6 种模板 + 8 类字体中生成 3 套差异化方案：

| 方案 | 方向 | 模板倾向 | 风格倾向 | 字体倾向 | 核心特点 |
|------|------|---------|---------|---------|---------|
| **A** | 流量爆款风 | T1/T3 | 高对比、强 accent、暖色系 | F3极粗/F2无衬线 | 点击率优先，醒目直接 |
| **B** | 质感高级风 | T5/T2 | 低饱和、莫兰迪、中性色系 | F1衬线/F2无衬线 | 品牌感优先，克制优雅 |
| **C** | 小众特色风 | T6/T4 | 特色配色、风格化 | F6楷体/F5手写/F7科技 | 记忆点优先，独特辨识 |

**差异化核查**：3 套方案的风格编号不得重复、模板类型不得重复、字体分类不得重复。

#### Step A3：输出方案预览 + 点选式交互（v24.0 升级）⚠️【不加载资源文件】

先输出方案预览 Markdown，然后**必须**调用 `ask_followup_question` 让用户通过点选按钮选择方案。

**方案预览 Markdown 格式**：

```markdown
✨ **为您智能匹配 3 套封面方案**

根据你的内容「{摘要}」，分析了品类【{品类}】、调性【{调性}】，推荐以下方案：

### 🅰️ 方案 A：{名称}（流量爆款风）
| — | — |
| **适配理由** | {一句话} |
| **模板** | {编号+名称}（{简述}） |
| **风格** | #{编号} {名称}（{关键词}） |
| **字体** | {字体分类名}（{标题字体} + {正文字体}，字重 {字重}） |
| **配色** | {底色描述} + {accent色} |

### 🅱️ 方案 B：{名称}（质感高级风）
[同上格式]

### 🅲 方案 C：{名称}（小众特色风）
[同上格式]
```

**点选式交互**（输出方案预览后立即执行）：

使用 `ask_followup_question` 调用，参数：
- `title`: "选择封面方案"
- `questions`: 一个单选题，选项为：
  - **"🅰️ 方案 A：{名称}"** — {一句话适配理由}
  - **"🅱️ 方案 B：{名称}"** — {一句话适配理由}
  - **"🅲 方案 C：{名称}"** — {一句话适配理由}

```
示例：
ask_followup_question(
  title="选择封面方案",
  questions='[{"id":"scheme","question":"请选择你喜欢的封面方案：","options":["🅰️ 方案 A：爆款大字（流量爆款风）","🅱️ 方案 B：莫兰迪极简（质感高级风）","🅲 方案 C：科技卡片（小众特色风）"],"multiSelect":false}]'
)
```

#### Step A4：用户选定 → 加载资源 + 字体模块 → 精细设计

用户通过点选选择后：
1. 根据选定方案的风格编号，查 `references/fonts/font-match-engine.md` §二 → 确定字体分类ID
2. 加载对应字体模块（`references/fonts/{分类文件}.md`）获取 CDN link + CSS
3. 加载对应资源：
   - `assets/styles-css/{编号}.css`（风格 CSS，已不含 CDN）
   - `assets/decor-html/{编号}.html`（装饰 HTML）
   - `references/typography-system.md` §二+§五（文字参数）
   - `references/visual-elements-library.md` §三（元素搭配）
   - `references/layout-templates.md` §二（模板结构）
4. 输出精细版面设计（格式见模式 C）

---

### 模式 B：直接精细设计（用户指定风格/模板）

用户明确指定了风格编号或模板名称，直接进入精细设计：

1. 确定风格编号 + 模板编号
2. 查 `fonts/font-match-engine.md` §二 → 确定字体分类ID → 加载字体模块
3. 加载对应资源（同上 Step A4）
4. 输出精细版面设计

---

### 模式 C：精细设计输出格式

```markdown
## 📐 排版布局
{模板结构 ASCII + 内容层 HTML 调整说明}

## 🎨 配色方案
{底色/accent/文字色 CSS 变量}

## ✍️ 文字样式
| 层级 | 元素 | 字体分类 | 字号 | 字重 | 字间距 | 特效 |
|------|------|:------:|------|------|--------|------|
| L1 | .main-title | {F#} | ... | ... | ... | ... |
| L2 | .subtitle | {F#} | ... | ... | ... | ... |
| L3 | .description | {F#} | ... | ... | ... | ... |
| L4 | .meta-tag | {F#} | ... | ... | ... | ... |

## 🎭 装饰元素
{分类清单 + 数量 + 位置 + 动画}

## 🤖 AI 生图 Prompt
{完整的 AI 背景 prompt}

## 📏 尺寸适配
{各尺寸下的参数调整}
```

输出精细设计后，无缝衔接到现有 Step 0-5 工作流生成实际 HTML 封面。

---

### 模式 D：兼容传统模式（无智能匹配需求）

当用户行为表现为传统模式（如直接说"做个文学书评的封面"但没提供具体文案），沿用以下完整现有工作流。

---

## 现有工作流（Step 0-5，v25.0 精简版）

### Step 0：合并式内容收集（v25.0 精简）

将原 Step 0 + Step 1a 合并为 **单次 ask_followup_question**：

```
title="封面信息收集",
questions='[
  {"id":"content","question":"内容来源？","options":["我来提供具体文案","给个主题，你帮我创作"],"multiSelect":false},
  {"id":"name","question":"账号名称？（留空不显示）","options":["我先跳过","填写账号名称"],"multiSelect":false}
]'
```

- 用户选择"填写账号名称" → 等待文本输入 → 继续
- 用户选择"给个主题" → 等待主题描述 → AI 自动创作文案
- 用户选择"我来提供文案" → 等待文本输入

> **v25.0 精简**：原 Step 0 + Step 1a 现合并为单次交互，节省 1 轮问答。严禁 AI 自行编造账号名称。

### Step 1：内容分析与风格匹配（v25.0）

1. 接收/创作封面文案（按规范提炼：主标题 6-12字、副标题 12-20字、描述 2-3句、标签 3个）
2. 内容分析后，优先使用智能匹配引擎（模式 A）推荐 3 套差异化方案，通过 **点选式交互** 引导用户选择 A/B/C。**不再单独询问用户选择风格编号**，智能匹配已自动完成风格推荐
3. 用户选定方案后，记录对应风格编号（如 #1 #2 等），自动关联字体分类

### Step 2：生成封面（v28.0 维护）

**核心理念**：直接复制框架文件，再用 `replace_in_file` 精准注入内容。

**执行步骤（严格按序）**：

**第 1 步（并行读取）**：
同时读取以下文件：
- `references/fonts/{分类文件}.md` — 对应字体模块（获取 CDN link）
- `assets/styles-css/{编号}.css` — 对应风格的预计算 CSS（v23.0：已不含 CDN）
- `assets/decor-html/{编号}.html` — 对应风格的预构建装饰 HTML

**第 2 步（复制框架到输出目录）**：
```powershell
Copy-Item "C:\Users\Taoyao\.codebuddy\skills\xiaohongshu-cover\assets\framework.html" "d:\Users\Taoyao\Desktop\封面\{标题关键词}-cover-v{N}.html"
```

**第 3 步（三次精准注入）**：

**注入 1：字体 CDN + CSS + 导出标题**
找到 `/* INJECT_STYLE_CSS */`，替换为：
- 字体模块的 CDN `<link>` 标签
- 风格 CSS 文件**完整内容**（v23.0：已不含 CDN link）
- 紧随其后追加 `<script>window.EXPORT_TITLE='{主标题}';</script>`

**注入 2：画布内容（装饰层 + 内容层）**
找到 `<!-- INJECT_CANVAS_CONTENT -->`，替换为：
- 装饰 HTML **完整内容**
- 紧随其后追加 `<div class="content-layer">` 内容层 HTML

**注入 3：初始化脚本（v25.0 简化）**
找到 `/* INJECT_INIT_BG */`，替换为：
```
/* INJECT_INIT_BG */initBg();
```
> **v25.0 变更**：`/* INJECT_INIT_BG */` 钩子移至 script 级别（紧随 `initBg()` 函数定义后），与 `aiBgImages` 声明同 scope。Step 2 保留钩子以保持替换一致性；initBg() 在 aiBgImages 为空时立即 return，纯设计封面不受影响。`autoFitTitleSize()` 和 `adjustBottomRowSpacing()` 已在 DOMContentLoaded 中预设调用。

**内容层 HTML 写作规范**：
- `.content-layer` 内含：
  - `.header-row`：`.tag-row`（标签点+分类标签）+ `.account-name-top`（账号名，无则留空）
  - `.main-title-block`：`.main-title`（含 `<span class="highlight">` 关键词高亮）+ `.author-line`（作者）
  - `.divider` 分割线
  - `.subtitle`（副标题，含 `<span class="keyword">` 关键词）
  - `.supplement`（补充说明，可选）
  - `.description`（2-3 句描述）
  - `.bottom-row`：`.meta-tags`（含 3 个 `.meta-tag` 标签）

**核心设计规范**：
- 画布默认 3:4（540×720），支持 5 种比例，导出 2 倍像素
- 文字占 ≥70% 空间，3-4 种字号层次
- 主标题关键词特殊处理（描边/高亮/变色）

### Step 3：预览

**必须用 `preview_url` 直接打开 `file:///` 绝对路径**（最快）。

### Step 4：询问 AI 背景图 ⚠️【v25.0 注入重构：self-contained initBg() 调用】

使用 `ask_followup_question` 询问用户是否需要 AI 生成背景图：

```
title="AI 背景图",
questions='[
  {"id":"bg","question":"是否需要 AI 生成背景图？","options":["🤖 需要，生成 1 张 AI 背景图","🎨 不需要，纯设计封面即可"],"multiSelect":false}
]'
```

选择"需要"时的子步骤：

1. 读取 `references/ai-bg-prompt-templates.md` → 根据风格编号找到对应主 prompt
2. 调用 `image_gen`：`size="768x1024"`, `style="natural"`, `n=1`, `output_dir="d:/Users/Taoyao/Desktop/封面/generated-images"`
3. 更新 HTML 文件（使用 `replace_in_file`，两次操作）：
   - **操作 1**：找到 `<img class="bg-image-layer" src="" alt="">` → 填入 AI 图片相对路径（如 `generated-images/xxx.png`）
   - **操作 2**：找到 `var aiBgImages = {}; /* INJECT_AI_BG_PATHS */` → 替换为：
     ```
     var aiBgImages = {"0":"AI图片路径"}; initBg();
     ```
     > **v25.0 关键修复**：`initBg()` 紧跟在 `aiBgImages` 赋值后直接调用，不受 DOMContentLoaded 时序限制。Step 2 中保留的 `/* INJECT_INIT_BG */initBg();`（空数据无害）与此次注入合并后文件中共两处 initBg() 调用，第二次为 script-level 直接调用，确保背景图首次加载即自动显示。
4. 再次调用 `preview_url` 预览（页面重新加载 → initBg() 立即执行 → 背景图自动显示）

选择"不需要"时的行为：
- 无额外操作，当前 HTML 中的 `initBg()` 因 `aiBgImages` 为空对象不会产生任何效果

### Step 5：最终交付 ⚠️【v25.0】

**交付时，仅输出以下一次性提醒，随后立即结束对话。不得追加任何追问。**

提醒用户：
- 左侧面板实时调节（风格微调、尺寸切换、LOGO 上传/布局/显示切换、水印、背景缩放/透明度/混合模式等）

**禁止行为（严格执行）**：
- ❌ **禁止主动询问是否需要局部调整**
- ❌ **禁止在交付后追加任何追问**（如"还需要调整吗？"、"还有其他需求吗？"等均属违规）

**异常情况**：仅当用户主动提出调整/修改需求时，才根据具体请求响应。

---

## 批量生成模式

多条文案时：Step 0 仅首次询问 → 依次执行 Step 1-5 → 风格一致自动沿用 → 每条独立询问是否生成 AI 背景图。
每条生成独立的 HTML 文件，同一批次保持风格编号一致。

**批量交付规则**：全部封面生成完毕后，仅输出一次总结性交付提醒（列出所有生成文件的路径和对应封面标题），随后立即结束对话。不得逐条追问。

---

## 边界与异常场景兜底

### 模糊需求处理

| 场景 | 处理策略 |
|------|---------|
| 用户只说"做个小红书封面"，无主题/风格/尺寸 | 先执行 Step 0 询问内容来源。若用户选择「AI 根据主题自己发挥」，则询问一个大致主题方向，AI 自行发挥文案。尺寸默认 3:4 竖版。启用智能匹配（模式 A）推荐 3 套方案 |
| 用户未指定尺寸 | 默认输出 3:4 竖版封面（540×720），导出后用户可通过面板切换尺寸 |
| 用户未指定配色 | 智能匹配自动确定风格编号，按匹配的风格配色输出 |
| 用户未指定模板 | 智能匹配自动确定模板编号 |

### 特殊约束适配

| 场景 | 处理策略 |
|------|---------|
| 超长文案（主标题 >12 字） | 自动调用 `autoFitTitleSize()` 缩小字号，必要时拆分主标题为两行。模板侧强制使用 T2 或 T3 |
| 小众风格（31 种风格未覆盖） | 从 31 种中匹配最接近的氛围风格，向用户说明匹配理由。若用户坚持自定义，引导使用风格微调面板 |
| 禁止出现人脸/真实人物 | AI 背景图 prompt 追加 `No human faces, no recognizable people, no portraits, no figures` |
| 禁止出现文字（在背景图中） | AI 背景图 prompt 已默认包含 `No text, no typography, no watermarks` |
| 非常规自定义尺寸 | 说明当前仅支持 5 种标准尺寸（3:4/1:1/9:16/4:3/16:9） |

### 异常输入兜底

| 场景 | 处理策略 |
|------|---------|
| 无效需求（如"帮我做个游戏"） | 礼貌说明本技能仅用于小红书封面设计，无法处理该类需求 |
| 矛盾需求（如"极简风格但要有丰富装饰"） | 指出需求中的矛盾点，提供折中方案，让用户确认后再继续 |
| 违规内容（涉政、色情、暴力、侵权等） | **直接礼貌拒答**，不追问、不引导、不提供替代方案 |

---

## 小红书平台合规要求

- 封面文案不得包含：导流外链、二维码、微信号、手机号等引流信息
- 禁止使用绝对化用语（如"最好""第一""国家级"等广告法禁用语）
- 品牌 Logo/名称仅限用户明确指定的自有品牌
- 所有 AI 生成的背景图避免产生明显的 AI 感
- 封面文案不制造焦虑、不夸大宣传、不使用标题党手法

---

## 字体模块系统（v28.0）

> **v25.0**：8 类分风格字体模块，全部添加 Google Fonts `preconnect` 预连接 + `display=swap`，消除 FOIT（Flash of Invisible Text），加载速度提升 ~40%。

### 加载工作流

```
Step 1：确定风格编号（如 #7 瑞士国际主义）
Step 2：查 fonts/font-match-engine.md §二 → 字体分类ID = F2
Step 3：查 fonts/font-catalog.md → 分类文件 = sans-modern.md
Step 4：加载 fonts/sans-modern.md → 获取 CDN link（含 preconnect）+ CSS font-family
Step 5：INJECT_STYLE_CSS 注入 = CDN link（含 preconnect + preload）+ CSS 变量 + font-family 声明
```

### 字体分类索引

| 分类ID | 分类名 | 模块文件 | Token~ | 适用风格数 |
|:------:|-------|------|:------:|:--------:|
| F1 | 衬线经典 | `serif-classic.md` | ~80 | 14 |
| F2 | 无衬线现代 | `sans-modern.md` | ~80 | 7 |
| F3 | 极粗醒目 | `extreme-bold.md` | ~80 | 3 |
| F4 | 圆润可爱 | `rounded-cute.md` | ~80 | 2 |
| F5 | 手写文艺 | `handwriting.md` | ~80 | 2 |
| F6 | 楷体传统 | `kaiti-traditional.md` | ~80 | 1 |
| F7 | 未来科技 | `scifi-tech.md` | ~80 | 2 |
| F8 | 哥特古典 | `gothic-classical.md` | ~80 | 2 |

---

## 技能维护说明

- **版本号**：当前为 v28.1
- **变更日志**：所有历史版本变更记录在 `CHANGELOG.md`
- **参考文件版本**：各 `references/` 文件页脚标注自维护版本号，以 SKILL.md 主版本号为准
- **框架文件**：`assets/framework.html` 头部注释标注版本号
- **v28.1 核心修复**：彻底修复 LOGO 右下角方框 bug（v28.0 仅移除 CSS 的 `background-color`/`mask-image`，但未解决 `<img src="">` 空 src 导致浏览器渲染破损图片占位框的根因）。修复：`.logo-preview` CSS 默认 `display:none`（无有效 src 时不渲染），`selectLogo()` 无自定义 LOGO 时保持隐藏，`resetLogo()` 移除 `display:block` 恢复。`framework.html` + `framework.js` + `framework.css` 三文件同步修复。

---

## 参考文件索引

| 文件 | 用途 | 加载模式 |
|------|------|---------|
| `assets/framework.html` | **v28.1** 预建框架（彻底修复 LOGO 方框 bug，空 src 不渲染） | Step 2 必加载 |
| `assets/framework.css` | **v28.1** 框架 CSS（`.logo-preview` 默认 `display:none`） | 随 framework.html |
| `assets/styles-css/{01-31}.css` | **v23.0** 31 种风格 CSS（已剥离 CDN） | Step 2 选定风格后加载 |
| `assets/decor-html/{01-31}.html` | **v15.0** 31 种风格装饰 HTML | Step 2 选定风格后加载 |
| **字体模块** | | |
| `references/fonts/font-catalog.md` | 字体分类总索引 | 确定字体分类ID时 |
| `references/fonts/font-match-engine.md` | 风格编号→字体分类映射 | 风格确定后加载 §二 |
| `references/fonts/{F1-F8}.md` | 8 类字体模块（CDN+CSS+参数） | 按分类ID按需加载 1 个 |
| **设计资源** | | |
| `references/design-styles-reference.md` | **v23.0** 31 种风格定义+配色 | 风格匹配时按需加载 §一/§二 |
| `references/smart-match-engine.md` | **v22.0** 智能匹配规则+方案生成 | 模式 A 时核心参考 |
| `references/layout-templates.md` | **v22.0** 6 套排版模板+联动规则 | 选定模板后按需加载 §二 |
| `references/typography-system.md` | **v23.0** 文字层级+特效+联动表 | 精细设计时按需加载 §二/§五 |
| `references/visual-elements-library.md` | **v22.0** 7 大类设计元素+联动表 | 精细设计时按需加载 §三 |
| `references/decor-elements-reference.md` | **v16.0** 25 种装饰元素 CSS | Step 2 装饰选择参考 |
| `references/html-template-reference.md` | **v21.1** 框架注入指南 | Step 2 注入参考 |
| `references/option-panel-reference.md` | **v28.0** 选项面板功能描述（含 LOGO 设置） | 排查时加载 |
| `references/shared-components.md` | **v28.1** CSS 变量+JS 函数速查 | 注入或排查时加载 |
| `references/ai-bg-prompt-templates.md` | **v21.0** AI 背景 prompt 模板 | Step 4 加载 |
| `CHANGELOG.md` | 完整版本历史 | 维护时加载 |

---

> **v28.1 核心变更**：(1) 彻底修复 LOGO 右下角方框 bug：根因是 `<img class="logo-preview" src="">` 空 src 导致浏览器渲染破损图片占位框（50×50px）。v28.0 仅移除 CSS 的 `background-color`/`mask-image`，未解决根本问题。修复：`.logo-preview` CSS 默认 `display:none`，`selectLogo()` 无自定义 LOGO 时保持隐藏，`resetLogo()` 移除 `display:block`（三处同步加固）；(2) `framework.html` + `framework.js` + `framework.css` 同步修复，版本号升级至 v28.1。
