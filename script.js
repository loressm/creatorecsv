// script.js

document.addEventListener("DOMContentLoaded", () => {
    const addRowButton = document.getElementById("add-row");
    const eventForm = document.getElementById("event-form");
    const csvTextArea = document.getElementById("csv-text");
    const createCsvButton = document.getElementById("create-csv");
    const dataInput = document.getElementById("data");

    // Funzione per aggiungere una nuova riga di eventi
    addRowButton.addEventListener("click", () => {
        const data = document.getElementById("data").value;
        const produzioni = document.getElementById("produzioni").value;
        const socio = document.getElementById("socio").value;
        const spazi = document.getElementById("spazi").value;
        const descrizione = document.getElementById("descrizione").value;

        if (data && produzioni && socio && spazi && descrizione) {
            const eventData = `${data},${produzioni},${socio},${spazi},${descrizione}`;
            appendCsvText(eventData);
            clearFormFields();
        } else {
            alert("Tutti i campi sono obbligatori.");
        }
    });

    // Funzione per appendere una nuova riga al testo CSV
    function appendCsvText(data) {
        csvTextArea.value += data + "\n";
    }

    // Funzione per pulire i campi del modulo dopo l'inserimento
    function clearFormFields() {
        document.getElementById("data").value = "";
        document.getElementById("produzioni").value = "";
        document.getElementById("socio").value = "";
        document.getElementById("spazi").value = "";
        document.getElementById("descrizione").value = "";
    }

    // Funzione per forzare il formato della data con trattini
    dataInput.addEventListener("input", function() {
        let value = this.value.replace(/\D/g, ""); // Rimuove qualsiasi carattere non numerico
        if (value.length > 4) value = value.substring(0, 4) + "-" + value.substring(4);
        if (value.length > 7) value = value.substring(0, 7) + "-" + value.substring(7, 9);
        this.value = value;
    });

    // Funzione per creare il file CSV
    createCsvButton.addEventListener("click", () => {
        const csvContent = csvTextArea.value;
        if (csvContent.trim() === "") {
            alert("Non ci sono dati da esportare.");
            return;
        }
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "eventi.csv";  // File scaricato si chiamerà "eventi.csv"
        link.click();
    });
});
