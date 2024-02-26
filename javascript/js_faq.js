document.addEventListener('DOMContentLoaded', function() {
    var panels = document.querySelectorAll('.panel');

    // Adiciona um ouvinte de eventos de mudança a cada painel
    panels.forEach(function(panel) {
        panel.addEventListener('change', function() {
            // Fecha todos os outros painéis, exceto o que foi clicado
            panels.forEach(function(otherPanel) {
                if (otherPanel !== panel) {
                    otherPanel.checked = false;
                }
            });
        });
    });

    // Contador de visualizações
    var finalCount = 11700; // Defina o número final de visualizações aqui
    var duration = 500; // Defina a duração da animação em milissegundos (3 segundos no exemplo)
    var count = 0;
    var interval = finalCount / duration;

    // Função para iniciar o contador de visitantes
    function startCounter() {
        var counterElement = document.getElementById("viewsCounter");
        var timer = setInterval(function() {
            count += interval;
            if (count >= finalCount) {
                clearInterval(timer);
                count = finalCount;
            }
            counterElement.textContent = Math.round(count);
        }, 1);
    }

    // Criar um observador de interseção
    var options = {
        root: null, // Usar o viewport como área de observação
        rootMargin: '0px', // Margem em torno do viewport
        threshold: 0.1 // Porcentagem de visibilidade necessária para disparar a ação
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Quando o elemento está visível, iniciar o contador
                startCounter();
                // Desconectar o observador, pois não precisamos mais dele
                observer.disconnect();
            }
        });
    }, options);

    // Selecione o elemento que você deseja observar
    var targetElement = document.getElementById('thanks');

    // Iniciar a observação do elemento alvo
    observer.observe(targetElement);
});
