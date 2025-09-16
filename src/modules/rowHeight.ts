const STYLE_ELEMENT_ID = `${addon.data.config.addonRef}-row-height-style`;

type ItemTreeWithRefresh = _ZoteroTypes.ItemTree & {
  updateFontSize?: () => void;
  refresh?: () => void;
};

function refreshRowHeight(win: _ZoteroTypes.MainWindow): void {
  const itemsView = win.ZoteroPane?.itemsView;

  if (!itemsView) {
    return;
  }

  try {
    const refresher = itemsView as ItemTreeWithRefresh;

    if (typeof refresher.updateFontSize === "function") {
      refresher.updateFontSize();
    } else if (typeof refresher.refresh === "function") {
      refresher.refresh();
    }
  } catch (error) {
    const loggedError =
      error instanceof Error ? error : new Error(String(error));
    Zotero.logError(loggedError);
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
