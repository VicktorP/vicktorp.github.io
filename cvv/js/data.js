const data = {
  ENG: {
    stress: "Stress tolerance",
    sociability: "Sociability",
    organization: "Organization",
    skillLanguages: "Languages",
    languageUkr: "Ukrainian",
    languageRus: "Russian",
    languageEng: "English",
    fullName: "Viktor Prytuliuk",
    myMission: `Hello. <br /> 
                My goal is to find a new opportunity for growth as a specialist. I practice HTML5, CSS3, JavaScript. I am currently learning React. I live in the suburbs 
                of Kiev, but I am not tied to the city or region and is ready for relocation. Working for results in a team is important for me.`,
    myExperience: "Work Experience",
    myEducation: "Education",
    result: "About the results",
    experience: [
      {
        company: "Love Does (Center for Ukrainian Refugees, Warsaw)",
        position: "Volunteer Math teacher, Computer science, Programming",
        date: "01.2023 - today",
        duties: [
          "Teach mathematics (grades 5-8)",
          "Teach computer science (grades 5-8, 9-11)",
          "Teach programming (grades 9-11)"
        ],
        achieves: [
          "Repeated educational material for grades 5-6, conducting independent works",
          "Learning how a computer works, google services, MS Word & Excel",
          "Learning how a website works, what it includes and needs to work, html tags, layout principles, etc."
        ]
      }, {
        company: "EPAM (Laboratory)",
        position: "Front-end developer. Charity project",
        date: "09.2022 - today",
        duties: [
          "Work on Front-end part",
          "Work on the Scrum methodology",
          "Code rewiev of others developers"
        ],
        achieves: [
          "Completing tasks",
          "Reviewing pull requests",
          "Development project"
        ]
      }, {
        company: "SanWell - wholesale, distribution, import and export of sanitary products",
        position: "Marketing Manager",
        date: "10.2017 - 07.2020",
        duties: [
          "Stocked products for online store",
          "Planned and developed promotions",
          "Created content"
        ],
        achieves: [
          "Established better communication between departments",
          "Visual content passed my special selection, later the company used it to print its own catalogs",
          "Convinced the company's management that it is better to have a full-fledged photo-video studio and organized its work"
        ]
      }, {
        company: "SanWell - wholesale, distribution, import and export of sanitary products",
        position: "Head of the retail warehouse department",
        date: "05.2012 - 10.2017",
        duties: [
          "Ensured smooth operation of warehouse",
          "Warehouse accounting",
          "Team management, delegated tasks"
        ],
        achieves: [
          "Stopped a series of re-grading and shortages in the warehouse, brought the warehouse to 0 according to the results of inventory"
        ]
      }
    ],
    education: [
      {
        company: 'EPAM (Laboratory)',
        position: '"Front-end development"',
        date: "11.2021 - today",
        description: "Course JS, React, Angular, NodeJS"
      }, {
        company: 'IT School "Peace IT"',
        position: '"Front-end developer"',
        date: "09.2020 - 04.2021",
        description: "Graduated with honors"
      }, {
        company: 'Computer Academy "STEP"',
        position: '"Web development"',
        date: "04.2018 - 04.2019",
        description: ""
      }, {
        company: 'East Ukrainian National University. Vladimir Dahl',
        position: '"Automation and control systems"',
        date: "09.2000 - 06.2005",
        description: "Qualification - specialist"
      }
    ]
  },
  UKR: {
    stress: "Стрессостійкість",
    sociability: "Комунікабельність",
    organization: "Організованість",
    skillLanguages: "Мови",
    languageUkr: "Українська",
    languageRus: "Російська",
    languageEng: "Англійська",
    fullName: "Притулюк Віктор",
    myMission: `Добридень. <br /> 
                Моя мета - знайти нову можливість для зростання як фахівця. Я практикую HTML5, CSS3, JavaScript. В даний момент вивчаю React. Перебуваю зараз в 
                передмісті Києва, але до міста або області не прив'язаний і готовий до релокації. Для мене важлива робота на результат в команді.`,
    myExperience: "Досвід роботи",
    myEducation: "Освіта",
    result: "Коротко про результати",
    experience: [
      {
        company: "Love Does (Центр для біжанців з України, Варшава)",
        position: "Волонтер вчитель математики, інформатики, программування",
        date: "01.2023 - теперішній час",
        duties: [
          "Навчання математиці (5-8 класси)",
          "Навчання информатиці (5-8, 9-11 класси)",
          "Навчання програмуванню (9-11 класси)"
        ],
        achieves: [
          "Повторили матеріал за 5-6 класси, проводили самостійні роботи",
          "Вивчаєм роботу та склад комп'ютера, використання популярних сервісів Google та Microsoft",
          "Вивчаєм роботу та склад вебсайтів, html теги, принципи верстки, тощо"
        ]
      }, {
        company: "EPAM (Laboratory)",
        position: "Front-end розробник. Charity project",
        date: "09.2022 - теперішній час",
        duties: [
          "Робота із Front-end частиною сайту",
          "Работа за Scrum методологією",
          "Ревью кода інших розробників"
        ],
        achieves: [
          "Виконання завдань",
          "Пошук помилок у чужому коді та виправлення своїх",
          "Розвиток проекту"
        ]
      }, {
        company: "SanWell - оптова торгівля, дистрибуція, імпорт та експорт сантехнічної продукції",
        position: "Менеджер відділу маркетингу",
        date: "10.2017 - 07.2020",
        duties: [
          "Контроль наповнення інтернет-магазину компанії актуальною продукцією",
          "Планування і розробка рекламних акцій",
          "Пошук / створення / редагування контенту"
        ],
        achieves: [
          'Налагодив комунікацію з іншими відділами, щоб уникнути ситуацій "Ой нам терміново, ще на вчора"',
          "Візуальний контент проходив мій особливий відбір, пізніше компанія використовувала його для друку власних каталогів",
          "Переконав керівництво компанії, що краще мати свою повноцінну фото-відео-студію і організував її роботу"
        ]
      }, {
        company: "SanWell - оптова торгівля, дистрибуція, імпорт та експорт сантехнічної продукції",
        position: "Завідуючий роздрібним відділом складу",
        date: "05.2012 - 10.2017",
        duties: [
          "Забезпечення безперебійної роботи складу",
          "Ведення складського обліку",
          "Управління колективом, розподіл задач"
        ],
        achieves: [
          "Припинив низку пересортов і недостач на складі, вивів склад в постійний 0 за підсумками інвентаризації"
        ]
      }
    ],
    education: [
      {
        company: 'EPAM (Laboratory)',
        position: '"Front-end разработка"',
        date: "11.2021 - теперішній час",
        description: "Курс JS, React, Angular, NodeJS"
      }, {
        company: 'IT School "Peace IT"',
        position: '"Front-end розробник"',
        date: "09.2020 - 04.2021",
        description: "Закінчив з відзнакою"
      }, {
        company: `Комп'ютерна академія "КРОК"`,
        position: '"Web розробка"',
        date: "04.2018 - 04.2019",
        description: ""
      }, {
        company: 'Східноукраїнський Національный університет ім. Володимира Даля',
        position: '"Автоматика та системи управління"',
        date: "09.2000 - 06.2005",
        description: "Кваліфікація - спеціаліст"
      }
    ]
  },
  RU: {
    stress: "Стрессоустойчивость",
    sociability: "Коммуникабельность",
    organization: "Организованность",
    skillLanguages: "Языки",
    languageUkr: "Украинский",
    languageRus: "Русский",
    languageEng: "Английский",
    fullName: "Притулюк Виктор",
    myMission: `Здравствуйте. <br /> 
              Люблю цифры и логические задачи, а потому хочу найти работу где много логики и надо думать. Я практикую HTML5, CSS3, JavaScript. В данный момент изучаю React. 
              Проживаю в пригороде Киева, но к городу или области не привязан и готов к релокации.`,
    myExperience: "Опыт работы",
    myEducation: "Образование",
    result: "Кратко о результатах",
    experience: [
      {
        company: "Love Does (Центр для бежанцев из Украины, Варшава)",
        position: "Волонтер учитель математики, информатики, программирования",
        date: "01.2023 - настоящее время",
        duties: [
          "Обучение математике (5-8 классы)",
          "Обучение информатике (5-8, 9-11 классы)",
          "Обучение программированию (9-11 классы)"
        ],
        achieves: [
          "Повторили материал за 5-6 классы, проведение самостоятельных работ",
          "Изучаем работу и устройство компьютера, использование популярных сервисов Google и Microsoft",
          "Изучаем работу и устройство вебсайтов, html теги, принципы верстки, и т.д."
        ]
      }, {
        company: "EPAM (Laboratory)",
        position: "Front-end разработчик. Charity project",
        date: "09.2022 - настоящее время",
        duties: [
          "Работа с Front-end частью сайта",
          "Работа по Scrum методологии",
          "Ревью кода других разработчиков"
        ],
        achieves: [
          "Выполнение задач",
          "Нахождение ошибок в чужом коде и исправление своих",
          "Развитие проекта"
        ]
      }, {
        company: "SanWell - оптовая торговля, дистрибуция, импорт и экспорт сантехнической продукции",
        position: "Менеджер отдела маркетинга",
        date: "10.2017 - 07.2020",
        duties: [
          "Контроль наполнения интернет-магазина компании актуальной продукцией",
          "Планирование и разработка рекламных акций",
          "Поиск / создание / редактирование контента"
        ],
        achieves: [
          'Наладил коммуникацию с другими отделами во избежание ситуаций "Ой нам срочно, еще на вчера"',
          "Визуальный контент проходил мой особый отбор, позже компания использовала его для печати собственных каталогов",
          "Убедил руководство компании, что лучше иметь свою полноценную фото-видео-студию и организовал её работу "
        ]
      }, {
        company: "SanWell - оптовая торговля, дистрибуция, импорт и экспорт сантехнической продукции",
        position: "Заведующий розничным отделом склада",
        date: "05.2012 - 10.2017",
        duties: [
          "Обеспечение бесперебойной работы склада",
          "Ведение складского учета",
          "Управление коллективом, распределение задач"
        ],
        achieves: [
          "Прекратил череду пересортов и недостач на складе, вывел склад в постоянный 0 по итогам инвентаризации"
        ]
      }
    ],
    education: [
      {
        company: 'EPAM (Laboratory)',
        position: '"Front-end разработка"',
        date: "11.2021 - настоящее время",
        description: "Курс JS, React, Angular, NodeJS"
      }, {
        company: 'IT School "Peace IT"',
        position: '"Front-end разработчик"',
        date: "09.2020 - 04.2021",
        description: "Закончил с отличием"
      }, {
        company: 'Компьютерная академия "ШАГ"',
        position: '"Web разработка"',
        date: "04.2018 - 04.2019",
        description: ""
      }, {
        company: 'Восточноукраинский Национальный университет им. Владимира Даля',
        position: '"Автоматика и системы управления"',
        date: "09.2000 - 06.2005",
        description: "квалификация - специалист"
      }
    ]
  }
}