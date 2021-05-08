document.addEventListener("DOMContentLoaded", function () {
  let mySwiper = new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 20,
    breakpoints:{
      320: {
        spaceBetween: 60,
      },
      760 :{
        spaceBetween: 40,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})