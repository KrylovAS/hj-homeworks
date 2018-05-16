'use strict';
const sliderNav = document.querySelectorAll('.slider-nav a');
const prevBtn = document.querySelector('a[data-action="prev"]');
const nextBtn = document.querySelector('a[data-action="next"]');
const firstBtn = document.querySelector('a[data-action="first"]');
const lastBtn = document.querySelector('a[data-action="last"]');
const slide = document.getElementsByClassName('slide');
const slideList = document.querySelector('.slides')
console.log(slideList)
slide[0].classList.add('slide-current');
prevBtn.classList.add('disabled');
firstBtn.classList.add('disabled');

for(let key of sliderNav){ 
 key.addEventListener('click', checkStatus)
}

function checkStatus(){ 
  if(!this.classList.contains('disabled') && this === nextBtn) {
    chanchSlide('next')
  }else if(!this.classList.contains('disabled') && this === prevBtn) {
    chanchSlide('prev')
  }else if(!this.classList.contains('disabled') && this === lastBtn){
    for(let key of slide){
      key.classList.remove('slide-current')
    }
    slideList.lastElementChild.classList.add('slide-current')
    prevBtn.classList.remove('disabled') || firstBtn.classList.remove('disabled')
    nextBtn.classList.add('disabled') || lastBtn.classList.add('disabled')
    console.log(slideList)
  }else if(!this.classList.contains('disabled') && this === firstBtn){
    for(let key of slide){
      key.classList.remove('slide-current')
    }
    slideList.firstElementChild.classList.add('slide-current')
    console.log(slideList.firstElementChild)
    console.log(slideList)
    //slideList.lastElementChild.classList.remove('slide-current')
    nextBtn.classList.remove('disabled') || lastBtn.classList.remove('disabled')
    prevBtn.classList.add('disabled') || firstBtn.classList.add('disabled')
    
  }
}
function chanchSlide(click) {
    const currentSlide = document.querySelector('.slide-current');
    const showSlide = (click === 'next')? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
    currentSlide.classList.remove('slide-current');
    showSlide.classList.add('slide-current');    
      
    showSlide.nextElementSibling ? nextBtn.classList.remove('disabled') || lastBtn.classList.remove('disabled') : nextBtn.classList.add('disabled') || lastBtn.classList.add('disabled');
    showSlide.previousElementSibling ? prevBtn.classList.remove('disabled') || firstBtn.classList.remove('disabled') : prevBtn.classList.add('disabled') || firstBtn.classList.add('disabled');
    console.log(slideList)
}













