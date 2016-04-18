chrome.storage.sync.get({
    language: 'en'
}, function(items) {
    if (items.language != 'en') {
        var s = document.createElement("script");
        s.src = "chrome-extension://" + chrome.runtime.id + "/languages/" + items.language + ".i18n.js";
        document.body.appendChild(s);

        window.addEventListener("i18nTranslateReady", function(e){ 
            var cdb_lang_file = JSON.parse($('#___cdb_lang_file').val());
            $.i18n.load(cdb_lang_file); // Sets the lookup language file
            i18nTranslate.translate(); // initial translate when the webpage first loads.
        });

        window.addEventListener("i18nTranslateShow", function(e){ 
            i18nTranslate.translate(); // initial translate when the webpage first loads.
        });
        
//        setInterval(function() {
//            i18nTranslate.translate();
//        }, 1000);
    }
});
