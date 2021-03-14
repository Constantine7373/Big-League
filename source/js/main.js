const pageBody = document.querySelector('.main-body');
const loader = document.querySelector('.loader');
const loaderBtn = document.querySelector('.loader__continue');
const menuBtn = document.querySelector('.main-nav__menu-btn');
const mainNav = document.querySelector('.main-nav__list');
const mainIntro = document.querySelector('.main-intro');
// Работа с лоадером
let loaderClose = (e) => {
  e.preventDefault();
  if ((e.key && e.key === 'Enter') || e.type === 'click') {
    loader.classList.add('hide');
    loader.setAttribute('tabindex', '-1');
    pageBody.classList.remove('main-body--ready');
    pageBody.classList.add('main-body--animate');
    window.removeEventListener('keypress', loaderClose);
  }
}
// Имитируем загрузку страницы
let pageLoading = setTimeout(() => {
  pageBody.classList.add('main-body--ready');
  if (document.body.clientWidth <= 1024) {
    loader.addEventListener('click', loaderClose);
    loaderBtn.innerText = 'Кликните на экран';
  } else {
    window.addEventListener('keypress', loaderClose);
    loaderBtn.addEventListener('click', loaderClose);
  }
}, 1000);
// ----------------
// Работа с мобильным меню
const preventScroll = (e) => {
  e.preventDefault();
}
menuBtn.addEventListener('click', () => {
  let expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
  if (expanded) {
    document.addEventListener('scroll', preventScroll);
  } else {
    document.removeEventListener('scroll', preventScroll);
  }
  menuBtn.setAttribute('aria-expanded', !expanded);
  menuBtn.classList.toggle('active');
  mainNav.classList.toggle('active');
});
// ------------------
// Работа с блоком интро
if (document.body.clientWidth <= 1024) {
  let clickCounts = 0;
  mainIntro.addEventListener('click', () => {
    mainIntro.classList.add('active');
    clickCounts += 1;
    if (clickCounts >= 2) {
      mainIntro.classList.add('doubleclicked');
    };
  });
}
// -----------------------
