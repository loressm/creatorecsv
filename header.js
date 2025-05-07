document.addEventListener("DOMContentLoaded", () => {
    // Carica il contenuto di header.html e inseriscilo nel tag <header>
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            console.log("Header caricato correttamente");  // Questo ti aiuterà a capire se il file è caricato
            document.querySelector("header").innerHTML = data;

            // Dopo che l'header è stato caricato, aggiungi gli event listeners
            addEventListeners();
        })
        .catch(error => {
            console.error("Errore nel caricamento dell'header:", error);
        });
});

function addEventListeners() {
    // Hamburger menu
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            console.log("Hamburger cliccato");  // Verifica che l'hamburger venga cliccato
            const navbar = document.querySelector(".navbar");
            navbar.classList.toggle("active");
        });
    }

    // Sottomenu (dropdown)
    const dropdowns = document.querySelectorAll(".navbar .dropdown");
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", (e) => {
            e.stopPropagation(); // Impedisce la chiusura immediata
            console.log("Dropdown cliccato");  // Verifica che il dropdown venga cliccato
            dropdown.classList.toggle("active");
        });
    });
}
