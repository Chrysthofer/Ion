document.addEventListener("DOMContentLoaded", function () {
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
    }

    function changeLicenseLink(language) {
        const licenseLink = document.getElementById('license-link');
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

    fetch("/json/json_idioma.json")
        .then(response => response.json())
        .then(data => {
            translations = data;
            let preferredLanguage = localStorage.getItem("preferredLanguage") || "en";
            if (!Object.keys(translations).includes(preferredLanguage)) {
                preferredLanguage = "en";
            }
            applyTranslations(preferredLanguage, translations);
            changeLicenseLink(preferredLanguage); // Altera o link da licença conforme o idioma preferido
        })
        .catch(error => {
            console.error("Error loading translations:", error);
        });
});
