// Tableau contenant les liens de la navigation
const navigationLinks = [
    { text: 'Accueil', page: '../pages/index.html' },
    { text: 'À propos', page: '../pages/apropos.html' },
    { text: 'Formulaire', page: '../pages/formulaire.html' },
    { text: 'Services', page: '../pages/services.html' },
    { text: 'Publicite', page: '../pages/publicite.html' },
    { text: 'Contact', page: '../pages/contact.html' }
];

// Fonction pour générer la navigation dynamiquement
function generateNavigation() {
    console.log('Génération de la navigation...');
    const navElement = document.querySelector('nav');
    const currentPage = window.location.pathname.split('/').pop();

    navigationLinks.forEach(link => {
        const aElement = document.createElement('a');
        aElement.textContent = link.text;
        aElement.href = link.page;
        
        // Mise en évidence du lien de la page courante
        if (link.page === currentPage) {
            aElement.style.fontWeight = 'bold';
            aElement.style.textDecoration = 'underline';
            aElement.style.color = 'red';
        }

        navElement.appendChild(aElement);
        console.log(`Lien ajouté : ${link.text} -> ${link.page}`);
    });
}

// Générer la navigation au chargement de la page
document.addEventListener('DOMContentLoaded', generateNavigation);