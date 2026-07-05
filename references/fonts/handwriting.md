# F5 手写文艺字体模块（v25.0）

> **触发风格**：#20, #31

## CDN 加载（含预加载提示）

```html
<!-- v25.0: 字体预加载 + display=swap，消除 FOIT -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Zhi+Mang+Xing&family=Ma+Shan+Zheng&family=Caveat:wght@400;600;700&display=swap" rel="stylesheet">
```

## CSS 注入

```css
:root { --BODY_FONT: 'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif; }
/* #20 像素风：.main-title { font-family: 'ZCOOL QingKe HuangYou', sans-serif; } */
/* #31 手写风：.main-title { font-family: 'Zhi Mang Xing', 'Ma Shan Zheng', cursive; } */
```

## 参数速查

| 风格 | 标题字重 | 正文字重 | 推荐特效 |
|:----:|:------:|:------:|:------:|
| #20 | 700 | 400 | —（像素风格） |
| #31 | 400 | 400 | —（手写风格） |

## PC 端推荐字体名
`window.RECOMMENDED_TITLE_FONT='楷体';window.RECOMMENDED_CONTENT_FONT='楷体';`
