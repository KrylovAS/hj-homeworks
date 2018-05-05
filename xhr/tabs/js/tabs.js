'use strict';
const tabs = document.querySelectorAll('nav a');
const preloader = document.querySelector('#preloader');
const getTab = new XMLHttpRequest();
preloader.classList.toggle('hidden');
setLink ()

for (let a of tabs) {
  a.addEventListener('click', switchTab);    
}

function switchTab() {
  event.preventDefault();
  if (this.classList.contains('active')) return;
    
  for (const tab of tabs) {
    tab.classList.remove('active');
  } 
  this.classList.add('active'); 

  tabLink();
  setLink();  
}

function tabLink() {
  return document.querySelector('.active')
 } 

function setLink () {
  getTab.open('GET', tabLink().href);
  getTab.send();  
}

function setTab() {  
  preloader.classList.add('hidden');
  document.querySelector('#content').innerHTML = getTab.responseText;
}

getTab.addEventListener('load', setTab);






  






