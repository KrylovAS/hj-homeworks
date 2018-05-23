'use strict';
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const colorHeader = document.querySelector('#colorSwatch .header');
const sizeHeader = document.querySelector('#sizeSwatch .header');
const colorAddBlock = document.createElement('div');
const sizeAddBlock = colorAddBlock.cloneNode();
const quickCart = document.getElementById('quick-cart');
const addToCartForm = document.getElementById('AddToCartForm');
const addToCartBtn = document.getElementById('AddToCart');



getDataColor();
getDataSize();
refreshCartData()

function getDataColor() {
  const xhrColor = new XMLHttpRequest();
  xhrColor.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
  xhrColor.send();
  xhrColor.addEventListener('load', availableColor);
  
  colorSwatch.insertBefore(colorAddBlock, colorHeader.nextSibling);
  function availableColor(){
    try{
      const getColor = JSON.parse(xhrColor.responseText);
      if(getColor.error){
         console.log(error.message);
         return;
      }
      if (200 <= xhrColor.status && xhrColor.status < 300){
        for(let key of getColor){
          let colorAvailabel = '';
          let colorDisabled = '';
          if(!key.isAvailable){
            colorAvailabel = 'soldout';
            colorDisabled = 'disabled';      
          }else {
            colorAvailabel = 'available';      
        }
        colorAddBlock.innerHTML += `<div data-value="${key.type}" class="swatch-element color ${key.type} ${colorAvailabel}">
                                    <div class="tooltip">${key.title}</div>
                                    <input quickbeam="color" id="swatch-1-${key.type}" type="radio" name="color" value="${key.type}"  ${colorDisabled}>
                                    <label for="swatch-1-${key.type}" style="border-color: ${key.type};">
                                      <span style="background-color: ${key.code};"></span>
                                      <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                    </label>
                                  </div>`;      
        }
      }     
      const lastUserColorChoice = JSON.parse(localStorage.addToCartForm);
      Array
          .from(document.querySelectorAll('input[name="color"]'))
          .find(el => el.value === lastUserColorChoice.color).setAttribute('checked', true);
      
    }catch (err){      
      console.log('​}catch -> err.message', err.message);
    }  
  }     
}

function getDataSize() {
  const xhrSize = new XMLHttpRequest();
  xhrSize.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
  xhrSize.send();
  xhrSize.addEventListener('load', onLoadSize);
  sizeSwatch.insertBefore(sizeAddBlock, sizeHeader.nextElementSibling);
  function onLoadSize() {
    try{
      const getSize = JSON.parse(xhrSize.responseText);
      if(getSize.error){
        console.log(error.message);
        return;
      }
      if (200 <= xhrSize.status && xhrSize.status < 300){
        for(let key of getSize){
          let sizeAvailabel = '';
          let sizeDisabled = '';
          if(!key.isAvailable){
            sizeAvailabel = 'soldout';
            sizeDisabled = 'disabled';     
          }else {
            sizeAvailabel = 'available';      
          }

          sizeAddBlock.innerHTML += `<div data-value="${key.type}" class="swatch-element plain ${key.type} ${sizeAvailabel}">
                                    <input id="swatch-0-${key.type}" type="radio" name="size" value="${key.type}" ${sizeDisabled}>
                                    <label for="swatch-0-${key.type}">
                                      ${key.title}
                                    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                    </label>
                                </div>`;                                                          
        }      
        const lastUserSizeChoice = JSON.parse(localStorage.addToCartForm);         
        Array
            .from(document.querySelectorAll('input[name="size"]')).find(el => el.value === lastUserSizeChoice.size) 
            .setAttribute('checked', true);
      }
    }catch (err){     
      console.log('​}catch -> err.message', err.message);
    }
  }
}

addToCartBtn.addEventListener('click', addToCart);

function addToCart(){  
  event.preventDefault();
  const sendData = new XMLHttpRequest();
  const formData = new FormData(addToCartForm)
  formData.append('productId',addToCartForm.dataset.productId);
  sendData.open('POST', 'https://neto-api.herokuapp.com/cart');
  sendData.send(formData);
  sendData.addEventListener('load', getCartData)
  function getCartData() {
    try{
      const setCartData = JSON.parse(sendData.responseText);
      if(sendData.error){
        console.log(error.message);
        return;
      }
      if (200 <= sendData.status && sendData.status < 300){
        refreshCartData()
      }
    }catch (err){      
      console.log('​}catch -> err.message', err.message);
    }
  }
}

function refreshCartData() {    
  const refreshData = new XMLHttpRequest();
  refreshData.open('GET', 'https://neto-api.herokuapp.com/cart');
  refreshData.send();
  refreshData.addEventListener('load', getRefresh)
  function getRefresh(){
    try{
      const getrefreshData = JSON.parse(refreshData.responseText) 
      if(refreshData.error){
        console.log(error.message);
        return;
      }
      if (200 <= refreshData.status && refreshData.status < 300){
        quickCart.innerHTML = '';
        let totalPrice = '';
        getrefreshData.forEach(el => {
      
          quickCart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${el.productId}" style="opacity: 1;">
                                <div class="quick-cart-product-wrap">
                                  <img src="${el.pic}" title="${el.title}">
                                  <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
                                  <span class="s2"></span>
                                </div>
                                <span class="count hide fadeUp" id="quick-cart-product-count-${el.productId}">${el.quantity}</span>
                                <span class="quick-cart-product-remove remove" data-id="${el.productId}"></span>
                              </div>`;
          totalPrice += el.quantity * el.price;
          quickCart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
                                <span>
                                  <strong class="quick-cart-text">Оформить заказ<br></strong>
                                  <span id="quick-cart-price">${totalPrice}</span>
                                </span>
                              </a>`;
          if(!el.quantity) {                   
            document.getElementById('quick-cart-pay').classList.remove('open');
          }    
        });
      }
    }catch (err){      
      console.log('​}catch -> err.message', err.message);
    }      
  }
}

quickCart.addEventListener('click', itemCartRemove);

function itemCartRemove() {
  if(!event.target.classList.contains('quick-cart-product-remove')) return;
  const removeCartData = new XMLHttpRequest();
  const formData = new FormData(addToCartForm);
  formData.append('productId', event.target.dataset.id);
  removeCartData.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
  removeCartData.send(formData);
  removeCartData.addEventListener('load', removeItem)
  function removeItem(){
    try{
      const setCartData = JSON.parse(removeCartData.responseText);
      if(removeCartData.error){
        console.log(error.message);
        return;
      }
      if (200 <= removeCartData.status && removeCartData.status < 300){        
        refreshCartData();       
      }
    }catch (err) {      
      console.log('​}catch -> err.message', err.message);
    }
  }      
}

addToCartForm.addEventListener('change', userSaveData);

function userSaveData() {
  event.preventDefault();
  let obj = {};
  const formData = new FormData(addToCartForm);
  for(const [k, v] of formData){
      obj[k] = v;      
  }
  const json = JSON.stringify(obj);
  localStorage.setItem('addToCartForm', json);  
}

const thumbsImg = document.getElementsByClassName('thumb-image');
for (let key of thumbsImg){
  key.addEventListener('click', currentActiveImg)
}


function currentActiveImg(){
  event.preventDefault();
  if(this.classList.contains('active')) return;
  
  for(let key of thumbsImg){
  key.classList.remove('active');   
  }
  this.classList.add('active');
  
  document.getElementById('big-image').style = `background-image: url("${this.href}")`;
}

