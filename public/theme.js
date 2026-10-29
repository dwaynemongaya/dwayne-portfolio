// This small, blocking head script applies the theme before CSS or body paint.
// It stays external so the site's Content Security Policy needs no inline code.
(() => {
  const root = document.documentElement;
  const storageKey = 'portfolio-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let selection = readSelection();

  function readSelection() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      // The toggle still works when a browser disallows persistent storage.
      return null;
    }
  }

  function applyTheme() {
    const theme = selection || (system.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#132029' : '#F8F8F8';
    const button = document.querySelector('.theme-toggle');
    if (button) {
      const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }

  applyTheme();
  system.addEventListener('change', () => {
    if (selection === null) applyTheme();
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      selection = readSelection();
      applyTheme();
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;
    applyTheme();
    button.hidden = false;
    button.addEventListener('click', () => {
      selection = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(storageKey, selection);
      } catch {
        // Keep the manual selection for this page when storage is unavailable.
      }
      applyTheme();
    });
  });
})();
