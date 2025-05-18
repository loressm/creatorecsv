document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendar-container");
    const calendarTitle = document.getElementById("calendar-title");
    const calendar = document.getElementById("calendar");
    const eventBox = document.getElementById("event-box");
    const eventContent = document.getElementById("event-content");
    
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const daysOfWeek = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    const events = {
        // Esempio di eventi per giorni specifici, format: "YYYY-MM-DD"
        "2025-02-01": "Eventi lungo 2 righe di testo",
        "2025-02-05": "Evento con un testo un po' più lungo che sicuramente avrà bisogno di scorrere.",
        "2025-02-10": "Un altro evento che ha un sacco di informazioni.",
    };

    // Imposta la data corrente (mese e anno)
    let currentDate = new Date();

    // Funzione per generare il calendario
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Pulisce il contenitore del calendario
        calendar.innerHTML = "";

        // Aggiungi i giorni della settimana
        daysOfWeek.forEach((day) => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerText = day;
            calendar.appendChild(dayElement);
        });

        // Aggiungi i giorni del mese
        for (let i = 1; i <= lastDate; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerText = i;
            const currentDay = new Date(year, month, i).toISOString().split('T')[0]; // "YYYY-MM-DD"

            // Aggiungi un evento cliccabile sui giorni
            dayElement.addEventListener("click", () => displayEventInfo(currentDay));

            // Evidenzia se c'è un evento per quel giorno
            if (events[currentDay]) {
                dayElement.classList.add("highlighted");
            }

            // Aggiungi il giorno al calendario
            calendar.appendChild(dayElement);
        }

        // Imposta il titolo del mese
        const monthNames = [
            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ];
        calendarTitle.innerText = `Scopri gli eventi di ${monthNames[month]} ${year}`;
    }

    // Funzione per mostrare le informazioni dell'evento
    function displayEventInfo(date) {
        eventBox.style.display = "block";  // Mostra il box eventi
        eventContent.innerHTML = "";  // Pulisce il contenuto dell'evento

        const event = events[date];
        if (event) {
            eventContent.innerHTML = event; // Mostra il testo dell'evento
        } else {
            eventContent.innerHTML = "Non ci sono eventi per questo giorno."; // Messaggio se non ci sono eventi
        }

        // Permetti lo scroll verticale nel caso in cui il contenuto ecceda
        eventBox.style.maxHeight = "200px"; // Altezza fissa del box
        eventBox.style.overflowY = "auto";  // Permette lo scroll
    }

    // Funzione per navigare tra i mesi
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    // Inizializza il calendario con il mese corrente
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});
