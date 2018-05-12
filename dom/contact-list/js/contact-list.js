'use strict';

const userDate = JSON.parse(loadContacts());
const userList = document.getElementsByClassName('contacts-list')[0];
let userCardsHTML = '';

processingData();

userList.innerHTML =  userCardsHTML;

function processingData() {
  for (let persone of userDate) {
    userCardsHTML += `<li data-email="${persone.email}" data-phone="${persone.phone}"><strong>${persone.name}</strong></li>`;
  }
}





