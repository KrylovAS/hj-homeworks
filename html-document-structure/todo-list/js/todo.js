'use strict';

const checkInput = document.querySelectorAll('input[type="checkbox"]');

for(let key of checkInput){
  key.addEventListener('click', sortList);
}

function sortList(){  
  const sectionDone  = document.querySelector('.done');
  const sectionUnDone  = document.querySelector('.undone');
  if(this.hasAttribute('checked')){  
    this.removeAttribute('checked');
    sectionUnDone.appendChild(this.parentElement);
  }else {
    this.setAttribute('checked', true);     
    sectionDone.appendChild(this.parentElement );
  }
}

