'use strict';
const content = document.querySelector('#content')
const libsData = new XMLHttpRequest();
let bookList = '';
libsData.open('GET', 'https://neto-api.herokuapp.com/book/');
libsData.send();
libsData.addEventListener('load', setBook);

function setBook() {
  const bookParse = JSON.parse(libsData.responseText)
  
  for(let data of bookParse) {    
    bookList += `<li data-title ="${data.title}"
                     data-author="${data.author.name}"
                     data-info="${data.info}"
                     data-price="${data.price}" >
                <img src ="${data.cover.small}">
                </li>`
    content.innerHTML = bookList;    
  }
}



