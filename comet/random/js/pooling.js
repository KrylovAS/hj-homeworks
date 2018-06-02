'use strict';

const xml = new XMLHttpRequest()
const polingNode = document.querySelectorAll('.pooling div');
setInterval(getRequest, 5000);
function getRequest (){
  xml.open('GET', 'https://neto-api.herokuapp.com/comet/pooling', true); 
  xml.addEventListener('load', () => {
    const getCurrent = polingNode[xml.responseText - 1];      
      polingNode.forEach(el => el.classList.remove('flip-it'));  
      getCurrent.classList.add('flip-it');  
    });
  xml.send();
}