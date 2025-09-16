const STYLE_ELEMENT_ID = `${addon.data.config.addonRef}-row-height-style`;

function refreshRowHeight(win: _ZoteroTypes.MainWindow): void {
  try {
    win.ZoteroPane?.itemsView?.updateFontSize?.();
  } catch (error) {
    Zotero.logError(error);
  }
}

export function registerRowHeightStyles(win: _ZoteroTypes.MainWindow): void {
  const doc = win.document;
  if (doc.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }

  const link = doc.createElement("link");
  link.id = STYLE_ELEMENT_ID;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `chrome://${addon.data.config.addonRef}/content/zoteroPane.css`;

  link.addEventListener(
    "load",
    () => {
      refreshRowHeight(win);
    },
    { once: true },
  );

  doc.documentElement?.appendChild(link);

  if (link.sheet) {
    refreshRowHeight(win);
  }
}

export function unregisterRowHeightStyles(win: _ZoteroTypes.MainWindow): void {
  const doc = win.document;
  doc.getElementById(STYLE_ELEMENT_ID)?.remove();
  refreshRowHeight(win);
}
