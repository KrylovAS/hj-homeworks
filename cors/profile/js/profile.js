'use strict';
loadData('https://neto-api.herokuapp.com/profile/me')
  .then(profileData)
  .then(loadData)
  .then(technologiesData)
  .catch(err => console.log(err))

function loadData(url){
  const callbackName = 'callback' + parseInt(Math.random() * (50 - 1) + 1);  
  return new Promise((done, fail) => {
    window[callbackName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${callbackName}`;    
    document.body.appendChild(script);
    });
}

function profileData(data) {  
  document.querySelector('[data-name]').textContent = data.name;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-position]').textContent = data.position;

  return `https://neto-api.herokuapp.com/profile/${data.id}/technologies`; 
}

function technologiesData(data){  
  let  badgescard = document.getElementsByClassName('badgescard')[0];
  document.getElementsByClassName('content')[0].style = 'display: initial';    
  data.forEach(user => {
    badgescard.appendChild(createTech(createTamplate(user)));     
  });
}

function createTamplate(techData){
  return { tag: 'span', cls: ['devicons', `devicons-${techData}`]}
}

function createTech(data) {  
  if (!data) {
      return document.createTextNode('');
  }

  if ((typeof data === 'string') || (typeof data === 'number') || (data === true)) {
    return document.createTextNode(data);
  }

  if (Array.isArray(data)) {
    return data.reduce((f, elem) => {
      f.appendChild(createTech(elem));
      return f;
    }, document.createDocumentFragment());
   }

   const element = document.createElement(data.tag || 'div');
   [].concat(data.cls || [])
       .forEach(className => element.classList.add(className));   

   element.appendChild(createTech(data.content));

   return element;
}


