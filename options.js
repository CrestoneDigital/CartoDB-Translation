function save_options() {
    var language = document.getElementById('language').value;
    chrome.storage.sync.set({
        language: language
    }, function () {
        // Update status to let user know options were saved.
        var status = $('#status');
        status.text('Saved');
        status.fadeIn();
        
        setTimeout(function () {
            status.fadeOut(500, function() {
                status.text('');
            });
        }, 2000);
    });
}

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        language: 'en'
    }, function (items) {
        document.getElementById('language').value = items.language;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
