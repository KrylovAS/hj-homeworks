'use strict';

function handleTableClick(event) {
  let nodeTh = Array
                    .from(document.getElementsByClassName('prop__name'))
                    .find(el => el === event.target);  

  if(event.target !== nodeTh ) return;

  event.currentTarget.dataset.sortBy = event.target.dataset.propName;  
  event.target.dataset.dir;   
  (event.target.dataset.dir > 0)? event.target.dataset.dir = -1 : event.target.dataset.dir = 1;

  sortTable(event.target.dataset.propName, event.target.dataset.dir );
 }


