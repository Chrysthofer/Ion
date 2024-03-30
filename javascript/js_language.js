document.addEventListener("DOMContentLoaded", function () {
    const languageLink = document.querySelector('a[href="#language"]');
    const languageSelector = document.querySelector(".language-selector");
    let languageTimeout;

    function hideLanguageSelector() {
        languageTimeout = setTimeout(() => {
            languageSelector.style.opacity = "0";
            setTimeout(() => {
                languageSelector.style.display = "none";
            }, 300);
        }, 500);
    }

    function showLanguageSelector() {
        clearTimeout(languageTimeout);
        languageSelector.style.display = "block";
        setTimeout(() => {
            languageSelector.style.opacity = "1";
        }, 10);
    }

    languageLink.addEventListener("mouseenter", showLanguageSelector);
    languageLink.addEventListener("mouseleave", hideLanguageSelector);
    languageSelector.addEventListener("mouseleave", hideLanguageSelector);
    languageSelector.addEventListener("mouseenter", function () {
        clearTimeout(languageTimeout);
    });

    let translations;

    function applyTranslations(language, translations) {
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach(function (element) {
            const key = element.getAttribute("data-i18n");
            if (translations[language] && translations[language][key]) {
                if (element.tagName.toLowerCase() === "title") {
                    document.title = translations[language][key];
                } else {
                    element.textContent = translations[language][key];
                }
            }
        });
        localStorage.setItem("preferredLanguage", language);
    }

    fetch("/json/json_idioma.json")
        .then(response => response.json())
        .then(data => {
            translations = data;
            let preferredLanguage = localStorage.getItem("preferredLanguage") || "en";
            if (!Object.keys(translations).includes(preferredLanguage)) {
                preferredLanguage = "en";
            }
            applyTranslations(preferredLanguage, translations);
            const languageButtons = document.querySelectorAll(".multi-button button");
            languageButtons.forEach(function (button) {
                button.addEventListener("click", function () {
                    const language = this.querySelector('img').getAttribute("data-lang");
                    applyTranslations(language, translations);
                    changeLicenseLink(language);
                });
            });
            if (preferredLanguage) {
                changeLicenseLink(preferredLanguage);
            }
        })
        .catch(error => {
            console.error("Error loading translations:", error);
        });

    const licenseLink = document.getElementById('license-link');

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

    const languageButtons = document.querySelectorAll(".multi-button button");
    languageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const language = this.querySelector('img').getAttribute("data-lang");
            changeLicenseLink(language);
        });
    });
});
