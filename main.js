(function() {

  self.setTimeout(() => {
    // get user options with fallback default
    chrome.storage.sync.get({
      randomize: false
    }, function (options) {
  
      window.addEventListener("message", (evt) => {
        if (evt.data.type === undefined) { return }
        if (evt.data.type != "getSaferSendGmailOptions") { return }
        window.postMessage({ type: "saferSendGmailOptions", data: options }, "*")
      })

    })
  }, 200)
})()
