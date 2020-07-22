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
  document.getElementById("usnip1").value = result.uitem1;
  document.getElementById("usnip2").value = result.uitem2;
  document.getElementById("usnip3").value = result.uitem3;
  document.getElementById("usnip4").value = result.uitem4;
  document.getElementById("usnip5").value = result.uitem5;
  document.getElementById("usnip6").value = result.uitem6;
  document.getElementById("usnip7").value = result.uitem7;
  document.getElementById("usnip8").value = result.uitem8;
  document.getElementById("usnip9").value = result.uitem9;
  document.getElementById("usnip10").value = result.uitem10;
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

    function save() {
      stor.set({ accept: document.getElementById("accept").value });
      stor.set({ story: document.getElementById("story").value });
      stor.set({ swBug: document.getElementById("swbug").value });
      stor.set({ hwBug: document.getElementById("hwbug").value });
      stor.set({ moveItem: document.getElementById("moveissue").value });
      stor.set({ closeItem: document.getElementById("closeissue").value });
      stor.set({ uitem1: document.getElementById("usnip1").value });
      stor.set({ uitem2: document.getElementById("usnip2").value });
      stor.set({ uitem3: document.getElementById("usnip3").value });
      stor.set({ uitem4: document.getElementById("usnip4").value });
      stor.set({ uitem5: document.getElementById("usnip5").value });
      stor.set({ uitem6: document.getElementById("usnip6").value });
      stor.set({ uitem7: document.getElementById("usnip7").value });
      stor.set({ uitem8: document.getElementById("usnip8").value });
      stor.set({ uitem9: document.getElementById("usnip9").value });
      stor.set({ uitem10: document.getElementById("usnip10").value });
      var el = document.createElement("p");
      el.id = "save-text";
      el.innerText =
        "Config has been saved.";
      var parent = document.getElementById("save");
      parent.parentNode.insertBefore(el, parent.nextSibling);
    }

    if (e.target.id == "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(reset)
        .catch(reportError);
    } else if (e.target.id == "save") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(save)
        .catch(reportError);
    }
  });
}

listenForClicks();
