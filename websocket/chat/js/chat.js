

'use strict';
const chat = document.getElementsByClassName('chat')[0];
const chatStatus = chat.getElementsByClassName('chat-status')[0];
const setMessageBtn = chat.getElementsByClassName('message-submit')[0];
const messageStatus =  chat.getElementsByClassName('message-status')[0];
const messageStatusText = messageStatus.getElementsByClassName('message-text')[0];
const messagesContent = chat.getElementsByClassName('messages-content')[0];
const messagesLoading = chat.getElementsByClassName('loading');
const messageLoading = chat.getElementsByClassName('loading')[0];
const messages = chat.getElementsByClassName('message');
const message = chat.getElementsByClassName('message')[0];
const messageCurrentUser = message.nextElementSibling;
const messageInput = chat.getElementsByClassName('message-input')[0];
const messagePersonal = chat.getElementsByClassName('message-personal')[0];

const currentUser = chat.getElementsByTagName('h1')[0];
const connect = new WebSocket('wss://neto-api.herokuapp.com/chat');

connect.addEventListener('open', e => {
  chatStatus.textContent = chatStatus.dataset.online;
  setMessageBtn.removeAttribute('disabled');
  messageStatusText.textContent = `Пользователь ${currentUser.textContent} в сети`;
  messagesContent.appendChild(messageStatus.cloneNode(true));
});


connect.addEventListener('message', e => {  
  if(e.data === '...'){    
    messageLoading.tectContent = `${currentUser.textContent} печатает сообщение`;
    messageContent.appendChild(messageLoading.cloneNode(true));   
  }else {
    for(let key of messages){
      if(key === messagesLoading){        
        messagesContent.removeChild(key);        
      }
    }
    messageCurrentUser.getElementsByClassName('message-text')[0].textContent = e.data;     
    messageCurrentUser.getElementsByClassName('timestamp')[0].textContent = messageDate();    
    messagesContent.appendChild(messageCurrentUser.cloneNode(true));
  }  
});

setMessageBtn.addEventListener('click', e => {
  e.preventDefault();
  if(messageInput.value.length === 0) return;
  connect.send(messageInput.value);
  messagePersonal.getElementsByClassName('message-text')[0].textContent = messageInput.value;  
  messagePersonal.getElementsByClassName('timestamp')[0].textContent = messageDate();
  messagesContent.appendChild(messagePersonal.cloneNode(true));
  messageInput.value = '';
});

function messageDate() {
  let date = new Date();
  let formatTimeHours, formatTimeMin; 
  (date.getHours() < 10)? formatTimeHours = 0 : formatTimeHours = ''; 
  (date.getMinutes() < 10)? formatTimeMin = 0 : formatTimeMin= ''; 
  return `${formatTimeHours}${date.getHours()} : ${formatTimeMin}${date.getMinutes()}`;
}


connect.addEventListener('close', e => {
  chatStatus.textContent = chatStatus.dataset.offline;
  setMessageBtn.setAttribute('disabled', true);
  messageStatusText.textContent = `Пользователь ${currentUser.textContent} не в сети`;
  messagesContent.appendChild(messageStatus.cloneNode(true));
});

function close (){
  connect.close()
}

setTimeout(close, 20000)
