# F7 未来科技字体模块（v25.0）

> **触发风格**：#16, #25

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'Noto Sans SC', sans-serif; }
.main-title { font-family: 'Noto Sans SC', sans-serif; }
/* 装饰元素可用 'Orbitron' / 'Rajdhani' */
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #16 | 700 | 400 | 渐变+霓虹发光 |
| #25 | 700 | 400 | 渐变 |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='思源黑体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';`
