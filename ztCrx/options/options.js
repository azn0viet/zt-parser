// Saves options to chrome.storage
function save_options() {
  var uptobox = document.getElementById('uptobox').checked;
  var uploaded = document.getElementById('uploaded').checked;
  var turbobit = document.getElementById('turbobit').checked;
  var nitroflare = document.getElementById('nitroflare').checked;
  var un_fichier = document.getElementById('1fichier').checked;
  var rapidgator = document.getElementById('rapidgator').checked;

  chrome.storage.sync.set({
    Uptobox: uptobox,
    Uploaded: uploaded,
    Turbobit: turbobit,
    Nitroflare: nitroflare,
    '1fichier': un_fichier,
    Rapidgator: rapidgator
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    Uptobox: false,
    Uploaded: true,
    Turbobit: false,
    Nitroflare: false,
    "1fichier": true,
    Rapidgator: false
  }, function(items) {
    document.getElementById('uptobox').checked = items.Uptobox;
    document.getElementById('uploaded').checked = items.Uploaded;
    document.getElementById('turbobit').checked = items.Turbobit;
    document.getElementById('nitroflare').checked = items.Nitroflare;
    document.getElementById('1fichier').checked = items['1fichier'];
    document.getElementById('rapidgator').checked = items.Rapidgator;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);