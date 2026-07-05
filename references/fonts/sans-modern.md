# F2 无衬线现代字体模块（v25.0）

> **触发风格**：#7, #9, #10, #12, #17, #22, #30

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'Noto Sans SC', sans-serif; }
.main-title { font-family: 'Noto Sans SC', sans-serif; }
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #7, #10, #12, #30 | 700 | 400 | 投影 |
| #9 | 400 | 300 | — |
| #17 | 700 | 400 | — |
| #22 | 700 | 400 | 渐变 |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='思源黑体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';`
