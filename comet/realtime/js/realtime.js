const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  let userData = JSON.parse(event.data);
  if (isFirst) {    
    userData.forEach(el => realtime.addData([Number(el.online)], el.time));  
    isFirst = false;
  } else {   
    realtime.removeData();
    realtime.addData([Number(userData.online)], userData.time);
  }
});

