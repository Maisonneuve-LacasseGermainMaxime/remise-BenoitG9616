// Variables
let sectionActuelle = 0;
let formulaireValide = false;

// Éléments HTML
const formulaire = document.querySelector("#formulaire-principal");
const champs = formulaire.querySelectorAll("[name]");
const sections = formulaire.querySelectorAll("section[data-page]");
const sectionResume = formulaire.querySelector(".resume");

// - Boutons
const btnSuivant = document.querySelector(".navigation-section .bouton[data-direction='1']");
const btnPrecedent = document.querySelector(".navigation-section .bouton[data-direction='-1']");

// Voir CSS pour cacher les messages d'erreurs

// Fonctions
function init() {
    // Attach event listeners to buttons
    if (btnSuivant) {
        btnSuivant.addEventListener('click', avancerSection);
    }
    if (btnPrecedent) {
        btnPrecedent.addEventListener('click', reculerSection);
    }

    // Show the first section on page load
    afficherSection();
}

// Appeler `afficherResume` lors de la soumission pour récapituler toutes les données
function onSubmit(evenement) {
    evenement.preventDefault();
    formulaireValide = formulaire.checkValidity();
    if (formulaireValide) {
        champs.forEach(champ => {
            afficherResume(champ.name, champ.type === "checkbox" ? (champ.checked ? "Oui" : "Non") : champ.value);
        });
        console.log("Tout est tiguidou");
        // formulaire.submit();
        // formulaire.reset();
    }
}


function onChangementChamp(evenement) {
    const declencheur = evenement.currentTarget;
    const type = declencheur.type;
    const name = declencheur.name;
    const value = declencheur.value;
    const checked = declencheur.checked;

    // Gestion des champs avec exceptions
    if (type === "checkbox") {
        const champDate = formulaire.querySelector("[name='date']");
        if (checked) {
            champDate.disabled = false;
            champDate.required = true;
        } else {
            champDate.disabled = true;
            champDate.required = false;
            champDate.value = "";
        }
        // Met à jour le résumé pour la case à cocher
        afficherResume(name, checked ? "Oui" : "Non");
    } else if (name === "courriel") {
        // Validation personnalisée
        if (!value.endsWith("cmaisonneuve.qc.ca")) {
            declencheur.setCustomValidity("Le champ doit finir par cmaisonneuve.qc.ca");
        } else {
            declencheur.setCustomValidity("");
            afficherResume(name, value);
        }
        
    } else {
        // Mettre à jour le résumé avec la valeur actuelle
        afficherResume(name, value);
    }

    // Validation du champ
    const estValide = declencheur.checkValidity();

    if (!estValide) {
        declencheur.classList.add("invalid");
    } else {
        declencheur.classList.remove("invalid");
    }

    if (estValide) {
        console.log("ok");

        // Cacher les erreurs au besoin
        const sectionParent = declencheur.closest("section");
        const champsSection = sectionParent.querySelectorAll("[name]");
        const tableauValidation = [];

        champsSection.forEach(function (champ) {
            const estValide = champ.checkValidity();
            tableauValidation.push(estValide);
        });

        const sectionInvalide = tableauValidation.includes(false);
        if (sectionInvalide) {
            sectionParent.querySelector(".bouton[data-direction='1']").classList.add("disabled");
        } else {
            sectionParent.querySelector(".bouton[data-direction='1']").classList.remove("disabled");
        }
    }
}

//=============================================
// VALIDATION - Cours 12
//=============================================

function validerChamp(champ) {
    // Validate the field using the browser's built-in validation
    const estValide = champ.checkValidity();

    if (!estValide) {
        champ.classList.add("invalid");
        champ.reportValidity();
    } else {
        champ.classList.remove("invalid");
    }
    return estValide;
}

function validerSection(section) {
    const validations = [];
    const champsSection = section.querySelectorAll("[name]");

    champsSection.forEach(function (champ) {
        const estValide = champ.checkValidity();
        validations.push(estValide);
    });

    const sectionInvalide = validations.includes(false);
    if (sectionInvalide) {
        section.classList.add("invalid");
    } else {
        section.classList.remove("invalid");
    }

    return !sectionInvalide;
}

function validerFormulaire() {
    let formulaireValide = true;

    sections.forEach(function (section) {
        const estValide = validerSection(section);
        if (!estValide) {
            formulaireValide = false;
        }
    });

    return formulaireValide;
}

//=============================================
// AFFICHAGE DE LA SECTION RESUME - Cours 11
//=============================================

function afficherResume(nomChamp, valeur) {
    const champResume = sectionResume.querySelector(`[data-name="${nomChamp}"]`);
    if (champResume !== null) {
        champResume.textContent = valeur;
    }
}

//=============================================
// AFFICHAGE DES SECTIONS et NAVIGATION - Cours 10
//=============================================

function afficherSection() {
    toutCacher();
    sections[sectionActuelle].classList.remove("invisible");

    // Désactiver le bouton précédent si on est sur la première section
    btnPrecedent.disabled = sectionActuelle === 0;
    if (btnPrecedent.disabled){
        btnPrecedent.classList.add("disabled");
    } else {
        btnPrecedent.classList.remove("disabled");
    }

    // Désactiver le bouton suivant si on est sur la dernière section
    btnSuivant.disabled = sectionActuelle === sections.length - 1;
    if (btnSuivant.disabled){
        btnSuivant.classList.add("disabled");
    } else { 
        btnSuivant.classList.remove("disabled");
    }    
}

function toutCacher() {
    sections.forEach(function (element) {
        // Hide all sections except the one with the "resume" class
        if (!element.classList.contains("resume")) {
            element.classList.add("invisible");
        }
    });
}

function avancerSection(evenement) {

    if (sectionActuelle < sections.length - 1) {
        sectionActuelle++;
        afficherSection();
    }
}

function reculerSection(evenement) {

    if (sectionActuelle > 0) {
        sectionActuelle--;
        afficherSection();
    }
}

// Exécution
document.addEventListener("DOMContentLoaded", init);