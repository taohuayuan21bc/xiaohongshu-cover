# HTML 模板结构参考（v24.0）

> **v24.0 关键修复**：`INJECT_INIT_BG` 注入钩子保留策略。Step 2 替换时保留 `/* INJECT_INIT_BG */` 注释作为 Step 4 的查找钩子，解决 AI 背景注入时标记已被替换无法找到的 Bug。

## 框架注入工作流

### 生成步骤

1. 读取 `assets/framework.html`（位于 skill 的 `assets/` 目录）
2. 将框架内容写入工作区（使用有意义的文件名，如 `封面-{主标题}-v{序号}.html`）
3. 通过 `replace_in_file` 依次注入 4 个标记位置的内容：

### 注入标记详解

#### 标记 1：`/* INJECT_STYLE_CSS */`

注入风格相关的 CSS 变量和封面背景，**末尾追加导出标题脚本和 AI 字体推荐**。替换整个标记行。

> **v17.1 关键修复**：`INJECT_STYLE_CSS` 标记已移出框架的 `<style>` 标签（位于两个 `<style>` 块之间），注入内容中的 `<link>`、`<style>`、`<script>` 标签均可独立生效，不再嵌套在框架 `<style>` 内部。

```css
/* INJECT_STYLE_CSS */
```
替换为：
```css
/* ===== 风格样式（注入） ===== */
<style>
:root {
  --ACCENT: ACCENT_COLOR;
  --ACCENT_R: ACCENT_R; --ACCENT_G: ACCENT_G; --ACCENT_B: ACCENT_B;
  --BG_R: BG_R; --BG_G: BG_G; --BG_B: BG_B;
  --TEXT_R: TEXT_R; --TEXT_G: TEXT_G; --TEXT_B: TEXT_B;

  /* 封面画布背景 */
  --COVER_BG: [风格底色渐变];

  /* 混合模式层颜色 */
  --OVERLAY_BG: linear-gradient(180deg, rgba(BG_R,BG_G,BG_B,0.3) 0%, rgba(BG_R,BG_G,BG_B,0.6) 50%, rgba(BG_R,BG_G,BG_B,0.8) 100%);
  --LOGO_GUARD_BG: rgba(BG_R,BG_G,BG_B,0.45);
  --SOFTLIGHT_BG: rgba(TEXT_R,TEXT_G,TEXT_B,0.08);

  /* 文字色 */
  --TEXT_PRIMARY: TEXT_COLOR;
  --ACCOUNT_COLOR: rgba(TEXT_R,TEXT_G,TEXT_B,0.55);
  --AUTHOR_COLOR: rgba(TEXT_R,TEXT_G,TEXT_B,0.5);
  --SUPP_COLOR: rgba(TEXT_R,TEXT_G,TEXT_B,0.6);
  --DESC_COLOR: rgba(TEXT_R,TEXT_G,TEXT_B,0.5);

  /* 装饰色 */
  --DIVIDER_BG: linear-gradient(to right, transparent, rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.3), transparent);
  --HIGHLIGHT_BG: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.15);
  --TAG_LINE_COLOR: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.2);
  --TAG_UNDERLINE: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.25);
  --TAG_DIAMOND: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.4);
  --TAG_UNDERLINE_HOVER: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.5);
  --TAG_DIAMOND_HOVER: ACCENT_COLOR;

  /* 装饰元素色 */
  --CH_MARK_COLOR: rgba(TEXT_R,TEXT_G,TEXT_B,0.04);
  --VERT_ACCENT_BG: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.15);
  --INK_BLOT_BG: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.06);
  --SCATTER_COLOR: var(--TEXT_PRIMARY);
  --ENGRAVE_BG: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.08);
  --MAP_COLOR: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.12);
  --BORDER_COLOR: rgba(ACCENT_R,ACCENT_G,ACCENT_B,0.1);

  /* 字号变量 */
  --TITLE_SIZE: 56px;
  --SUBTITLE_SIZE: 22px;
  --SUPP_SIZE: 14px;
  --DESC_SIZE: 13px;
  --TAG_SIZE: 11px;

  /* 内容层间距 */
  --CONTENT_PADDING: 56px 72px 48px 72px;

  /* 主体字体（v14.2：PC 端字体名称由用户手动输入） */
  --BODY_FONT: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

/* 风格特定的装饰元素 CSS（如需要） */
</style>
<script>window.EXPORT_TITLE='[主标题关键词]';</script>
<!-- v16.0：AI 根据风格自动推荐字体，用户可在面板中手动覆盖 -->
<script>window.RECOMMENDED_TITLE_FONT='[标题/副标题 PC 字体名]';window.RECOMMENDED_CONTENT_FONT='[其他内容 PC 字体名]';</script>
```

> **v16.0 字体推荐**：AI 从 `design-styles-reference.md` §4.4 查找对应风格的 PC 端字体推荐，注入 `RECOMMENDED_TITLE_FONT` / `RECOMMENDED_CONTENT_FONT` 全局变量。框架自动预填面板输入框并应用。用户可随时在风格微调面板手动输入覆盖。

#### 标记 2：`<!-- INJECT_CANVAS_CONTENT -->`

注入装饰元素层、内容层、背景图 src。替换整个标记行。

```html
<!-- INJECT_CANVAS_CONTENT -->
```
替换为：
```html
<!-- 装饰元素层 -->
<div class="decor-layer">
  <!-- 从 decor-elements-reference.md 选取 5-7 种装饰元素，总计 8-15 个实例 -->
  <!-- 2-3 个使用 CSS 动画 -->
</div>

<!-- 内容层 -->
<div class="content-layer">
  <div class="header-row">
    <div class="tag-row">
      <span class="tag-dot"></span>
      <span class="tag-label">[内容类型标签]</span>
    </div>
    <!-- v7.1：账号名称仅当用户明确输入时才显示 -->
    <span class="account-name-top" style="display:none;">[账号名]</span>
  </div>

  <div class="main-title-block">
    <div class="main-title">《<span class="highlight">[核心关键词]</span>》</div>
    <div class="author-line">[副标题/作者]</div>
  </div>

  <div class="divider"></div>

  <div class="subtitle">[副标题]，<span class="keyword">[关键词强调]</span></div>
  <div class="supplement">[补充说明]</div>
  <div class="description">[详细描述，2-3行]</div>

  <div class="bottom-row">
    <div class="meta-tags">
      <span class="meta-tag">[标签1]</span>
      <span class="meta-tag">[标签2]</span>
      <span class="meta-tag">[标签3]</span>
    </div>
  </div>
</div>

<!-- 背景图片（Step 4 有 AI 背景图时设置 src） -->
<img class="bg-image-layer" src="" alt="">
```



#### 标记 3：`/* INJECT_AI_BG_PATHS */`（v20.0）

在 `var aiBgImages = {}` 之后注入 AI 背景图路径映射。无 AI 背景时保留空对象。

```js
var aiBgImages = {}; /* INJECT_AI_BG_PATHS */
```
替换为（有 AI 背景时）：
```js
var aiBgImages = {"0":"图片1路径","1":"图片2路径","2":"图片3路径"};
```
或（无 AI 背景时保持）：
```js
var aiBgImages = {};
```

#### 标记 4：`/* INJECT_INIT_BG */`（v24.0 修复）

在 `DOMContentLoaded` 事件处理中，Step 2 和 Step 4 各执行一次替换。

**Step 2 注入（首次）**：保留钩子，替换为：

```js
/* INJECT_INIT_BG */
```
→ 替换为：
```js
/* INJECT_INIT_BG */initBg();
```

> **v24.0 关键**：`/* INJECT_INIT_BG */` 注释被保留在新文本中。`initBg()` 函数已在 `framework.html` v24.0 中内置（从 `aiBgImages` 读取第一个 key 并调用 `setBgImage()`）。无 AI 背景时 `aiBgImages` 为空对象，`initBg()` 直接 return 不产生任何效果。该注释作为 Step 4 的查找钩子。

**Step 4 注入（AI 背景添加后）**：此时 `/* INJECT_INIT_BG */` 仍存在于文件中，可被正确找到。

```js
/* INJECT_INIT_BG */
```
→ 替换为（有 AI 背景时）：
```js
initBg();
```

**注意**：此处 `old_str` 精确为 `/* INJECT_INIT_BG */`（13 个字符），匹配后整行将被替换。旧版中 Step 2 已将该标记替换消失导致 Step 4 查找失败，v24.0 通过保留钩子解决该问题。

---

## 占位符查阅

| 占位符 | 说明 | 来源 |
|--------|------|------|
| `[字体族回退栈]` | 风格对应的字体族 | `design-styles-reference.md`（v14.2：面板手动输入覆盖） |
| `ACCENT_COLOR` | 风格 accent 色，如 `#C23B3B` | `design-styles-reference.md` |
| `ACCENT_R/G/B` | accent 色 RGB 分量 | `design-styles-reference.md` |
| `BG_R/G/B` | 底色 RGB 分量 | `design-styles-reference.md` |
| `TEXT_COLOR` | 文字色，如 `#2C2216` | `design-styles-reference.md` |
| `TEXT_R/G/B` | 文字色 RGB 分量 | `design-styles-reference.md` |
| `[风格底色渐变]` | 封面背景 gradient 值 | `design-styles-reference.md` |
| `[内容类型标签]` | 如"文学书评" | 用户内容 |
| `[账号名]` | 用户账号名（v7.1：必须由用户输入） | 用户输入 |
| `[核心关键词]` | 主标题关键词 | 用户内容 |
| `[副标题/作者]` | 副标题或作者名 | 用户内容 |
| `[标签1/2/3]` | 底部关键词标签 | 用户内容 |

---

## 功能说明速查

### v7.5 画布尺寸
- 画布显示尺寸恢复为原始尺寸：默认 3:4（540×720px）
- 导出时自动 2 倍像素（1080×1440）
- 支持 5 种比例：3:4 / 1:1 / 9:16 / 4:3 / 16:9
- 键盘快捷键 1-5 切换

### v14.2 风格微调（PC 端字体手动输入）
- **标题**：字重(400-900)、字间距(0-20px)、字号(24-72)、**标题/副标题字体输入（PC 端字体名，如"思源宋体"）**
- **副标题**：字重(200-700)、字间距(0-15px)、行间距(1.0-3.0)、字号(12-36)
- **其他内容**：字重(200-700)、字间距(0-10px)、行间距(1.0-3.0)、**其他内容字体输入（PC 端字体名，如"微软雅黑"）**、字号(8-20)、上间距(0-60px)、对齐方式
- **标签**：字重(200-700)、字间距(0-15px)、字号(8-18)、间距(4-30)、水平偏移(-120~120px)、垂直偏移(-80~80px)

### LOGO 布局（v12.0）
- 小 LOGO 四种位置：右下角/左下角/底部居中/顶部居中
- 水印平铺独立开关，可与任意小 LOGO 位置同时使用
- LOGO 区保护自动跟随小 LOGO 位置

### 导出格式
- PNG（无损）/ JPG（95%）/ WebP（92%）
- 文件名自动带时间戳：`封面-{标题}-{YYYYMMDD}.{格式}`

---

*文档版本：24.0 | 最后更新：2026-07-04*
