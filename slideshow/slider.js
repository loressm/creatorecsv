document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".slideshow-track");
    const slides = Array.from(track.children);

    // Duplica le slide per scorrimento continuo
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    // Pausa al passaggio del mouse
    track.addEventListener("mouseenter", () => {
        track.classList.add("paused");
    });

    track.addEventListener("mouseleave", () => {
        track.classList.remove("paused");
    });

    // Pausa quando la scheda non è attiva
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            track.classList.add("paused");
        } else {
            track.classList.remove("paused");
        }
    });
});
