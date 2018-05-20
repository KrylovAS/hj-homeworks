'use strict';
const sliderNav = document.querySelectorAll('.slider-nav a');
const prevBtn = document.querySelector('a[data-action="prev"]');
const nextBtn = document.querySelector('a[data-action="next"]');
const firstBtn = document.querySelector('a[data-action="first"]');
const lastBtn = document.querySelector('a[data-action="last"]');
const slide = document.getElementsByClassName('slide');
const slideList = document.querySelector('.slides')
const currentSlide = document.querySelector('.slide-current');

slide[0].classList.add('slide-current');
prevBtn.classList.add('disabled');
firstBtn.classList.add('disabled');

for(let key of sliderNav){ 
 key.addEventListener('click', checkAccessibility)
}

function checkAccessibility(){ 
  if(!this.classList.contains('disabled')){
    switch(this){
      case nextBtn:
      changeSlide(true);
      break;
      case prevBtn:
      changeSlide(false);
      break;
      case lastBtn:
      deleteCurrentClass();
      slideList.lastElementChild.classList.add('slide-current');
      prevBtn.classList.remove('disabled');
      firstBtn.classList.remove('disabled');
      nextBtn.classList.add('disabled');
      lastBtn.classList.add('disabled');
      break;
      case firstBtn:
      deleteCurrentClass();
      slideList.firstElementChild.classList.add('slide-current');    
      nextBtn.classList.remove('disabled');
      lastBtn.classList.remove('disabled');
      prevBtn.classList.add('disabled');
      firstBtn.classList.add('disabled');
      break;
    }
  }
  function deleteCurrentClass() {
    for (let key of slide) {
      key.classList.remove('slide-current');
    }
  }
}
function changeSlide(click) {
    const currentSlide = document.querySelector('.slide-current');
    const showSlide = click? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    currentSlide.classList.remove('slide-current');
    showSlide.classList.add('slide-current');       
    showSlide.nextElementSibling ? nextBtn.classList.remove('disabled') || lastBtn.classList.remove('disabled') : nextBtn.classList.add('disabled') || lastBtn.classList.add('disabled');
    showSlide.previousElementSibling ? prevBtn.classList.remove('disabled') || firstBtn.classList.remove('disabled') : prevBtn.classList.add('disabled') || firstBtn.classList.add('disabled');
    
}













