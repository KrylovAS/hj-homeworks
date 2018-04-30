'use strict';

const navList = document.getElementsByClassName('gallery-nav')[0];
const productList = navList.getElementsByTagName('a');
const fullViewProduct = document.getElementsByClassName('gallery-view')[0];


function productFocus(event) {
  event.preventDefault();
  if (this.classList.contains('gallery-current')) {
    return;
  }

  const currentTab = document.getElementsByClassName('gallery-current');
    for (const tab of currentTab) {
     tab.classList.remove('gallery-current');
  }

  this.classList.add('gallery-current');  
  fullViewProduct.src = this.href; 
}

for(let a of productList){
  a.addEventListener('click', productFocus );  
}

