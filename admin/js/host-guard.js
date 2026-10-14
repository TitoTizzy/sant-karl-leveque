(() => {
  const allowedHosts = new Set(["admin.santkarlleveque.com", "localhost", "127.0.0.1", ""]);
  if (!allowedHosts.has(window.location.hostname)) {
    window.location.replace("https://titotizzy.github.io/sant-karl-leveque/");
  }
})();

