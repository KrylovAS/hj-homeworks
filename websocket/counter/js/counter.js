'use strict';
const counter = document.getElementsByClassName('counter')[0];
const errors = document.getElementsByClassName('errors')[0];
const connect = new WebSocket('wss://neto-api.herokuapp.com/counter');

connect.addEventListener('message', e => {  
  let getData = JSON.parse(e.data);

  counter.textContent = getData.connections ;
  errors.textContent = getData.errors;  
});

window.addEventListener('beforeunload', () => {
    connect.close(1000)
});