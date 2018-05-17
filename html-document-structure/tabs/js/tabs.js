'use strict';

const tabs = document.querySelector('.tabs-nav li');
const tabsNav = document.querySelector('.tabs-nav');
const tabsContent = document.querySelector('.tabs-content');

tabs.parentNode.removeChild(tabs);

for(let key of tabsContent.children){   
  const tabsCopy = tabs.cloneNode(true);  
  tabsCopy.firstElementChild.classList.add(`${key.dataset.tabIcon}`);
  tabsCopy.firstElementChild.textContent = `${key.dataset.tabTitle}`; 
  tabsNav.innerHTML += tabsCopy.outerHTML;
}

const tabsList = document.querySelectorAll('.tabs-nav li');
tabsNav.firstElementChild.classList.add('ui-tabs-active');

changeContent(tabsNav.firstElementChild);

for(let key of tabsList){
  key.addEventListener('click', checkTab);
}

function checkTab() {  
  if(this.classList.contains('ui-tabs-active')) return;
  for(let key of tabsList){
    key.classList.remove('ui-tabs-active');    
  }
  this.classList.add('ui-tabs-active');  
  changeContent(this);
}

function changeContent(currientTab) {
  for (let key of tabsContent.children) {
    key.classList.add('hidden');
  }  
  let activeTab = Array.from(tabsContent.children).find(el => el.dataset.tabTitle === currientTab.firstElementChild.textContent);
  activeTab.classList.remove('hidden');
}

