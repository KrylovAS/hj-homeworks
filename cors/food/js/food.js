'use strict';

Promise.all([loadData('https://neto-api.herokuapp.com/food/42'),
             loadData('https://neto-api.herokuapp.com/food/42/rating'),
             loadData('https://neto-api.herokuapp.com/food/42/consumers')])
.then(res => {
  [foodData(res[0]),
   raitingData(res[1]),
   userData(res[2])]    
})
.catch(err => console.log(err));

function loadData(url){
  const callbackName = 'callback' + parseInt(Math.random() * (50- 1) + 1);
  return new Promise((done, fail) => {
    window[callbackName] = done;    
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${callbackName}`;
    document.body.appendChild(script)
  });
}

function foodData(data){
document.querySelector('[data-pic]').style = `background-image: url(${data.pic})`;
document.querySelector('[data-title]').textContent = data.title;
document.querySelector('[data-ingredients]').textContent = data.ingredients.join(',');
}

function raitingData(data){
document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
document.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
document.querySelector('[data-star]').style = `width: ${data.rating.toFixed(2) * 10}%`;
}

function userData(data){
  const span = document.createElement('span');    
  data.consumers.forEach(user => {
    document.querySelector('[data-consumers]').appendChild(createUser(userTemplate(user)));    
  });
  span.textContent = `(+${data.total - data.consumers.length})`
  document.querySelector('[data-consumers]').appendChild(span);
}

function userTemplate(data) {
  return { tag: 'img', attr: {src: data.pic, title: data.name }}
}

function createUser(user) {  
  if ((user === undefined) || (user === null) || (user === false)) {
      return document.createTextNode('');
  }

  if ((typeof user === 'string') || (typeof user === 'number') || (user === true)) {
       return document.createTextNode(user);
  }

  if (Array.isArray(user)) {
    return user.reduce((f, elem) => {
      f.appendChild(createUser(elem));
        return f;
      }, document.createDocumentFragment());
  }

  const element = document.createElement(user.tag || 'div');
   
  if (user.attr) {
    Object.keys(user.attr)
          .forEach(key => element.setAttribute(key, user.attr[key]))
  }

  element.appendChild(createUser(user.content));

  return element;
}

