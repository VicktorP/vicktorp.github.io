document.addEventListener('DOMContentLoaded', function () {
  const tabSwitchArray = document.querySelectorAll('.tab__switch');
  const tabulators = document.querySelector('.tabulators');
  const tabArray = document.querySelectorAll('.tab');

  tabulators.addEventListener('click', function (event) {
    tabSwitchArray.forEach(function (elem) {
      elem.style.backgroundColor = '#ffffff';
    });
    tabSwitchArray[event.target.dataset.content].style.backgroundColor = 'rgb(201, 198, 198)';
    for (let i = 0; i < tabArray.length; i++) {
      if (i == event.target.dataset.content) {
        tabArray[i].classList.remove('content_din');
      } else {
        tabArray[i].classList.add('content_din');
      }
    }
  });
});
