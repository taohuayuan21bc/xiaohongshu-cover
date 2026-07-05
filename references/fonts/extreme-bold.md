# F3 极粗醒目字体模块（v25.0）

> **触发风格**：#11, #13, #26

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@700;900&family=Bebas+Neue&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif; }
.main-title { font-family: 'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif; }
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #11, #13 | 900 | 700 | 描边+投影 |
| #26 | 900 | 700 | 描边+投影 |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='思源黑体';window.RECOMMENDED_CONTENT_FONT='微软雅黑';`
