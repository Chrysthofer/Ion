document.addEventListener("DOMContentLoaded", function () {
    let e = document.querySelector('a[href="#language"]'),
        t = document.querySelector(".language-selector"),
        n;

    function a() {
        n = setTimeout(() => {
            (t.style.opacity = "0"),
                setTimeout(() => {
                    t.style.display = "none";
                }, 300);
        }, 500);
    }

    e.addEventListener("mouseenter", function e() {
        clearTimeout(n),
            (t.style.display = "block"),
            setTimeout(() => {
                t.style.opacity = "1";
            }, 10);
    }),
        e.addEventListener("mouseleave", a),
        t.addEventListener("mouseleave", a),
        t.addEventListener("mouseenter", function () {
            clearTimeout(n);
        });
});

let translations;

function applyTranslations(e, t) {
    let n = document.querySelectorAll("[data-i18n]");
    n.forEach(function (n) {
        let a = n.getAttribute("data-i18n");
        t[e] && t[e][a] && ("title" === n.tagName.toLowerCase() ? (document.title = t[e][a]) : (n.textContent = t[e][a]));
    }),
        localStorage.setItem("preferredLanguage", e);
}

fetch("/json/json_idioma.json")
    .then(function (e) {
        return e.json();
    })
    .then(function (e) {
        translations = e;
        let t = localStorage.getItem("preferredLanguage"),
            n = t || "en",
            a = Object.keys(translations);
        a.includes(n) || (n = "en"), applyTranslations(n, translations);
        let o = document.querySelectorAll(".multi-button button");
        o.forEach(function (e) {
            e.addEventListener("click", function (e) {
                e.preventDefault();
                let t = this.querySelector('img').getAttribute("data-lang");
                applyTranslations(t, translations);
            });
        });
    })
    .catch(function (e) {
        console.error("Erro ao carregar as traduções:", e);
    });


// licenseLink.js

document.addEventListener("DOMContentLoaded", function () {
    let licenseLink = document.getElementById('license-link');

    // Função para alterar o link da licença com base no idioma selecionado
    function changeLicenseLink(language) {
        switch (language) {
            case 'en':
                licenseLink.href = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en';
                break;
            case 'pt':
                licenseLink.href = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br';
                break;
            case 'fr':
                licenseLink.href = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr';
                break;
            case 'no':
                licenseLink.href = 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.no';
                break;
            default:
                licenseLink.href = 'http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1';
                break;
        }
    }

    // Adiciona um ouvinte de eventos para os botões de idioma
    let languageButtons = document.querySelectorAll(".multi-button button");
    languageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let language = this.querySelector('img').getAttribute("data-lang");
            changeLicenseLink(language);
        });
    });

    // Obtenha o idioma preferido do armazenamento local (se disponível) e defina o link da licença
    let preferredLanguage = localStorage.getItem("preferredLanguage");
    if (preferredLanguage) {
        changeLicenseLink(preferredLanguage);
    }
});
