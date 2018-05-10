'use strict';

const loader = document.querySelector('#loader');
const content = document.querySelector('#content');
const rateFrom = document.querySelector('#from');
const rateTo = document.querySelector('#to');
const result = document.querySelector('#result');
const source = document.querySelector('#source');
const selectList = document.querySelectorAll('#content select')
const rateData = new XMLHttpRequest();
let getRateData;
rateData.open('GET', 'https://neto-api.herokuapp.com/currency');
rateData.send();
rateData.addEventListener('load', getRate);
source.addEventListener('input', calcRate);
loader.classList.remove('hidden');

for(let key of selectList){
  key.addEventListener('change', calcRate);
}

function getRate() {  
  getRateData = JSON.parse(rateData.responseText);
  loader.classList.add('hidden');
  content.classList.remove('hidden');

  for (let key of getRateData) {
    rateFrom.innerHTML += `<option>${key.code}</option>`;
    rateTo.innerHTML += `<option>${key.code}</option>`;     
  }
  
  result.innerHTML = source.value;
}
 
function calcRate() {    
  let valueFrom = getRateData.find(el => el.code === rateFrom.value);
  let valueTo = getRateData.find(el => el.code === rateTo.value);    
  result.innerHTML = (parseInt((source.value * valueFrom.value / valueTo.value)* 100)) / 100
}

