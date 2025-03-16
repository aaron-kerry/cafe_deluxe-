document.addEventListener("DOMContentLoaded", function () {
    const productList = document.querySelector(".carrousel-product-list");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const productItems = document.querySelectorAll(".carrousel-product-item");
    const itemWidth = productItems[0].offsetWidth + 20; // Largeur d'un produit + espacement
    let currentPosition = 0;

    // Bouton suivant
    nextBtn.addEventListener("click", function () {
        if (currentPosition > -(itemWidth * (productItems.length - 3))) {
            currentPosition -= itemWidth;
            productList.style.transform = `translateX(${currentPosition}px)`;
        }
    });

    // Bouton précédent
    prevBtn.addEventListener("click", function () {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            productList.style.transform = `translateX(${currentPosition}px)`;
        }
    });
});