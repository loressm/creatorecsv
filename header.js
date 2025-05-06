fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initHeaderScripts(); // Richiama la funzione definita in script.js
    });
