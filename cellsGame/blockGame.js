//количество строк в таблице
let row = document.querySelector('.row');
//количество столбцов в таблице
let col = document.querySelector('.column');
let btn = document.querySelector('.button');
let table = document.querySelector('.table');
//массив с координатами для проверки
let checkArr = [];
//массив с блоками
let blockCells;
let upCell, downCell, leftCell, rightCell, checking;

//генерация случайной масти
const sign = () => {
  let text;
  let rand = Math.floor(Math.random() * 4) + 1;
  switch (rand) {
    case 1:
      text = '&#9824;';
      break;
    case 2:
      text = '&#9827;';
      break;
    case 3:
      text = '&#9826;';
      break;
    case 4:
      text = '&#9825;';
      break;
  }
  return text;
}

//создание таблицы сразу с заполнением ячеек картами и присваиванием адреса в data-number
btn.addEventListener('click', function() {
  table.innerHTML = "";
  let rowValue = row.value;
  let colValue = col.value;

  for (let i = 0; i < rowValue; i++) {
    let content = '';
    let tr = document.createElement("tr");
    for (let j = 0; j < colValue; j++) {
      td = document.createElement("td");
      td.classList.add('block');
      td.innerHTML = `${sign()}`;
      td.setAttribute('data-number', ( (i + 1) * 10) + (j + 1) );
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
});

const checkNear = (arr) => {

  if (checkArr) {

    let elem = checkArr[0];
    checking = arr.find(el => el.dataset.number === elem).textContent;
    checkArr.shift();
    //проверка клика по пустой ячейке
    if (checking == '') {
      checkNear(blockCells);
    }

    //получение координат соседей
    upCell = parseInt(elem, 10) - 10;
    downCell = parseInt(elem, 10) + 10;
    leftCell = parseInt(elem, 10) - 1;
    rightCell = parseInt(elem, 10) + 1;    

    //проверка существует ли такая ячейка + совпадают ли карты
    const nearAdress = (cell) => {
      if (  arr.find(el => el.dataset.number === `${cell}`) && 
      arr.find(el => el.dataset.number === `${cell}`).textContent === checking ) {
      checkArr.push(`${cell}`);}
    }

    nearAdress(upCell);
    nearAdress(downCell);
    nearAdress(leftCell);
    nearAdress(rightCell);

    arr.find(el => el.dataset.number == elem).textContent = '';
    arr.find(el => el.dataset.number == elem).classList.add('complete');

    checkNear(blockCells);

  } else return

}

table.addEventListener('click', function(event) {
  blockCells = document.querySelectorAll('.block');
  //очистка от предыдущего выделения
  blockCells.forEach(el => el.classList.remove('selected'));
  blockCells.forEach(el => el.classList.remove('complete'));
  //выделение нажатой ячейки
  event.target.classList.add('selected');
  //занесение координат нажатой ячейки в массив для дальнейшей работы
  checkArr.push(event.target.dataset.number);
  blockCells = Array.from(blockCells);

  checkNear(blockCells);  
});
