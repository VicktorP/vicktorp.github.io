document.addEventListener("DOMContentLoaded", function () {
  const langShower        = document.querySelector("#language-shower");
  const langDownArrow     = document.querySelector("#language-dropdown-arrow");
  const langCheckWrapper  = document.querySelector("#languages-checker-wrapper");
  const langItems         = document.querySelectorAll(".js-language-select");
  const titleMyself       = document.querySelector("#skill-title-myself");
  const skillMyself       = document.querySelector("#skill-myself");
  const skillStress       = document.querySelector("#skill-stress");
  const skillTeamWork     = document.querySelector("#skill-team-work");
  const skillEnglish      = document.querySelector("#skill-english");
  const skillGoogle       = document.querySelector("#skill-google");
  const fullName          = document.querySelector("#my-full-name");
  const lastWork          = document.querySelector("#last-work");
  const lastWorkDesc      = document.querySelector("#last-work-description");
  const middleWork        = document.querySelector("#middle-work");
  const middleWorkDesc    = document.querySelector("#middle-work-description");
  const firstWork         = document.querySelector("#first-work");
  const firstWorkDesc     = document.querySelector("#first-work-description");
  const lastStudy         = document.querySelector("#last-study");
  const lastStudyDesc     = document.querySelector("#last-study-description");
  const middleStudy       = document.querySelector("#middle-study");
  const middleStudyDesc   = document.querySelector("#middle-study-description");
  const firstStudy        = document.querySelector("#first-study");
  const firstStudyDesc    = document.querySelector("#first-study-description");

  
  let selectedLanguage = "RU";
  let degree = 0;

  const changeShowLanguagesList = () => {
    langCheckWrapper.classList.toggle("js-over");
    degree += 180;
    langDownArrow.style.transform = `rotate(${degree}deg)`;
  }

  const replaceLanguage = (event) => {
    selectedLanguage = event.target.innerText; 
    langShower.innerText = selectedLanguage;
    langCheckWrapper.classList.add("js-over");
    degree += 180;
    langDownArrow.style.transform = `rotate(${degree}deg)`;
    renderCVV(selectedLanguage);
  }

  langItems.forEach( lang => lang.addEventListener("click", replaceLanguage));

  langDownArrow.addEventListener("click", changeShowLanguagesList);

  langShower.addEventListener("click", changeShowLanguagesList);
  
  const renderCVV = (lang) => {
    titleMyself.textContent     = data[lang].titleMyself;
    skillMyself.textContent     = data[lang].myself;
    skillStress.textContent     = data[lang].stress;
    skillTeamWork.textContent   = data[lang].teamWork;
    skillEnglish.textContent    = data[lang].english;
    skillGoogle.textContent     = data[lang].google;
    fullName.textContent        = data[lang].fullname;
    lastWork.textContent        = data[lang].experience[0].company;
    lastWorkDesc.textContent    = data[lang].experience[0].about;
    middleWork.textContent      = data[lang].experience[1].company;
    middleWorkDesc.textContent  = data[lang].experience[1].about;
    firstWork.textContent       = data[lang].experience[2].company;
    firstWorkDesc.textContent   = data[lang].experience[2].about;
    lastStudy.textContent       = data[lang].education[0].school;
    lastStudyDesc.textContent   = data[lang].education[0].about;
    middleStudy.textContent     = data[lang].education[1].school;
    middleStudyDesc.textContent = data[lang].education[1].about;
    firstStudy.textContent      = data[lang].education[2].school;
    firstStudyDesc.textContent  = data[lang].education[2].about;
  }

});