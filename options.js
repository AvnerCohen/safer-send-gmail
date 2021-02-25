// Saves options to chrome.storage
function save_options() {
  var warn = document.getElementById("warn").checked;
  chrome.storage.sync.set(
    {
      warn: warn,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 1500);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and warn = true.
  chrome.storage.sync.get(
    {
      warn: false,
    },
    function (items) {
      document.getElementById("warn").checked = items.warn;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
