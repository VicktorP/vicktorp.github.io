document.addEventListener('DOMContentLoaded', function (event) {
  const inputTodo = document.querySelector('.input-todo');
  const dateTodoEnd = document.querySelector('.date-todo-end');
  const timeTodoEnd = document.querySelector('.time-todo-end');
  const btnAdd = document.querySelector('.btn-add');
  const errorMessage = document.querySelector('.error-message');
  const outputBlock = document.querySelector('.output-block');

  let todoArray = [];
  let dateTimeStart, dateTimeEnd, timeRest, timeColor;

  if (localStorage.ToDoList) {
    todoArray = JSON.parse(localStorage.getItem('ToDoList'));
  } else {
    todoArray = [];
  }

  // debugger;
  const createRow = function (elem, index) {
    return `
      <div class="output-row">
          <span class="output-cheking">${elem.status ? '<img src="./img/check.jpg" alt="check">' : ''}</span>
          <span class="output-numer">${index + 1}</span>
          <input class="output-todo-title" type="text" value="${elem.job}" data-index=${index} readonly />
          <input class="output-edit" type="button" value="&#9997" data-index=${index} />
          <span class="output-rest-time data-index=${index}"></span>
          <button class="button btn-done" data-index=${index}>Готово!</button>
          <button class="button btn-delete" data-index=${index}>Удалить</button>
        </div>
    `;
  };

  const showToDoList = function () {
    outputBlock.innerHTML = '';
    todoArray.forEach((elem, index) => {
      outputBlock.innerHTML += createRow(elem, index);
    });

    const btnDone = document.querySelectorAll('.btn-done');
    btnDone.forEach((elem) => {
      elem.addEventListener('click', todoDone);
    });

    const btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach((elem) => {
      elem.addEventListener('click', todoDelete);
    });

    const outputTodoTitle = document.querySelectorAll('.output-todo-title');

    function todoEdit() {
      if (outputTodoTitle[this.dataset.index].hasAttribute('readOnly')) {
        outputTodoTitle[this.dataset.index].removeAttribute('readOnly');
      } else {
        outputTodoTitle[this.dataset.index].setAttribute('readOnly', '');
        todoArray[this.dataset.index].job = outputTodoTitle[this.dataset.index].value;
        refreshLocaleStorage();
        showToDoList();
      }
    }

    const btnEdit = document.querySelectorAll('.output-edit');
    btnEdit.forEach((elem) => {
      elem.addEventListener('click', todoEdit);
    });

    const outputRestTime = document.querySelectorAll('.output-rest-time');
    outputRestTime.forEach(function(elem,index) {
      timeRest = 100 - Math.floor(100*( Date.parse(todoArray[index].dateTimeEnd) - Date.now() ) / ( Date.parse(todoArray[index].dateTimeEnd) - Date.parse(todoArray[index].dateTimeStart)));
      timeRest = timeRest<100 ? timeRest : 100;
      timeColor = timeRest>90 ? 8 : timeRest>80 ? 6 : timeRest>70 ? 4 : timeRest>60 ? 2 : 0;
      elem.style.backgroundPosition = `-${timeColor}0px -${timeRest}px`;
    });

  };

  function newJob(job, dateTimeStart, dateTimeEnd) {
    this.job = job;
    this.status = false;
    this.dateTimeStart = dateTimeStart;
    this.dateTimeEnd = dateTimeEnd;
  }

  dateTodoEnd.addEventListener('focusin', function () {
    dateTodoEnd.type = 'date';
  });
  dateTodoEnd.addEventListener('focusout', function () {
    if (dateTodoEnd.value == '') {
      dateTodoEnd.type = 'text';
    }
  });

  timeTodoEnd.addEventListener('focusin', function () {
    timeTodoEnd.type = 'time';
  });
  timeTodoEnd.addEventListener('focusout', function () {
    if (timeTodoEnd.value == '') {
      timeTodoEnd.type = 'text';
    }
  });

  const refreshLocaleStorage = function () {
    localStorage.setItem('ToDoList', JSON.stringify(todoArray));
  };

  showToDoList();

  btnAdd.addEventListener('click', function () {
    dateTimeStart = new Date();
    dateTimeEnd = dateTodoEnd.value + 'T' + timeTodoEnd.value;
    if (!inputTodo.value) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'А задания я тебе сам буду выдумывать что ли?';
    } else if (Date.parse(dateTimeEnd) <= Date.parse(dateTimeStart) || dateTodoEnd.value == '' || timeTodoEnd.value == '') {
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Ну началось, вводи нормальные дату и время, не балуйся';
    } else {
      todoArray.push(new newJob(inputTodo.value, dateTimeStart, dateTimeEnd));
      errorMessage.style.display = 'none';
    }
    refreshLocaleStorage();
    showToDoList();
    inputTodo.value = null;
    dateTodoEnd.value = null;
    timeTodoEnd.value = null;
  });

  function todoDone() {
    todoArray[this.dataset.index].status = !todoArray[this.dataset.index].status;
    refreshLocaleStorage();
    showToDoList();
  }

  function todoDelete() {
    todoArray.splice(this.dataset.index, 1);
    refreshLocaleStorage();
    showToDoList();
  }
});
