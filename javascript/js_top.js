document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const topButton = document.querySelector('.top');

        if (window.pageYOffset > window.innerHeight) {
            topButton.style.opacity = '1';
            topButton.style.pointerEvents = 'auto';
        } else {
            topButton.style.opacity = '0';
            topButton.style.pointerEvents = 'none';
        }

        if (window.pageYOffset > 50) {
            topButton.style.opacity = '1';
            topButton.style.pointerEvents = 'auto';
        }
    });

    document.querySelector('.top').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('body');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
