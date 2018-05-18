'use strict';
const itemList = document.getElementsByClassName('items-list')[0];
itemList.addEventListener('click', addBasket);

function addBasket(event) {  
  if(!event.target.classList.contains('add-to-cart')) return;
  
  let item = {};
  item.title = event.target.dataset.title;
  item.price = event.target.dataset.price;
  console.log(event.target)
  addToCart(item);
  
}

