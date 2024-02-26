document.addEventListener("DOMContentLoaded", function() {
    // Mapeamento dos IDs dos modais para os links correspondentes
    var modalLinks = {
        'aboutPopup': '',
        'docPopup': 'https://github.com/nipscernlab/websapho/raw/main/files/documentation.pdf',
        'dowPopup': 'https://github.com/nipscernlab/sapho/archive/refs/heads/main.zip',
        'contPopup': 'mailto:contact@nipscern.com'
    };


    // Função para verificar se o modal pode ser aberto
    function canOpenModal(targetId) {
        return sessionStorage.getItem(targetId) !== 'true';
    }

    // Função para marcar o modal como aberto
    function setModalOpened(targetId) {
        sessionStorage.setItem(targetId, 'true');
    }
    // Limpar sessionStorage quando a página for carregada pela primeira vez
    if (performance.navigation.type === 1) {
        sessionStorage.clear();
    }

    // Selecionar todos os botões
    var buttons = document.querySelectorAll('.primary');

    // Iterar sobre os botões e adicionar um listener de clique
    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            // Evitar o comportamento padrão do link
            event.preventDefault();

            // Obter o ID do modal correspondente ao botão clicado
            var targetId = button.querySelector('a').getAttribute('href').substring(1);

            // Verificar se o modal pode ser aberto
            if (canOpenModal(targetId)) {
                console.log("Abrindo modal:", targetId);

                // Mostrar o modal correspondente, se existir
                var modal = document.getElementById(targetId);
                if (modal) {
                    modal.style.opacity = "1";
                    modal.style.visibility = "visible";

                    // Marcar o modal como aberto
                    setModalOpened(targetId);

                    console.log("Modal aberto com sucesso.");

                    // Adicionar um listener de clique ao botão de fechar dentro do modal
                    var closeButton = modal.querySelector('.close-button');
                    if (closeButton) {
                        closeButton.addEventListener('click', function(event) {
                            // Evitar o comportamento padrão do link
                            event.preventDefault();

                            // Ocultar o modal ao clicar no botão de fechar
                            modal.style.opacity = "0";
                            modal.style.visibility = "hidden";

                            console.log("Modal fechado.");
                        });
                    } else {
                        console.log("Erro: Botão de fechar não encontrado dentro do modal.");
                    }
                } else {
                    console.log("Erro: Modal não encontrado.");
                }
            } else {
                console.log("Modal já foi aberto. Não é possível abrir novamente.");
            }

            // Se o ID do modal correspondente ao botão clicado estiver no mapeamento, realizar a ação correspondente
            if (modalLinks[targetId]) {
                // Se o link for para um email (contato), abrir o cliente de email
                if (modalLinks[targetId].startsWith('mailto:')) {
                    window.location.href = modalLinks[targetId];
                } else {
                    // Caso contrário, baixar o arquivo ou abrir em uma nova aba na mesma guia
                    var anchor = document.createElement('a');
                    anchor.href = modalLinks[targetId];
                    anchor.download = ''; // Para forçar o download do arquivo
                    anchor.click();
                }
            }
        });
    });
});