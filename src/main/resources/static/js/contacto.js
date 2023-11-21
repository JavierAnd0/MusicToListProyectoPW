/**
 * Añade un event listener al botón de menú para mostrar/ocultar la barra de navegación.
 */
document.querySelector(".menu-btn").addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.toggle("show");
});


/**
 * Utiliza ScrollReveal para revelar elementos con la clase 'showcase' al hacer scroll.
 */
ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.news-cards', { delay: 500 });
ScrollReveal().reveal('.cards-banner-one', { delay: 500 });
ScrollReveal().reveal('.cards-banner-two', { delay: 500 });