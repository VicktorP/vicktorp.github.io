const swiper1 = new Swiper(".heroSwiperText", {
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 4000,
  },
});

const swiper2 = new Swiper(".teamSwiper", {
  pagination: {
    el: ".teamSwiper-pagination",
    clickable: true,
    renderBullet: function (index, teamBullet) {
      return '<span class="' + teamBullet + '">' + (index + 1) + "</span>";
    },
  },
  simulateTouch: false,
});