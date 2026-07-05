#!/usr/bin/env python3
"""Generate 31 CSS + 31 decor HTML templates for v14.0 template library."""

import os

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS_DIR = os.path.join(SKILL_DIR, "assets", "styles-css")
DECOR_DIR = os.path.join(SKILL_DIR, "assets", "decor-html")

os.makedirs(CSS_DIR, exist_ok=True)
os.makedirs(DECOR_DIR, exist_ok=True)

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)

def rgba_color(r, g, b, a):
    return f"rgba({r},{g},{b},{a})"

STYLES = {
    1: {
        "name": "史诗金箔",
        "accent": "#8B6914",
        "bg_colors": ["#F5F0E8", "#EDE0C8", "#D9C7A0"],
        "text": "#2C2216",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Playfair+Display:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(139,105,20,0.10)",
    },
    2: {
        "name": "灰烬暗红",
        "accent": "#7A2E2E",
        "bg_colors": ["#EBE3D8", "#DED3C4", "#C8B8A5"],
        "text": "#1E1812",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Cormorant+Garamond:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(122,46,46,0.10)",
    },
    3: {
        "name": "枯玫暖雾",
        "accent": "#A84C56",
        "bg_colors": ["#F8F0EE", "#F2E4DF", "#E8D0C8"],
        "text": "#4A2028",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Playfair+Display:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(168,76,86,0.10)",
    },
    4: {
        "name": "冷杉墨绿",
        "accent": "#2D4A35",
        "bg_colors": ["#F2EFE9", "#E6E0D5", "#D2C8B8"],
        "text": "#2C2618",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Cormorant+Garamond:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(45,74,53,0.10)",
    },
    5: {
        "name": "雾蓝晨曦",
        "accent": "#3A6078",
        "bg_colors": ["#F4F6F7", "#E8EEF0", "#D0DCE0"],
        "text": "#2C3A40",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Quicksand:wght@400;500",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(58,96,120,0.10)",
    },
    6: {
        "name": "暗夜深读",
        "accent": "#C9A96E",
        "bg_colors": ["#1A1A1C", "#242426", "#161618"],
        "text": "#EAE0D5",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Cormorant+Garamond:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(201,169,110,0.10)",
        "dark_mode": True,
    },
    7: {
        "name": "瑞士国际主义",
        "accent": "#E63946",
        "bg_colors": ["#FFFFFF", "#FFFFFF", "#F5F5F5"],
        "text": "#1A1A1A",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "48px 80px 44px 80px",
        "border_color": "rgba(230,57,70,0.08)",
    },
    8: {
        "name": "东方数字水墨",
        "accent": "#C23B3B",
        "bg_colors": ["#F5F0E8", "#F0E8D8", "#E8DCC8"],
        "text": "#2C1810",
        "fonts": "ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@300;400;700",
        "title_font": "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "60px 72px 52px 72px",
        "border_color": "rgba(194,59,59,0.08)",
    },
    9: {
        "name": "北欧数据极简",
        "accent": "#8BA4B2",
        "bg_colors": ["#FAF8F5", "#F5F2EE", "#EBE6E0"],
        "text": "#3A3632",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700&family=Raleway:wght@300;400;500",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "56px 80px 48px 80px",
        "border_color": "rgba(139,164,178,0.08)",
    },
    10: {
        "name": "瑞士数据主义",
        "accent": "#E63946",
        "bg_colors": ["#FFFFFF", "#FFFFFF", "#FAFAFA"],
        "text": "#1A1A1A",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "44px 80px 40px 80px",
        "border_color": "rgba(230,57,70,0.06)",
    },
    11: {
        "name": "新粗野主义",
        "accent": "#FF0055",
        "bg_colors": ["#FFE600", "#FFE600", "#FFD000"],
        "text": "#000000",
        "fonts": "ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@700;900&family=Bebas+Neue",
        "title_font": "'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif",
        "title_size": 60, "subtitle_size": 24, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "44px 60px 40px 60px",
        "border_color": "rgba(255,0,85,0.08)",
    },
    12: {
        "name": "社论风",
        "accent": "#165DFF",
        "bg_colors": ["#F8F5F0", "#F2EEE5", "#E8E2D5"],
        "text": "#1A1A1A",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "48px 72px 44px 72px",
        "border_color": "rgba(22,93,255,0.08)",
    },
    13: {
        "name": "波普艺术",
        "accent": "#FF0050",
        "bg_colors": ["#FFD700", "#FFD700", "#FFC400"],
        "text": "#1A1A1A",
        "fonts": "ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@700;900&family=Bebas+Neue",
        "title_font": "'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "44px 60px 40px 60px",
        "border_color": "rgba(255,0,80,0.08)",
    },
    14: {
        "name": "莫兰迪风格",
        "accent": "#9B8A7A",
        "bg_colors": ["#D4C5B9", "#C9B8A8", "#B8A99A"],
        "text": "#3A3028",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700&family=Cormorant+Garamond:wght@300;400",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "60px 72px 56px 72px",
        "border_color": "rgba(155,138,122,0.08)",
    },
    15: {
        "name": "巴洛克华丽",
        "accent": "#D4A843",
        "bg_colors": ["#1A120E", "#221812", "#160E0A"],
        "text": "#F5E6C8",
        "fonts": "Noto+Serif+SC:wght@400;700&family=Cinzel:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(212,168,67,0.10)",
        "dark_mode": True,
    },
    16: {
        "name": "赛博朋克平面",
        "accent": "#00F0FF",
        "bg_colors": ["#0A0A1A", "#101028", "#080818"],
        "text": "#E0E0FF",
        "fonts": "Noto+Sans+SC:wght@400;700&family=Orbitron:wght@400;600;700;900",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "48px 64px 44px 64px",
        "border_color": "rgba(0,240,255,0.10)",
        "dark_mode": True,
    },
    17: {
        "name": "双色调极简",
        "accent": "#1A2A4A",
        "bg_colors": ["#FFFFFF", "#FFFFFF", "#F0F0F0"],
        "text": "#1A2A4A",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700;900&family=Montserrat:wght@300;400;600",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "52px 80px 48px 80px",
        "border_color": "rgba(26,42,74,0.06)",
    },
    18: {
        "name": "新维多利亚排版",
        "accent": "#D4A843",
        "bg_colors": ["#3D0C1A", "#4A1022", "#300814"],
        "text": "#F5E6C8",
        "fonts": "Noto+Serif+SC:wght@400;700&family=Cinzel:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(212,168,67,0.10)",
        "dark_mode": True,
    },
    19: {
        "name": "印象派光影",
        "accent": "#C07540",
        "bg_colors": ["#F5EDE0", "#F0E5D5", "#E8D8C0"],
        "text": "#4A3020",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700&family=Quicksand:wght@400",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(192,117,64,0.10)",
    },
    20: {
        "name": "8-bit像素复古",
        "accent": "#FF6B35",
        "bg_colors": ["#1A1A2E", "#16213E", "#0F3460"],
        "text": "#E0FFE0",
        "fonts": "ZCOOL+QingKe+HuangYou&family=Press+Start+2P",
        "title_font": "'ZCOOL QingKe HuangYou', sans-serif",
        "title_size": 48, "subtitle_size": 18, "supp_size": 12, "desc_size": 11, "tag_size": 10,
        "content_padding": "44px 56px 40px 56px",
        "border_color": "rgba(255,107,53,0.10)",
        "dark_mode": True,
    },
    21: {
        "name": "超扁平设计",
        "accent": "#FF4488",
        "bg_colors": ["#FFF5F8", "#FFE8F0", "#FFD8E8"],
        "text": "#4A2030",
        "fonts": "ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;700&family=Nunito:wght@400;700",
        "title_font": "'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "48px 64px 44px 64px",
        "border_color": "rgba(255,68,136,0.08)",
    },
    22: {
        "name": "复古港风",
        "accent": "#FF3366",
        "bg_colors": ["#1A0033", "#220044", "#120022"],
        "text": "#FFE0EE",
        "fonts": "Noto+Sans+SC:wght@400;700&family=Montserrat:wght@400;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "48px 64px 44px 64px",
        "border_color": "rgba(255,51,102,0.10)",
        "dark_mode": True,
    },
    23: {
        "name": "软萌知识卡片",
        "accent": "#FF6B8A",
        "bg_colors": ["#FFF0F3", "#FFE8ED", "#FFD8E2"],
        "text": "#4A3038",
        "fonts": "ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@400;600;700&family=Quicksand:wght@400;500;600",
        "title_font": "'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif",
        "title_size": 48, "subtitle_size": 18, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "52px 64px 48px 64px",
        "border_color": "rgba(255,107,138,0.08)",
    },
    24: {
        "name": "日式间美学",
        "accent": "#3A3A3A",
        "bg_colors": ["#F5F0E8", "#F0E8D8", "#E8DCC8"],
        "text": "#2C2218",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "64px 80px 56px 80px",
        "border_color": "rgba(58,58,58,0.08)",
    },
    25: {
        "name": "科技感知识分享",
        "accent": "#38BDF8",
        "bg_colors": ["#0B192C", "#0F2440", "#081420"],
        "text": "#E0F0FF",
        "fonts": "Noto+Sans+SC:wght@400;700&family=Rajdhani:wght@400;500;600;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "48px 64px 44px 64px",
        "border_color": "rgba(56,189,248,0.10)",
        "dark_mode": True,
    },
    26: {
        "name": "简约醒目大字",
        "accent": "#E85D3A",
        "bg_colors": ["#F5F0E8", "#EDE5D8", "#E0D5C0"],
        "text": "#1A1A1A",
        "fonts": "ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@700;900&family=Bebas+Neue",
        "title_font": "'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif",
        "title_size": 64, "subtitle_size": 24, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "40px 56px 36px 56px",
        "border_color": "rgba(232,93,58,0.08)",
    },
    27: {
        "name": "原始艺术图腾",
        "accent": "#E8A820",
        "bg_colors": ["#0A0A0A", "#121212", "#080808"],
        "text": "#F5E6C8",
        "fonts": "Noto+Serif+SC:wght@400;700&family=Cinzel:wght@400;600;700",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(232,168,32,0.10)",
        "dark_mode": True,
    },
    28: {
        "name": "人文雅致",
        "accent": "#8B5E3C",
        "bg_colors": ["#FAF6F0", "#F5EFE5", "#EBE2D5"],
        "text": "#3A2820",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700&family=Cormorant+Garamond:wght@400;500",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 52, "subtitle_size": 20, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "56px 72px 48px 72px",
        "border_color": "rgba(139,94,60,0.10)",
    },
    29: {
        "name": "莫兰迪大字",
        "accent": "#C44B4B",
        "bg_colors": ["#D4C5B9", "#C9B8A8", "#B8A99A"],
        "text": "#3A2222",
        "fonts": "Noto+Serif+SC:wght@300;400;600;700;900&family=Playfair+Display:wght@400;600",
        "title_font": "'Noto Serif SC', serif",
        "title_size": 60, "subtitle_size": 24, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "44px 60px 40px 60px",
        "border_color": "rgba(196,75,75,0.08)",
    },
    30: {
        "name": "干净蓝底大字",
        "accent": "#1A56DB",
        "bg_colors": ["#E8F4FD", "#D8ECFB", "#C8E4F8"],
        "text": "#0A2040",
        "fonts": "Noto+Sans+SC:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700",
        "title_font": "'Noto Sans SC', sans-serif",
        "title_size": 56, "subtitle_size": 22, "supp_size": 14, "desc_size": 13, "tag_size": 11,
        "content_padding": "48px 72px 44px 72px",
        "border_color": "rgba(26,86,219,0.08)",
    },
    31: {
        "name": "手写笔记风",
        "accent": "#3A7BD5",
        "bg_colors": ["#FEFEF0", "#FCFCE8", "#F8F8E0"],
        "text": "#2C3020",
        "fonts": "Zhi+Mang+Xing&family=Ma+Shan+Zheng&family=Caveat:wght@400;600;700",
        "title_font": "'Zhi Mang Xing', 'Ma Shan Zheng', cursive",
        "title_size": 48, "subtitle_size": 18, "supp_size": 13, "desc_size": 12, "tag_size": 10,
        "content_padding": "52px 64px 48px 64px",
        "border_color": "rgba(58,123,213,0.08)",
    },
}

# Decor element mappings per style (from decor-elements-reference.md)
DECOR_MAPPINGS = {
    1:  ["old-book-border", "vertical-accent", "chapter-mark", "engraving-line", "scattered-text", "ink-blot", "map-marker"],
    2:  ["ash-particle", "petal", "vertical-accent", "scattered-text", "ink-blot", "old-book-border"],
    3:  ["petal", "glow-orb", "feather", "watercolor-wash", "bubble", "star-particle"],
    4:  ["vertical-accent", "geo-line", "ink-blot", "old-book-border", "chapter-mark", "arrow-guide"],
    5:  ["glow-orb", "bubble", "star-particle", "watercolor-wash", "feather", "light-beam"],
    6:  ["old-book-border", "ash-particle", "scanline", "vertical-accent", "scattered-text", "ripple"],
    7:  ["geo-line", "arrow-guide", "color-block", "collage-piece", "doodle-line"],
    8:  ["ink-blot", "stamp-mark", "scattered-text", "vertical-accent", "chapter-mark", "watercolor-wash"],
    9:  ["geo-line", "star-particle", "glow-orb", "doodle-line", "color-block"],
    10: ["geo-line", "arrow-guide", "scanline", "color-block", "circuit-line"],
    11: ["collage-piece", "color-block", "irregular-frame", "arrow-guide", "geo-line"],
    12: ["vertical-accent", "old-book-border", "geo-line", "chapter-mark", "arrow-guide"],
    13: ["color-block", "collage-piece", "star-particle", "bubble", "hand-doodle"],
    14: ["glow-orb", "watercolor-wash", "star-particle", "bubble", "color-block", "feather"],
    15: ["old-book-border", "chapter-mark", "engraving-line", "stamp-mark", "map-marker", "glow-orb"],
    16: ["scanline", "circuit-line", "light-beam", "geo-line", "star-particle", "color-block"],
    17: ["color-block", "geo-line", "collage-piece", "light-beam", "doodle-line"],
    18: ["old-book-border", "engraving-line", "chapter-mark", "stamp-mark", "vertical-accent", "map-marker"],
    19: ["glow-orb", "watercolor-wash", "star-particle", "light-beam", "bubble", "feather"],
    20: ["geo-line", "color-block", "collage-piece", "geo-line", "star-particle"],
    21: ["color-block", "collage-piece", "bubble", "glow-orb", "star-particle"],
    22: ["scanline", "light-beam", "star-particle", "star-particle", "color-block", "collage-piece"],
    23: ["bubble", "glow-orb", "star-particle", "watercolor-wash", "feather", "doodle-line"],
    24: ["ink-blot", "stamp-mark", "vertical-accent", "glow-orb", "watercolor-wash", "map-marker"],
    25: ["scanline", "circuit-line", "light-beam", "geo-line", "geo-line", "arrow-guide"],
    26: ["geo-line", "color-block", "arrow-guide", "collage-piece", "doodle-line"],
    27: ["stamp-mark", "engraving-line", "map-marker", "ink-blot", "chapter-mark", "vertical-accent"],
    28: ["glow-orb", "watercolor-wash", "old-book-border", "scattered-text", "doodle-line", "feather"],
    29: ["glow-orb", "watercolor-wash", "vertical-accent", "star-particle", "color-block", "scattered-text"],
    30: ["geo-line", "color-block", "arrow-guide", "doodle-line", "glow-orb"],
    31: ["doodle-line", "collage-piece", "stamp-mark", "glow-orb", "arrow-guide", "hand-doodle"],
}

# Decor element HTML templates
DECOR_HTML_TEMPLATES = {
    "glow-orb": '<div class="decor-glow" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:120px;height:140px;background:radial-gradient(ellipse,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.15) 0%,transparent 70%);border-radius:50%;filter:blur(3px);pointer-events:none"></div>',
    "petal": '<div class="decor-petal" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:24px;height:32px;background:radial-gradient(ellipse at 30% 30%,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.2),transparent);border-radius:50% 0 50% 0;animation:petalFall 14s ease-in-out infinite;pointer-events:none"></div>',
    "ash-particle": '<div class="decor-ash" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:2px;height:2px;background:var(--ACCENT);border-radius:50%;animation:ashFloat 8s ease-in-out infinite;pointer-events:none"></div>',
    "feather": '<div class="decor-feather" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:30px;height:60px;background:linear-gradient(135deg,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08) 0%,transparent 60%);border-radius:30% 70% 50% 50%;animation:featherDrift 12s ease-in-out infinite;pointer-events:none"></div>',
    "watercolor-wash": '<div class="decor-wash" data-decor-pos="tl" style="position:absolute;top:{Y}px;left:{X}px;width:160px;height:140px;border-radius:40% 60% 55% 45%/45% 55% 60% 40%;background:radial-gradient(ellipse at 40% 40%,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1),transparent);filter:blur(20px);pointer-events:none"></div>',
    "bubble": '<div class="decor-bubble" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.12);background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.03);animation:bubbleRise 10s ease-in-out infinite;pointer-events:none"></div>',
    "star-particle": '<div class="decor-star" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:3px;height:3px;background:var(--ACCENT);border-radius:50%;opacity:0.5;box-shadow:0 0 6px var(--ACCENT);pointer-events:none"></div>',
    "light-beam": '<div class="decor-beam" data-decor-pos="center" style="position:absolute;top:{Y}px;left:{X}px;width:200px;height:300px;background:linear-gradient(135deg,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08) 0%,transparent 60%);transform:rotate(-20deg);pointer-events:none"></div>',
    "scanline": '<div class="decor-scan" style="position:absolute;width:100%;height:1px;background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08);animation:scanMove 6s linear infinite;pointer-events:none"></div>',
    "ripple": '<div class="decor-ripple" data-decor-pos="center" style="position:absolute;top:{Y}px;left:{X}px;width:20px;height:20px;border-radius:50%;border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1);animation:rippleExpand 8s ease-out infinite;pointer-events:none"></div>',
    # Non-animated elements - use fixed positions
    "old-book-border": None,  # handled via CSS ::after
    "vertical-accent": '<div class="decor-vline" data-decor-pos="tl" style="position:absolute;left:{X}px;top:{Y1}%;bottom:{Y2}%;width:1px;background:linear-gradient(to bottom,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.15),rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.05),transparent);pointer-events:none"></div>',
    "chapter-mark": '<div class="decor-ch-mark" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;font-family:\'Noto Serif SC\',serif;font-weight:900;font-size:120px;line-height:1;color:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08);pointer-events:none">§</div>',
    "engraving-line": '<div class="decor-engrave" data-decor-pos="tl" style="position:absolute;top:{Y}px;left:{X}px;width:100px;height:2px;background:repeating-linear-gradient(0deg,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.04) 0,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.04) 1px,transparent 1px,transparent 4px);border-radius:2px;pointer-events:none"></div>',
    "scattered-text": '<div class="decor-scatter" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;font-family:\'Noto Serif SC\',serif;font-weight:900;color:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.05);font-size:24px;letter-spacing:6px;animation:textDrift 10s ease-in-out infinite;pointer-events:none">{TEXT}</div>',
    "ink-blot": '<div class="decor-ink" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08) 0%,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.03) 40%,transparent 70%);filter:blur(8px);pointer-events:none"></div>',
    "map-marker": '<div class="decor-map" data-decor-pos="br" style="position:absolute;bottom:{Y}px;right:{X}px;width:16px;height:16px;border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.12);border-radius:50%;pointer-events:none"><span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:10px;color:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.15)">+</span></div>',
    "geo-line": '<div class="decor-geo" data-decor-pos="tl" style="position:absolute;top:{Y}px;left:{X}px;width:{W}px;height:1px;background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.12);pointer-events:none"></div>',
    "arrow-guide": '<div class="decor-arrow" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:40px;height:40px;border-right:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1);border-bottom:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1);transform:rotate(45deg);pointer-events:none"></div>',
    "color-block": '<div class="decor-block" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:80px;height:80px;background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.04);border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.06);pointer-events:none"></div>',
    "collage-piece": '<div class="decor-collage" data-decor-pos="tl" style="position:absolute;top:{Y}px;left:{X}px;width:60px;height:60px;background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.04);border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08);transform:rotate(3deg);pointer-events:none"></div>',
    "doodle-line": '<div class="decor-doodle" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:120px;height:1px;background:repeating-linear-gradient(90deg,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.15) 0,rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.15) 6px,transparent 6px,transparent 12px);pointer-events:none"></div>',
    "stamp-mark": '<div class="decor-stamp" data-decor-pos="br" style="position:absolute;bottom:{Y}px;right:{X}px;border:2px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1);border-radius:4px;padding:6px 12px;font-size:14px;font-weight:900;color:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.08);letter-spacing:4px;transform:rotate(-15deg);pointer-events:none">印记</div>',
    "circuit-line": '<div class="decor-circuit" data-decor-pos="bl" style="position:absolute;bottom:{Y}px;left:{X}px;width:100px;height:1px;background:rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.1);pointer-events:none"><span style="position:absolute;right:0;top:-3px;width:7px;height:7px;border-radius:50%;border:1px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.2);pointer-events:none"></span></div>',
    "irregular-frame": '<div class="decor-irregular" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:60px;height:60px;border:1.5px solid rgba(var(--ACCENT_R),var(--ACCENT_G),var(--ACCENT_B),0.12);border-radius:2px 12px 2px 12px;transform:rotate(-3deg);pointer-events:none"></div>',
    "hand-doodle": '<div class="decor-doodle-art" data-decor-pos="tr" style="position:absolute;top:{Y}px;right:{X}px;width:50px;height:50px;opacity:0.1;pointer-events:none"><svg viewBox="0 0 50 50"><path d="M10,25 Q20,5 30,20 T45,15" stroke="var(--ACCENT)" fill="none" stroke-width="1.5"/></svg></div>',
}

# Position offsets for each decor element (cycling through multiple positions for variety)
DECOR_POSITIONS = {
    "glow-orb": [{"Y": 40, "X": 80}, {"Y": 120, "X": 60}, {"Y": 180, "X": 120}],
    "petal": [{"Y": 120, "X": 40}, {"Y": 180, "X": 60}, {"Y": 100, "X": 80}],
    "ash-particle": [{"Y": 150, "X": 50}, {"Y": 200, "X": 70}, {"Y": 120, "X": 100}, {"Y": 250, "X": 40}],
    "feather": [{"Y": 100, "X": 60}, {"Y": 200, "X": 40}, {"Y": 150, "X": 80}],
    "watercolor-wash": [{"Y": 60, "X": 40}, {"Y": 200, "X": 80}, {"Y": 120, "X": 30}],
    "bubble": [{"Y": 80, "X": 80}, {"Y": 200, "X": 100}, {"Y": 150, "X": 60}],
    "star-particle": [{"Y": 60, "X": 40}, {"Y": 100, "X": 80}, {"Y": 180, "X": 60}, {"Y": 240, "X": 100}],
    "light-beam": [{"Y": 80, "X": 50}, {"Y": 200, "X": 100}],
    "ripple": [{"Y": 200, "X": 100}, {"Y": 300, "X": 80}],
    "vertical-accent": [{"X": 36, "Y1": 20, "Y2": 80}, {"X": 504, "Y1": 15, "Y2": 85}],
    "chapter-mark": [{"Y": 60, "X": 80}, {"Y": 400, "X": 120}],
    "engraving-line": [{"Y": 80, "X": 50}, {"Y": 300, "X": 60}, {"Y": 200, "X": 400}],
    "scattered-text": [{"Y": 120, "X": 100, "TEXT": "第"}, {"Y": 300, "X": 60, "TEXT": "章"}, {"Y": 500, "X": 140, "TEXT": "卷"}],
    "ink-blot": [{"Y": 180, "X": 40}, {"Y": 250, "X": 400}, {"Y": 100, "X": 300}],
    "map-marker": [{"Y": 160, "X": 80}, {"Y": 250, "X": 120}, {"Y": 100, "X": 300}],
    "geo-line": [{"Y": 120, "X": 50, "W": 200}, {"Y": 350, "X": 80, "W": 150}, {"Y": 500, "X": 300, "W": 180}],
    "arrow-guide": [{"Y": 200, "X": 60}, {"Y": 350, "X": 400}, {"Y": 150, "X": 350}],
    "color-block": [{"Y": 80, "X": 60}, {"Y": 300, "X": 100}, {"Y": 500, "X": 80}],
    "collage-piece": [{"Y": 100, "X": 50}, {"Y": 350, "X": 80}, {"Y": 500, "X": 400}],
    "doodle-line": [{"Y": 200, "X": 60}, {"Y": 350, "X": 400}, {"Y": 450, "X": 100}],
    "stamp-mark": [{"Y": 150, "X": 80}, {"Y": 300, "X": 60}],
    "circuit-line": [{"Y": 220, "X": 50}, {"Y": 380, "X": 350}, {"Y": 500, "X": 100}],
    "irregular-frame": [{"Y": 100, "X": 100}, {"Y": 400, "X": 80}],
    "hand-doodle": [{"Y": 150, "X": 80}, {"Y": 350, "X": 100}],
    "scanline": [{}],  # no position params needed
    "old-book-border": [{}],  # handled by CSS
}


def make_position_str(elem_type, idx):
    """Generate position parameters for a decor element instance."""
    positions = DECOR_POSITIONS.get(elem_type, [{}])
    if not positions or len(positions) == 0:
        return {}
    pos = positions[idx % len(positions)]
    return pos


def generate_decor_html(style_num):
    """Generate the full decor layer HTML for a style."""
    elements = DECOR_MAPPINGS.get(style_num, [])
    html_parts = ['    <!-- v14.0 预构建装饰元素 -->\n    <div class="decor-layer">']

    # Track how many of each element type we've used
    elem_counts = {}
    for elem_type in elements:
        if elem_type == "old-book-border":
            continue  # handled by CSS ::after pseudo-element
        if elem_type not in elem_counts:
            elem_counts[elem_type] = 0
        idx = elem_counts[elem_type]
        elem_counts[elem_type] += 1

        template = DECOR_HTML_TEMPLATES.get(elem_type)
        if not template:
            continue

        pos = make_position_str(elem_type, idx)
        # Fill in position parameters
        filled = template
        for key, val in pos.items():
            filled = filled.replace("{" + key + "}", str(val))

        html_parts.append("      " + filled)

    html_parts.append("    </div>\n")
    return "\n".join(html_parts)


def generate_css(style_num):
    """Generate the full CSS block for a style."""
    s = STYLES[style_num]
    accent = s["accent"]
    r, g, b = hex_to_rgb(accent)
    text_r, text_g, text_b = hex_to_rgb(s["text"])
    bg0_r, bg0_g, bg0_b = hex_to_rgb(s["bg_colors"][0])
    
    is_dark = s.get("dark_mode", False)
    
    # Compute overlay background
    if is_dark:
        overlay = f"linear-gradient(180deg, rgba({bg0_r},{bg0_g},{bg0_b},0.2) 0%, rgba({bg0_r},{bg0_g},{bg0_b},0.5) 50%, rgba({bg0_r},{bg0_g},{bg0_b},0.75) 100%)"
        softlight_bg = f"rgba({text_r},{text_g},{text_b},0.08)"
        logo_guard_bg = f"rgba({bg0_r},{bg0_g},{bg0_b},0.35)"
    else:
        overlay = f"linear-gradient(180deg, rgba({bg0_r},{bg0_g},{bg0_b},0.3) 0%, rgba({bg0_r},{bg0_g},{bg0_b},0.6) 50%, rgba({bg0_r},{bg0_g},{bg0_b},0.8) 100%)"
        softlight_bg = f"rgba({text_r},{text_g},{text_b},0.08)"
        logo_guard_bg = f"rgba({bg0_r},{bg0_g},{bg0_b},0.45)"

    # Cover background
    if len(s["bg_colors"]) == 3:
        cover_bg = f"linear-gradient(135deg, {s['bg_colors'][0]} 0%, {s['bg_colors'][1]} 40%, {s['bg_colors'][2]} 100%)"
    else:
        cover_bg = s["bg_colors"][0]

    # Lighter accent variants
    c_mark = f"rgba({r},{g},{b},0.15)"
    v_accent = s.get("vert_accent_bg", f"#{r:02x}{g:02x}{b:02x}" if not is_dark else f"#{min(r+40,255):02x}{min(g+40,255):02x}{min(b+40,255):02x}")
    ink_blot = f"rgba({r},{g},{b},0.08)"
    scatter = s.get("scatter_color", f"rgba({r},{g},{b},0.12)")
    engrave = f"rgba({r},{g},{b},0.05)"
    map_c = s.get("map_color", f"#{min(r+40,255):02x}{min(g+40,255):02x}{min(b+40,255):02x}" if not is_dark else accent)

    # Text-derived colors
    text_primary = s["text"]
    account_color = f"rgba({text_r},{text_g},{text_b},0.55)"
    author_color = f"rgba({text_r},{text_g},{text_b},0.5)"
    supp_color = f"rgba({text_r},{text_g},{text_b},0.6)"
    desc_color = f"rgba({text_r},{text_g},{text_b},0.5)"

    # Accent-derived UI colors
    divider_bg = f"linear-gradient(to right, transparent, rgba({r},{g},{b},0.3), transparent)"
    highlight_bg = f"rgba({r},{g},{b},0.12)"
    tag_line_color = f"rgba({r},{g},{b},0.2)"
    tag_underline = f"rgba({r},{g},{b},0.25)"
    tag_diamond = f"rgba({r},{g},{b},0.4)"
    tag_underline_hover = f"rgba({r},{g},{b},0.5)"
    tag_diamond_hover = f"rgba({r},{g},{b},0.6)"
    border_color = s["border_color"]

    # Mode colors
    if is_dark:
        mode_bg = "#1A1A1C"
        mode_card_bg = "rgba(255,255,255,0.05)"
        mode_text = "#EAE0D5"
    else:
        mode_bg = "#F5F0E8"
        mode_card_bg = "rgba(255,255,255,0.6)"
        mode_text = "#3A3028"

    # Compute vertical accent from accent (lighter)
    if not is_dark:
        v_r, v_g, v_b = min(r+70, 255), min(g+70, 255), min(b+70, 255)
    else:
        v_r, v_g, v_b = min(r+50, 255), min(g+50, 255), min(b+50, 255)
    vert_accent_hex = f"#{v_r:02x}{v_g:02x}{v_b:02x}"

    css = f"""<style>
/* v23.0 {s['name']} CSS 模板 — CDN 已剥离，字体由 references/fonts/ 模块注入 */
:root {{
  --ACCENT: {accent};
  --ACCENT_R: {r}; --ACCENT_G: {g}; --ACCENT_B: {b};
  --BG_R: {bg0_r}; --BG_G: {bg0_g}; --BG_B: {bg0_b};
  --TEXT_R: {text_r}; --TEXT_G: {text_g}; --TEXT_B: {text_b};
  --COVER_BG: {cover_bg};
  --OVERLAY_BG: {overlay};
  --LOGO_GUARD_BG: {logo_guard_bg};
  --SOFTLIGHT_BG: {softlight_bg};
  --TEXT_PRIMARY: {text_primary};
  --ACCOUNT_COLOR: {account_color};
  --AUTHOR_COLOR: {author_color};
  --SUPP_COLOR: {supp_color};
  --DESC_COLOR: {desc_color};
  --DIVIDER_BG: {divider_bg};
  --HIGHLIGHT_BG: {highlight_bg};
  --TAG_LINE_COLOR: {tag_line_color};
  --TAG_UNDERLINE: {tag_underline};
  --TAG_UNDERLINE_HOVER: {tag_underline_hover};
  --TAG_DIAMOND: {tag_diamond};
  --TAG_DIAMOND_HOVER: {tag_diamond_hover};
  --CH_MARK_COLOR: {c_mark};
  --VERT_ACCENT_BG: {vert_accent_hex};
  --INK_BLOT_BG: {ink_blot};
  --SCATTER_COLOR: {scatter};
  --ENGRAVE_BG: {engrave};
  --MAP_COLOR: {map_c};
  --BORDER_COLOR: {border_color};
  --CONTENT_PADDING: {s['content_padding']};
  --TITLE_SIZE: {s['title_size']}px;
  --SUBTITLE_SIZE: {s['subtitle_size']}px;
  --SUPP_SIZE: {s['supp_size']}px;
  --DESC_SIZE: {s['desc_size']}px;
  --TAG_SIZE: {s['tag_size']}px;
  --MODE_BG: {mode_bg};
  --MODE_CARD_BG: {mode_card_bg};
  --MODE_TEXT: {mode_text};
  --BODY_FONT: {s['title_font']};
}}
.main-title {{ font-family: {s['title_font']}; }}
</style>"""

    return css


def generate_all():
    """Generate all 31 CSS and 31 decor HTML files."""
    for num in range(1, 32):
        # CSS file
        css_content = generate_css(num)
        css_path = os.path.join(CSS_DIR, f"{num:02d}.css")
        with open(css_path, "w", encoding="utf-8") as f:
            f.write(css_content)
        print(f"  OK {css_path}")

        # Decor HTML file
        decor_content = generate_decor_html(num)
        decor_path = os.path.join(DECOR_DIR, f"{num:02d}.html")
        with open(decor_path, "w", encoding="utf-8") as f:
            f.write(decor_content)
        print(f"  OK {decor_path}")

    print(f"\nDone! Generated 62 files total.")
    print(f"  - {CSS_DIR}/ (31 CSS files)")
    print(f"  - {DECOR_DIR}/ (31 HTML files)")


if __name__ == "__main__":
    generate_all()
