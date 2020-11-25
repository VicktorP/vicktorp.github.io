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

  let telInput = document.querySelector('.telephone');
  var im = new Inputmask('+38 (099)-999-99-99');
  im.mask(telInput);

  new JustValidate('.js-form', {
    rules: {
      username: {
        required: true,
        minLength: 3,
      },
      useremail: {
        required: true,
        email: true,
      },
      usertel: {
        required: true,
      },
    },

    messages: {
      username: {
        minLength: 'ну че непонятного, вводи больше 2 символов',
        required: 'эээ, не стесняемся, пишем пишем, я ж не знаю как обратиться',
      },
      useremail: {
        email: 'чую на....короче обмануть ты меня хочешь, человечишко',
        required: 'эээ, не стесняемся, пишем пишем, спам не раскидываю',
      },
      usertel: {
        required: 'эээ, не стесняемся, пишем пишем, я ночью звонить не буду',
      },
    },

    submitHandler: function (form) {
      let xhr = new XMLHttpRequest();

      xhr.open('POST', 'php/mail.php', true);

      let formData = new FormData(form);

      xhr.addEventListener('load', function () {
        if (xhr.readyState === 4) {
          switch (xhr.status) {
            case 200:
              console.log('Форма отправлена');
              form.reset();
              break;
            case 404:
              console.log('Ничего не вышло');
              break;
            default:
              console.log('Error');
              break;
          }
        }
      });

      xhr.send(formData);
    },
  });
});
