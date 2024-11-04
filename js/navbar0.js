document.addEventListener("DOMContentLoaded", function() {
    if (!CSS.supports('backdrop-filter', 'blur(10px)')) {
        document.querySelector('.wrapper').classList.add('dusra');
    }
});