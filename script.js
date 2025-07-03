const bilder = [
    "./img/Oldtimer1.jpg",
    "./img/Oldtimer2.jpg",
    "./img/Oldtimer3.jpg",
    "./img/Oldtimer4.jpg",
    "./img/Oldtimer5.jpg",
    "./img/Oldtimer6.jpg",
    "./img/Oldtimer7.jpg",
    "./img/Oldtimer8.jpg",
    "./img/Oldtimer9.jpg",
    "./img/Oldtimer10.jpg",
    "./img/Oldtimer11.jpg",
    "./img/Oldtimer12.jpg",
    "./img/Oldtimer13.jpg"
];


const funnyContent = [
    "„Oldtimer sind wie gute Weine, sie werden mit der Zeit immer besser!“",
    "“Oldtimer fahren: Wenn sogar der TÜV sagt: ,Okay, Opa, du darfst nochmal los!‘“",
    "„Mein Auto hat mehr Falten als ich - aber läuft morgens trotzdem besser an.“",
    "„Ein Oldtimer ist der Beweis, dass Zeit nicht alles kaputt macht - sondern manchmal veredelt.“",
    "„Oldtimer haben vielleicht keinen Bordcomputer - aber jede Delle erzählt mehr als jedes Navi.“",
    "„Oldtimer fahren ist wie Zeitreise - nur ohne Fluxkompensator!“",
    "„Oldtimer sind wie gute Geschichten - sie werden mit jedem Jahr besser erzählt.“",
    "„Oldtimer: Die einzige Beziehung, in der Rost ein Zeichen von Liebe ist.“",
    "„Oldtimer sind wie gute Freunde: nicht perfekt, aber ehrlich - und immer für eine Spritztour zu haben.“",
    "„Ich fahre keinen Oldtimer, ich bewege Geschichte auf Rädern.“"
]

let aktuellerIndex = 0; // Merkt sich das aktuell angezeigte Bild
let dialogOpen = false;



// Funktion: for schleife zum ermitteln wie viele elemte im array sind
function baueGalerie() {
    const photosSection = document.querySelector(".photos");
    for (let i = 0; i < bilder.length; i++) {                 //hier wird die section mit der Classe .photos ausgewählt
        const bild = erstelleBildElement(i);                    //die forschleufe läuft so lange wie elemente im array bilder sind
        photosSection.appendChild(bild);            //hier wird die anzahl der bilder an die erstelleBildElement funktion übergeben
    }
}



// Funktion:<img> Element erstellen
function erstelleBildElement(index) {
    const img = document.createElement("img"); // Neues Bild-Element im html erstellen
    img.src = bilder[index];
    img.alt = "Oldtimer Bild";
    img.style.width = "200px";
    img.style.height = "200px";                 // hier werden die css-Eigenschaften gesetzt
    img.style.margin = "10px";
    img.style.borderRadius = "10px";

    // Klickfunktion für das Bild
    img.addEventListener("click", function () {
        dialogOpen = true; // Dialog wird geöffnet
        zeigeGroßesBild(index, true);                   //Ein eventListener der auf Click reagiert und die funktion
    });                                           //  zeigeGroßesBild ausführt

    return img;
}


// Funktion: Großansicht anzeigen
function zeigeGroßesBild(index, mitSound = false) {
    aktuellerIndex = index; // Index merken auf welchem Bild ich bin
    const dialog = document.getElementById("bild-dialog");      // Hier wird das Dialog-Element mit der ID "bild-dialog" ausgewählt
    const dialogImg = document.getElementById("dialog-img");    // Hier wird das <img> Element im Dialog ausgewählt
    dialogImg.src = bilder[index];                              // Hier wird das Bild aus dem Array "bilder" ausgewählt der index wird übergeben um das richtige bild zu öffnen
    dialog.style.display = "flex";
    if (mitSound) {
        const sound = new Audio("./img/car.mp3");
        sound.play();
    }
}                           // Hier wird der Dialog angezeigt, indem der Display-Wert auf "flex" gesetzt wird

// Funktion: Dialog schließen
function schließeDialog() {
    document.getElementById("bild-dialog").style.display = "none";   // hier wird einfach die css klasse display auf none gesetzt, damit der Dialog geschlossen wird
}

// Funktion: Klick außerhalb des Bildes
function setupAußenKlick() {
    document.getElementById("bild-dialog").addEventListener("click", function (e) {
        if (e.target === this) {                     // Hier wird überprüft, ob der Klick auf das Dialog-Element selbst erfolgt ist
            schließeDialog();                          // Wenn ja, wird der Dialog geschlossen
        }
    });
}

// Pfeil-Events hinzufügen
function setupPfeile() {
    document.getElementById("dialog-arrow-left").addEventListener("click", function (backwarts) {
        backwarts.stopPropagation(); // Verhindert, dass der Dialog geschlossen wird
        aktuellerIndex = (aktuellerIndex - 1 + bilder.length) % bilder.length;
        zeigeGroßesBild(aktuellerIndex, false);
    });
    document.getElementById("dialog-arrow-right").addEventListener("click", function (forwarts) {
        forwarts.stopPropagation();
        aktuellerIndex = (aktuellerIndex + 1) % bilder.length;
        zeigeGroßesBild(aktuellerIndex, false);
    });
}
// Funktion: Zufälligen Spruch anzeigen
function showFunnyConent() {
    const spruchIndex = Math.floor(Math.random() * funnyContent.length); // Zufälligen Index für den Spruch generieren
    const spruch = funnyContent[spruchIndex]; // Den Spruch aus dem Array holen
    const spruchElement = document.getElementById("funny-contents"); // Das Element im HTML, wo der Spruch angezeigt werden soll
    spruchElement.textContent = spruch; // Den Spruch in das Element einfügen
}

// Hauptfunktion, wenn Seite geladen ist
function initialisiereSeite() {
    baueGalerie();
    document.getElementById("dialog-close").addEventListener("click", schließeDialog); // Hier wird der Event-Listener für den Schließen-Button im Dialog gesetzt
    setupAußenKlick();  // Hier wird die Funktion aufgerufen, die den Klick außerhalb des Bildes behandelt
    schließeDialog(); // Sicherstellen, dass der Dialog zu Beginn geschlossen ist
    setupPfeile();
    showFunnyConent(); // Zufälligen Spruch anzeigen
    setInterval(showFunnyConent, 10000); // Alle 20 Sekunden neuen Spruch anzeigen
}

// Wenn DOM geladen → starten
document.addEventListener("DOMContentLoaded", initialisiereSeite);