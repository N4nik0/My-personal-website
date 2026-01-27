// funkcja do ustawienia następnej daty urodzin
function getNextBirthday() {
    const now = new Date();
    let year = now.getFullYear();
    const birthdayThisYear = new Date(`${year}-01-16T00:00:00`);

    // jeśli już po urodzinach w tym roku, ustaw na następny rok
    if (now > birthdayThisYear) {
        year += 1;
    }

    return new Date(`${year}-01-16T00:00:00`);
}

// ustaw początkową datę urodzin
let birthday = getNextBirthday();

setInterval(() => {
    const now = new Date();

    // sprawdź, czy dziś są urodziny
    const todayBirthday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (
        now.getFullYear() === todayBirthday.getFullYear() &&
        now.getMonth() === todayBirthday.getMonth() &&
        now.getDate() === todayBirthday.getDate()
    ) {
        document.getElementById("demo").innerHTML = `🎉 TODAY! 🎉`;

        return; // nie pokazuj licznika w tym dniu
    }

    // jeśli data już minęła (po północy kolejnego dnia), ustaw kolejny rok
    if (now > birthday) {
        birthday = getNextBirthday();
    }

    const diff = birthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("demo").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);


// --- DEBUG: po wciśnięciu "K" ustawiamy dzisiejszą datę ---
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "k") {
        birthday = new Date(); // ustawiamy dzisiaj
        console.log("DEBUG: Przeskoczono do dzisiejszej daty:", birthday);
        updateCountdown(); // od razu aktualizacja
    }
});