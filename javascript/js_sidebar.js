document.addEventListener('DOMContentLoaded', function () {
    const navcheck = document.getElementById('navcheck');
    const nav = document.querySelector('nav');
    const content = document.getElementById('content');
    // Modifique a linha onde você seleciona o link de idioma
    const idiomaLink = document.getElementById('language-link');

    // Em seguida, modifique os event listeners associados ao idiomaLink
    idiomaLink.addEventListener('click', function(event) {
        event.preventDefault();
        showLanguageOptions(); // Mostra o menu de idiomas quando o link de idioma for clicado
    });


    let startX = 0;
    let startY = 0;
    let isDragging = false;

    // Função para abrir o menu
    function openMenu() {
        navcheck.checked = true;
    }

    // Função para fechar o menu
    function closeMenu() {
        navcheck.checked = false;
    }

    document.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = false;
    });

    document.addEventListener('touchmove', function (e) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Verifica se o usuário está arrastando principalmente na horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Verifica se o usuário arrastou da esquerda para a direita com uma distância mínima de 100 pixels
            if (deltaX > 100 && !isDragging) {
                openMenu(); // Abre o menu
                isDragging = true;
            }
        }
    });

    document.addEventListener('touchend', function (e) {
        if (!isDragging) {
            const endX = e.changedTouches[0].clientX;
            const deltaX = Math.abs(endX - startX);

            // Verifica se houve um clique e arrasto da esquerda para a direita com uma distância mínima de 50 pixels
            if (deltaX < 10) {
                navcheck.checked = !navcheck.checked; // Inverte o estado do menu
            }
        }
        isDragging = false;
    });

    // Adiciona um evento de clique ao botão de abrir/fechar o menu
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', function () {
            if (navcheck.checked) {
                closeMenu(); // Fecha o menu se estiver aberto
            } else {
                openMenu(); // Abre o menu se estiver fechado
            }
        });
    }

    // Fecha o menu ao tocar fora dele
    document.addEventListener('touchstart', function (e) {
        if (nav && !nav.contains(e.target) && menuButton && !menuButton.contains(e.target)) {
            closeMenu();
        }
    });


    document.addEventListener('touchend', function (e) {
        if (!isDragging) {
            const endX = e.changedTouches[0].clientX;
            const deltaX = Math.abs(endX - startX);

            // Verifica se houve um clique e arrasto da esquerda para a direita com uma distância mínima de 50 pixels
            if (deltaX < 10) {
                navcheck.checked = !navcheck.checked; // Inverte o estado do menu
            }
        }
        isDragging = false;
    });

    // Restante do seu código...

    // Adiciona um evento de clique a todos os links do menu
    const menuLinks = document.querySelectorAll('nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Impede o comportamento padrão do link
            const targetId = this.getAttribute('href').substring(1); // Obtém o ID do alvo do link
            const targetElement = document.getElementById(targetId); // Obtém o elemento alvo
            if (targetElement) {
                // Rola suavemente para o elemento alvo
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Fecha o menu após um curto intervalo
                setTimeout(() => {
                    navcheck.checked = false; // Fecha o menu
                }, 300);
            }
        });
    });

    // Adiciona um evento de rolagem para detectar quando a rolagem suave para o conteúdo terminar
    window.addEventListener('scroll', function () {
        // Verifica se o conteúdo desejado está visível na janela
        if (isInViewport(document.getElementById('content'))) {
            // Fecha o menu após um curto intervalo
            setTimeout(() => {
                navcheck.checked = false; // Fecha o menu
            }, 1000);
        }
    });

    // Função auxiliar para verificar se um elemento está visível na janela
    function isInViewport(element) {
        if (!element) return false; // Verifica se o elemento existe
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
