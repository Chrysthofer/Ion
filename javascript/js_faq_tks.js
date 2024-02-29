document.addEventListener("DOMContentLoaded", function() {
    var accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(function(item) {
        var accordionLink = item.querySelector('.accordion-link');
        accordionLink.addEventListener('click', function(event) {
            event.preventDefault();
            var answer = item.querySelector('.answer');
            var arrowUp = item.querySelector('.icon'); // Seleciona o ícone para cima
            var arrowDown = item.querySelector('.icon'); // Seleciona o ícone para baixo
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                arrowUp.classList.remove('ion-md-arrow-up'); // Remove a classe do ícone para cima
                arrowDown.classList.add('ion-md-arrow-down'); // Adiciona a classe do ícone para baixo
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                arrowUp.classList.add('ion-md-arrow-up'); // Adiciona a classe do ícone para cima
                arrowDown.classList.remove('ion-md-arrow-down'); // Remove a classe do ícone para baixo
            }
        });
    });
});
