'use strict';

const currentPhoto = document.getElementById('currentPhoto');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const arrImage = ['i/breuer-building.jpg', 'i/guggenheim-museum.jpg', 'i/headquarters.jpg', 'i/IAC.jpg', 'i/new-museum.jpg'];
let step = 0;

currentPhoto.src = arrImage[step];

prevPhoto.onclick = function() {  
    step -= 1;  

    if(step < 0) {
        step = arrImage.length - 1;
    }

    currentPhoto.src = arrImage[step];   
}

nextPhoto.onclick = function() {
    step += 1;

    if(step > arrImage.length - 1 ) {
        step = 0;
    } 

    currentPhoto.src = arrImage[step];   
}
