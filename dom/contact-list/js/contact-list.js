'use strict';

const userDate = JSON.parse(loadContacts());
const userList = document.getElementsByClassName('contacts-list')[0];
let userCard = '';

processingData();

userList.innerHTML =  userCard;

function processingData() {
  for (let persone of userDate) {
    userCard += `<li data-email="${persone.email}" data-phone="${persone.phone}"><strong>${persone.name}</strong></li>`;
  }
}





