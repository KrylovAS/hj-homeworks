'use strict';
const xmll = new XMLHttpRequest();
const longPolingNode = document.querySelectorAll('.long-pooling div');

getRequest()
function getRequest (){
    xmll.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
    xmll.addEventListener('load', () => {      
      const getCurrent = longPolingNode[xmll.responseText - 1];      
      if(getCurrent){        
        longPolingNode.forEach(el => el.classList.remove('flip-it'));  
        getCurrent.classList.add('flip-it');
        getRequest()           
      }
    });
    xmll.send(); 
  }
