 'use strict';
function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
  window[functionName] = done;
  const script = document.createElement('script');
  script.src = `${url}?jsonp=${functionName}`;
  document.body.appendChild(script);
  });
}

function randName() {
  return 'callback' + parseInt(Math.random() * (50 - 1) + 1);  
}

function setData(data){
  console.log(data)
  document.getElementsByClassName('bg')[0].setAttribute('src', data.wallpaper);
  document.querySelector('[data-username]').textContent = data.username;
  document.querySelector('[data-description]').textContent = data.description;
  document.getElementsByClassName('avatar')[0].setAttribute('src', data.pic);
  document.querySelector('[data-tweets]').textContent = data.tweets;
  document.querySelector('[data-followers]').textContent = data.followers;
  document.querySelector('[data-following]').textContent = data.following;

}



 loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(setData)
