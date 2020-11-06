document.addEventListener('DOMContentLoaded', function (event) {
  const pressTitle = document.querySelector('.press-title'),
    nameColor = document.querySelector('.name-color');

  document.addEventListener('keydown', function (event) {
    if (event.code == 'Space') changeBackgroundColor();
  });

  function getRandom() {
    return Math.floor(Math.random() * 255);
  }

  let r, g, b, rgb;
  r = g = b = 255;
  nameColor.textContent = '( ' + r + ', ' + g + ', ' + b + ' )';

  const changeBackgroundColor = function () {
    r = getRandom();
    g = getRandom();
    b = getRandom();
    nameColor.textContent = '( ' + r + ', ' + g + ', ' + b + ' )';
    rgb = 'rgb' + nameColor.textContent;
    document.body.style.backgroundColor = rgb;
    if (r < 127 && g < 127 && b < 127) {
      pressTitle.style.color = nameColor.style.color = 'white';
    } else {
      pressTitle.style.color = nameColor.style.color = 'black';
    }
  };
});
