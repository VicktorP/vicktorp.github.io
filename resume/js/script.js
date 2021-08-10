document.addEventListener("DOMContentLoaded", function () {
  const cvvData           = document.querySelector("#cvv-data");
  const langShower        = document.querySelector("#language-shower");
  const langDownArrow     = document.querySelector("#language-dropdown-arrow");
  const langCheckWrapper  = document.querySelector("#languages-checker-wrapper");
  const langItems         = document.querySelectorAll(".js-language-select");
  const stress            = document.querySelector("#skill-stress");
  const sociability       = document.querySelector("#skill-sociability");
  const organization      = document.querySelector("#skill-organization");
  const titleLanguages    = document.querySelector("#skill-title-languages");
  const languageUkr       = document.querySelector("#skill-language-ukr");
  const languageRus       = document.querySelector("#skill-language-rus");
  const languageEng       = document.querySelector("#skill-language-eng");

  
  
  let selectedLanguage = "ENG";
  let degree = 0;

  const renderStageInfo = (stage) => {
    let stageHTML = "";
    for (let i = 0; i < stage.length; i++) {
      stageHTML += `
        <div class="stage-info">
          <h3 class="job-title">${stage[i].position}</h3>
          <p class="stage-date">${stage[i].date}</p>
          <p class="stage-place">${stage[i].company}</p>
        `;
      if (stage[i].duties) {
        stageHTML += `
              <ul class="job-duties">
              <li class="duty-item">${stage[i].duties[0]}</li>
              <li class="duty-item">${stage[i].duties[1]}</li>
              <li class="duty-item">${stage[i].duties[2]}</li>
            </ul>
          </div>
        `;
      } else if (stage[i].description) {
        stageHTML += `
            <p class="study-description">${stage[i].description}</p>
          </div>
        `;
      }    
    }
    return stageHTML;
  }

  const renderCVV = (lang) => {
    stress.innerText = data[lang].stress;
    sociability.innerText = data[lang].sociability;
    organization.innerText = data[lang].organization;
    titleLanguages.innerText = data[lang].skillLanguages;
    languageUkr.innerText = data[lang].languageUkr;
    languageRus.innerText = data[lang].languageRus;
    languageEng.innerText = data[lang].languageEng;

    cvvData.innerHTML = `
      <section class="section-title">
        <h1 class="my-title">${data[lang].fullname}</h1>
        <p class="job-title">Front-end web developer junior</p>
        <p class="my-mission">${data[lang].myMission}</p>
      </section>
      <section class="section-stage">
        <h2 class="stage-title">${data[lang].myExperience}</h2>
        ${renderStageInfo(data[lang].experience)}
      </section>
      <section class="section-stage">
        <h2 class="stage-title">${data[lang].myEducation}</h2>
        ${renderStageInfo(data[lang].education)}
      </section>
    `;
  }

  renderCVV(selectedLanguage);

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


});