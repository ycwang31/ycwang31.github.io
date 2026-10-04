// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover;
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });
});

(function () {
    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        }
        return new Promise(function (resolve, reject) {
            var area = document.createElement('textarea');
            area.value = text;
            area.setAttribute('readonly', '');
            area.style.position = 'fixed';
            area.style.opacity = '0';
            document.body.appendChild(area);
            area.select();
            var ok = document.execCommand('copy');
            document.body.removeChild(area);
            ok ? resolve() : reject();
        });
    }

    function flash(button, label, success) {
        var icon = button.querySelector('i');
        var text = button.querySelector('span');
        clearTimeout(button._resetTimer);
        button.classList.toggle('is-copied', success);
        icon.className = success ? 'fas fa-check' : 'far fa-copy';
        text.textContent = label;
        button._resetTimer = setTimeout(function () {
            button.classList.remove('is-copied');
            icon.className = 'far fa-copy';
            text.textContent = 'Copy';
        }, 1800);
    }

    document.addEventListener('click', function (event) {
        var toggle = event.target.closest('[data-bibtex-toggle]');
        if (toggle) {
            var panel = toggle.closest('.publication-actions').nextElementSibling;
            if (!panel || !panel.classList.contains('pub-bibtex')) return;
            var opening = panel.hidden;
            panel.hidden = !opening;
            toggle.setAttribute('aria-expanded', String(opening));
            return;
        }

        var copy = event.target.closest('[data-bibtex-copy]');
        if (copy) {
            var code = copy.parentElement.querySelector('code');
            copyText(code.textContent).then(
                function () { flash(copy, 'Copied!', true); },
                function () { flash(copy, 'Press Ctrl+C', false); }
            );
        }
    });
})();
