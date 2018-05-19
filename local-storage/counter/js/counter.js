'use strict';

const counter = document.getElementById('counter');
const incrementCounter = document.getElementById('increment');
const decrementCounter = document.getElementById('decrement');
const resetCounter = document.getElementById('reset');
const wrapBtn = document.querySelectorAll('.wrap-btns');


for(let key of wrapBtn){
  key.addEventListener('click', memodata )
}
counter.textContent = 0;

function memodata(){
  if(event.target.id === 'increment') {
    counter.textContent++;
  }else if (event.target.id ==='decrement' && counter.textContent >= 1) {
    counter.textContent--;
  }else {
    counter.textContent = 0;
  }
  localStorage.counter = counter.textContent; 
}
counter.textContent = localStorage.counter;


