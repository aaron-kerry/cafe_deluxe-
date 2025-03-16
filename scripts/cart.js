document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.querySelector(".add-to-cart");
    const quantityInput = document.getElementById("quantity");

    // Fonction pour mettre à jour l'icône du panier
    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartIcon = document.querySelector(".cart-icon");
        if (cartIcon) {
            cartIcon.setAttribute("data-count", cart.length);
        }
    }

    // Fonction pour ajouter un produit au panier
    if (addToCartButton) {
        addToCartButton.addEventListener("click", function () {
            const product = {
                name: "Café Brésilien",
                price: 9.99,
                quantity: parseInt(quantityInput.value),
                image: "images/coffe_bresile.jpeg"
            };

            // Récupérer le panier existant ou en créer un nouveau
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Ajouter le produit au panier
            cart.push(product);

            // Sauvegarder le panier dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Afficher une notification d'ajout
            showNotification("Produit ajouté au panier !");

            // Mettre à jour l'icône du panier
            updateCartIcon();
        });
    }

    // Fonction pour afficher les articles du panier
    const cartItemsContainer = document.querySelector(".cart-items");
    if (cartItemsContainer) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Votre panier est vide.</p>";
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>Prix unitaire: €${item.price.toFixed(2)}</p>
                        <p>Quantité: ${item.quantity}</p>
                        <p>Total: €${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item" data-index="${index}">Supprimer</button>
                    </div>
                </div>
            `).join("");
        }

        // Gestion de la suppression des articles
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(button.getAttribute("data-index"));
                removeItemFromCart(index);
            });
        });
    }

    // Fonction pour supprimer un article du panier
    function removeItemFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1); // Supprimer l'article à l'index donné
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload(); // Recharger la page pour afficher les modifications
    }

    // Fonction pour afficher une notification
    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
        document.body.appendChild(notification);

        // Faire disparaître la notification après 3 secondes
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Mettre à jour l'icône du panier au chargement de la page
    updateCartIcon();
});