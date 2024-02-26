document.addEventListener("DOMContentLoaded", function() {
    var accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(function(item) {
        var accordionLink = item.querySelector('.accordion-link');
        accordionLink.addEventListener('click', function(event) {
            event.preventDefault();
            var answer = item.querySelector('.answer');
            var arrowUp = item.querySelector('.ion-md-arrow-up');
            var arrowDown = item.querySelector('.ion-md-arrow-down');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                arrowUp.style.display = 'none';
                arrowDown.style.display = 'block';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                arrowUp.style.display = 'block';
                arrowDown.style.display = 'none';
            }
        });
    });
});
