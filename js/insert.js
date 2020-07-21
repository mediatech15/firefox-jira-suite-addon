(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function insertSnip(snip) {
    let element = document.activeElement;
    const value = element.value;
    // save selection start and end position
    const start = element.selectionStart;
    const end = element.selectionEnd;
    // update the value with our text inserted
    try {
      element.value = value.slice(0, start) + snip + value.slice(end);
    } catch (err) {
      console.error(err);
    }
    // update cursor to be at the end of insertion
    element.selectionStart = element.selectionEnd = start + snip.length;
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "insert-snip") {
      insertSnip(message.snip);
    }
  });
})();
