'use strict';

const canvas = document.getElementsByTagName('canvas')[0];
const ctx =canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', generateStar);
canvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateStar();
});

function generateStar(){
  let star;
  const starQuantity = parseInt(Math.random() * (400 - 200) + 200)
  ctx.beginPath();
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height );  
  for(let i = 0 ; i <= starQuantity; i++){
    const arrColor = ['#ffffff', '#ffe9c4', '#d4fbff'];
    const randonColor = parseInt(Math.random() * (3 ));
    const x = Math.random() * (canvas.width - 1) + 1;
    const y = Math.random() * (canvas.height - 1) + 1;
    const wSize = Math.random() * (1.1 );
    const hSize = Math.random() * (1.1);
    const alpha =  Math.random() * (1 - 0.8) + 0.8;

    ctx.fillStyle = arrColor[randonColor];    
    ctx.globalAlpha = alpha.toFixed(1);
    star += ctx.fillRect(x, y, wSize , hSize);
    }
}

