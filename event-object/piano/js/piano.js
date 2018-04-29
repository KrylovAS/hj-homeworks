const listKey = document.getElementsByClassName('middle')[0];
const key = listKey.getElementsByTagName('li');
const sound = listKey.getElementsByTagName('audio');


function giveReference(arrSounds) {
  for (let i = 0; i < sound.length; i++) {
    sound[i].src = arrSounds[i];
  }
}

function middleTone() { 
  listKey.classList.remove('lower')
  listKey.classList.remove('higher')
  const arrSounds = ['sounds/middle/first.mp3', 'sounds/middle/second.mp3', 'sounds/middle/third.mp3', 'sounds/middle/fourth.mp3', 'sounds/middle/fifth.mp3']
  giveReference(arrSounds);
      
}

function lowerTone() {  
  const arrSounds = ['sounds/lower/first.mp3', 'sounds/lower/second.mp3', 'sounds/lower/third.mp3', 'sounds/lower/fourth.mp3', 'sounds/lower/fifth.mp3']
  giveReference(arrSounds);     
}

function higherTone() { 
  const arrSounds = ['sounds/higher/first.mp3', 'sounds/higher/second.mp3', 'sounds/higher/third.mp3', 'sounds/higher/fourth.mp3', 'sounds/higher/fifth.mp3']
  giveReference(arrSounds);      
}

function playSounds() {
  if(listKey.classList.contains('lower')){
    lowerTone();
  }else if(listKey.classList.contains('higher')){
    higherTone();
  }else {
    middleTone();
  }
  
  let soundKey = this.getElementsByTagName('audio')[0]; 
  soundKey.play(); 
   
}

function chancheTone(event) { 
  const delMiddle = listKey.classList.remove('middle');
  switch (event.key) {
    case 'Shift':
    delMiddle;
    listKey.classList.add('lower')
    break;
    case 'Alt': 
    delMiddle;
    listKey.classList.add('higher')
    break;
  }
}

for (let a of key) {
  a.addEventListener('click', playSounds);
}
document.addEventListener('keydown', chancheTone);
document.addEventListener('keyup', middleTone);
  