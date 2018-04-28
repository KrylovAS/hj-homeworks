'use strict';
const media = document.getElementsByClassName('mediaplayer')[0];
const player = document.getElementsByTagName('audio')[0];
const titleMusic = document.getElementsByTagName('span')[0];
const btnPlay = document.getElementsByClassName('playstate')[0];
const btnStop = document.getElementsByClassName('stop')[0];
const btnBack= document.getElementsByClassName('back')[0];
const btnNext = document.getElementsByClassName('next')[0];
const playstate = document.getElementsByClassName('playstate')[0];
const arrMusic = ['mp3/LA Chill Tour.mp3', 'mp3/LA Fusion Jam.mp3', 'mp3/This is it band.mp3'];
const arrTitle = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];
let i = 0;

btnPlay.onclick = function() {  
  if(player.paused) {
    media.classList.toggle('play')
    player.autoplay = true;
    player.play();           
  }else {
    media.classList.remove('play')
    player.pause();
    player.autoplay = false;       
  }
}

btnStop.onclick = function() {
  media.classList.remove('play')
  player.autoplay = false;
  player.pause();
  player.currentTime = 0;  
}

btnNext.onclick = function() {
  i++;

  if(i > arrMusic.length - 1) {
    i = 0;
  }
  
  walkArray();   
}

btnBack.onclick = function() {  
  i--;

  if(i < 0) {
    i = arrMusic.length - 1;
  }

  walkArray();
}

function walkArray() {  
  player.src = arrMusic[i];
  titleMusic.title = arrTitle[i]; 
}




