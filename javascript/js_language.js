document.addEventListener('DOMContentLoaded', function() {
    const idiomaLink = document.querySelector('a[href="#main-content"]'); // Selecionar o link específico com href="#idioma"
    const languageSelector = document.querySelector('.language-selector'); // Selecionar o seletor de idiomas
    let timeoutId; // Variável para armazenar o ID do timeout

    function showLanguageOptions() {
        clearTimeout(timeoutId); // Limpar o timeout anterior, se existir
        languageSelector.style.display = 'block'; // Mostrar o seletor de idiomas
        setTimeout(() => {
            languageSelector.style.opacity = '1'; // Mudar a opacidade para 1 após o atraso para acionar a transição
        }, 10); // Tempo mínimo para garantir que a transição seja acionada corretamente
    }

    function hideLanguageOptions() {
        timeoutId = setTimeout(() => {
            languageSelector.style.opacity = '0'; // Mudar a opacidade para 0 para ocultar
            setTimeout(() => {
                languageSelector.style.display = 'none'; // Ocultar o seletor de idiomas após o atraso para garantir que a transição ocorra antes de ocultar
            }, 300); // Tempo correspondente à duração da transição definida no CSS
        }, 500); // Tempo de espera antes de ocultar o menu (500ms neste exemplo)
    }

    // Mostrar o menu de idiomas quando passar o mouse sobre o link "Idioma"
    idiomaLink.addEventListener('mouseenter', showLanguageOptions);
    // Ocultar o menu de idiomas quando o mouse sair do link "Idioma"
    idiomaLink.addEventListener('mouseleave', hideLanguageOptions);
    // Ocultar o menu de idiomas quando o mouse sair do seletor
    languageSelector.addEventListener('mouseleave', hideLanguageOptions);
    // Manter o menu de idiomas ativo enquanto o mouse estiver sobre ele
    languageSelector.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId); // Limpar o timeout para manter o menu ativo
    });
});

let translations; // Declaração global da variável translations

// Função para aplicar as traduções
function applyTranslations(language, translations) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function(element) {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            // Verifica se o elemento é uma tag 'title' para atualizar o título da página
            if (element.tagName.toLowerCase() === 'title') {
                document.title = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        } else {
            //console.error(`Translation not found for key '${key}' in language '${language}'.`);
        }
    });

    // Restante do código permanece o mesmo

    // Armazenar o idioma escolhido no armazenamento local
    localStorage.setItem('preferredLanguage', language);
}

// Carregar as traduções do arquivo JSON
fetch('/json/json_idioma.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        translations = data; // Atribui os dados do JSON à variável global translations

        // Obter o idioma preferido armazenado
        const storedLanguage = localStorage.getItem('preferredLanguage');
        let language = storedLanguage || 'en'; // Usar o idioma armazenado ou inglês como padrão
        console.log('Translations:', translations);

        const supportedLanguages = Object.keys(translations);

        // Verificar se o idioma armazenado é suportado
        if (!supportedLanguages.includes(language)) {
            language = 'en'; // Se não for suportado, usar inglês como padrão
        }

        // Aplicar as traduções ao carregar a página
        applyTranslations(language, translations);

        // Adicionar evento de clique para alternar o idioma
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(function(option) {
            option.addEventListener('click', function(event) {
                event.preventDefault();
                const selectedLanguage = this.getAttribute('data-lang');
                applyTranslations(selectedLanguage, translations);
            });
        });
    })
    .catch(function(error) {
        console.error('Erro ao carregar as traduções:', error);
    });
