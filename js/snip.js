function listenForClicks() {
  document.addEventListener("mousedown", (e) => {
    function reportError(error) {
      console.error(`Error: ${error}`);
    }

    function getSnip(snipname) {
      switch (snipname) {
        case "Acceptance Criteria":
          return storageObject.accept;
        case "Story":
          return storageObject.story;
        case "SW Bug":
          return storageObject.swBug;
        case "HW Bug":
          return storageObject.hwBug;
        case "Move Item":
          return storageObject.moveItem;
        case "Close Item":
          return storageObject.closeItem;
      }
    }

    function insertSnip(tabs) {
      let toInsert = getSnip(e.target.textContent);
      browser.tabs.sendMessage(tabs[0].id, {
        command: "insert-snip",
        snip: toInsert,
      });
    }

    function makeURL() {
      let uri = document.getElementById("siteUrl").value;
      let issue = document.getElementById("issueId").value;
      if (uri.startsWith("http://")) {
        uri = "https://" + uri.slice(7, uri.Length);
      } else if (uri.startsWith("https://")) {
        uri = uri;
      } else {
        uri = "https://" + uri;
      }
      if (uri.endsWith("/")) {
        uri += "browse/" + issue;
      } else {
        uri += "/browse/" + issue;
      }
      console.log(`uri: ${uri}`);
      return uri;
    }

    function openURL() {
      var creating = browser.tabs.create({
        url: makeURL(),
      });
      creating.catch(reportError);
    }

    function openConfig() {
      var creating = browser.tabs.create({
        url: "/web/config.html",
      });
      creating.catch(reportError);
    }

    function copysnip(){
      var writing = navigator.clipboard.writeText(getSnip(e.target.textContent));
      writing.catch(reportError);
    }

    function copyClipboard() {
      var writing = navigator.clipboard.writeText(makeURL());
      writing.catch(reportError);
    }
    if (e.button == 0) {
      if (e.target.classList.contains("snippit")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(insertSnip)
          .catch(reportError);
      } else if (e.target.classList.contains("goButton")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(openURL)
          .catch(reportError);
      } else if (e.target.classList.contains("copyButton")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(copyClipboard)
          .catch(reportError);
      } else if (e.target.classList.contains("hiddenPage")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(openConfig)
          .catch(reportError);
      }
    } else if (e.button == 2){
      if (e.target.classList.contains("snippit")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(copysnip)
          .catch(reportError);
      }
    }
  });
}

function listenForInput() {
  document.addEventListener("input", (e) => {
    function reportError(error) {
      console.error(`Error: ${error}`);
    }

    function saveUrl() {
      stor.set({ jiraLink: document.getElementById("siteUrl").value });
    }

    if (e.target.id == "siteUrl") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(saveUrl)
        .catch(reportError);
    }
  });
}

function reportError(error) {
  console.error(`Error: ${error}`);
}

function restoreSite(result) {
  storageObject = result;
  document.getElementById("siteUrl").value = result.jiraLink || "";
}

function storageUse(result) {
  console.log(result);
}

function checkDefaults() {
  console.log("checking defaults");
  if (storageObject.accept == undefined) {
    stor.set({
      accept: `{panel:title=Acceptance Criteria|titleBGColor=#ecf0f1}
h3. Scenario
----
*Given*
*When*
*Then*

h3. Scenario
----
*Given*
*When*
*Then*
{panel}`,
    });
  }
  if (storageObject.story == undefined) {
    stor.set({
      story: `{panel:title=Story|titleBGColor=#ecf0f1}
*As a* 
*I want to* 
*So that* 
{panel}`,
    });
  }
  if (storageObject.swBug == undefined) {
    stor.set({
      swBug: `{panel:title=Description Of Issue|titleBGColor=#ecf0f1}
h4. I expected it to do this:
What the reporter is expecting

h4. But this happened:
What the reporter experienced
{panel}
{panel:title=Deployment Info|titleBGColor=#ecf0f1}
h4. System State
* What devices were online/offline during deployment?
** 

h4. Software
* GCP/GS Version: x.x.x.x
* Toolbelt Version: x.x.x.x

h4. Firmware
* HW: x.x.x.x
* HW: x.x.x.x
{panel}`,
    });
  }
  if (storageObject.hwBug == undefined) {
    stor.set({
      hwBug: `{panel:title=Description Of Issue|titleBGColor=#ecf0f1}
h4. I expected it to do this:
What the reporter is expecting

h4. But this happened:
What the reporter experienced
{panel}

{panel:title=Topology|titleBGColor=#ecf0f1}
Device: Model (FW x.xx.xxx)
* LAN @ 10.1.1.100 \\\\{color:red}DHCP client on|off{color}
** Device 1 @ Address \\\\{color:red}DHCP client on|off{color} \\\\FW x.xx.xxx
** Device 2 @ Address \\\\{color:red}DHCP client on|off{color} \\\\FW x.xx.xxx
* AVLAN @ 192.168.1.100 \\\\{color:red}DHCP client on|off{color}
** Device 1 @ Address \\\\{color:red}DHCP client on|off{color} \\\\FW x.xx.xxx
** Device 2 @ Address \\\\{color:red}DHCP client on|off{color} \\\\FW x.xx.xxx
{panel}

{panel:title=Deployment Info|titleBGColor=#ecf0f1}
* What devices were online/offline during deployment?
** 
* What side did you deploy from if Dual-Nic?
** 

h4. Software
* GCP/GS Version: x.x.x.x
* Toolbelt Version: x.x.x.x

{panel}`,
    });
  }
  if (storageObject.moveItem == undefined) {
    stor.set({
      moveItem: `h4. What project to move to?

h4. Who gave permission?

h4. Why is the issue moving?
        
`,
    });
  }
  if (storageObject.closeItem == undefined) {
    stor.set({
      closeItem: `h4. Reason for closing?

h4. If direct duplicate was it linked?

`,
    });
  }
}

let storageObject;
let stor = browser.storage.sync;
refreshStorage();

function refreshStorage() {
  try {
    //stor.clear().then(console.log("cleared"));
    stor.get().then(restoreSite).then(checkDefaults).catch(reportError);
    stor.getBytesInUse().then(storageUse).catch(reportError);
  } catch (err) {
    reportError(err);
  }
}

function reportExecuteScriptError(error) {
  document.querySelector("#rootcontainer").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute insert content script: ${error.message}`);
}

document.addEventListener('contextmenu', event => event.preventDefault());
/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: "/js/insert.js" })
  .then(listenForClicks)
  .then(listenForInput)
  .catch(reportExecuteScriptError);
