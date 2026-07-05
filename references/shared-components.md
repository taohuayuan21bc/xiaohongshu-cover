# 共享组件参考（v28.1）

> **v28.1 关键变更**：彻底修复 LOGO 右下角方框 bug — `.logo-preview` CSS 默认 `display:none`（空 src 不渲染），`selectLogo()` 无自定义 LOGO 时保持隐藏，`resetLogo()` 不恢复显示。`framework.html` + `framework.js` + `framework.css` 三文件同步修复。

---

## 一、CSS 变量体系

框架 `assets/framework.html` 已使用以下 CSS 变量实现全样式参数化。注入 `/* INJECT_STYLE_CSS */` 时需定义这些变量：

```css
:root {
  --ACCENT: #XXXXXX;        /* Accent 色 */
  --ACCENT_R: R; --ACCENT_G: G; --ACCENT_B: B;
  --BG_R: R; --BG_G: G; --BG_B: B;
  --TEXT_R: R; --TEXT_G: G; --TEXT_B: B;
  --COVER_BG: ...;          /* 封面背景 */
  --OVERLAY_BG: ...;        /* 暗色遮罩层背景 */
  --SOFTLIGHT_BG: ...;      /* 柔光层背景 */
  --CH_MARK_COLOR: ...;     /* 中文标记色 */
  --VERT_ACCENT_BG: ...;    /* 竖线accent背景 */
  --INK_BLOT_BG: ...;       /* 墨渍背景 */
  --SCATTER_COLOR: ...;     /* 散点颜色 */
  --ENGRAVE_BG: ...;        /* 雕刻背景 */
  --MAP_COLOR: ...;         /* 地图颜色 */
  --TEXT_PRIMARY: ...;      /* 主文字色 */
  --ACCOUNT_COLOR: ...;     /* 账号名颜色 */
  --AUTHOR_COLOR: ...;      /* 作者行颜色 */
  --SUPP_COLOR: ...;        /* 补充说明颜色 */
  --DESC_COLOR: ...;        /* 描述文字颜色 */
  --DIVIDER_BG: ...;        /* 分隔线背景 */
  --HIGHLIGHT_BG: ...;      /* 高亮背景 */
  --TAG_LINE_COLOR: ...;    /* 标签顶部线 */
  --TAG_UNDERLINE: ...;     /* 标签下划线 */
  --TAG_DIAMOND: ...;       /* 菱形图标颜色 */
  --CONTENT_PADDING: ...;   /* 内容层padding */
}
```

框架通过 `getCssVar(name)` 函数动态读取这些变量，确保 JS 功能无需修改即可适配任意风格。

---

## 二、框架注入工作流（v13.0 新增）

生成封面时，不再从头编写 HTML。改为：

1. 读取 `assets/framework.html`
2. 写入工作区（使用内容特定的文件名）
3. 通过 `replace_in_file` 注入 4 个标记位置的内容：

| 注入标记 | 注入内容 | 说明 |
|---------|---------|------|
| `/* INJECT_STYLE_CSS */` | 风格 CSS + Google Fonts + `window.EXPORT_TITLE` | CSS 变量定义 + 封面背景 + 字体链接 + 导出标题 |
| `<!-- INJECT_CANVAS_CONTENT -->` | 装饰元素 + 内容层 HTML | 5-7 种装饰元素 + 完整内容层 |
| `/* INJECT_AI_BG_PATHS */` | AI 背景图路径映射 JSON | v20.0：`{"0":"path1","1":"path2",...}` 或 `{}` |
| `/* INJECT_INIT_BG */` | initBg() 调用 | 仅当有 AI 背景图时注入 |

### 注入内容示例

**INJECT_STYLE_CSS**（替换标记行）：
```css
/* INJECT_STYLE_CSS */ → 
<link href="[Google Fonts URL]" rel="stylesheet">
<style>
:root { --ACCENT: #C23B3B; ... }
#cover-canvas { background: linear-gradient(...); }
</style>
<script>window.EXPORT_TITLE='主标题关键词';</script>
<script>window.RECOMMENDED_TITLE_FONT='思源宋体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';</script>
```

**INJECT_CANVAS_CONTENT**（替换标记行）：
```html
<!-- INJECT_CANVAS_CONTENT --> →
<div class="decor-layer">
  <!-- 5-7 种装饰元素 -->
</div>
<div class="content-layer">
  <!-- 标题、副标题、描述、标签等 -->
</div>
<img class="bg-image-layer" src="AI_BG_PATH" alt="">
```

**INJECT_INIT_BG**（在 DOMContentLoaded 中替换）：
```js
/* INJECT_INIT_BG */ → initBg();
```

---

## 三、JS 函数完整性速查

所有函数已在 `assets/framework.html` 中完整实现，无需额外生成。以下为完整性速查表，供排查用：

| 模块 | 函数 |
|------|------|
| DOM 引用 | `logoPreview`, `logoExport`, `logoUploadPreview`, `blendLogoGuard`, `blendSoftlight`, `bgImage`, `bgFilterWrap`, `bgOverlay`, `coverCanvas`, `toastEl`, `contentLayer`, `bottomRow`, `mainTitle`, `subtitle`, `metaTags` |
| 工具函数 | `getCssVar(name)` — 动态读取 CSS 变量；`showToast(msg, duration)` — 统一 toast 管理 |
| v15 辅助函数 | `_setSlider(id, val, displayId, displayVal)`, `_setSliderThen(id, val, displayId, displayVal, fn, arg)` — 重置/预设加载时的精简辅助 |
| 背景图系统 | `setBgImage()`, `switchToBgSource()` |
| 背景缩放 | `anchorMap`, `selectAnchor()`, `adjustBgScale()`, `applyBgTransform()` |
| 前景透明度 | `adjustBgOpacity()` |
| 混合模式 | `getOrCreateBlendLayer()`, `adjustBlendMode()`, `applyBgFilters()`, `adjustBlendContrast/Brightness/Saturate()`, `adjustBlendSoftlight()`, `adjustBlendLogoGuard()`, `showBlendLayers()`, `hideAllBlendLayers()`, `applyBlendPreset()` |
| 背景切换 | `selectBg()`, `handleBgUpload()`, `handleClipboardPaste()` |
| AI 背景多选 | `selectAiBg()`, `updateAiBgThumbnails()`（v20.0） |
| 导出 | `exportPNG()`（含 LOGO 预览层切换） |
| 初始化 | `initBg()`（条件注入）, `aiBgImages`（v20.0 路径映射） |
| LOGO 系统（v27.0 恢复） | `selectLogo()`, `switchLogoLayout()`, `handleLogoUpload()`, `resetLogo()`, `applyCurrentLogoLayout()`, `syncLogoGuardPosition()`, `syncLogoGuardVisibility()` |
| v12 微调 | `adjustTitleWeight()`, `adjustLetterSpacing()`, `adjustTitleFontSize()`, `applyTitleFont()`, `adjustSubtitleWeight/LetterSpacing/LineHeight/FontSize()`, `adjustContentWeight/LetterSpacing/LineHeight/FontSize()`, `adjustContentMarginTop()`, `applyContentFont()`, `switchContentAlign()`, `adjustTagWeight/LetterSpacing/Size/Gap/Offset/OffsetY()`, `applyTagTransform()`, `resetFineTune()` |
| v5 预设 | `saveCustomPreset()`, `loadCustomPreset()`（含 logoGuard） |
| v7.5 尺寸 | `switchCanvasSize()` |
| v6 自适应 | `autoFitTitleSize()`, `repositionDecorElements()` |
| v6 暗色 | `switchTheme()` |
| v8 水印 | `toggleWatermark()`, `adjustWatermarkCount/Cols/Gap/Size/Rotate/Opacity()`, `applyWatermarkGrid()`, `updateWatermarkGridStyle()`, `clearWatermarkGrid()`, `showWatermarkControls()`, `hideWatermarkControls()` |
| v8 标签自适应 | `adjustBottomRowSpacing()`（含 LOGO 布局分支） |
| v6 导出格式 | `switchExportFormat()` |
| v7 快捷键 | `keydown` 事件监听（1-5 尺寸切换） |

---

## 四、页面布局规范

面板结构和移动端响应式已在 `assets/framework.html` 中完整实现。设计规范速查：

- 选项面板统一放在左侧 360px 面板区（可滚动），封面画布在右侧（sticky 定位）
- 屏幕宽度 ≤ 900px 时自动切换为上下布局
- 封面画布默认 3:4（540×720px），支持 5 种比例切换

### 4.1 折叠面板（v17.0）

v17.0 引入 Accordion 折叠系统解决左侧配置项过多的问题。面板分为 6 个可折叠分组 + 导出区（始终可见）：

| 分组 | 默认 | 包含 | 自动行为 |
|------|------|------|---------|
| 🎨 画布设置 | 展开 | 背景图片/画布尺寸/主题模式 | — |
| 🔍 背景调整 | 折叠 | 背景缩放/前景透明度 | 有背景图时自动展开 |
| 🌈 混合增强 | 折叠 | 混合模式滑块 + 预设 | 激活混合模式时自动展开 |
| ✏️ 风格微调 | 展开 | 字体设置 + 标题/副标题/其他内容/标签（子分组可折叠） | — |
| 💧 水印设置 | 折叠 | 水印平铺/参数 | — |
| — 导出 | 始终可见 | 预设按钮 + 导出格式/导出按钮 | — |

**风格微调顶层**（始终可见，不折叠）：

| 区域 | 说明 |
|------|------|
| 字体设置 | 标题/副标题字体 + 其他内容字体（v17.1 移至子折叠外，全局字体控制） |

**风格微调子分组**（默认只展开"标题"）：

| 子分组 | 默认 | 包含控件 |
|--------|------|---------|
| 标题 | 展开 | 字重/字间距/字号 |
| 副标题 | 折叠 | 字重/字间距/行间距/字号 |
| 其他内容 | 折叠 | 字重/字间距/行间距/字号/上间距/对齐方式 |
| 标签 | 折叠 | 字重/字间距/字号/间距/水平偏移/垂直偏移 |

**CSS 类名**：`.accordion-section`、`.accordion-header`、`.accordion-arrow`、`.accordion-body`、`.accordion-body-inner`、`.sub-accordion-section`、`.sub-accordion-header`、`.sub-accordion-arrow`、`.sub-accordion-body`

**JS 函数**：`toggleAccordion(header)`、`toggleSubAccordion(header)`、`autoExpandBgAdjust()`、`autoExpandBlend()`

---

## 五、混合模式层结构

CSS 层结构（#cover-canvas 内，按 z-index 从低到高）：

| z-index | 层 | 说明 |
|---------|-----|------|
| 0 | `.bg-filter-wrap` | 背景图滤镜容器（CSS filter：contrast/brightness/saturate） |
| 0 | `.bg-overlay` | 暗色渐变遮罩层 |
| 1 | `.blend-softlight` | 柔光全画布叠加（mix-blend-mode: soft-light） |
| 1 | `.decor-layer` | 装饰元素层（pointer-events: none） |
| 1 | blend-mode 动态层 | 通用混合模式叠加（darken/lighten/multiply/color） |
| 2 | `.content-layer` | 内容层（标题/副标题/描述/标签） |
| 4 | `#cover-canvas::after` | 旧书边框装饰 |

---

## 六、混合模式滑块速查（v4.0）

| # | 滑块名称 | 范围 | 默认 | 功能 |
|---|---------|------|------|------|
| 1 | 背景对比度 | 50-200% | 100% | CSS filter contrast |
| 2 | 背景亮度 | 50-150% | 100% | CSS filter brightness |
| 3 | 背景饱和度 | 0-200% | 80% | CSS filter saturate |
| 4 | 柔光叠加 | 0-100% | 20% | mix-blend-mode: soft-light |
| 5 | 变暗叠加 | 0-100% | 0% | mix-blend-mode: darken |
| 6 | 变亮叠加 | 0-100% | 0% | mix-blend-mode: lighten |
| 7 | 正片叠底 | 0-100% | 0% | mix-blend-mode: multiply |
| 8 | 颜色混合 | 0-100% | 0% | mix-blend-mode: color |

混合模式预设（6个）：清晰 / 深邃 / 柔和 / 鲜明 / 暖调 / 重置

---

## 七、设计规范速查

### 文字层级
| 层级 | 用途 | 字号 | 字重 |
|------|------|------|------|
| L1 | 主标题 | 48-72px | 700-900 |
| L2 | 副标题 | 20-28px | 400-600 |
| L3 | 正文 | 14-18px | 300-400 |
| L4 | 标签 | 11-13px | 400-500 |

### 颜色原则
- 背景 60%，accent 10%，文字 30%
- 文字与背景对比度 ≥ 4.5:1

### 核心规范
- 画布比例默认 **3:4**，显示尺寸 `540×720px`（v7.5：原始尺寸，导出时2倍像素，支持 5 种比例切换）
- 使用 `div#cover-canvas` 作为唯一导出区域
- 文字占据至少 70% 空间，使用 3-4 种字号层次
- 主标题提取 2-3 个关键词做特殊处理（描边、高亮、变色）
- 文案提炼为 30-40 字以内（详见文案提炼策略）
- 装饰元素 5-7 种、8-15 个实例，低透明度不干扰阅读
- 底部关键词标签居左
- 账号名放在右上角（**v7.1：仅当用户明确输入时才显示，AI 严禁自行编造账号名**）

---

## 八、注意事项速查

1. 代码无冗余，每个元素有设计目的
2. 导出按钮、选项面板不在导出区域内
3. Google Fonts 加载失败时回退到系统字体
4. 封面画布固定像素，保证比例
5. 每次生成必须包含完整的选项面板
6. Step 0 必须先询问内容来源（用户提供 or AI 发挥）
7. Step 3 生成纯设计版 HTML 后必须立即预览，再进入 Step 4
8. Step 4 添加 AI 背景图后必须再次预览确认融合效果
9. Step 4 AI 背景图必须使用 `ask_followup_question` 点选模式询问
10. 切换到「纯设计封面」时自动隐藏所有混合模式层和面板
11. 生成后自动调用 `autoFitTitleSize()` 确保长标题不溢出
12. 键盘快捷键通过全局 `keydown` 监听，注意避免与浏览器快捷键冲突
13. 水印控制面板默认隐藏，选"水印平铺"时自动显示，支持行列网格排列
14. 账号名称必须由用户明确输入，AI 严禁自行编造或添加；用户未输入则右上角不显示账号名
15. 装饰元素选型时参考 `decor-elements-reference.md` 中的风格编号→装饰组合直接映射表，减少 AI 推断偏差
16. 画布尺寸调整为原始尺寸 1/2（540×720），导出时自动 2 倍像素；支持 5 种尺寸切换
17. v9.0 风格微调拆分为"标题"和"其他内容"两部分；标题调节字重/字间距，其他内容调节字重/字间距/行间距（最大可调至3）；v11.0 新增"副标题"独立调整区域（字重/字间距/行间距），副标题从其他内容中分离独立控制；v11.1 其他内容新增对齐方式切换（左对齐/居中/右对齐/两端对齐），标签新增水平偏移滑块（-120~120px）；v12.0 四个模块均新增字号调节（标题24-72/副标题12-36/内容8-20/标签8-18），其他内容新增上间距滑块（0-60px），标签新增垂直偏移滑块（-80~80px）
18. 水印参数仅影响水印网格元素；面板标题为"水印参数"
19. 风格微调面板新增重置按钮 `resetFineTune()`，一键恢复所有滑块默认值（共 20 个控件）
20. 标签居中排列，带菱形引导图标 `◆` 和底部下划线装饰，移除边框方块样式

---

## 九、暗色模式变量体系

（注：CSS 变量基础体系详见第一节。以下为暗色模式特有的 `--MODE_*` 变量。）

```css
:root {
  --MODE_BG: #e8e0d5;        /* 页面背景色（浅色模式） */
  --MODE_TEXT: #1E1812;       /* 面板文字色（浅色模式） */
  --MODE_PANEL_BG: rgba(255,255,255,0.6);  /* 面板背景 */
  --MODE_CARD_BG: rgba(255,255,255,0.6);   /* 卡片背景（v15.0：框架 CSS 直接处理暗色覆盖，不再依赖此变量 */ }
}

/* v15.0：暗色模式覆盖已全部在 framework.html 中以 CSS 直接定义，无需通过 JS 切换变量 */
```

---

## 十、字体系统（v16.0：AI 自动推荐 + PC 端手动覆盖）

v16.0 新增 AI 字体自动推荐机制：AI 生成封面时根据风格预填字体，用户可手动覆盖。

### 字体分组
| 分组 | 输入框 ID | 默认值 | 作用元素 |
|------|----------|--------|---------|
| 标题/副标题 | `title-font-input` | 思源宋体 | `.main-title`, `.subtitle` |
| 其他内容 | `content-font-input` | 微软雅黑 | `.description`, `.supplement`, `.author-line`, `.meta-tag`, `.tag-label`, `.account-name-top` |

### v16.0 AI 字体预填机制

AI 在 `INJECT_STYLE_CSS` 时注入两个全局变量：

```html
<script>window.RECOMMENDED_TITLE_FONT='思源宋体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';</script>
```

框架在 `DOMContentLoaded` 时自动读取这两个变量并预填面板输入框 + 立即调用 `applyTitleFont()` / `applyContentFont()` 应用。字体推荐映射表见 `design-styles-reference.md` §4.4。

### 函数
- `applyTitleFont()` — 从 `#title-font-input` 读取字体名，应用到标题/副标题组
- `applyContentFont()` — 从 `#content-font-input` 读取字体名，应用到其他内容组

输入完成后点击"应用"或按 Enter 键实时预览，支持 `resetFineTune()` 重置和 `saveCustomPreset()`/`loadCustomPreset()` 预设保存/加载。

---

*文档版本：28.1 | 最后更新：2026-07-04*
