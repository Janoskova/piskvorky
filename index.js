'use strict';

console.log('Javascript funguje');
let tah = 'circle';
const hrac = document.querySelector('#hrac');

const showSymbol = (event) => {
  if (tah === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
    hrac.src = 'obrazky/cross.svg';
    hrac.alt = 'křížek';
    tah = 'cross';
    console.log(tah);
  } else {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    hrac.src = 'obrazky/circle.svg';
    hrac.alt = 'kolecko';
    tah = 'circle';
    console.log(tah);
  }
};

const policko = document.querySelectorAll('.hra--policko');
for (let i = 0; i < policko.length; i += 1) {
  policko[i].addEventListener('click', showSymbol);
}
