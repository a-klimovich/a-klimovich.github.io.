(function () {
  const swiper = new Swiper(".swiper-container", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const wrapper = document.querySelector(".wrapper");
  const overlay = document.querySelector(".overlay");
  const btnHamburgerMenu = document.querySelector(".btn-hamburger-menu");
  const headerMenu = document.querySelector(".header__menu");

  window.addEventListener("load", () => {
    const headerHeight = header.getClientRects()[0].height;
    wrapper.style.paddingTop = headerHeight + "px";
  });

  btnHamburgerMenu.addEventListener("click", () => {
    toggleMenu();
  });

  overlay.addEventListener("click", () => {
    if (body.classList.contains("overflow-h")) {
      toggleMenu();
    }
  });

  function toggleMenu() {
    body.classList.toggle("overflow-h");
    headerMenu.classList.toggle("open");
    overlay.classList.toggle("active");
  }
})();
