'use strict';
const checkInput = document.getElementsByTagName('input');
const listBlock = document.querySelector('.list-block');
const output = document.querySelector('output');
let task = 0;


for(let key of checkInput){  
  key.addEventListener('change', addCheck); 
  key.addEventListener('change', finishTask) 
}

for(let i = 0; i < checkInput.length; i++ ){
   if(checkInput[i].checked){
     task++;     
   }
}
output.innerText = task;

function addCheck() { 
  (this.checked) ? task++ : task--;  
  output.innerText = task;  
}

function finishTask(){
  for(let i = 0; i<checkInput.length; i++ ){      
    if(!(checkInput[i].checked)){
      listBlock.classList.remove('complete');
        return;
      }    
  }

  listBlock.classList.add('complete');  
}

