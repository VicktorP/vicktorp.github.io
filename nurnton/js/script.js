document.addEventListener("DOMContentLoaded", function () {

    // sections
    ScrollOut({
        once: true,
        targets: '.section__container',
        onShown: function (el) {
            el.classList.add('animate__zoomIn')
        }
    })

    // footer
    ScrollOut({
        once: true,
        targets: '.footer__top',
        onShown: function (el) {
            el.classList.add('animate__backInDown')

        }
    })
    // projects
    ScrollOut({
        once: true,
        targets: '.blog__wrap',
        onShown: function (el) {
            const slides = document.querySelectorAll('.blog-slider .blog__wrap');
            slides.forEach((item, index) => {
                item.classList.add('animate__fadeIn');
                item.style.animationDelay = 0.5 * index + 's'
            })
        }
    })

    // galleries
    ScrollOut({
        once: true,
        targets: '.gallery__inner',
        onShown: function (el) {
            const slides = document.querySelectorAll('.gallery__wrap .gallery__inner');
            slides.forEach((item, index) => {
                item.classList.add('animate__pulse');
                item.style.animationDelay = 0.05 * index * 's'
            })
        }
    })


    // mobile menu
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    const toggleMobileMenu = () => {
        hamburger.classList.toggle("is-active");
        mobileMenu.classList.toggle("mobile-menu--active");
        document.body.classList.toggle("no-scroll");
    }

    hamburger.addEventListener("click", toggleMobileMenu);


    // modal 

    const modal = document.querySelector(".form-container");
    const open = document.querySelector(".open-modal");
    const close = document.querySelector(".close");

    if (open) {
        open.addEventListener("click", function () {
            modal.style.display = 'block'
            document.body.classList.add("no-scroll");
        });
    }

    if (close) {
        close.addEventListener("click", function () {
            modal.style.display = 'none'
            document.body.classList.remove ("no-scroll");
        });
    }
})