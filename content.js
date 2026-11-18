(() => {
  const STYLE_ID = "aurora-cpf-cleaner-style";
  const HIDE_CSS = ".aluno-cpf { display: none !important; visibility: hidden !important; }";
  let enabled = true;
  let observer = null;

  function applySetting() {
    const root = document.documentElement;
    if (!root) return;

    let style = document.getElementById(STYLE_ID);
    if (enabled) {
      if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = HIDE_CSS;
        root.appendChild(style);
      }
    } else if (style) {
      style.remove();
    }
  }

  function startObserver() {
    if (observer || !document.documentElement) return;
    observer = new MutationObserver(() => {
      if (enabled && !document.getElementById(STYLE_ID)) applySetting();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function initialize() {
    applySetting();
    startObserver();

    chrome.storage.local.get({ enabled: true }, (result) => {
      if (chrome.runtime.lastError) return;
      enabled = result.enabled !== false;
      applySetting();
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === "local" && changes.enabled) {
        enabled = changes.enabled.newValue !== false;
        applySetting();
      }
    });
  }

  if (document.documentElement) {
    initialize();
  } else {
    const waitForRoot = new MutationObserver(() => {
      if (document.documentElement) {
        waitForRoot.disconnect();
        initialize();
      }
    });
    waitForRoot.observe(document, { childList: true, subtree: true });
  }
})();
