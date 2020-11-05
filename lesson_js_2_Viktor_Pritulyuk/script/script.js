let arr = {
  rus: ['я', 'узнал', 'что', 'у', 'меня', 'есть', 'огромная', 'семья'],
  eng: ['I', "don't", 'know', 'what', 'need', 'to', 'write', 'here'],
};

const buttonRus = document.querySelector('.button-rus');
const buttonEng = document.querySelector('.button-eng');

let arraySortRus = function () {
  let arraySort = arr['rus'];
  for (let i = 0; i < arraySort.length; i++) {
    console.log(arraySort[i]);
  }
  return;
};

let arraySortEng = function () {
  let arraySort = arr['eng'];
  for (let i = 0; i < arraySort.length; i++) {
    console.log(arraySort[i]);
  }
  return;
};

buttonRus.addEventListener('click', arraySortRus);
buttonEng.addEventListener('click', arraySortEng);
