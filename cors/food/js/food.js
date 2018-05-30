'use strict';

loadData('https://neto-api.herokuapp.com/food/42')
.then(foodData)
.then(loadData)
.then(raitingData)
.then(loadData)
.then(userData)

function loadData(url){
  const callbackName = 'callback' + parseInt(Math.random() * ( 50- 1) + 1);
  return new Promise((done, fail) => {
    window[callbackName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${callbackName}`;
    document.body.appendChild(script)
  });
}

function foodData(data){
document.querySelector('[data-pic]').style= `background-image: url(${data.pic})`;
document.querySelector('[data-title]').textContent = data.title;
document.querySelector('[data-ingredients]').textContent = data.ingredients.join(',');


return `https://neto-api.herokuapp.com/food/42/rating`;
}

function raitingData(data){
document.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
document.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
document.querySelector('[data-star]').style = `width: ${data.rating.toFixed(2) * 10}%`;

return `https://neto-api.herokuapp.com/food/42/consumers`

}

function userData(data){
  document.querySelector('[data-consumers]').innerHTML = '';
  data.consumers.forEach(el => {
  document.querySelector('[data-consumers]').innerHTML += `<img src=${el.pic} title=${el.name}>`;
  })
  const span = document.createElement('span');
  span.textContent = `(+${data.total - data.consumers.length})`
  document.querySelector('[data-consumers]').appendChild(span);
}

