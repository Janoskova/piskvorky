'use strict';

console.log('Javascript funguje');

let tah = 'circle';
const hrac = document.querySelector('#hrac');

const showSymbol = (event) => {
  if (tah === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.disabled = true;
    isWinningMove(event.target);
    hrac.src = 'obrazky/cross.svg';
    hrac.alt = 'křížek';
    tah = 'cross';
  } else {
    event.target.classList.add('board__field--cross');
    event.target.disabled = true;
    isWinningMove(event.target);
    hrac.src = 'obrazky/circle.svg';
    hrac.alt = 'kroužek';
    tah = 'circle';
  }
};

const fields = document.querySelectorAll('.hra--policko');
for (let i = 0; i < fields.length; i += 1) {
  fields[i].addEventListener('click', showSymbol);
}

//Přichystej funkci, getSymbol(field), která pro políčko s křížkem vrátí řetězec 'cross', pro kroužek 'circle' a pro neobsazené políčko hodnotu undefined.
const getSymbol = (field) => {
  if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else if (field.classList.contains('board__field--cross')) {
    return 'cross';
  }
};

//Napiš funkci getField(row, column), která pro číslo řádku a sloupce vrátí příslušný prvek.

const getField = (row, column) => {
  const result = row.toString() + column.toString();
  return fields[Number(result)];
};

//Napiš funkci getPosition(field), která naopak pro dané políčko vrátí objekt s číslem řádku a sloupce. Pro levé horní políčko vrať {row: 0, column: 0}, pro pravé dolní {row: 9, column: 9}, pro levé dolní {row: 9, column: 0}, …

const boardSize = 10;
const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

// Vytvoř funkci isWinningMove(field), která se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false.

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    // return true;
    if (confirm(`Vyhrál ${hrac.alt}. Spustit novou hru?`)) {
      window.location.reload();
    }
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    // return true;
    if (confirm(`Vyhrál ${hrac.alt}. Spustit novou hru?`)) {
      window.location.reload();
    }
  }

  // return false;
};
