// Oggetto per memorizzare gli eventi
const events = {};

// Carica gli eventi dal file CSV
fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRqZXO73F9VZzUCOY3yCvwqRsTiWyoNJfi6P3qsKDiytQzw_VezIIuMNCyVq7thA8mt0Y5vQJiFx-tP/pub?gid=0&single=true&output=csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n');
        rows.forEach(row => {
            const columns = row.split(',');
            if (columns.length === 5) {
                const date = columns[0];
                events[date] = {
                    production: columns[1],
                    member: columns[2],
                    location: columns[3],
                    description: columns[4]
                };
            }
        });
        renderCalendar();
    })
    .catch(error => console.error('Errore nel caricamento degli eventi:', error));

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDate = null;

const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
const weekdays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

// Funzione per renderizzare il calendario
function renderCalendar() {
    const eventBox = document.getElementById('event-box');
    const expandButton = document.getElementById('expand-button');
    const collapseButton = document.getElementById('collapse-button');
    const eventContent = document.getElementById('event-content');
    
    eventBox.style.display = 'none'; // Nascondi il box eventi inizialmente
    eventContent.style.maxHeight = '130px'; // Limita l'altezza del contenuto inizialmente
    expandButton.style.display = 'none'; // Nascondi il tasto + se non necessario
    collapseButton.style.display = 'none'; // Nascondi il tasto - se non necessario

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const monthName = monthNames[currentMonth];
    document.getElementById('calendar-title').textContent = `Scopri gli eventi di ${monthName} ${currentYear}`;
    const numDays = lastDay.getDate();
    let calendarHtml = '';

    // Intestazione del calendario con i giorni della settimana
    for (let i = 0; i < weekdays.length; i++) {
        calendarHtml += `<div class="day">${weekdays[i].slice(0, 3)}</div>`;
    }

    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHtml += `<div class="day"></div>`;
    }

    // Aggiungi i giorni del mese al calendario
    for (let day = 1; day <= numDays; day++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const hasEvent = events[dateStr] ? 'highlighted' : '';
        calendarHtml += `<div class="day ${hasEvent}" data-date="${dateStr}">${day}</div>`;
    }

    const lastDayOfWeek = (firstDay.getDay() + numDays) % 7;
    for (let i = lastDayOfWeek; i < 6; i++) {
        calendarHtml += `<div class="day"></div>`;
    }

    document.getElementById('calendar').innerHTML = calendarHtml;

    // Abilita/disabilita i pulsanti "Mese precedente" e "Mese successivo"
    const prevButton = document.getElementById('prev-month');
    const nextButton = document.getElementById('next-month');
    prevButton.disabled = currentYear === new Date().getFullYear() && currentMonth <= new Date().getMonth();
    nextButton.disabled = currentYear === new Date().getFullYear() && currentMonth === 11;
}

// Funzione per visualizzare gli eventi quando un giorno viene selezionato
function showEvent(eventDate) {
    const event = events[eventDate];
    const eventBox = document.getElementById('event-box');
    const eventContent = document.getElementById('event-content');
    const expandButton = document.getElementById('expand-button');
    const collapseButton = document.getElementById('collapse-button');

    if (event) {
        eventBox.style.display = 'block'; // Mostra il box eventi
        eventContent.innerHTML = `
            <strong>Produzione:</strong> ${event.production}<br>
            <strong>Socio:</strong> ${event.member}<br>
            <strong>Spazio:</strong> ${event.location}<br>
            <strong>Descrizione:</strong> ${event.description}
        `;

        // Se il contenuto supera i 200 caratteri, mostriamo il tasto +
        if (event.description.length > 200) {
            expandButton.style.display = 'inline-block'; // Mostra il tasto +
        } else {
            expandButton.style.display = 'none'; // Nascondi il tasto +
        }
    } else {
        eventBox.style.display = 'block';
        eventContent.innerHTML = 'Non ci sono eventi questo giorno';
    }
}

// Gestisce la selezione di un giorno nel calendario
document.getElementById('calendar').addEventListener('click', function (event) {
    if (event.target.classList.contains('day') && event.target.dataset.date) {
        const newSelectedDate = event.target.dataset.date;
        if (selectedDate) {
            const oldSelectedDay = document.querySelector(`[data-date="${selectedDate}"]`);
            if (oldSelectedDay) {
                oldSelectedDay.classList.remove('selected');
            }
        }
        event.target.classList.add('selected');
        selectedDate = newSelectedDate;
        showEvent(selectedDate);
    }
});

// Gestisce la navigazione tra i mesi
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

// Espande il contenuto dell'evento
document.getElementById('expand-button').addEventListener('click', function () {
    const eventBox = document.getElementById('event-box');
    const eventContent = document.getElementById('event-content');
    const collapseButton = document.getElementById('collapse-button');
    
    eventBox.classList.add('expanded'); // Espande il box
    collapseButton.style.display = 'inline-block'; // Mostra il tasto -
    this.style.display = 'none'; // Nasconde il tasto +
});

// Riduce il contenuto dell'evento
document.getElementById('collapse-button').addEventListener('click', function () {
    const eventBox = document.getElementById('event-box');
    const expandButton = document.getElementById('expand-button');
    
    eventBox.classList.remove('expanded'); // Riduce il box
    expandButton.style.display = 'inline-block'; // Mostra il tasto +
    this.style.display = 'none'; // Nasconde il tasto -
});
