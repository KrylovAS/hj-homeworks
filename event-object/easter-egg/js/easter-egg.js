'use strict';
const codeWord = 'нетология';
let testWord = '';
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
  if(event.key === codeWord[i]){
    i++;     
    testWord += event.key;    
    if(codeWord === testWord){
    document.getElementsByClassName('secret')[0].classList.toggle('visible')
    }
  }else {   
    testWord = '';
    i = 0;
  }  
}

document.addEventListener('keydown', updatePlayer)
document.addEventListener('keydown', viewSurprise)