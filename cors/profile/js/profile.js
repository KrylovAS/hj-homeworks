'use strict';
//loadData('')

function loadData(url){
  const functionName = 'callback' + parseInt(Math.random() * (50 - 1) + 1);  
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;    
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
  const badgescard = document.getElementsByClassName('badgescard')[0];
  document.getElementsByClassName('content')[0].style.display = 'initial';
  badgescard.innerHTML = '';  
  data.forEach(el => {
    badgescard.innerHTML += `<span class="devicons devicons-${el}"></span>`  
  });  
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(profileData)
  .then(loadData)
  .then(technologiesData)
  .catch(err => console.log(err))