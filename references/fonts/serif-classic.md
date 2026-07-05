# F1 衬线经典字体模块（v25.0）

> **触发风格**：#1-#6, #14, #15, #18, #19, #24, #27, #28, #29

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700;900&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'Noto Serif SC', serif; }
.main-title { font-family: 'Noto Serif SC', serif; }
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #1-#6, #14, #27, #28, #29 | 600-900 | 400-500 | 投影/描边/肌理 |
| #15, #18, #19, #24 | 400-700 | 300-400 | 浮雕/凹刻/渐变 |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='思源宋体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';`
