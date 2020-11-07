document.addEventListener('DOMContentLoaded', function (event) {
  const pressTitle = document.querySelector('.press-title'),
    nameColor = document.querySelector('.name-color'),
    nameColorHex = document.querySelector('.name-color-hex');
  let keyUp = 1;

  document.addEventListener('keydown', function (event) {
    if (event.code == 'Space' && keyUp) changeBackgroundColor();
  });

  document.addEventListener('keyup', function (event) {
    if (event.code == 'Space') keyUp = 1;
  });

  function getRandom() {
    return Math.floor(Math.random() * 255);
  }

  const changeBackgroundColor = function () {
    let r, g, b, rgb, rHex, gHex, bHex;

    r = getRandom();
    rHex = r.toString(16).toUpperCase();
    if (rHex.length === 1) rHex = '0' + rHex;
    g = getRandom();
    gHex = g.toString(16).toUpperCase();
    if (gHex.length === 1) gHex = '0' + gHex;
    b = getRandom();
    bHex = b.toString(16).toUpperCase();
    if (bHex.length === 1) bHex = '0' + bHex;

    nameColor.textContent = '( ' + r + ', ' + g + ', ' + b + ' )';
    nameColorHex.textContent = '# ' + rHex + ' ' + gHex + ' ' + bHex;
    rgb = 'rgb' + nameColor.textContent;
    document.body.style.backgroundColor = rgb;
    if (r < 150 && g < 150 && b < 150) {
      pressTitle.style.color = nameColor.style.color = nameColorHex.style.color = 'white';
    } else {
      pressTitle.style.color = nameColor.style.color = nameColorHex.style.color = 'black';
    }
    keyUp = 0;
  };
});
