
updateCardColors();
function toggleDropdown() {
    const dropdown = document.getElementById("notificationDropdown");
    dropdown.style.display = 
        dropdown.style.display === "block" ? "none" : "block";
}

// Fermer si on clique ailleurs
window.onclick = function(e) {
    if (!e.target.matches('.notification-icon')) {
        const dropdown = document.getElementById("notificationDropdown");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
} 

// marks.js
const calculateAverage = () => {
    const modules = document.querySelectorAll('.module-card');

    modules.forEach((module) => {
        const examElem = module.querySelector('.note-exam');
        const ccElem = module.querySelector('.note-cc');
        const displayElem = module.querySelector('.moyenne-module'); // Ligne critique

        // On vérifie que TOUS les éléments sont présents dans ce module
        if (displayElem && examElem && ccElem) {
            let exam = parseFloat(examElem.innerText.replace(',', '.'));
            let cc = parseFloat(ccElem.innerText.replace(',', '.'));

            let moyenne = (exam * 0.6) + (cc * 0.4);
            displayElem.textContent = moyenne.toFixed(2); // C'était ici l'erreur
        } else {
            console.warn("Élément manquant dans un module. Vérifiez vos classes HTML.");
        }
    });
};

// On attend que la page soit prête
window.onload = calculateAverage;






function calculerTout() {
    const modules = document.querySelectorAll('.module-card');
    let sommeNotesCoeff = 0;
    let sommeCoeffs = 0;

    modules.forEach((module) => {
        const examElem = module.querySelector('.note-exam');
        const ccElem = module.querySelector('.note-cc');
        const coefElem = module.querySelector('.module-coef');
        const displayMoyenne = module.querySelector('.moyenne-module');

        if (examElem && ccElem && coefElem && displayMoyenne) {
            // 1. Récupération des valeurs
            const exam = parseFloat(examElem.innerText.replace(',', '.')) || 0;
            const cc = parseFloat(ccElem.innerText.replace(',', '.')) || 0;
            const coef = parseFloat(coefElem.innerText.replace(',', '.')) || 1;

            // 2. Calcul de la moyenne du module (60/40)
            const moyenneModule = (exam * 0.6) + (cc * 0.4);
            displayMoyenne.textContent = moyenneModule.toFixed(2);
            
            // Couleur par module
            displayMoyenne.style.color = moyenneModule >= 10 ? "#27ae60" : "#a52a2a";

            // 3. Accumulation pour la moyenne générale
            sommeNotesCoeff += (moyenneModule * coef);
            sommeCoeffs += coef;
        }
    });

    // 4. Calcul final de la moyenne générale
    const affichageGeneral = document.getElementById('moyenne-generale');
    if (affichageGeneral && sommeCoeffs > 0) {
        const moyenneGuerale = sommeNotesCoeff / sommeCoeffs;
        affichageGeneral.textContent = moyenneGuerale.toFixed(2);
        
        // Couleur générale
        affichageGeneral.style.color = moyenneGuerale >= 10 ? "#27ae60" : "#a52a2a";
    }
}

// Exécution au chargement
window.addEventListener('load', calculerTout);
// Optionnel : recalcule si tu modifies les notes dynamiquement
setInterval(calculerTout, 2000);