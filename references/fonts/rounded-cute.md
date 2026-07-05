# F4 圆润可爱字体模块（v25.0）

> **触发风格**：#21, #23

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;700&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif; }
.main-title { font-family: 'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif; }
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #21 | 700 | 400 | — |
| #23 | 600 | 400 | 投影 |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='微软雅黑';window.RECOMMENDED_CONTENT_FONT='微软雅黑';`
