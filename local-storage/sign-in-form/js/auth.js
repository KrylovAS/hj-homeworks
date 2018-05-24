'use strict';

const signInHtm = document.getElementsByClassName('sign-in-htm')[0];
const signUpHtm = document.getElementsByClassName('sign-up-htm')[0];
const button = document.getElementsByClassName('button');
const output = document.getElementsByClassName('error-message');
const check= document.getElementById('check');
const emailValue = document.getElementById('email');    
const passValue = document.getElementById('pass'); 

showLocatData();

for(let key of button){
    key.addEventListener('click', getData);
}

function getData(){  
  event.preventDefault();
  let formData;
  const form = {};
  const xhr = new XMLHttpRequest();
    
  if(this.value === 'Войти'){
    formData = new FormData(signInHtm);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
  }else {
    formData = new FormData(signUpHtm);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signup');        
  }
    
  for (const [k, v] of formData) {
    form[k] = v;    
  }  
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(form));    
  xhr.addEventListener("load", onLoad);
  function onLoad() {
    try{
      const getServerData = JSON.parse(xhr.responseText);     
      if (200 <= xhr.status && xhr.status < 300){         
        if(getServerData.error){          
          output[0].textContent = getServerData.message;
          output[1].textContent = getServerData.message;
        }else {
        output[0].textContent = `Пользователь ${getServerData.name} успешно авторизован`;
        output[1].textContent = `Пользователь ${getServerData.name} успешно зарегистрирован`;
        }        
      }
    }catch (err){        
      console.log('​}catch -> error.message', error.message);
    }
  } 
  if(check.hasAttribute('checked')){
       
    localStorage.setItem('email', `${emailValue.value}`);
    localStorage.setItem('password', `${passValue.value}`);
  }else {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }   
}


function showLocatData() {
  if(localStorage.email === undefined || localStorage.email === undefined ){  
    emailValue.value = '';
    passValue.value = '';  
  }else {  
   emailValue.value = localStorage.email;
   passValue.value = localStorage.password;
  }
}
check.addEventListener('change', addChechked)
function addChechked(){
  if(check.hasAttribute('checked')){
    check.removeAttribute('checked')
  }else {
    check.setAttribute('checked', 'true')
  }
}  
  
   
   



