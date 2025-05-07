document.addEventListener("DOMContentLoaded", () => {
    // Carica il contenuto di header.html e inseriscilo nel tag <header>
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
        .catch(error => {
            console.error("Errore nel caricamento dell'header:", error);
        });
});
