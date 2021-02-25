(function() {
  const jq = document.createElement('script')
  jq.src = chrome.extension.getURL("lib/jquery-3.5.1.min.js")
  document.head.appendChild(jq)

  setTimeout(() => {
    const gm = document.createElement('script')
    gm.src = chrome.extension.getURL("lib/gmail.js")
    document.head.appendChild(gm)
  
    // get user options
    chrome.storage.sync.get({ warn: false }, function (options) {
  
      window.addEventListener("message", (evt) => {
        if (evt.data.type === undefined) { return }
        if (evt.data.type != "getSaferSendGmailOptions") { return }
        window.postMessage({ type: "saferSendGmailOptions", data: options }, "*")
      })

      // load content inject
      setTimeout(() => {
        const ct = document.createElement("script");
        ct.src = chrome.extension.getURL("content.js");
        document.body.appendChild(ct);
      }, 200)
    })
  }, 200)
})()
