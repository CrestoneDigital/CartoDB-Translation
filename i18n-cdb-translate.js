i18nTranslate = (function () {
    var instance;

    function _translate(parentEl) {
        if (parentEl) {
            $(parentEl).find('div, a, li, label, input, span, h5, h4, h3, h2, h1, p, button, strong, small').each(function (idx, el) {
                var tmp = $.i18n._($(el).text().trim());
                if (tmp != $(el).text().trim() && $(el).children().length == 0) {
                    $(el).text(tmp);
                }
            });

            $('* [placeholder]').each(function (idx, el) {
                var tmp = $.i18n._($(el).prop('placeholder'));
                if (tmp != $(el).prop('placeholder')) {
                    $(el).prop('placeholder', tmp);
                }
            });

            $('* [title]').each(function (idx, el) {
                var tmp = $.i18n._($(el).prop('title'));
                if (tmp != $(el).prop('title')) {
                    $(el).prop('title', tmp);
                }
            });
        } else {
            $('div, a, li, label, input, span, h5, h4, h3, h2, h1, p, button, strong, small').each(function (idx, el) {
                var tmp = $.i18n._($(el).text().trim());
                if (tmp != $(el).text().trim() && $(el).children().length == 0) {
                    $(el).text(tmp);
                }
            });

            $('* [placeholder]').each(function (idx, el) {
                var tmp = $.i18n._($(el).prop('placeholder'));
                if (tmp != $(el).prop('placeholder')) {
                    $(el).prop('placeholder', tmp);
                }
            });

            $('* [title]').each(function (idx, el) {
                var tmp = $.i18n._($(el).prop('title'));
                if (tmp != $(el).prop('title')) {
                    $(el).prop('title', tmp);
                }
            });
        }
    }

    return {
        translate: _translate
    };

})();
