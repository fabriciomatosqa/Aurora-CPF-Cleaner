const toggle = document.getElementById("enabled");
const status = document.getElementById("status");

function render(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled ? "Ativado" : "Desativado";
  status.classList.toggle("off", !enabled);
}

chrome.storage.local.get({ enabled: true }, (result) => render(result.enabled !== false));

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled }, () => {
    if (chrome.runtime.lastError) {
      render(!enabled);
      status.textContent = "Não foi possível salvar";
      status.classList.add("off");
      return;
    }
    render(enabled);
  });
});
