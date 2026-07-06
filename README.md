# 小红书封面设计技能包 / Xiaohongshu Cover Generator

> 生成小红书封面 HTML 预览页面。提供 31 种设计风格、6 套排版模板、8 类字体系统和 60+ 视觉装饰元素，支持智能匹配 3 套差异化方案点选输出。
> 
> Generate HTML preview pages for Xiaohongshu (Little Red Book) covers. Features 31 design styles, 6 layout templates, 8 font systems, and 60+ visual decorative elements. Supports intelligent matching with 3 differentiated schemes for selection.

---

## 📋 目录 / Table of Contents

- [技能概述 / Overview](#-技能概述--overview)
- [功能特性 / Features](#-功能特性--features)
- [安装步骤 / Installation](#-安装步骤--installation)
- [使用方法 / Usage](#-使用方法--usage)
- [🖼️ 案例展示 / Examples](#️-案例展示--examples)
- [配置指南 / Configuration](#-配置指南--configuration)
- [文件结构 / File Structure](#-文件结构--file-structure)
- [常见问题解答 / FAQ](#-常见问题解答--faq)
- [贡献指南 / Contributing](#-贡献指南--contributing)
- [许可证 / License](#-许可证--license)
- [资源说明 / Resource Notes](#-资源说明--resource-notes)
- [图片索引 / Image Index](#-图片索引--image-index)

---

## 🌟 技能概述 / Overview

**xiaohongshu-cover** 是一个专为小红书平台设计的封面生成技能包，基于模块化架构，提供智能内容分析和多方案匹配能力。

**xiaohongshu-cover** is a cover generation skill package designed specifically for the Xiaohongshu platform. Built on a modular architecture, it provides intelligent content analysis and multi-scheme matching capabilities.

### 核心能力 / Core Capabilities

| 能力 / Capability | 说明 / Description |
|------------------|-------------------|
| **智能匹配 / Intelligent Matching** | 基于内容品类、调性、受众、字数四维度自动分析，生成 3 套差异化方案 |
| **多方案输出 / Multi-scheme Output** | 流量爆款风 / 质感高级风 / 小众特色风，用户可点选选择 |
| **实时预览 / Real-time Preview** | 生成 HTML 预览页面，支持实时调节和导出 |
| **AI 背景图 / AI Background** | 支持 AI 生成背景图，提供多种风格的 Prompt 模板 |

### 封面效果预览 / Cover Preview

图1-1：技能生成的小红书封面效果示例 / Figure 1-1: Example of generated Xiaohongshu cover

<img src="assets/images/小红书封面.png" width="65%" />

---

## ✨ 功能特性 / Features

### 设计资源 / Design Resources

- **31 种设计风格**：涵盖美妆、美食、知识干货、穿搭、旅行、书评、职场、情感等 12 类内容场景
- **6 套排版模板**：大字标题型、左图右文型、上下分栏型、卡片拼接型、留白极简型、新中式禅意型
- **8 类字体系统**：衬线经典、无衬线现代、极粗醒目、圆润可爱、手写文艺、楷体传统、未来科技、哥特古典
- **60+ 视觉装饰元素**：肌理纹理、装饰线条、图标符号、色块拼接、噪点质感、国风纹样、潮玩几何

- **31 Design Styles**: Covering 12 content categories including beauty, food, knowledge, fashion, travel, book reviews, career, and emotions
- **6 Layout Templates**: Large title, left-image-right-text, top-bottom split, card mosaic, minimal white space, new Chinese zen
- **8 Font Systems**: Serif classic, sans-serif modern, extreme bold, rounded cute, handwritten artistic, kaiti traditional, sci-fi tech, gothic classical
- **60+ Visual Decorative Elements**: Texture, decorative lines, icons, color blocks, noise texture, Chinese patterns, geometric elements

### 智能匹配引擎 / Intelligent Matching Engine

```
用户输入分析
├─ 品类识别（12 类）
├─ 调性分析（6 种）
├─ 受众识别
└─ 字数分级
       ↓
生成 3 套差异化方案（A/B/C）
```

```
User Input Analysis
├─ Category Recognition (12 types)
├─ Tone Analysis (6 types)
├─ Audience Recognition
└─ Word Count Classification
       ↓
Generate 3 Differentiated Schemes (A/B/C)
```

### 输出能力 / Output Capabilities

- 支持 5 种封面尺寸：3:4、1:1、9:16、4:3、16:9
- 导出格式：PNG、JPG、WebP（2 倍像素高清）
- 左侧面板实时调节：风格微调、尺寸切换、LOGO 上传/布局/显示切换、水印、背景缩放/透明度/混合模式

- Supports 5 cover sizes: 3:4, 1:1, 9:16, 4:3, 16:9
- Export formats: PNG, JPG, WebP (2x pixel HD)
- Left panel real-time adjustments: style fine-tuning, size switching, LOGO upload/layout/display switching, watermark, background scaling/transparency/blend mode

### 操作界面概览 / Interface Overview

图2-1：封面生成操作界面，左侧为调节面板，右侧为实时预览区域 / Figure 2-1: Cover generation interface, left panel for adjustments, right panel for real-time preview

<img src="assets/images/后期微调操作界面.png" width="80%" />

> **标注说明 / Annotation**:
> - ① 画布设置区：切换封面尺寸、主题模式 / Canvas settings: switch cover size, theme mode
> - ② 背景调整区：上传背景图、调整缩放和透明度 / Background adjustment: upload background, adjust scaling and transparency
> - ③ 混合增强区：调整对比度、亮度、饱和度等参数 / Blend enhancement: adjust contrast, brightness, saturation
> - ④ 风格微调控件：精细调节标题、副标题、内容、标签的样式 / Style fine-tuning: adjust title, subtitle, content, tag styles
> - ⑤ LOGO 设置区：上传自定义 LOGO、调整位置和显示 / LOGO settings: upload custom LOGO, adjust position and display
> - ⑥ 水印设置区：添加水印、调整数量和样式 / Watermark settings: add watermark, adjust quantity and style
> - ⑦ 导出按钮：支持 PNG/JPG/WebP 三种格式导出 / Export button: supports PNG/JPG/WebP formats

---

## 🚀 安装步骤 / Installation

### 方法一：下载技能包 / Method 1: Download Skill Package

1. 前往 GitHub Releases 页面下载最新版本 / Go to GitHub Releases page to download the latest version
2. 解压 `xiaohongshu-cover-v28.1.zip` 到本地目录 / Extract `xiaohongshu-cover-v28.1.zip` to local directory

### 方法二：克隆仓库 / Method 2: Clone Repository

```bash
git clone https://github.com/taohuayuan21bc/xiaohongshu-cover.git
cd xiaohongshu-cover
```

### 环境要求 / Environment Requirements

- 支持现代浏览器（Chrome、Firefox、Safari、Edge）
- 无需额外依赖，纯 HTML/CSS/JS 实现

- Supports modern browsers (Chrome, Firefox, Safari, Edge)
- No additional dependencies required, pure HTML/CSS/JS implementation

---

## 📖 使用方法 / Usage

### 基础工作流 / Basic Workflow

```
Step 0：内容收集
    ├─ 用户提供文案 或 AI 创作文案
    └─ 账号名称（可选）
       ↓
Step 1：智能匹配
    ├─ 分析内容（品类/调性/受众/字数）
    ├─ 生成 3 套方案（A/B/C）
    └─ 用户点选选择方案
       ↓
Step 2：生成封面
    ├─ 加载对应风格/模板/字体资源
    ├─ 注入内容到框架
    └─ 预览封面
       ↓
Step 3：AI 背景图（可选）
    ├─ 生成 1-3 张 AI 背景图
    └─ 用户选择并应用
       ↓
Step 4：最终交付
    └─ 用户可通过面板实时调节
```

```
Step 0: Content Collection
    ├─ User provides copy or AI generates copy
    └─ Account name (optional)
       ↓
Step 1: Intelligent Matching
    ├─ Analyze content (category/tone/audience/word count)
    ├─ Generate 3 schemes (A/B/C)
    └─ User selects preferred scheme
       ↓
Step 2: Generate Cover
    ├─ Load corresponding style/template/font resources
    ├─ Inject content into framework
    └─ Preview cover
       ↓
Step 3: AI Background (Optional)
    ├─ Generate 1-3 AI background images
    └─ User selects and applies
       ↓
Step 4: Final Delivery
    └─ User can adjust in real-time via panel
```

### 操作步骤详解 / Detailed Steps

#### Step 0：内容收集 / Content Collection

系统会询问您的内容来源和账号名称：
- **内容来源**：您可以提供具体文案，或给出主题让 AI 帮您创作
- **账号名称**：可选填写，用于在封面上展示您的账号

The system will ask for your content source and account name:
- **Content Source**: You can provide specific copy or give a theme for AI to generate
- **Account Name**: Optional, for display on the cover

#### Step 1：智能匹配 / Intelligent Matching

系统会分析您的内容，自动生成 3 套差异化方案：
- **方案 A（流量爆款风）**：高对比度、强 accent 色、暖色系，点击率优先
- **方案 B（质感高级风）**：低饱和度、莫兰迪色系、中性色，品牌感优先
- **方案 C（小众特色风）**：特色配色、风格化设计，记忆点优先

您只需点击选择喜欢的方案即可。

The system analyzes your content and automatically generates 3 differentiated schemes:
- **Scheme A (Viral Style)**: High contrast, strong accent color, warm tones, click-through rate priority
- **Scheme B (Premium Style)**: Low saturation, Morandi colors, neutral tones, brand identity priority
- **Scheme C (Niche Style)**: Unique color scheme, stylized design, memorability priority

Simply click to select your preferred scheme.

#### Step 2：生成封面 / Generate Cover

系统加载对应资源并生成封面 HTML 文件，自动打开预览。

图3-1：生成的封面预览界面 / Figure 3-1: Generated cover preview interface

<img src="assets/images/后期微调操作界面.png" width="75%" />

#### Step 3：AI 背景图（可选） / AI Background (Optional)

系统会询问是否需要 AI 生成背景图：
- 选择"需要"：AI 根据封面风格生成 1-3 张背景图供选择
- 选择"不需要"：保留纯设计封面

The system will ask if AI-generated background is needed:
- Select "Yes": AI generates 1-3 background images based on cover style
- Select "No": Keep pure design cover

#### Step 4：最终交付 / Final Delivery

交付后您可以通过左侧面板进行实时调节：
- 调整风格参数（字重、字间距、字号等）
- 切换封面尺寸
- 上传自定义 LOGO 和背景图
- 添加水印

After delivery, you can adjust in real-time via the left panel:
- Adjust style parameters (font weight, letter spacing, font size, etc.)
- Switch cover sizes
- Upload custom LOGO and background images
- Add watermark

### 使用示例 / Usage Examples

**示例 1：智能匹配模式 / Example 1: Intelligent Matching Mode**

```
用户：帮我做一个关于"夏日护肤攻略"的小红书封面

系统：分析内容后推荐 3 套方案
├─ 方案 A：流量爆款风（高对比、强 accent、暖色系）
├─ 方案 B：质感高级风（低饱和、莫兰迪、中性色系）
└─ 方案 C：小众特色风（特色配色、风格化）

用户选择方案 B → 生成封面 → 预览 → 交付
```

```
User: Help me make a Xiaohongshu cover about "Summer Skincare Guide"

System: Recommends 3 schemes after analysis
├─ Scheme A: Viral style (high contrast, strong accent, warm tones)
├─ Scheme B: Premium style (low saturation, Morandi, neutral tones)
└─ Scheme C: Niche style (unique colors, stylized)

User selects Scheme B → Generate cover → Preview → Delivery
```

**示例 2：直接指定风格 / Example 2: Direct Style Selection**

```
用户：帮我做一个封面，使用 #7 瑞士国际主义风格

系统：直接加载 #7 风格资源 → 生成封面 → 预览 → 交付
```

```
User: Help me make a cover using #7 Swiss International style

System: Directly loads #7 style resources → Generate cover → Preview → Delivery
```

### 快捷键 / Shortcuts

| 快捷键 / Shortcut | 功能 / Function |
|------------------|----------------|
| `Ctrl + E` | 导出图片 / Export image |
| `Ctrl + S` | 保存预设 / Save preset |
| `1-5` | 切换封面尺寸（3:4/1:1/9:16/4:3/16:9） |

---

## 🖼️ 案例展示 / Examples

### 文学书评论类 / Literature & Book Reviews

#### 案例 1-2：书评封面合集 / Cases 1-2: Book Review Cover Collection

图4-1：《生死疲劳》书评封面（国风雅致风格） / Figure 4-1: "Life and Death Are Wearing Me Out" Book Review Cover (Chinese Elegance Style)

<img src="assets/images/封面-生死疲劳-20260703.png" width="55%" />

**案例概述**：为莫言作品《生死疲劳》设计的书评封面，采用国风雅致风格，水墨意境，体现文学作品的厚重感。

**Case Overview**: Book review cover designed for Mo Yan's "Life and Death Are Wearing Me Out", using Chinese elegance style with ink wash aesthetic, embodying the profoundness of literary works.

**重点标注 / Key Features**:
- 主标题："生死疲劳"采用书法字体，突出文学气质 / Main title: "生死疲劳" uses calligraphy font, emphasizing literary quality
- 副标题："莫言代表作"简洁点明书籍地位 / Subtitle: "莫言代表作" concisely indicates the book's status
- 装饰元素：水墨笔触和祥云纹样，营造古典氛围 / Decorative elements: ink brush strokes and cloud patterns, creating classical atmosphere
- 配色：水墨灰为主色调，点缀红色 accent / Color scheme: ink gray as main tone, with red accent

---

图4-2：《妻妾成群》书评封面（复古港风风格） / Figure 4-2: "Wives and Concubines" Book Review Cover (Retro Hong Kong Style)

<img src="assets/images/封面-妻妾成群-20260705.png" width="55%" />

**案例概述**：为苏童作品《妻妾成群》设计的书评封面，采用复古港风风格，带有年代感和文艺气息。

**Case Overview**: Book review cover designed for Su Tong's "Wives and Concubines", using retro Hong Kong style with a sense of era and artistic atmosphere.

**重点标注 / Key Features**:
- 主标题："妻妾成群"采用衬线字体，复古感十足 / Main title: "妻妾成群" uses serif font, full of retro feel
- 副标题："苏童经典作品"点明作者 / Subtitle: "苏童经典作品" indicates the author
- 装饰元素：复古边框和花纹 / Decorative elements: retro borders and patterns
- 配色：暖色调为主，营造怀旧氛围 / Color scheme: warm tones, creating nostalgic atmosphere

---

#### 案例 3-4：经典文学封面 / Cases 3-4: Classic Literature Covers

图4-3：《百年孤独》书评封面（暗黑质感风格） / Figure 4-3: "One Hundred Years of Solitude" Book Review Cover (Dark Texture Style)

<img src="assets/images/封面-百年孤独-20260703.jpg" width="55%" />

**案例概述**：为马尔克斯作品《百年孤独》设计的书评封面，采用暗黑质感风格，体现魔幻现实主义的神秘氛围。

**Case Overview**: Book review cover designed for Gabriel García Márquez's "One Hundred Years of Solitude", using dark texture style, embodying the mysterious atmosphere of magical realism.

**重点标注 / Key Features**:
- 主标题："百年孤独"采用哥特字体，神秘感十足 / Main title: "百年孤独" uses gothic font, full of mystery
- 副标题："魔幻现实主义巅峰之作"点明作品地位 / Subtitle: "魔幻现实主义巅峰之作" indicates the work's status
- 装饰元素：星空和神秘图案 / Decorative elements: starry sky and mysterious patterns
- 配色：深色系为主，金色 accent 点缀 / Color scheme: dark tones with gold accent

---

图4-4：《神曲·地狱篇》书评封面（未来科技风格） / Figure 4-4: "Divine Comedy: Inferno" Book Review Cover (Sci-fi Tech Style)

<img src="assets/images/小红书封面-神曲地狱篇.png" width="55%" />

**案例概述**：为但丁作品《神曲·地狱篇》设计的书评封面，采用未来科技风格，展现地狱的神秘感和视觉冲击力。

**Case Overview**: Book review cover designed for Dante's "Divine Comedy: Inferno", using sci-fi tech style, showing the mystery and visual impact of hell.

**重点标注 / Key Features**:
- 主标题："神曲·地狱篇"采用科技感字体 / Main title: "神曲·地狱篇" uses tech-style font
- 副标题："但丁经典史诗"点明作品背景 / Subtitle: "但丁经典史诗" indicates the work's background
- 装饰元素：科技线条和光效 / Decorative elements: tech lines and light effects
- 配色：暗紫色为主，荧光色 accent / Color scheme: dark purple with neon accent

---

### 知识干货类 / Knowledge & Tips

#### 案例 5：Obsidian 高效笔记法封面 / Case 5: Obsidian Note-taking Method Cover

图4-5：Obsidian 高效笔记法封面（瑞士国际主义风格） / Figure 4-5: Obsidian Efficient Note-taking Cover (Swiss International Style)

<img src="assets/images/封面-Obsidian高效笔记法-20260704.png" width="55%" />

**案例概述**：为"Obsidian 高效笔记法"主题设计的知识干货封面，采用瑞士国际主义风格，简洁现代，突出专业性。

**Case Overview**: Knowledge cover designed for "Obsidian Efficient Note-taking Method" topic, using Swiss International style, clean and modern, emphasizing professionalism.

**重点标注 / Key Features**:
- 主标题："Obsidian 高效笔记法"采用无衬线现代字体 / Main title: "Obsidian 高效笔记法" uses sans-serif modern font
- 副标题："打造第二大脑"点明核心价值 / Subtitle: "打造第二大脑" indicates core value
- 装饰元素：简洁的几何图形和线条 / Decorative elements: simple geometric shapes and lines
- 配色：蓝灰色系，科技感十足 / Color scheme: blue-gray tones, full of tech feel

---

### 美食探店类 / Food & Restaurant Guide

#### 案例 6-7：顺德美食地图封面（不同尺寸对比） / Cases 6-7: Shunde Food Map Covers (Size Comparison)

图4-6：顺德美食地图封面（清新自然风格，3:4 竖版） / Figure 4-6: Shunde Food Map Cover (Fresh Natural Style, 3:4 Vertical)

<img src="assets/images/封面-顺德美食地图-20260704.png" width="50%" />

---

图4-7：顺德美食地图封面（清新自然风格，9:16 竖版） / Figure 4-7: Shunde Food Map Cover (Fresh Natural Style, 9:16 Vertical)

<img src="assets/images/封面-顺德美食地图-20260704-9.16.png" width="40%" />

**案例概述**：为"顺德美食地图"主题设计的美食封面，采用清新自然风格，展现美食的诱人感。

**Case Overview**: Food cover designed for "Shunde Food Map" topic, using fresh natural style, showing the appealing nature of food.

**重点标注 / Key Features**:
- 主标题："顺德美食地图"采用圆润可爱字体 / Main title: "顺德美食地图" uses rounded cute font
- 副标题："寻味顺德，舌尖上的岭南"点明主题 / Subtitle: "寻味顺德，舌尖上的岭南" indicates the theme
- 装饰元素：美食相关图标和图案 / Decorative elements: food-related icons and patterns
- 配色：暖色系，橙色 accent 突出食欲 / Color scheme: warm tones with orange accent for appetite appeal

**尺寸对比 / Size Comparison**:
- 3:4 版本（图4-6）：540×720px，适合小红书标准竖版封面 / 3:4 version (Figure 4-6): 540×720px, suitable for Xiaohongshu standard vertical cover
- 9:16 版本（图4-7）：540×960px，适合全屏视频封面 / 9:16 version (Figure 4-7): 540×960px, suitable for full-screen video cover

---

### 封面案例对比 / Cover Style Comparison

图4-8：不同风格封面案例对比 / Figure 4-8: Comparison of Different Cover Styles

| 风格 / Style | 适用场景 / Scenario | 视觉特点 / Visual Features |
|-------------|-------------------|--------------------------|
| 国风雅致 / Chinese Elegance | 文学、传统文化 / Literature, traditional culture | 水墨、书法、古典纹样 / Ink wash, calligraphy, classical patterns |
| 复古港风 / Retro Hong Kong | 怀旧、文艺 / Nostalgic, artistic | 暖色调、衬线字体、复古边框 / Warm tones, serif font, retro borders |
| 暗黑质感 / Dark Texture | 悬疑、神秘 / Mystery, suspense | 深色系、哥特字体、光效 / Dark tones, gothic font, light effects |
| 瑞士国际主义 / Swiss International | 科技、知识干货 / Tech, knowledge | 简洁、几何、无衬线字体 / Clean, geometric, sans-serif font |
| 清新自然 / Fresh Natural | 美食、旅行 / Food, travel | 明亮、圆润、自然元素 / Bright, rounded, natural elements |

---

## ⚙️ 配置指南 / Configuration

### 风格编号对照 / Style Number Reference

| 编号 / ID | 风格名称 / Style Name | 适用场景 / Scenario |
|----------|---------------------|-------------------|
| #1 | 日系清新 / Japanese Fresh | 生活、日常、治愈 / Life, daily, healing |
| #2 | 复古港风 / Retro Hong Kong | 穿搭、美妆、怀旧 / Fashion, beauty, nostalgic |
| #3 | 极简留白 / Minimal White | 知识、干货、高端 / Knowledge, tips, premium |
| #4 | 撞色活力 / Bold Color | 运动、健身、青春 / Sports, fitness, youthful |
| #5 | 国风雅致 / Chinese Elegance | 文化、传统、书法 / Culture, tradition, calligraphy |
| #6 | 轻奢高级 / Light Luxury | 时尚、奢侈品、高端 / Fashion, luxury, premium |
| #7 | 瑞士国际主义 / Swiss International | 科技、产品、现代 / Tech, product, modern |
| #8 | 水墨意境 / Ink Wash | 文学、艺术、古典 / Literature, art, classical |
| #9 | 扁平几何 / Flat Geometry | 数据、图表、科普 / Data, charts, science |
| #10 | 渐变流光 / Gradient Flow | 美妆、时尚、梦幻 / Beauty, fashion, dreamy |
| #11 | 暗黑质感 / Dark Texture | 潮酷、个性、小众 / Cool, unique, niche |
| #12 | 清新自然 / Fresh Natural | 美食、旅行、户外 / Food, travel, outdoor |
| ... | ... | ... |

完整风格列表见 [design-styles-reference.md](references/design-styles-reference.md)

Complete style list: [design-styles-reference.md](references/design-styles-reference.md)

### 模板类型 / Template Types

| 编号 / ID | 模板名称 / Template Name | 特点 / Features |
|----------|------------------------|---------------|
| T1 | 大字标题型 / Large Title | 主标题占主导，醒目吸睛 / Main title dominates, eye-catching |
| T2 | 左图右文型 / Left Image Right Text | 图文并茂，信息丰富 / Image-text combination, informative |
| T3 | 上下分栏型 / Top Bottom Split | 层次分明，结构清晰 / Clear hierarchy, structured |
| T4 | 卡片拼接型 / Card Mosaic | 模块化设计，灵活组合 / Modular design, flexible combination |
| T5 | 留白极简型 / Minimal White Space | 大量留白，高级质感 / Abundant white space, premium feel |
| T6 | 新中式禅意型 / New Chinese Zen | 东方美学，意境深远 / Eastern aesthetics, profound mood |

### 字体分类 / Font Categories

| 分类ID / Category ID | 分类名 / Category Name | 适用风格 / Compatible Styles |
|---------------------|----------------------|----------------------------|
| F1 | 衬线经典 / Serif Classic | #1 #2 #3 #4 #5 #6 #14 #15 #18 #19 #24 #27 #28 #29 |
| F2 | 无衬线现代 / Sans Modern | #7 #9 #10 #11 #12 #13 #16 #17 #20 #25 #26 #30 |
| F3 | 极粗醒目 / Extreme Bold | #21 #22 #31 |
| F4 | 圆润可爱 / Rounded Cute | #21 #23 |
| F5 | 手写文艺 / Handwritten | #8 #24 |
| F6 | 楷体传统 / Kaiti Traditional | #8 #31 |
| F7 | 未来科技 / Sci-fi Tech | #7 #11 |
| F8 | 哥特古典 / Gothic Classical | #2 #6 |

---

## 📁 文件结构 / File Structure

```
xiaohongshu-cover/
├── assets/                    # 资源文件 / Assets
│   ├── decor-html/           # 装饰元素 HTML 模板（31 个）
│   ├── styles-css/           # 风格 CSS 模板（31 个）
│   ├── images/               # 示例图片（案例截图和操作界面）
│   │   ├── 后期微调操作界面.png
│   │   ├── 封面-Obsidian高效笔记法-20260704.png
│   │   ├── 封面-妻妾成群-20260705.png
│   │   ├── 封面-生死疲劳-20260703.png
│   │   ├── 封面-百年孤独-20260703.jpg
│   │   ├── 封面-顺德美食地图-20260704-9.16.png
│   │   ├── 封面-顺德美食地图-20260704.png
│   │   ├── 小红书封面-神曲地狱篇.png
│   │   └── 小红书封面.png
│   ├── framework.css         # 框架 CSS（v28.1）
│   ├── framework.html        # 框架 HTML（v28.1）
│   └── framework.js          # 框架 JS（v28.1）
├── references/               # 参考文档 / References
│   ├── fonts/                # 字体模块（8 个）
│   │   ├── font-catalog.md       # 字体分类总索引
│   │   ├── font-match-engine.md  # 风格→字体映射
│   │   ├── serif-classic.md      # 衬线经典
│   │   ├── sans-modern.md        # 无衬线现代
│   │   ├── extreme-bold.md       # 极粗醒目
│   │   ├── rounded-cute.md       # 圆润可爱
│   │   ├── handwriting.md        # 手写文艺
│   │   ├── kaiti-traditional.md  # 楷体传统
│   │   ├── scifi-tech.md         # 未来科技
│   │   └── gothic-classical.md   # 哥特古典
│   ├── ai-bg-prompt-templates.md    # AI 背景 Prompt 模板
│   ├── architecture-optimization-v22.md
│   ├── decor-elements-reference.md  # 装饰元素参考
│   ├── design-styles-reference.md   # 设计风格参考
│   ├── html-template-reference.md   # HTML 模板参考
│   ├── layout-templates.md          # 排版模板
│   ├── new-features-summary-v22.md
│   ├── option-panel-reference.md    # 选项面板参考
│   ├── shared-components.md         # 共享组件
│   ├── smart-match-engine.md        # 智能匹配引擎
│   ├── test-report-v22.md
│   ├── typography-system.md         # 文字样式体系
│   └── visual-elements-library.md   # 视觉元素库
├── scripts/                  # 脚本工具 / Scripts
│   └── generate_templates.py   # 模板生成脚本
├── CHANGELOG.md              # 版本变更日志
├── SKILL.md                  # 技能核心定义（v28.1）
└── README.md                 # 项目说明文档
```

---

## ❓ 常见问题解答 / FAQ

### Q1：封面右下角出现方框是什么原因？ / Why is there a square box in the bottom right corner?

**原因**：这是 LOGO 预览元素的空 src 导致的浏览器渲染问题。

**原因 / Cause**: This is a browser rendering issue caused by the empty src of the LOGO preview element.

**解决方案**：v28.1 已彻底修复此问题，`.logo-preview` 默认 `display:none`，无自定义 LOGO 时不渲染。

**解决方案 / Solution**: This issue has been completely fixed in v28.1. `.logo-preview` defaults to `display:none` and won't render when no custom LOGO is set.

### Q2：如何自定义 LOGO？ / How to customize LOGO?

1. 在左侧面板找到「🏷 LOGO 设置」折叠面板（图2-1 中⑤区域）
2. 点击「自定义 LOGO 上传」上传图片
3. 选择 LOGO 位置：右下角/左下角/底部居中/顶部居中
4. 点击「显示 LOGO」或「隐藏 LOGO」控制显示

1. Find the "🏷 LOGO Settings" panel in the left sidebar (Area ⑤ in Figure 2-1)
2. Click "Upload Custom LOGO" to upload your image
3. Select LOGO position: bottom right/bottom left/bottom center/top center
4. Click "Show LOGO" or "Hide LOGO" to control display

### Q3：支持哪些封面尺寸？ / What cover sizes are supported?

- **3:4**（默认）：540×720px，适合小红书竖版封面（如图4-6）
- **1:1**：600×600px，适合正方形内容
- **9:16**：540×960px，适合全屏视频封面（如图4-7）
- **4:3**：720×540px，适合横版内容
- **16:9**：960×540px，适合宽屏内容

- **3:4** (default): 540×720px, suitable for Xiaohongshu vertical cover (Figure 4-6)
- **1:1**: 600×600px, suitable for square content
- **9:16**: 540×960px, suitable for full-screen video cover (Figure 4-7)
- **4:3**: 720×540px, suitable for horizontal content
- **16:9**: 960×540px, suitable for wide-screen content

### Q4：如何导出高清图片？ / How to export high-definition images?

1. 点击底部「导出 PNG/JPG/WebP」按钮（图2-1 中⑦区域）
2. 导出时自动使用 2 倍像素（如 3:4 导出为 1080×1440px）
3. 支持切换导出格式（PNG/JPG/WebP）

1. Click the "Export PNG/JPG/WebP" button at the bottom (Area ⑦ in Figure 2-1)
2. Export automatically uses 2x pixels (e.g., 3:4 exports as 1080×1440px)
3. Supports switching export formats (PNG/JPG/WebP)

### Q5：AI 背景图生成失败怎么办？ / What if AI background generation fails?

1. 检查网络连接
2. 确认输入内容符合平台规范
3. 尝试重新生成
4. 如仍失败，选择「不需要，纯设计封面即可」

1. Check network connection
2. Confirm input content complies with platform guidelines
3. Try regenerating
4. If still failing, select "No, pure design cover is fine"

### Q6：如何保存我的自定义设置？ / How to save my custom settings?

1. 调节好各项参数后，点击「💾 保存当前预设」
2. 设置会保存在本地浏览器 localStorage 中
3. 下次使用时点击「📂 加载我的预设」恢复

1. After adjusting parameters, click "💾 Save Current Preset"
2. Settings are saved in local browser localStorage
3. Click "📂 Load My Preset" to restore next time

---

## 🤝 贡献指南 / Contributing

### 开发流程 / Development Workflow

1. **Fork 仓库**：点击 GitHub 页面右上角的 Fork 按钮 / Fork the repository
2. **克隆到本地**：`git clone https://github.com/taohuayuan21bc/xiaohongshu-cover.git` / Clone to local
3. **创建分支**：`git checkout -b feature/your-feature-name` / Create branch
4. **开发**：实现功能或修复问题 / Implement features or fix bugs
5. **提交**：`git commit -m "feat: 添加新功能"` / Commit changes
6. **推送**：`git push origin feature/your-feature-name` / Push to remote
7. **创建 PR**：在 GitHub 页面创建 Pull Request / Create Pull Request

### 贡献规范 / Contribution Guidelines

#### 提交信息格式 / Commit Message Format

```
<类型>: <描述>

<详细说明（可选）>
```

| 类型 / Type | 说明 / Description |
|------------|-------------------|
| `feat` | 新功能 / New feature |
| `fix` | 修复问题 / Bug fix |
| `docs` | 文档更新 / Documentation |
| `style` | 代码风格调整 / Code style |
| `refactor` | 重构 / Refactoring |
| `test` | 测试 / Testing |
| `chore` | 其他更改 / Other changes |

#### 代码规范 / Code Standards

- HTML/CSS/JS 代码保持整洁 / Keep HTML/CSS/JS code clean
- 函数和变量命名清晰 / Use clear function and variable names
- 添加必要的注释 / Add necessary comments
- 遵循现有代码风格 / Follow existing code style

### 新增风格指南 / New Style Guide

1. 在 `assets/styles-css/` 创建新的 CSS 文件 / Create new CSS file in `assets/styles-css/`
2. 在 `assets/decor-html/` 创建对应的装饰 HTML / Create corresponding decor HTML in `assets/decor-html/`
3. 在 `references/design-styles-reference.md` 添加风格定义 / Add style definition in `references/design-styles-reference.md`
4. 在 `references/fonts/font-match-engine.md` 添加字体映射 / Add font mapping in `references/fonts/font-match-engine.md`
5. 在 `references/ai-bg-prompt-templates.md` 添加 AI Prompt / Add AI Prompt in `references/ai-bg-prompt-templates.md`

---

## 📄 许可证 / License

MIT License

---

## 📞 联系方式 / Contact

如有问题或建议，欢迎通过以下方式联系：

If you have questions or suggestions, feel free to contact us:

- GitHub Issues：[提交问题](https://github.com/taohuayuan21bc/xiaohongshu-cover/issues)
- GitHub 账号：[taohuayuan21bc](https://github.com/taohuayuan21bc)
- 邮箱：taohuayuan21bc@yeah.net

---

## 📦 资源说明 / Resource Notes

本文档中所有 PNG 格式案例文件及操作界面截图均为项目原创资源。如有使用疑问，请联系：GitHub 账号 taohuayuan21bc 或邮箱 taohuayuan21bc@yeah.net

All PNG format case files and operation interface screenshots in this document are original resources of the project. For usage questions, please contact: GitHub account taohuayuan21bc or email taohuayuan21bc@yeah.net

---

## 📷 图片索引 / Image Index

| 图号 / Figure | 图片名称 / Image Name | 章节位置 / Section | 显示宽度 / Width | 说明 / Description |
|--------------|---------------------|-------------------|------------------|-------------------|
| 图1-1 / Figure 1-1 | 小红书封面.png | 技能概述 / Overview | 65% | 封面效果预览示例 / Cover preview example |
| 图2-1 / Figure 2-1 | 后期微调操作界面.png | 功能特性 / Features | 80% | 操作界面概览 / Interface overview |
| 图3-1 / Figure 3-1 | 后期微调操作界面.png | 使用方法 / Usage | 75% | 封面预览界面示例 / Cover preview interface |
| 图4-1 / Figure 4-1 | 封面-生死疲劳-20260703.png | 案例展示 / Examples | 55% | 《生死疲劳》书评封面 / Book review cover |
| 图4-2 / Figure 4-2 | 封面-妻妾成群-20260705.png | 案例展示 / Examples | 55% | 《妻妾成群》书评封面 / Book review cover |
| 图4-3 / Figure 4-3 | 封面-百年孤独-20260703.jpg | 案例展示 / Examples | 55% | 《百年孤独》书评封面 / Book review cover |
| 图4-4 / Figure 4-4 | 小红书封面-神曲地狱篇.png | 案例展示 / Examples | 55% | 《神曲·地狱篇》书评封面 / Book review cover |
| 图4-5 / Figure 4-5 | 封面-Obsidian高效笔记法-20260704.png | 案例展示 / Examples | 55% | Obsidian笔记法封面 / Note-taking cover |
| 图4-6 / Figure 4-6 | 封面-顺德美食地图-20260704.png | 案例展示 / Examples | 50% | 顺德美食地图封面(3:4) / Food map cover (3:4) |
| 图4-7 / Figure 4-7 | 封面-顺德美食地图-20260704-9.16.png | 案例展示 / Examples | 40% | 顺德美食地图封面(9:16) / Food map cover (9:16) |

---

**版本 / Version**：v28.1  
**最后更新 / Last Updated**：2026-07-06  
**状态 / Status**：持续维护中 / Under active development