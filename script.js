const bilder = [
    "./img/Oldtimer1.jpg",
    "./img/Oldtimer2.jpg",
    "./img/Oldtimer3.jpg",
    "./img/Oldtimer4.jpg",
    "./img/Oldtimer5.jpg",
    "./img/Oldtimer6.jpg",
    "./img/Oldtimer7.jpg",
    "./img/Oldtimer8.jpg"
];

let aktuellerIndex = 0; // Merkt sich das aktuell angezeigte Bild



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
        zeigeGroßesBild(index);                   //Ein eventListener der auf Click reagiert und die funktion
    });                                           //  zeigeGroßesBild ausführt

    return img;
}


// Funktion: Großansicht anzeigen
function zeigeGroßesBild(index) {
    aktuellerIndex = index; // Index merken auf welchem Bild ich bin
    const dialog = document.getElementById("bild-dialog");      // Hier wird das Dialog-Element mit der ID "bild-dialog" ausgewählt
    const dialogImg = document.getElementById("dialog-img");    // Hier wird das <img> Element im Dialog ausgewählt
    dialogImg.src = bilder[index];                              // Hier wird das Bild aus dem Array "bilder" ausgewählt der index wird übergeben um das richtige bild zu öffnen
    dialog.style.display = "flex";
    // Sound abspielen
    const sound = new Audio("./img/car.mp3"); // Pfad zur Datei
    sound.play();
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
    document.getElementById("dialog-arrow-left").addEventListener("click", function (e) {
        e.stopPropagation(); // Verhindert, dass der Dialog geschlossen wird
        aktuellerIndex = (aktuellerIndex - 1 + bilder.length) % bilder.length;
        zeigeGroßesBild(aktuellerIndex);
    });
    document.getElementById("dialog-arrow-right").addEventListener("click", function (e) {
        e.stopPropagation();
        aktuellerIndex = (aktuellerIndex + 1) % bilder.length;
        zeigeGroßesBild(aktuellerIndex);
    });
}

// Hauptfunktion, wenn Seite geladen ist
function initialisiereSeite() {
    baueGalerie();
    document.getElementById("dialog-close").addEventListener("click", schließeDialog); // Hier wird der Event-Listener für den Schließen-Button im Dialog gesetzt
    setupAußenKlick();  // Hier wird die Funktion aufgerufen, die den Klick außerhalb des Bildes behandelt
    schließeDialog(); // Sicherstellen, dass der Dialog zu Beginn geschlossen ist
    setupPfeile();
}

// Wenn DOM geladen → starten
document.addEventListener("DOMContentLoaded", initialisiereSeite);