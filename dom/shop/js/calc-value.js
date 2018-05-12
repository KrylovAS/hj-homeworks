'use strict';

const addProduct = document.getElementsByClassName('add');
const totalSum = document.getElementById('cart-total-price');
const totalProduct = document.getElementById('cart-count');
let product = 0;
let priceProduct = 0;

for(let a of addProduct) {
  a.addEventListener('click', calcQuantity)
}

function calcQuantity() {  
  priceProduct += +this.dataset.price
  totalSum.innerHTML = getPriceFormatted(priceProduct);  
  product++;
  totalProduct.innerHTML = product;  
}

