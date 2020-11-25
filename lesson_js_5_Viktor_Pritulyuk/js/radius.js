document.addEventListener('DOMContentLoaded', function () {
  // debugger;
  const numberLeftTop = document.querySelector('.number-left-top');
  const inputLeftTop = document.querySelector('.input-left-top');
  const radioLeftTop = document.querySelectorAll('input[name=left-top-choice]');
  const numberRightTop = document.querySelector('.number-right-top');
  const inputRightTop = document.querySelector('.input-right-top');
  const radioRightTop = document.querySelectorAll('input[name=right-top-choice]');
  const numberLeftBottom = document.querySelector('.number-left-bottom');
  const inputLeftBottom = document.querySelector('.input-left-bottom');
  const radioLeftBottom = document.querySelectorAll('input[name=left-bottom-choice]');
  const numberRightBottom = document.querySelector('.number-right-bottom');
  const inputRightBottom = document.querySelector('.input-right-bottom');
  const radioRightBottom = document.querySelectorAll('input[name=right-bottom-choice]');
  const output = document.querySelector('.output');
  const textToCopy = document.querySelector('.text-to-copy');
  const copyText = document.querySelector('.copy-text');

  let leftTop = 0,
    leftBottom = 0,
    rightTop = 0,
    rightBottom = 0;

  numberLeftTop.addEventListener('input', setRadiusLeftTop);
  inputLeftTop.addEventListener('input', setRadiusLeftTop);
  numberRightTop.addEventListener('input', setRadiusRightTop);
  inputRightTop.addEventListener('input', setRadiusRightTop);
  numberLeftBottom.addEventListener('input', setRadiusLeftBottom);
  inputLeftBottom.addEventListener('input', setRadiusLeftBottom);
  numberRightBottom.addEventListener('input', setRadiusRightBottom);
  inputRightBottom.addEventListener('input', setRadiusRightBottom);

  function setRadiusLeftTop(event) {
    if (event.target.type == 'number') {
      inputLeftTop.value = numberLeftTop.value;
    } else numberLeftTop.value = inputLeftTop.value;
    leftTop = output.style.borderTopLeftRadius =
      numberLeftTop.value +
      (radioLeftTop[0].checked ? radioLeftTop[0].value : radioLeftTop[1].value);
    writeText();
  }

  function setRadiusRightTop(event) {
    if (event.target.type == 'number') {
      inputRightTop.value = numberRightTop.value;
    } else numberRightTop.value = inputRightTop.value;
    rightTop = output.style.borderTopRightRadius =
      numberRightTop.value +
      (radioRightTop[0].checked ? radioRightTop[0].value : radioRightTop[1].value);
    writeText();
  }

  function setRadiusLeftBottom(event) {
    if (event.target.type == 'number') {
      inputLeftBottom.value = numberLeftBottom.value;
    } else numberLeftBottom.value = inputLeftBottom.value;
    leftBottom = output.style.borderBottomLeftRadius =
      numberLeftBottom.value +
      (radioLeftBottom[0].checked ? radioLeftBottom[0].value : radioLeftBottom[1].value);
    writeText();
  }

  function setRadiusRightBottom(event) {
    if (event.target.type == 'number') {
      inputRightBottom.value = numberRightBottom.value;
    } else numberRightBottom.value = inputRightBottom.value;
    rightBottom = output.style.borderBottomRightRadius =
      numberRightBottom.value +
      (radioRightBottom[0].checked ? radioRightBottom[0].value : radioRightBottom[1].value);
    writeText();
  }

  function writeText() {
    if (
      parseInt(leftTop) == parseInt(leftBottom) &&
      parseInt(leftTop) == parseInt(leftBottom) &&
      parseInt(leftTop) == parseInt(rightTop) &&
      parseInt(leftTop) == parseInt(rightBottom)
    ) {
      textToCopy.innerHTML = `-webkit-border-radius: ${leftBottom};
-moz-border-radius: ${leftBottom};
border-radius: ${leftBottom};`;
    } else {
      textToCopy.innerHTML = `-webkit-border-radius: ${leftTop} ${rightTop} ${leftBottom} ${rightBottom};
-moz-border-radius: ${leftTop} ${rightTop} ${leftBottom} ${rightBottom};
border-radius: ${leftTop} ${rightTop} ${leftBottom} ${rightBottom};`;
    }
  }

  copyText.addEventListener('click', function () {
    textToCopy.select();
    document.execCommand('copy');
  });
});
