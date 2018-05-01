'use strict';
const codeWord = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let testWord = [];
let i = 0;

function updatePlayer(event) {  
  if (!event.ctrlKey && !event.altKey) {
  return;
  }  
  if (event.code === 'KeyT') {  
  document.getElementsByTagName('nav')[0].classList.toggle('visible'); 
  }
}

function viewSurprise(event) {  
  if(event.code === codeWord[i]){
    testWord.push(event.code);    
    i++;
    if(codeWord.join() === testWord.join()){
    document.getElementsByClassName('secret')[0].classList.toggle('visible')
    }
  }else {   
    testWord = [];
    i = 0;
  }  
}

document.addEventListener('keydown', updatePlayer)
document.addEventListener('keydown', viewSurprise)