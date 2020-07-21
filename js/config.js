let storageObject;
let stor = browser.storage.sync;
refreshStorage();

function refreshStorage() {
  try {
    stor.get().then(restoreSite).catch(reportError);
  } catch (err) {
    reportError(err);
  }
}

function reportError(error) {
  console.error(`Error: ${error}`);
}

function restoreSite(result) {
  storageObject = result;
  document.getElementById("accept").value = result.accept;
  document.getElementById("story").value = result.story;
  document.getElementById("swbug").value = result.swBug;
  document.getElementById("hwbug").value = result.hwBug;
  document.getElementById("moveissue").value = result.moveItem;
  document.getElementById("closeissue").value = result.closeItem;
}

function listenForClicks() {
  document.addEventListener("click", (e) => {
    function reportError(error) {
      console.error(`Error: ${error}`);
    }

    function reset() {
      stor.clear().then(console.log("cleared"));
      var el = document.createElement("p");
      el.id = "reset-text";
      el.innerText =
        "Config has been reset please close this page and return via toolbar button.";
      var parent = document.getElementById("reset");
      parent.parentNode.insertBefore(el, parent.nextSibling);
    }

    if (e.target.id == "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    }
  });
}

listenForClicks();
