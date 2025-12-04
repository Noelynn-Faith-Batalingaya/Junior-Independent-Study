// ==============================
// Noelynn A11y Preflight — code.js
// ==============================

// ---- WCAG helpers ----
function relativeLuminance(rgb) {
  var srgb = rgb.map(function (v) {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}
function contrastRatio(fg, bg) {
  var L1 = relativeLuminance(fg);
  var L2 = relativeLuminance(bg);
  var lighter = Math.max(L1, L2);
  var darker  = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}
function solidRGB(paint) {
  if (!paint || paint.type !== 'SOLID') return null;
  return [paint.color.r, paint.color.g, paint.color.b];
}

// ---- text helpers ----
function isLargeText(fontSize, fontName) {
  var fs = Number(fontSize || 0);
  var isBold = false;
  if (fontName && typeof fontName === 'object' && typeof fontName.style === 'string') {
    isBold = /bold/i.test(fontName.style);
  }
  return (fs >= 18) || (isBold && fs >= 14);
}
function tryGetFontSize(t) { try { return Number(t.fontSize); } catch (e) { return 0; } }
function tryGetFontName(t) { try { return t.fontName; } catch (e) { return null; } }

// ---- interactive heuristic ----
function looksClickable(node) {
  if (!node || typeof node.name !== 'string') return false;
  if (/button|link|cta|chip/i.test(node.name)) return true;
  if ('reactions' in node && Array.isArray(node.reactions) && node.reactions.length > 0) return true;
  return false;
}

// ---- find background along ancestors ----
function getNodeBgRGB(node) {
  function fromFills(n) {
    if (!n || !('fills' in n)) return null;
    if (n.type === 'TEXT') return null;
    var fills = n.fills;
    if (!Array.isArray(fills) || !fills[0] || fills[0].type !== 'SOLID') return null;
    return [fills[0].color.r, fills[0].color.g, fills[0].color.b];
  }
  var n = node ? node.parent : null;
  while (n) {
    var rgb = fromFills(n);
    if (rgb) return rgb;
    n = n.parent;
  }
  return [1,1,1]; // default white
}

// ---- load fonts if we change fontSize ----
async function loadFontForText(t) {
  try {
    await figma.loadFontAsync(t.fontName);
    return true;
  } catch (e) {}
  try {
    var ranges = t.getRangeAllFontNames(0, t.characters.length);
    for (var i = 0; i < ranges.length; i++) {
      await figma.loadFontAsync(ranges[i]);
    }
    return true;
  } catch (e) {}
  return false;
}

// =====================
// SCAN (unchanged rules)
// =====================
function runChecks() {
  var page = figma.currentPage;
  var findings = [];

  // TEXT checks
  var textNodes = page.findAll(function (n) { return n.type === 'TEXT'; });
  textNodes.forEach(function (t) {
    var fg = null;
    try {
      var fills = Array.isArray(t.fills) ? t.fills : [];
      fg = fills[0] ? solidRGB(fills[0]) : null;
    } catch (e) {}

    var bg = getNodeBgRGB(t);

    if (fg) {
      var ratio = contrastRatio(fg, bg);
      var fs = tryGetFontSize(t);
      var fn = tryGetFontName(t);
      var large = isLargeText(fs, fn);
      var needed = large ? 3.0 : 4.5;

      if (ratio < needed) {
        findings.push({
          rule: 'contrast',
          severity: 'FAIL',
          nodeId: t.id,
          nodeName: t.name,
          page: page.name,
          value: Number(ratio.toFixed(2)),
          threshold: needed
        });
      }
      if (fs && fs < 12) {
        findings.push({
          rule: 'text-size',
          severity: 'FAIL',
          nodeId: t.id,
          nodeName: t.name,
          page: page.name,
          value: fs,
          threshold: 12
        });
      }
    } else {
      findings.push({
        rule: 'contrast',
        severity: 'WARN',
        nodeId: t.id,
        nodeName: t.name,
        page: page.name,
        value: 'unknown',
        threshold: 'solid only'
      });
    }
  });

  // TARGET size checks
  var frames = page.findAll(function (n) {
    return (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE');
  });
  frames.forEach(function (f) {
    if (!looksClickable(f)) return;
    var w = Math.round(f.width);
    var h = Math.round(f.height);
    if (w < 44 || h < 44) {
      findings.push({
        rule: 'target-size',
        severity: 'FAIL',
        nodeId: f.id,
        nodeName: f.name,
        page: page.name,
        value: w + '×' + h,
        threshold: '44×44'
      });
    }
  });

  figma.ui.postMessage({
    type: 'results',
    findings: findings,
    file: figma.root.name,
    page: page.name,
    timestamp: Date.now()
  });
}

// =====================
// ONE-CLICK FIXES
// =====================

// Text size: bump to at least 12
async function fixTextSize(nodeId) {
  var n = figma.getNodeById(nodeId);
  if (!n || n.type !== 'TEXT') return;
  var ok = await loadFontForText(n);
  if (!ok) return;
  var fs = tryGetFontSize(n);
  if (fs < 12) {
    try { n.fontSize = 12; } catch (e) {}
  }
}

// Target size: resize to min 44×44 (keeps top-left anchored)
function fixTargetSize(nodeId) {
  var n = figma.getNodeById(nodeId);
  if (!n) return;
  if (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE') {
    var w = Math.round(n.width);
    var h = Math.round(n.height);
    var nw = Math.max(44, w);
    var nh = Math.max(44, h);
    try { n.resize(nw, nh); } catch (e) {}
  }
}

// Contrast: snap text fill to black or white (whichever passes)
function fixContrast(nodeId) {
  var n = figma.getNodeById(nodeId);
  if (!n || n.type !== 'TEXT') return;

  var bg = getNodeBgRGB(n);
  var black = [0,0,0];
  var white = [1,1,1];

  // Assume normal text → need 4.5; if currently large, 3.0 would also pass.
  var fs = tryGetFontSize(n);
  var fn = tryGetFontName(n);
  var large = isLargeText(fs, fn);
  var needed = large ? 3.0 : 4.5;

  var blackOK = contrastRatio(black, bg) >= needed;
  var whiteOK = contrastRatio(white, bg) >= needed;

  var targetRGB = blackOK ? black : (whiteOK ? white : null);

  if (targetRGB) {
    // Set solid fill
    try {
      n.fills = [{
        type: 'SOLID',
        color: { r: targetRGB[0], g: targetRGB[1], b: targetRGB[2] }
      }];
    } catch (e) {}
  }
}

// After any fix, re-run and refresh the panel
async function handleFix(rule, nodeId) {
  if (rule === 'text-size') {
    await fixTextSize(nodeId);
  } else if (rule === 'target-size') {
    fixTargetSize(nodeId);
  } else if (rule === 'contrast') {
    fixContrast(nodeId);
  }
  runChecks(); // refresh list so the item disappears if fixed
}

// =====================
// UI wiring
// =====================
figma.showUI(__html__, { width: 420, height: 520 });

figma.ui.onmessage = function (msg) {
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'run-checks') {
    runChecks();
    return;
  }

  if (msg.type === 'select-node' && msg.nodeId) {
    var node = figma.getNodeById(msg.nodeId);
    if (node) {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    }
    return;
  }

  if (msg.type === 'fix' && msg.nodeId && msg.rule) {
    handleFix(msg.rule, msg.nodeId);
    return;
  }

  if (msg.type === 'close') {
    figma.closePlugin();
    return;
  }
};
