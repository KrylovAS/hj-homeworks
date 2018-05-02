'use strict';

const addProduct = document.getElementsByClassName('add');
const totalSum = document.getElementById('cart-total-price');
const totalProduct = document.getElementById('cart-count');
let product = 0;
let priceProduct = [];

for(let a of addProduct) {
  a.addEventListener('click', func)
}

function func() {  
   priceProduct.push(+(this.dataset.price));    
   totalSum.innerHTML = priceProduct.reduce((a, b) => a + b );
   product++;
   totalProduct.innerHTML = product;  
}











