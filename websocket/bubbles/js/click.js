'use strict';

const connect = new WebSocket('wss://neto-api.herokuapp.com/mouse');

document.addEventListener('click', e => {
  e.preventDefault();
  let a = {};
  a.x = e.pageX;
  a.y = e.pageY;
  connect.send(JSON.stringify(a));  
  showBubbles(connect)
});




