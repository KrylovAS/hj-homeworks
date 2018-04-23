'use strict';

const img = document.getElementById('slider');
const arrImage = ['i/airmax-jump.png', 'i/airmax-on-foot.png', 'i/airmax-playground.png', 'i/airmax-top-view.png', 'i/airmax.png' ]
let step = 0;

function pagingSlide() {
    img.src = arrImage[step];
    step += 1;
    if(step > arrImage.length - 1){
        step = 0;
    };

};

setInterval(pagingSlide, 5000);