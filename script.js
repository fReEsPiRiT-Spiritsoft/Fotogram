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


document.addEventListener("DOMContentLoaded", () => {

    const photosSection = document.querySelector(".photos");

    for (let i = 0; i < bilder.length; i++) {
        const img = document.createElement("img");
        img.src = bilder[i];
        img.alt = "Oldtimer Bild";
        img.style.width = "200px";
        img.style.height = "200px";
        img.style.margin = "10px";
        img.style.borderRadius = "10px";

        photosSection.appendChild(img);
    }
});