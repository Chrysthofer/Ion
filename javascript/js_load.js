       // Função para carregar CSS de forma assíncrona
        function loadCSS(href, before, media) {
            var ss = window.document.createElement('link');
            var ref = before || window.document.getElementsByTagName('script')[0];
            var sheets = window.document.styleSheets;
            ss.rel = 'stylesheet';
            ss.href = href;
            ss.media = 'only x';
            ref.parentNode.insertBefore(ss, ref);
            function toggleMedia() {
                var defined;
                for (var i = 0; i < sheets.length; i++) {
                    if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
                        defined = true;
                    }
                }
                if (defined) {
                    ss.media = media || 'all';
                } else {
                    setTimeout(toggleMedia);
                }
            }
            toggleMedia();
            return ss;
        }
        // Carregar CSS não-crítico de forma assíncrona
        loadCSS('/css/css_modal.css');
        loadCSS('/css/css_sidebar.css');
        loadCSS('/css/css_top.css');
        loadCSS('/css/css_faq.css');
        loadCSS('/css/css_language.css');