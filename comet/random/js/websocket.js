'use strict';
const websocketNode = document.querySelectorAll('.websocket div');
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', e => {
  const getCurrent = websocketNode[e.data - 1]
  websocketNode.forEach(el => el.classList.remove('flip-it'));  
  getCurrent.classList.add('flip-it');  
});

window.addEventListener('beforeunload' , () => {
  ws.close();
});


