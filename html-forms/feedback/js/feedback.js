'use strict';

const formGroup = document.querySelectorAll('.form-group input');
const textarea = document.querySelector('textarea');
const buttonContact = document.getElementsByClassName('button-contact');
const inputZip = document.querySelector('[name="zip"]');
const output = document.querySelector('#output');
const contentform = document.querySelector('.contentform');
const outputData = document.querySelectorAll('output');

textarea.addEventListener('input', formFillingCheck);
inputZip.setAttribute('type', "number");

for(let key of formGroup ){
  key.addEventListener('input', formFillingCheck);
}

function formFillingCheck() {
 
  for(let key of formGroup){    
    if(!(key.value) || !(textarea.value)) {       
      buttonContact[0].setAttribute('disabled', true);  
        return;
    }     
  }
  
  buttonContact[0].removeAttribute('disabled');
}

for(let key of buttonContact ){
  key.addEventListener('click', showMessage);
}

function showMessage() {
  
  event.preventDefault();
  contentform.classList.toggle('hidden');
  output.classList.toggle('hidden');
  dataTransfer();  
}

function dataTransfer(){

  for (let keyInput of formGroup) {
    for (let keyOutput of outputData) {
      if (keyInput.name === keyOutput.id) {
        keyOutput.innerHTML = keyInput.value;
      };
    };
  };
  
  document.querySelector('output[id="message"]').innerHTML = textarea.value; 
}
     
    
