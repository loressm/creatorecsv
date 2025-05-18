const events = {};  // Evento JSON

// Simulazione del caricamento eventi (aggiungi il tuo codice fetch qui se hai un CSV da caricare)
events['2025-02-15'] = {
    production: "Produzione Eventi",
    member: "Mario Rossi",
    location: "Teatro Comunale",
    description: "Evento molto interessante con diversi contenuti coinvolgenti. Si parlerà di teatro e arti performative in modo innovativo. Non mancare!"
};

// Rendi visibile il box informazioni inizialmente vuoto
const eventBox = document.getElementById('event-box');
const eventContent = document.getElementById('event-content');

// Aggiungi la logica del calendario
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const weekdays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const monthName = monthNames[currentMonth];
    document.getElementById('calendar-title').textContent = `Scopri gli eventi di ${monthName} ${currentYear}`;
    const numDays = lastDay.getDate();
    let calendarHtml = '';

    for (let i = 0; i < weekdays.length; i++) {
        calendarHtml += `<div class="day">${weekdays[i].slice(0, 3)}</div>`;
    }

    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHtml += `<div class="day"></div>`;
    }

    for (let day = 1; day <= numDays; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const hasEvent = events[dateStr] ? 'highlighted' : '';
        calendarHtml += `<div class="day ${hasEvent}" data-date="${dateStr}">${day}</div>`;
    }

    document.getElementById('calendar').innerHTML = calendarHtml;
}

// Mostra gli eventi selezionati
function showEvent(eventDate) {
    const event = events[eventDate];

    if (event) {
        eventContent.innerHTML = `
            <strong>Produzione:</strong> ${event.production}<br>
            <strong>Socio:</strong> ${event.member}<br>
            <strong>Spazio:</strong> ${event.location}<br>
            <strong>Descrizione:</strong> ${event.description}
        `;
    } else {
        eventContent.innerHTML = 'Non ci sono eventi questo giorno';
    }

    eventBox.style.display = 'block';
}

document.getElementById('calendar').addEventListener('click', function (event) {
    if (event.target.classList.contains('day') && event.target.dataset.date) {
        const selectedDate = event.target.dataset.date;
        showEvent(selectedDate);
    }
});

document.getElementById('prev-month').addEventListener('click', function () {
    if (currentMonth > 0) {
        currentMonth--;
        renderCalendar();
    }
});

document.getElementById('next-month').addEventListener('click', function () {
    if (currentMonth < 11) {
        currentMonth++;
        renderCalendar();
    }
});

renderCalendar();  // Prima renderizzazione del calendario
