// xiaohongshu-cover v28.1 framework JS — extracted from framework.html
// v28.1: 彻底修复 LOGO 方框 bug — .logo-preview 默认隐藏，无自定义 LOGO 时不渲染
// ====== DOM REFERENCES ======
const logoPreview = document.querySelector('.logo-preview');
const logoExport = document.querySelector('.logo-export');
const logoUploadPreview = document.querySelector('.logo-upload-preview');
const blendLogoGuard = document.querySelector('.blend-logo-guard');
const blendSoftlight = document.querySelector('.blend-softlight');
const bgImage = document.querySelector('.bg-image-layer');
const bgFilterWrap = document.querySelector('.bg-filter-wrap');
const bgOverlay = document.querySelector('.bg-overlay');
const coverCanvas = document.getElementById('cover-canvas');
const toastEl = document.getElementById('toast');
const contentLayer = document.querySelector('.content-layer');
const bottomRow = document.querySelector('.bottom-row');
const mainTitle = document.querySelector('.main-title');
const subtitle = document.querySelector('.subtitle');
const metaTags = document.querySelector('.meta-tags');
let isCustomLogo = false;
let customLogoDataUrl = null;
let titleFontSizeUserSet = false;
let currentBgSource = 'none';

// ====== CSS VARIABLE HELPER ======
function getCssVar(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }

// ====== TOAST HELPER ======
function showToast(msg, duration) {
  if (!toastEl) return;
  toastEl.style.display = 'block'; toastEl.textContent = msg;
  if (duration > 0) { clearTimeout(window._toastTimer); window._toastTimer = setTimeout(function() { toastEl.style.display = 'none'; }, duration); }
}


// ====== BACKGROUND SYSTEM ======
function setBgImage(src) { bgImage.src = src; bgFilterWrap.style.display = 'block'; bgOverlay.style.display = 'block'; applyBgTransform(); }
function switchToBgSource(source) {
  currentBgSource = source;
  document.querySelectorAll('#bg-options .option-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector('#bg-options .option-card[data-bg="' + source + '"]');
  if (card) card.classList.add('selected');
  document.getElementById('upload-bg-area').style.display = 'none';
  document.getElementById('clipboard-bg-area').style.display = 'none';
}

// ====== BG SCALE ======
let currentAnchor = 'tl'; let currentScale = 100;
const anchorMap = {
  tl: { transform: (s) => { bgImage.style.top = '0'; bgImage.style.left = '0'; bgImage.style.right = 'auto'; bgImage.style.bottom = 'auto'; bgImage.style.transform = 'scale(' + s + ')'; bgImage.style.transformOrigin = 'top left'; } },
  tr: { transform: (s) => { bgImage.style.top = '0'; bgImage.style.right = '0'; bgImage.style.left = 'auto'; bgImage.style.bottom = 'auto'; bgImage.style.transform = 'scale(' + s + ')'; bgImage.style.transformOrigin = 'top right'; } },
  bl: { transform: (s) => { bgImage.style.bottom = '0'; bgImage.style.left = '0'; bgImage.style.top = 'auto'; bgImage.style.right = 'auto'; bgImage.style.transform = 'scale(' + s + ')'; bgImage.style.transformOrigin = 'bottom left'; } },
  br: { transform: (s) => { bgImage.style.bottom = '0'; bgImage.style.right = '0'; bgImage.style.top = 'auto'; bgImage.style.left = 'auto'; bgImage.style.transform = 'scale(' + s + ')'; bgImage.style.transformOrigin = 'bottom right'; } },
  cc: { transform: (s) => { bgImage.style.top = '50%'; bgImage.style.left = '50%'; bgImage.style.right = 'auto'; bgImage.style.bottom = 'auto'; bgImage.style.transform = 'translate(-50%,-50%) scale(' + s + ')'; bgImage.style.transformOrigin = 'center center'; } }
};
function selectAnchor(btn, anchor) { currentAnchor = anchor; document.querySelectorAll('#anchor-options .anchor-btn').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); applyBgTransform(); }
function adjustBgScale(val) { currentScale = parseInt(val); document.getElementById('bg-scale-value').textContent = val + '%'; applyBgTransform(); }
function applyBgTransform() { const s = currentScale / 100; const handler = anchorMap[currentAnchor]; if (handler) handler.transform(s); }

// ====== FG OPACITY ======
function adjustBgOpacity(val) { document.querySelector('.bg-filter-wrap').style.opacity = val / 100; document.getElementById('bg-opacity-value').textContent = val + '%'; }

// ====== BLEND MODES ======
function getOrCreateBlendLayer(mode) {
  const id = 'blend-layer-' + mode; let layer = document.getElementById(id);
  if (!layer) {
    layer = document.createElement('div'); layer.id = id;
    layer.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;display:none;';
    layer.style.mixBlendMode = mode;
    const bgR = getCssVar('--BG_R'), bgG = getCssVar('--BG_G'), bgB = getCssVar('--BG_B');
    layer.style.background = 'rgba(' + bgR + ',' + bgG + ',' + bgB + ',0.3)';
    coverCanvas.appendChild(layer);
  }
  return layer;
}
function adjustBlendMode(mode, val) {
  document.getElementById('blend-' + mode + '-val').textContent = val + '%';
  const layer = getOrCreateBlendLayer(mode);
  if (val > 0) { layer.style.display = 'block'; layer.style.opacity = val / 100; }
  else { layer.style.display = 'none'; }
}
function applyBgFilters() {
  const c = document.getElementById('blend-contrast').value;
  const b = document.getElementById('blend-brightness').value;
  const s = document.getElementById('blend-saturate').value;
  document.querySelector('.bg-filter-wrap').style.filter = 'contrast(' + (c/100) + ') brightness(' + (b/100) + ') saturate(' + (s/100) + ')';
}
function adjustBlendContrast(v) { document.getElementById('blend-contrast-val').textContent = v + '%'; applyBgFilters(); }
function adjustBlendBrightness(v) { document.getElementById('blend-brightness-val').textContent = v + '%'; applyBgFilters(); }
function adjustBlendSaturate(v) { document.getElementById('blend-saturate-val').textContent = v + '%'; applyBgFilters(); }
function adjustBlendLogoGuard(v) {
  document.getElementById('blend-logo-guard-val').textContent = v + '%';
  const i = v / 100, bgR = getCssVar('--BG_R'), bgG = getCssVar('--BG_G'), bgB = getCssVar('--BG_B');
  if (blendLogoGuard) { blendLogoGuard.style.background = 'rgba(' + bgR + ',' + bgG + ',' + bgB + ',' + (0.05 + i * 0.5).toFixed(2) + ')'; blendLogoGuard.style.opacity = 0.2 + i * 0.8; }
}
function adjustBlendSoftlight(v) {
  document.getElementById('blend-softlight-val').textContent = v + '%';
  const i = v / 100, tR = getCssVar('--TEXT_R'), tG = getCssVar('--TEXT_G'), tB = getCssVar('--TEXT_B');
  if (blendSoftlight) { blendSoftlight.style.background = 'rgba(' + tR + ',' + tG + ',' + tB + ',' + (i * 0.15).toFixed(2) + ')'; blendSoftlight.style.opacity = i; }
}
function showBlendLayers() { if (blendLogoGuard) blendLogoGuard.style.display = 'block'; if (blendSoftlight) blendSoftlight.style.display = 'block'; document.getElementById('blend-control').style.display = 'flex'; autoExpandBlend(); }
function hideAllBlendLayers() {
  if (blendLogoGuard) blendLogoGuard.style.display = 'none'; if (blendSoftlight) blendSoftlight.style.display = 'none';
  ['darken','lighten','multiply','color'].forEach(m => { const l = document.getElementById('blend-layer-' + m); if (l) l.style.display = 'none'; });
  document.getElementById('blend-control').style.display = 'none';
}
function applyBlendPreset(preset) {
  var presets = {
    clear: {contrast:110,brightness:105,saturate:70,logoGuard:60,softlight:15,darken:0,lighten:5,multiply:0,color:0},
    dark:  {contrast:150,brightness:70,saturate:40,logoGuard:70,softlight:30,darken:20,lighten:0,multiply:10,color:0},
    soft:  {contrast:90,brightness:110,saturate:90,logoGuard:30,softlight:10,darken:0,lighten:10,multiply:0,color:0},
    vivid: {contrast:130,brightness:100,saturate:150,logoGuard:55,softlight:20,darken:0,lighten:0,multiply:0,color:5},
    warm:  {contrast:105,brightness:95,saturate:120,logoGuard:50,softlight:15,darken:0,lighten:0,multiply:5,color:10},
    reset: {contrast:100,brightness:100,saturate:80,logoGuard:0,softlight:20,darken:0,lighten:0,multiply:0,color:0}
  };
  var p = presets[preset]; if (!p) return;
  ['contrast','brightness','saturate','logoGuard','softlight','darken','lighten','multiply','color'].forEach(k => {
    var slider = document.getElementById('blend-' + k); var valEl = document.getElementById('blend-' + k + '-val');
    if (slider) slider.value = p[k]; if (valEl) valEl.textContent = p[k] + '%';
  });
  applyBgFilters(); adjustBlendLogoGuard(p.logoGuard); adjustBlendSoftlight(p.softlight);
  adjustBlendMode('darken', p.darken); adjustBlendMode('lighten', p.lighten); adjustBlendMode('multiply', p.multiply); adjustBlendMode('color', p.color);
}

// ====== BG SWITCH & UPLOAD ======
function selectBg(btn, bgType) {
  currentBgSource = bgType;
  document.querySelectorAll('#bg-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  const ua = document.getElementById('upload-bg-area'), ca = document.getElementById('clipboard-bg-area');
  const sc = document.getElementById('bg-scale-control'), oc = document.getElementById('bg-opacity-control'), bc = document.getElementById('blend-control');
  if (bgType === 'upload') { ua.style.display = 'block'; ca.style.display = 'none'; }
  else if (bgType === 'clipboard') { ca.style.display = 'block'; ua.style.display = 'none'; }
  else { ua.style.display = 'none'; ca.style.display = 'none'; }
  if (bgType === 'none') { hideAllBlendLayers(); if (sc) sc.style.display = 'none'; if (oc) oc.style.display = 'none'; if (bc) bc.style.display = 'none'; }
  else { showBlendLayers(); if (sc) sc.style.display = 'flex'; if (oc) oc.style.display = 'flex'; if (bc) bc.style.display = 'flex'; }
  if (bgType !== 'none') { autoExpandBgAdjust(); }
}
function handleBgUpload(file) { if (!file) return; const r = new FileReader(); r.onload = function(e) { setBgImage(e.target.result); switchToBgSource('upload'); }; r.readAsDataURL(file); }

// v18.0: 粘贴截图功能修复 — 仅当选中"粘贴截图"模式时响应
function handleClipboardPaste(e) {
  if (currentBgSource !== 'clipboard') return;
  const items = e.clipboardData && e.clipboardData.items;
  if (!items) return;
  for (let item of items) {
    if (item.type.indexOf('image') !== -1) {
      e.preventDefault();
      const blob = item.getAsFile();
      const r = new FileReader();
      r.onload = function(ev) { setBgImage(ev.target.result); switchToBgSource('clipboard'); showToast('截图已粘贴！', 2000); };
      r.readAsDataURL(blob);
      break;
    }
  }
}
// v18.0: 注册全局 paste 事件监听
document.addEventListener('paste', handleClipboardPaste);

// ====== LOGO TOGGLE ======
// v28.1: 无自定义 LOGO 时不显示 logo-preview（空 src 导致浏览器渲染破损图片方框）
function selectLogo(btn, action) {
  document.querySelectorAll('#logo-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  if (action === 'hide') { logoPreview.style.display = 'none'; logoExport.style.display = 'none'; if (logoUploadPreview) logoUploadPreview.style.display = 'none'; }
  else { if (isCustomLogo && logoUploadPreview) { logoUploadPreview.style.display = 'block'; logoPreview.style.display = 'none'; } else if (logoPreview) { logoPreview.style.display = 'none'; } logoExport.style.display = 'none'; }
  syncLogoGuardVisibility();
}

// ====== CUSTOM LOGO UPLOAD ======
function handleLogoUpload(file) {
  if (!file) return; const r = new FileReader();
  r.onload = function(e) {
    customLogoDataUrl = e.target.result; isCustomLogo = true;
    if (logoUploadPreview) { logoUploadPreview.src = customLogoDataUrl; logoUploadPreview.style.display = 'block'; }
    if (logoExport) { logoExport.src = customLogoDataUrl; }
    if (logoPreview) { logoPreview.style.display = 'none'; }
    applyCurrentLogoLayout();
    showToast('LOGO 已更新！', 2000);
  };
  r.readAsDataURL(file);
}
// v28.1: 重置后不显示 logo-preview（避免空 src 渲染破损图片方框）
function resetLogo() {
  isCustomLogo = false; customLogoDataUrl = null;
  if (logoUploadPreview) { logoUploadPreview.style.display = 'none'; logoUploadPreview.src = ''; }
  if (logoExport) { const s = logoExport.getAttribute('data-default-src'); if (s) logoExport.src = s; }
  showToast('已恢复默认 LOGO', 2000);
}
function applyCurrentLogoLayout() {
  if (!logoUploadPreview || !logoPreview) return;
  const layout = currentLogoLayout;
  if (layout === 'bottom-right') { logoUploadPreview.style.right = '40px'; logoUploadPreview.style.bottom = '36px'; logoUploadPreview.style.transform = 'none'; logoUploadPreview.style.top = 'auto'; logoUploadPreview.style.left = 'auto'; logoUploadPreview.style.width = '50px'; logoUploadPreview.style.height = '50px'; logoUploadPreview.style.opacity = '0.85'; }
  else if (layout === 'bottom-left') { logoUploadPreview.style.left = '40px'; logoUploadPreview.style.bottom = '36px'; logoUploadPreview.style.transform = 'none'; logoUploadPreview.style.top = 'auto'; logoUploadPreview.style.right = 'auto'; logoUploadPreview.style.width = '50px'; logoUploadPreview.style.height = '50px'; logoUploadPreview.style.opacity = '0.85'; }
  else if (layout === 'bottom-center') { logoUploadPreview.style.left = '50%'; logoUploadPreview.style.bottom = '28px'; logoUploadPreview.style.transform = 'translateX(-50%)'; logoUploadPreview.style.top = 'auto'; logoUploadPreview.style.right = 'auto'; logoUploadPreview.style.width = '48px'; logoUploadPreview.style.height = '48px'; logoUploadPreview.style.opacity = '0.85'; }
  else if (layout === 'top-center') { logoUploadPreview.style.left = '50%'; logoUploadPreview.style.top = '28px'; logoUploadPreview.style.transform = 'translateX(-50%)'; logoUploadPreview.style.bottom = 'auto'; logoUploadPreview.style.right = 'auto'; logoUploadPreview.style.width = '48px'; logoUploadPreview.style.height = '48px'; logoUploadPreview.style.opacity = '0.85'; }
}

// ====== WATERMARK ======
let watermarkGridElements = [];
function adjustWatermarkCount(val) { document.getElementById('watermark-count-value').textContent = val; applyWatermarkGrid(); }
function adjustWatermarkCols(val) { document.getElementById('watermark-cols-value').textContent = val; applyWatermarkGrid(); }
function adjustWatermarkGap(val) { document.getElementById('watermark-gap-value').textContent = val + 'px'; applyWatermarkGrid(); }
function adjustWatermarkSize(val) { document.getElementById('watermark-size-value').textContent = val + 'px'; updateWatermarkGridStyle(); }
function adjustWatermarkRotate(val) { document.getElementById('watermark-rotate-value').textContent = val + '°'; updateWatermarkGridStyle(); }
function adjustWatermarkOpacity(val) { document.getElementById('watermark-opacity-value').textContent = val + '%'; updateWatermarkGridStyle(); }
function applyWatermarkGrid() {
  clearWatermarkGrid();
  const count = parseInt(document.getElementById('watermark-count-slider').value) || 1;
  const cols = parseInt(document.getElementById('watermark-cols-slider').value) || 1;
  const gap = parseInt(document.getElementById('watermark-gap-slider').value) || 80;
  const wmSize = parseInt(document.getElementById('watermark-size-slider').value) || 200;
  const rotate = parseInt(document.getElementById('watermark-rotate-slider').value) || 0;
  const opacity = parseInt(document.getElementById('watermark-opacity-slider').value) / 100 || 0.03;
  const cW = coverCanvas.clientWidth, cH = coverCanvas.clientHeight;
  const rows = Math.ceil(count / cols);
  const totalW = cols * wmSize + (cols - 1) * gap, totalH = rows * wmSize + (rows - 1) * gap;
  const sX = (cW - totalW) / 2, sY = (cH - totalH) / 2;
  let logoSrc = isCustomLogo && customLogoDataUrl ? customLogoDataUrl : (logoExport && logoExport.src ? logoExport.src : '');
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols), col = i % cols;
    const x = sX + col * (wmSize + gap), y = sY + row * (wmSize + gap);
    const wmEl = document.createElement('img'); wmEl.className = 'watermark-grid-item'; wmEl.src = logoSrc;
    wmEl.style.cssText = 'position:absolute;z-index:1;pointer-events:none;object-fit:contain;left:' + x + 'px;top:' + y + 'px;width:' + wmSize + 'px;height:' + wmSize + 'px;opacity:' + opacity + ';transform:rotate(' + rotate + 'deg);transform-origin:center center;';
    coverCanvas.appendChild(wmEl); watermarkGridElements.push(wmEl);
  }
}
function updateWatermarkGridStyle() {
  if (watermarkGridElements.length === 0) return;
  const wmSize = parseInt(document.getElementById('watermark-size-slider').value) || 200;
  const rotate = parseInt(document.getElementById('watermark-rotate-slider').value) || 0;
  const opacity = parseInt(document.getElementById('watermark-opacity-slider').value) / 100 || 0.03;
  watermarkGridElements.forEach(el => { el.style.width = wmSize + 'px'; el.style.height = wmSize + 'px'; el.style.opacity = opacity; el.style.transform = 'rotate(' + rotate + 'deg)'; });
}
function clearWatermarkGrid() { watermarkGridElements.forEach(el => el.remove()); watermarkGridElements = []; }
function showWatermarkControls() { const wc = document.getElementById('watermark-control'); if (wc) wc.style.display = 'flex'; }
function hideWatermarkControls() { const wc = document.getElementById('watermark-control'); if (wc) wc.style.display = 'none'; clearWatermarkGrid(); }

// ====== CANVAS SIZE ======
let currentCanvasSize = '3-4';
const canvasSizes = {
  '3-4': { width: 540, height: 720 }, '1-1': { width: 600, height: 600 },
  '9-16': { width: 540, height: 960 }, '4-3': { width: 720, height: 540 }, '16-9': { width: 960, height: 540 }
};
function switchCanvasSize(btn, size) {
  currentCanvasSize = size; titleFontSizeUserSet = false;
  document.querySelectorAll('#size-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  const dims = canvasSizes[size]; coverCanvas.style.width = dims.width + 'px'; coverCanvas.style.height = dims.height + 'px';
  if (contentLayer) {
    if (size === '1-1') contentLayer.style.padding = '60px 80px 56px 80px';
    else if (size === '9-16') contentLayer.style.padding = '56px 72px 48px 72px';
    else if (size === '4-3') contentLayer.style.padding = '40px 88px 32px 88px';
    else if (size === '16-9') contentLayer.style.padding = '48px 100px 36px 100px';
    else contentLayer.style.padding = '56px 72px 48px 72px';
  }
  autoFitTitleSize(); repositionDecorElements(); adjustBottomRowSpacing();
}

// ====== AUTO FIT ======
function autoFitTitleSize() {
  const mt = mainTitle || document.querySelector('.main-title');
  if (!mt || titleFontSizeUserSet) return;
  const text = mt.textContent.replace(/[《》「」""''\s]/g, '');
  const len = text.length;
  const baseSize = parseInt(getCssVar('--TITLE_SIZE')) || 56;
  let fs;
  if (len <= 4) fs = baseSize;
  else if (len <= 6) fs = Math.max(baseSize * 0.85, 40);
  else if (len <= 8) fs = Math.max(baseSize * 0.72, 32);
  else fs = Math.max(baseSize * 0.58, 24);
  mt.style.fontSize = fs + 'px';
}

// ====== DECOR REPOSITION ======
function repositionDecorElements() {
  const dims = canvasSizes[currentCanvasSize]; const dl = document.querySelector('.decor-layer'); if (!dl) return;
  dl.querySelectorAll('[data-decor-pos]').forEach(el => {
    const pos = el.getAttribute('data-decor-pos');
    if (pos === 'tl') { el.style.top = (dims.height * 0.08) + 'px'; el.style.left = (dims.width * 0.06) + 'px'; }
    else if (pos === 'tr') { el.style.top = (dims.height * 0.1) + 'px'; el.style.right = (dims.width * 0.08) + 'px'; }
    else if (pos === 'bl') { el.style.bottom = (dims.height * 0.15) + 'px'; el.style.left = (dims.width * 0.08) + 'px'; }
    else if (pos === 'br') { el.style.bottom = (dims.height * 0.12) + 'px'; el.style.right = (dims.width * 0.1) + 'px'; }
    else if (pos === 'center') { el.style.top = '50%'; el.style.left = '50%'; }
  });
}

// ====== DARK MODE ======
let currentTheme = 'light';
function switchTheme(btn, theme) {
  currentTheme = theme; document.querySelectorAll('#theme-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  if (theme === 'dark') document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
}

// ====== LOGO LAYOUT ======
let currentLogoLayout = 'bottom-right';
function switchLogoLayout(btn, layout) {
  currentLogoLayout = layout;
  document.querySelectorAll('#logo-layout-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  syncLogoGuardPosition(); syncLogoGuardVisibility(); adjustBottomRowSpacing();
  if (logoPreview && logoExport) {
    logoPreview.style.left = 'auto'; logoPreview.style.right = 'auto'; logoPreview.style.top = 'auto'; logoPreview.style.bottom = 'auto';
    logoExport.style.left = 'auto'; logoExport.style.right = 'auto'; logoExport.style.top = 'auto'; logoExport.style.bottom = 'auto';
    if (layout === 'bottom-center') {
      logoPreview.style.left = '50%'; logoPreview.style.transform = 'translateX(-50%)'; logoPreview.style.bottom = '28px';
      logoExport.style.left = '50%'; logoExport.style.transform = 'translateX(-50%)'; logoExport.style.bottom = '28px';
      logoPreview.style.width = '48px'; logoPreview.style.height = '48px'; logoExport.style.width = '48px'; logoExport.style.height = '48px';
      logoPreview.style.opacity = '0.85'; logoExport.style.opacity = '0.85';
    } else if (layout === 'top-center') {
      logoPreview.style.left = '50%'; logoPreview.style.transform = 'translateX(-50%)'; logoPreview.style.top = '28px';
      logoExport.style.left = '50%'; logoExport.style.transform = 'translateX(-50%)'; logoExport.style.top = '28px';
      logoPreview.style.width = '48px'; logoPreview.style.height = '48px'; logoExport.style.width = '48px'; logoExport.style.height = '48px';
      logoPreview.style.opacity = '0.85'; logoExport.style.opacity = '0.85';
    } else if (layout === 'bottom-left') {
      logoPreview.style.left = '40px'; logoPreview.style.bottom = '36px'; logoPreview.style.transform = 'none';
      logoExport.style.left = '40px'; logoExport.style.bottom = '36px'; logoExport.style.transform = 'none';
      logoPreview.style.width = '50px'; logoPreview.style.height = '50px'; logoExport.style.width = '50px'; logoExport.style.height = '50px';
      logoPreview.style.opacity = '0.85'; logoExport.style.opacity = '0.85';
    } else {
      logoPreview.style.right = '40px'; logoPreview.style.bottom = '36px'; logoPreview.style.transform = 'none';
      logoExport.style.right = '40px'; logoExport.style.bottom = '36px'; logoExport.style.transform = 'none';
      logoPreview.style.width = '50px'; logoPreview.style.height = '50px'; logoExport.style.width = '50px'; logoExport.style.height = '50px';
      logoPreview.style.opacity = '0.85'; logoExport.style.opacity = '0.85';
    }
  }
  applyCurrentLogoLayout();
}

// ====== WATERMARK TOGGLE ======
let watermarkEnabled = false;
function toggleWatermark(btn, state) {
  document.querySelectorAll('#watermark-toggle-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  if (state === 'on') { watermarkEnabled = true; showWatermarkControls(); applyWatermarkGrid(); }
  else { watermarkEnabled = false; hideWatermarkControls(); }
}

// ====== LOGO GUARD SYNC ======
function syncLogoGuardPosition() {
  if (!blendLogoGuard) return;
  blendLogoGuard.style.top = 'auto'; blendLogoGuard.style.bottom = 'auto'; blendLogoGuard.style.left = 'auto'; blendLogoGuard.style.right = 'auto'; blendLogoGuard.style.transform = 'none';
  switch (currentLogoLayout) {
    case 'bottom-right': blendLogoGuard.style.right = '16px'; blendLogoGuard.style.bottom = '14px'; blendLogoGuard.style.width = '80px'; blendLogoGuard.style.height = '80px'; break;
    case 'bottom-left': blendLogoGuard.style.left = '16px'; blendLogoGuard.style.bottom = '14px'; blendLogoGuard.style.width = '80px'; blendLogoGuard.style.height = '80px'; break;
    case 'bottom-center': blendLogoGuard.style.left = '50%'; blendLogoGuard.style.bottom = '8px'; blendLogoGuard.style.transform = 'translateX(-50%)'; blendLogoGuard.style.width = '80px'; blendLogoGuard.style.height = '80px'; break;
    case 'top-center': blendLogoGuard.style.top = '8px'; blendLogoGuard.style.left = '50%'; blendLogoGuard.style.transform = 'translateX(-50%)'; blendLogoGuard.style.width = '80px'; blendLogoGuard.style.height = '80px'; break;
  }
}
function syncLogoGuardVisibility() {
  if (!blendLogoGuard) return;
  const logoVisible = (logoPreview && logoPreview.style.display !== 'none') || (logoUploadPreview && logoUploadPreview.style.display !== 'none');
  blendLogoGuard.style.display = logoVisible ? '' : 'none';
}

// ====== TAG SPACING ======
function adjustBottomRowSpacing() {
  const br = bottomRow || document.querySelector('.bottom-row');
  const cl = contentLayer || document.querySelector('.content-layer');
  if (!br || !cl) return;
  const cH = coverCanvas.clientHeight, ch = cl.scrollHeight, ratio = ch / cH;
  if (ratio < 0.60) {
    br.style.marginTop = '0'; br.style.paddingBottom = '32px';
    if (currentLogoLayout === 'bottom-center') br.style.paddingBottom = '64px';
    if (currentLogoLayout === 'bottom-right') br.style.paddingBottom = '40px';
    if (currentLogoLayout === 'bottom-left') br.style.paddingBottom = '40px';
  } else if (ratio < 0.75) {
    br.style.marginTop = '0'; br.style.paddingBottom = '16px';
    if (currentLogoLayout === 'bottom-center') br.style.paddingBottom = '48px';
    if (currentLogoLayout === 'bottom-right') br.style.paddingBottom = '28px';
    if (currentLogoLayout === 'bottom-left') br.style.paddingBottom = '28px';
  } else { br.style.marginTop = 'auto'; br.style.paddingBottom = '8px'; }
}

// ====== EXPORT FORMAT ======
let currentExportFormat = 'png';
function switchExportFormat(btn, format) {
  currentExportFormat = format;
  document.querySelectorAll('#format-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  const eb = document.querySelector('.export-btn'); const fl = { png: 'PNG', jpg: 'JPG', webp: 'WebP' };
  if (eb) eb.innerHTML = '<i class="fa-solid fa-download"></i> 导出 ' + fl[format];
}

// ====== FINE TUNE - TITLE ======
function adjustTitleWeight(val) { document.getElementById('title-weight-value').textContent = val; if (mainTitle) mainTitle.style.fontWeight = val; }
function adjustLetterSpacing(val) { document.getElementById('letter-spacing-value').textContent = val + 'px'; if (mainTitle) mainTitle.style.letterSpacing = val + 'px'; }
function adjustTitleFontSize(val) { titleFontSizeUserSet = true; document.getElementById('title-font-size-value').textContent = val; const mt = mainTitle; if (mt) mt.style.fontSize = val + 'px'; }

// ====== FINE TUNE - FONTS (v14.2: PC 端手动输入, v18.0: 无默认值) ======
function applyTitleFont() {
  const fontName = document.getElementById('title-font-input').value.trim();
  document.querySelectorAll('.main-title, .subtitle').forEach(el => {
    el.style.fontFamily = fontName ? '"' + fontName + '", serif' : '';
  });
}
function applyContentFont() {
  const fontName = document.getElementById('content-font-input').value.trim();
  document.querySelectorAll('.description, .supplement, .author-line, .meta-tag, .tag-label, .account-name-top').forEach(el => {
    el.style.fontFamily = fontName ? '"' + fontName + '", sans-serif' : '';
  });
}

// ====== FINE TUNE - SUBTITLE ======
function adjustSubtitleWeight(val) { document.getElementById('subtitle-weight-value').textContent = val; if (subtitle) subtitle.style.fontWeight = val; }
function adjustSubtitleLetterSpacing(val) { document.getElementById('subtitle-letter-spacing-value').textContent = parseFloat(val).toFixed(1); if (subtitle) subtitle.style.letterSpacing = val + 'px'; }
function adjustSubtitleLineHeight(val) { document.getElementById('subtitle-line-height-value').textContent = parseFloat(val).toFixed(2); if (subtitle) subtitle.style.lineHeight = val; }
function adjustSubtitleFontSize(val) { document.getElementById('subtitle-font-size-value').textContent = val; if (subtitle) subtitle.style.fontSize = val + 'px'; }

// ====== FINE TUNE - CONTENT ======
function adjustContentWeight(val) { document.getElementById('content-weight-value').textContent = val; document.querySelectorAll('.description, .supplement').forEach(el => { el.style.fontWeight = val; }); }
function adjustContentLetterSpacing(val) { document.getElementById('content-letter-spacing-value').textContent = val; document.querySelectorAll('.description, .supplement').forEach(el => { el.style.letterSpacing = val + 'px'; }); }
function adjustContentLineHeight(val) { document.getElementById('content-line-height-value').textContent = parseFloat(val).toFixed(2); document.querySelectorAll('.description, .supplement').forEach(el => { el.style.lineHeight = val; }); }
function adjustContentFontSize(val) { document.getElementById('content-font-size-value').textContent = parseFloat(val).toFixed(1); document.querySelectorAll('.description, .supplement').forEach(el => { el.style.fontSize = val + 'px'; }); }
function adjustContentMarginTop(val) { document.getElementById('content-margin-top-value').textContent = val + 'px'; const sp = document.querySelector('.supplement'); if (sp) sp.style.marginTop = val + 'px'; }

// ====== FINE TUNE - TAGS ======
function adjustTagWeight(val) { document.getElementById('tag-weight-value').textContent = val; document.querySelectorAll('.meta-tag').forEach(el => { el.style.fontWeight = val; }); }
function adjustTagLetterSpacing(val) { document.getElementById('tag-letter-spacing-value').textContent = parseFloat(val).toFixed(1); document.querySelectorAll('.meta-tag').forEach(el => { el.style.letterSpacing = val + 'px'; }); }
function adjustTagSize(val) {
  document.getElementById('tag-size-value').textContent = parseFloat(val).toFixed(1);
  document.querySelectorAll('.meta-tag').forEach(el => { el.style.fontSize = val + 'px'; });
  const se = document.getElementById('tag-decor-style') || document.createElement('style'); se.id = 'tag-decor-style';
  const is = Math.max(4, val * 0.55), pv = Math.max(2, val * 0.55), ph = Math.max(4, val * 1.45);
  se.textContent = '.meta-tag::before{font-size:' + is.toFixed(1) + 'px}.meta-tag{padding:' + pv.toFixed(1) + 'px ' + ph.toFixed(1) + 'px}';
  if (!document.getElementById('tag-decor-style')) document.head.appendChild(se);
}
function adjustTagGap(val) { document.getElementById('tag-gap-value').textContent = val; if (metaTags) metaTags.style.gap = val + 'px'; }

// ====== TAG OFFSET ======
let currentTagOffset = 0;
function adjustTagOffset(val) { currentTagOffset = parseInt(val); document.getElementById('tag-offset-value').textContent = val + 'px'; applyTagTransform(); }
let currentTagOffsetY = 0;
function adjustTagOffsetY(val) { currentTagOffsetY = parseInt(val); document.getElementById('tag-offset-y-value').textContent = val + 'px'; applyTagTransform(); }
function applyTagTransform() { if (bottomRow) bottomRow.style.transform = 'translate(' + currentTagOffset + 'px, ' + currentTagOffsetY + 'px)'; }

// ====== CONTENT ALIGN ======
let currentContentAlign = 'center';
function switchContentAlign(btn, align) {
  currentContentAlign = align;
  document.querySelectorAll('#content-align-options .option-card').forEach(c => c.classList.remove('selected')); btn.classList.add('selected');
  document.querySelectorAll('.description, .supplement').forEach(el => { el.style.textAlign = align; });
}

// ====== RESET FINE TUNE (v18.0: 字体输入框清空，不预填默认值) ======
function _setSlider(id, val, displayId, displayVal) {
  var el = document.getElementById(id); if (el) el.value = val;
  var dv = document.getElementById(displayId); if (dv) dv.textContent = displayVal || val;
}
function _setSliderThen(id, val, displayId, displayVal, fn, arg) {
  _setSlider(id, val, displayId, displayVal); if (fn) fn(arg || val);
}
function resetFineTune() {
  titleFontSizeUserSet = false;
  _setSliderThen('title-weight-slider', 900, 'title-weight-value', '900', adjustTitleWeight, 900);
  _setSliderThen('letter-spacing-slider', 6, 'letter-spacing-value', '6px', adjustLetterSpacing, 6);
  _setSliderThen('title-font-size-slider', 56, 'title-font-size-value', '56', adjustTitleFontSize, 56);
  _setSliderThen('subtitle-weight-slider', 300, 'subtitle-weight-value', '300', adjustSubtitleWeight, 300);
  _setSliderThen('subtitle-letter-spacing-slider', 3, 'subtitle-letter-spacing-value', '3.0', adjustSubtitleLetterSpacing, 3);
  _setSliderThen('subtitle-line-height-slider', 1.6, 'subtitle-line-height-value', '1.60', adjustSubtitleLineHeight, 1.6);
  _setSliderThen('subtitle-font-size-slider', 22, 'subtitle-font-size-value', '22', adjustSubtitleFontSize, 22);
  _setSliderThen('content-weight-slider', 300, 'content-weight-value', '300', adjustContentWeight, 300);
  _setSliderThen('content-letter-spacing-slider', 1.5, 'content-letter-spacing-value', '1.5', adjustContentLetterSpacing, 1.5);
  _setSliderThen('content-line-height-slider', 1.7, 'content-line-height-value', '1.70', adjustContentLineHeight, 1.7);
  _setSliderThen('content-font-size-slider', 13, 'content-font-size-value', '13', adjustContentFontSize, 13);
  _setSliderThen('content-margin-top-slider', 8, 'content-margin-top-value', '8px', adjustContentMarginTop, 8);
  _setSliderThen('tag-weight-slider', 400, 'tag-weight-value', '400', adjustTagWeight, 400);
  _setSliderThen('tag-letter-spacing-slider', 3, 'tag-letter-spacing-value', '3.0', adjustTagLetterSpacing, 3);
  _setSliderThen('tag-size-slider', 11, 'tag-size-value', '11', adjustTagSize, 11);
  _setSliderThen('tag-gap-slider', 12, 'tag-gap-value', '12', adjustTagGap, 12);
  _setSliderThen('tag-offset-slider', 0, 'tag-offset-value', '0px', adjustTagOffset, 0);
  _setSliderThen('tag-offset-y-slider', 0, 'tag-offset-y-value', '0px', adjustTagOffsetY, 0);
  // v18.0: 重置时清空字体输入框（无默认字体）
  var tff = document.getElementById('title-font-input'); if (tff) { tff.value = ''; }
  var bff = document.getElementById('content-font-input'); if (bff) { bff.value = ''; }
  applyTitleFont(); applyContentFont();
  document.querySelectorAll('#content-align-options .option-card').forEach(c => c.classList.remove('selected'));
  var cc = document.querySelector('#content-align-options .option-card[data-align="center"]'); if (cc) cc.classList.add('selected');
  switchContentAlign(cc || document.querySelector('#content-align-options .option-card'), 'center');
  showToast('风格微调已重置', 1500);
}

// ====== PRESET SAVE/LOAD (v18.0: 字体保存/加载不依赖 RECOMMENDED) ======
function saveCustomPreset() {
  var preset = {
    contrast: document.getElementById('blend-contrast').value, brightness: document.getElementById('blend-brightness').value, saturate: document.getElementById('blend-saturate').value,
    logoGuard: document.getElementById('blend-logo-guard').value, softlight: document.getElementById('blend-softlight').value, darken: document.getElementById('blend-darken').value,
    lighten: document.getElementById('blend-lighten').value, multiply: document.getElementById('blend-multiply').value, color: document.getElementById('blend-color').value,
    titleWeight: document.getElementById('title-weight-slider').value, letterSpacing: document.getElementById('letter-spacing-slider').value,
    titleFontSize: document.getElementById('title-font-size-slider') ? document.getElementById('title-font-size-slider').value : 56,
    titleFont: document.getElementById('title-font-input') ? document.getElementById('title-font-input').value : '',
    contentFont: document.getElementById('content-font-input') ? document.getElementById('content-font-input').value : '',
    subtitleWeight: document.getElementById('subtitle-weight-slider') ? document.getElementById('subtitle-weight-slider').value : 300,
    subtitleLetterSpacing: document.getElementById('subtitle-letter-spacing-slider') ? document.getElementById('subtitle-letter-spacing-slider').value : 3,
    subtitleLineHeight: document.getElementById('subtitle-line-height-slider') ? document.getElementById('subtitle-line-height-slider').value : 1.6,
    subtitleFontSize: document.getElementById('subtitle-font-size-slider') ? document.getElementById('subtitle-font-size-slider').value : 22,
    contentWeight: document.getElementById('content-weight-slider').value,
    contentLetterSpacing: document.getElementById('content-letter-spacing-slider') ? document.getElementById('content-letter-spacing-slider').value : 1.5,
    contentLineHeight: document.getElementById('content-line-height-slider') ? document.getElementById('content-line-height-slider').value : 1.7,
    contentFontSize: document.getElementById('content-font-size-slider') ? document.getElementById('content-font-size-slider').value : 13,
    contentMarginTop: document.getElementById('content-margin-top-slider') ? document.getElementById('content-margin-top-slider').value : 8,
    tagWeight: document.getElementById('tag-weight-slider') ? document.getElementById('tag-weight-slider').value : 400,
    tagLetterSpacing: document.getElementById('tag-letter-spacing-slider') ? document.getElementById('tag-letter-spacing-slider').value : 3,
    tagSize: document.getElementById('tag-size-slider') ? document.getElementById('tag-size-slider').value : 11,
    tagGap: document.getElementById('tag-gap-slider') ? document.getElementById('tag-gap-slider').value : 12,
    wmCount: document.getElementById('watermark-count-slider') ? document.getElementById('watermark-count-slider').value : 1,
    wmCols: document.getElementById('watermark-cols-slider') ? document.getElementById('watermark-cols-slider').value : 1,
    wmGap: document.getElementById('watermark-gap-slider') ? document.getElementById('watermark-gap-slider').value : 80,
    wmSize: document.getElementById('watermark-size-slider') ? document.getElementById('watermark-size-slider').value : 200,
    wmRotate: document.getElementById('watermark-rotate-slider') ? document.getElementById('watermark-rotate-slider').value : 0,
    wmOpacity: document.getElementById('watermark-opacity-slider') ? document.getElementById('watermark-opacity-slider').value : 3,
    contentAlign: currentContentAlign, tagOffset: currentTagOffset, tagOffsetY: currentTagOffsetY
  };
  localStorage.setItem('xiaohongshu-cover-custom-preset', JSON.stringify(preset));
  showToast('预设已保存！', 2000);
}

function loadCustomPreset() {
  var saved = localStorage.getItem('xiaohongshu-cover-custom-preset');
  if (!saved) { showToast('暂无保存的预设', 2000); return; }
  var p = JSON.parse(saved);
  ['contrast','brightness','saturate','logoGuard','softlight','darken','lighten','multiply','color'].forEach(k => {
    var slider = document.getElementById('blend-' + k); var valEl = document.getElementById('blend-' + k + '-val');
    if (slider && p[k] !== undefined) slider.value = p[k]; if (valEl) valEl.textContent = (p[k] || 0) + '%';
  });
  if (p.titleWeight !== undefined) { document.getElementById('title-weight-slider').value = p.titleWeight; document.getElementById('title-weight-value').textContent = p.titleWeight; adjustTitleWeight(p.titleWeight); }
  if (p.letterSpacing !== undefined) { document.getElementById('letter-spacing-slider').value = p.letterSpacing; document.getElementById('letter-spacing-value').textContent = p.letterSpacing + 'px'; adjustLetterSpacing(p.letterSpacing); }
  if (p.titleFontSize !== undefined) { var tfsl = document.getElementById('title-font-size-slider'); if (tfsl) { tfsl.value = p.titleFontSize; document.getElementById('title-font-size-value').textContent = p.titleFontSize; adjustTitleFontSize(p.titleFontSize); } }
  if (p.titleFont !== undefined) { var tff = document.getElementById('title-font-input'); if (tff) { tff.value = p.titleFont; applyTitleFont(); } }
  if (p.contentFont !== undefined) { var bff = document.getElementById('content-font-input'); if (bff) { bff.value = p.contentFont; applyContentFont(); } }
  if (p.subtitleWeight !== undefined) { var sw = document.getElementById('subtitle-weight-slider'); if (sw) { sw.value = p.subtitleWeight; document.getElementById('subtitle-weight-value').textContent = p.subtitleWeight; adjustSubtitleWeight(p.subtitleWeight); } }
  if (p.subtitleLetterSpacing !== undefined) { var sls = document.getElementById('subtitle-letter-spacing-slider'); if (sls) { sls.value = p.subtitleLetterSpacing; document.getElementById('subtitle-letter-spacing-value').textContent = parseFloat(p.subtitleLetterSpacing).toFixed(1); adjustSubtitleLetterSpacing(p.subtitleLetterSpacing); } }
  if (p.subtitleLineHeight !== undefined) { var slh = document.getElementById('subtitle-line-height-slider'); if (slh) { slh.value = p.subtitleLineHeight; document.getElementById('subtitle-line-height-value').textContent = parseFloat(p.subtitleLineHeight).toFixed(2); adjustSubtitleLineHeight(p.subtitleLineHeight); } }
  if (p.subtitleFontSize !== undefined) { var sfs = document.getElementById('subtitle-font-size-slider'); if (sfs) { sfs.value = p.subtitleFontSize; document.getElementById('subtitle-font-size-value').textContent = p.subtitleFontSize; adjustSubtitleFontSize(p.subtitleFontSize); } }
  if (p.contentWeight !== undefined) { document.getElementById('content-weight-slider').value = p.contentWeight; document.getElementById('content-weight-value').textContent = p.contentWeight; adjustContentWeight(p.contentWeight); }
  if (p.contentLetterSpacing !== undefined) { var cl = document.getElementById('content-letter-spacing-slider'); if (cl) { cl.value = p.contentLetterSpacing; document.getElementById('content-letter-spacing-value').textContent = p.contentLetterSpacing; adjustContentLetterSpacing(p.contentLetterSpacing); } }
  if (p.contentLineHeight !== undefined) { var clh = document.getElementById('content-line-height-slider'); if (clh) { clh.value = p.contentLineHeight; document.getElementById('content-line-height-value').textContent = parseFloat(p.contentLineHeight).toFixed(2); adjustContentLineHeight(p.contentLineHeight); } }
  if (p.contentFontSize !== undefined) { var cfs = document.getElementById('content-font-size-slider'); if (cfs) { cfs.value = p.contentFontSize; document.getElementById('content-font-size-value').textContent = parseFloat(p.contentFontSize).toFixed(1); adjustContentFontSize(p.contentFontSize); } }
  if (p.contentMarginTop !== undefined) { var cmt = document.getElementById('content-margin-top-slider'); if (cmt) { cmt.value = p.contentMarginTop; document.getElementById('content-margin-top-value').textContent = p.contentMarginTop + 'px'; adjustContentMarginTop(p.contentMarginTop); } }
  if (p.tagWeight !== undefined) { var tw = document.getElementById('tag-weight-slider'); if (tw) { tw.value = p.tagWeight; document.getElementById('tag-weight-value').textContent = p.tagWeight; adjustTagWeight(p.tagWeight); } }
  if (p.tagLetterSpacing !== undefined) { var tls = document.getElementById('tag-letter-spacing-slider'); if (tls) { tls.value = p.tagLetterSpacing; document.getElementById('tag-letter-spacing-value').textContent = parseFloat(p.tagLetterSpacing).toFixed(1); adjustTagLetterSpacing(p.tagLetterSpacing); } }
  if (p.tagSize !== undefined) { var ts = document.getElementById('tag-size-slider'); if (ts) { ts.value = p.tagSize; document.getElementById('tag-size-value').textContent = parseFloat(p.tagSize).toFixed(1); adjustTagSize(p.tagSize); } }
  if (p.tagGap !== undefined) { var tg = document.getElementById('tag-gap-slider'); if (tg) { tg.value = p.tagGap; document.getElementById('tag-gap-value').textContent = p.tagGap; adjustTagGap(p.tagGap); } }
  if (p.wmCount !== undefined) { var wc = document.getElementById('watermark-count-slider'); if (wc) { wc.value = p.wmCount; adjustWatermarkCount(p.wmCount); } }
  if (p.wmCols !== undefined) { var wcl = document.getElementById('watermark-cols-slider'); if (wcl) { wcl.value = p.wmCols; adjustWatermarkCols(p.wmCols); } }
  if (p.wmGap !== undefined) { var wg = document.getElementById('watermark-gap-slider'); if (wg) { wg.value = p.wmGap; adjustWatermarkGap(p.wmGap); } }
  if (p.wmSize !== undefined) { var ws = document.getElementById('watermark-size-slider'); if (ws) { ws.value = p.wmSize; adjustWatermarkSize(p.wmSize); } }
  if (p.wmRotate !== undefined) { var wr = document.getElementById('watermark-rotate-slider'); if (wr) { wr.value = p.wmRotate; adjustWatermarkRotate(p.wmRotate); } }
  if (p.wmOpacity !== undefined) { var wo = document.getElementById('watermark-opacity-slider'); if (wo) { wo.value = p.wmOpacity; adjustWatermarkOpacity(p.wmOpacity); } }
  if (p.tagOffset !== undefined) { var to = document.getElementById('tag-offset-slider'); if (to) { to.value = p.tagOffset; adjustTagOffset(p.tagOffset); } }
  if (p.tagOffsetY !== undefined) { var toy = document.getElementById('tag-offset-y-slider'); if (toy) { toy.value = p.tagOffsetY; adjustTagOffsetY(p.tagOffsetY); } }
  if (p.contentAlign !== undefined) { var card = document.querySelector('#content-align-options .option-card[data-align="' + p.contentAlign + '"]'); if (card) switchContentAlign(card, p.contentAlign); }
  applyBgFilters(); adjustBlendLogoGuard(p.logoGuard || 0); adjustBlendSoftlight(p.softlight || 20);
  adjustBlendMode('darken', p.darken || 0); adjustBlendMode('lighten', p.lighten || 0); adjustBlendMode('multiply', p.multiply || 0); adjustBlendMode('color', p.color || 0);
  showToast('预设已加载！', 2000);
}

// ====== EXPORT ======
async function exportPNG() {
  showToast('正在导出...', 0);
  if (logoPreview && logoExport && logoPreview.style.display !== 'none') { logoPreview.style.display = 'none'; logoExport.style.display = 'block'; if (isCustomLogo && logoUploadPreview) { logoUploadPreview.style.display = 'none'; } }
  try {
    var c = await html2canvas(coverCanvas, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: null });
    var now = new Date(); var ts = now.getFullYear() + String(now.getMonth()+1).padStart(2,'0') + String(now.getDate()).padStart(2,'0');
    var mime, ext;
    if (currentExportFormat === 'jpg') { mime = 'image/jpeg'; ext = 'jpg'; }
    else if (currentExportFormat === 'webp') { mime = 'image/webp'; ext = 'webp'; }
    else { mime = 'image/png'; ext = 'png'; }
    var quality = currentExportFormat === 'jpg' ? 0.95 : (currentExportFormat === 'webp' ? 0.92 : undefined);
    var dataUrl = quality !== undefined ? c.toDataURL(mime, quality) : c.toDataURL(mime);
    var link = document.createElement('a');
    link.download = '封面-' + (window.EXPORT_TITLE || '分享') + '-' + ts + '.' + ext;
    link.href = dataUrl; link.click();
    showToast('导出成功！(' + ext.toUpperCase() + ')', 2500);
  } catch(e) { showToast('导出失败，请重试', 2500); }
  // v28.1: 无自定义 LOGO 时不恢复显示（避免空 src 渲染破损图片方框）
  if (logoPreview && logoExport) { if (isCustomLogo && logoUploadPreview) { logoUploadPreview.style.display = 'block'; logoPreview.style.display = 'none'; } else { logoPreview.style.display = 'none'; } logoExport.style.display = 'none'; }
}

// ====== KEYBOARD SHORTCUTS ======
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'e') { e.preventDefault(); exportPNG(); return; }
  if (e.ctrlKey && e.key === 's') { e.preventDefault(); saveCustomPreset(); return; }
  if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    var skm = { '1': '3-4', '2': '1-1', '3': '9-16', '4': '4-3', '5': '16-9' };
    var size = skm[e.key]; if (size) { var card = document.querySelector('#size-options .option-card[data-size="' + size + '"]'); if (card) switchCanvasSize(card, size); }
  }
});

// ====== ACCORDION TOGGLE ======
function toggleAccordion(header) { var section = header.parentElement; if (!section) return; section.classList.toggle('open'); }
function toggleSubAccordion(header) { var section = header.parentElement; if (!section) return; section.classList.toggle('open'); }
function autoExpandBgAdjust() {
  var group = document.getElementById('bg-adjust-group');
  if (!group) return;
  var hasBg = (document.getElementById('bg-scale-control').style.display !== 'none')
           || (document.getElementById('bg-opacity-control').style.display !== 'none');
  if (hasBg) group.classList.add('open');
}
function autoExpandBlend() {
  var group = document.getElementById('blend-group');
  if (!group) return;
  if (document.getElementById('blend-control').style.display !== 'none') group.classList.add('open');
}
