document.addEventListener("DOMContentLoaded", function () {

    let phoneFielgs = document.querySelectorAll(".phoneInput")
    var im = new Inputmask("+38(099) 999 99 99");
    im.mask(phoneFielgs);

    let modalOk = document.querySelectorAll(".section__modal")
    let modalForm = document.querySelectorAll(".form-container");

    new JustValidate('.js-form', {
        rules: {
            name: {
                required: true,
                minLength: 5
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Напишите ваше имя"
            },
            phone: {
                required: "Укажите ваш номер телефона"
            },
            email: {
                required: "Укажите вашу электронную почту"
            },
            text: {
                required: "Напишите нам что вас интересует"
            }
        },
        submitHandler: function (form) {
            let xhr = new XMLHttpRequest();

            xhr.open("POST", "mail.php", true)

            let formData = new FormData(form);

            xhr.addEventListener("load", function () {
                if (xhr.readyState === 4) {
                    switch (xhr.status) {
                        case 200:
                            modalOk.style.display = "block"
                            modalForm.style.display = 'none'
                            form.reset();
                            break;
                        case 404:
                            console.log("Что то пошло не так");
                            form.reset();
                            break;
                        default:
                            console.log("Ошибка");
                            break;
                    }
                }
            })
            xhr.send(formData)
        },
    });
});