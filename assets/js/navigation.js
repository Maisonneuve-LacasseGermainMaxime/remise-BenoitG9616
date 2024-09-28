// Tableau contenant les liens de la navigation
const navigationLinks = [
    { text: 'Accueil', page: '/index.html' },
    { text: 'À propos', page: '/pages/apropos.html' },
    { text: 'Formulaire', page: '/pages/formulaire.html' },
    { text: 'Services', page: '/pages/services.html' },
    { text: 'Publicite', page: '/pages/publicite.html' },
    { text: 'Contact', page: '/pages/contact.html' }
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
        console.log(link.page, currentPage);
        // Mise en évidence du lien de la page courante
        if (link.page.includes(currentPage)) {
            aElement.classList.add('pagecourante');
            console.log('Classe ajoutée pour la page courante', link.text);
        }

        navElement.appendChild(aElement);
        console.log(`Lien ajouté : ${link.text} -> ${link.page}`);
    });

    // Bouton mode sombre
    const mainContentElement = document.querySelector('.main-content');
    const sideBarElement = document.querySelector('.sidebar');
    const themeToggleButton = document.createElement('button');
    themeToggleButton.textContent = 'Mode Sombre';
    themeToggleButton.classList.add('theme-toggle-btn');
    
    themeToggleButton.addEventListener('click', () => {
        const bodyElement = document.body;
        const currentTheme = bodyElement.getAttribute('data-theme');

        if (currentTheme === 'light' || !currentTheme) {
            bodyElement.setAttribute('data-theme', 'dark');
            mainContentElement.setAttribute('data-theme', 'dark');
            sideBarElement.setAttribute('data-theme', 'dark');
            themeToggleButton.textContent = 'Mode Clair';
            console.log('Mode sombre appliqué');
        } else {
            bodyElement.setAttribute('data-theme', 'light');
            mainContentElement.setAttribute('data-theme', 'light');
            sideBarElement.setAttribute('data-theme', 'light');
            themeToggleButton.textContent = 'Mode Sombre';
            console.log('Mode clair appliqué');
        } 
    });

    navElement.appendChild(themeToggleButton);

    addNavigationClickEvents();  // Ajouter les événements de clic après avoir créé les liens
}

// Fonction pour ajouter des événements de clic sur les liens de navigation
function addNavigationClickEvents() {
    const navLinks = document.querySelectorAll('nav a');
    const loadingSpinner = document.getElementById('loading-spinner');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Empêcher la navigation immédiate
            loadingSpinner.style.display = 'block';  // Afficher le spinner

            // Simuler un délai avant de naviguer vers la nouvelle page
            setTimeout(() => {
                window.location.href = link.href;
            }, 1000);  // 1 seconde de délai pour afficher le spinner
        });
    });
}

// Cacher le spinner quand la page est chargée
window.addEventListener('DOMContentLoaded', () => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';  // Cacher le spinner au chargement de la page
    }

    // Générer la navigation au chargement de la page
    generateNavigation();
});