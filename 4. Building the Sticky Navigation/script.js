'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'we use cookie for improved functionality and analytics.<button class = "btn">Got it!</button>';

// header.append(message);

// message.style.backgroundColor='#37383d';
// message.style.width  = '120%';
// console.log(getComputedStyle(message).height);
// message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary','orangered');
const btnscrollto = document.querySelector('.btn--scroll-to');
const  section1 = document.querySelector('#section--1');

btnscrollto.addEventListener('click',function(e){
  const s1coord = section1.getBoundingClientRect();
  console.log(s1coord);
  console.log(e.target.getBoundingClientRect());

  // window.scrollTo(s1coord.left + window.pageXOffset, s1coord.top + window.pageYOffset);
  // window.scrollTo({
  //   left:s1coord.left + window.pageXOffset,
  //   top : s1coord.top + window.pageYOffset,
  //   behavior:'smooth',
  // })
  section1.scrollIntoView({behavior:'smooth'});

//   const h1 = document.querySelector('h1');
//   h1.addEventListener('mouseenter',function(e){
//     alert('addEventListener: Great! You are reading the heading');
//   })
})

const navlink = document.querySelector('.nav__link');

const randomInt = (min,max) =>
  Math.floor(Math.random() * (max-min+1) + min);
const randomColor = () =>
  `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
// });

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior:'smooth'
    });
  }
})

const tab = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabcontainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(e.target);

  if(!clicked){
    return;
  }
  tab.forEach(t=>t.classList.remove('operations__tab--active'));
  tabContent.forEach(c=>c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');


  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).
  classList.add('operations__content--active');


})

const hover = function(e,opacity){
  // console.log('test');
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    console.log(this)
    const sibling = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(e1=>{
      if(e1!==link){
           e1.style.opacity = this;
      }
    })
    logo.style.opacity = this;
  }
}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover',hover.bind(0.5));
nav.addEventListener('mouseout',hover.bind(1));

// const initialcoord = section1.getBoundingClientRect();

// window.addEventListener('scroll',function(){
//   if(window.scrollY > initialcoord.top){
//     nav.classList.add('sticky');
//   }else{
//     nav.classList.remove('sticky');
//   }
// })





///////////////////////////
// sticky nav 
/////////////////////////
const navHeight = nav.getBoundingClientRect().height;
const stickynav = function(entries,e){
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) {
    nav.classList.add('sticky');  
  }else{
    nav.classList.remove('sticky');
  }
}

const headerobserver = new IntersectionObserver(
stickynav , {
  root:null,
  threshold : 0.5,
  rootMargin : `-${navHeight}px`,
});
headerobserver.observe(header);

