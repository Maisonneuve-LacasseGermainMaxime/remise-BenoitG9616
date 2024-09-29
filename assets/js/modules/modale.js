// Récupérer les éléments du DOM
const modal = document.getElementById("myModal");
const closeModalSpan = document.querySelector(".close");

// Ouvrir la modal automatiquement au chargement de la page
window.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        modal.style.display = "flex"; // Afficher la modal après 5 secondes
    }, 5000);
});


// Fermer la modal quand l'utilisateur clique sur le <span> (x)
closeModalSpan.addEventListener("click", function() {
    modal.style.display = "none"; // Cacher la modal
});

// Fermer la modal si l'utilisateur clique en dehors de la modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; // Cacher la modal
    }
});

// Bloquer le clic droit sur l'image
const modalImage = document.getElementById('modalImage');
modalImage.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Empêche l'ouverture du menu contextuel
    alert('Le clic droit est désactivé sur cette image.');
});

// Empêcher le glisser-déposer de l'image
modalImage.addEventListener('dragstart', function(event) {
    event.preventDefault(); // Empêche le glisser-déposer de l'image
});