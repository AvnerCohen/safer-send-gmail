// Saves options to chrome.storage
function save_options() {
  chrome.storage.sync.set(
    {
      randomize: document.getElementById("randomize").checked,
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
  // Use default value randomize = false.
  chrome.storage.sync.get(
    {
      randomize: false,
    },
    function (items) {
      document.getElementById("randomize").checked = items.randomize;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
