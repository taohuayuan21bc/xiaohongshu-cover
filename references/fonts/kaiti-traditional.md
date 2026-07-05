# F6 楷体传统字体模块（v25.0）

> **触发风格**：#8

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'KaiTi', 'STKaiti', serif; }
.main-title { font-family: 'KaiTi', 'STKaiti', 'ZCOOL XiaoWei', serif; }
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #8 | 400 | 400 | —（水墨留白风格） |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='楷体';window.RECOMMENDED_CONTENT_FONT='楷体';`
