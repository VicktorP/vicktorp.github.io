let userName, userAge;
let welcome16, welcome40, welcome41, welcomeError;

userName = prompt('Ведите ваше имя', '');
userAge = prompt('Сколько вам лет', '');

welcome16 = `Привет, ${userName}! Вы подросток!`;
welcome40 = `Привет, ${userName}! Вы молодой человек`;
welcome41 = `Привет, ${userName}! Вы старичок`;
welcomeError = `Введен неправильный возраст`;

if (userName === null) {
  alert('Не стесняемся, знакомимся. Пробуем снова');
} else if (userAge === null) {
  alert('Ввести возраст таки надо. Пробуем снова');
} else if (isNaN(+userAge)) {
  alert('Возраст это число. Пробуем снова');
} else {
  alert(
    userAge < 0 ? welcomeError : userAge <= 16 ? welcome16 : userAge <= 40 ? welcome40 : welcome41
  );
}
