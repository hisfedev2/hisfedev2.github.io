const initMasonry = function initMasonry() {
  const grid = document.querySelector('.grid');
  let msnry;

  const makeMasonry = function makeMasonry() {
    msnry = new Masonry(grid, {
      itemSelector: '.grid__item',
      columnWidth: '.grid__sizer',
      gutter: '.gutter-sizer',
      percentPosition: true,
    });
  };

  const initReiszeEvent = function initReiszeEvent() {
    window.addEventListener('resize', () => {
      msnry.destroy();
      makeMasonry();
    });
  };

  const initMediaQuery = function initMediaQuery() {
    if (matchMedia('(max-width: 576px')) {
      msnry.destroy();
    }
  };

  makeMasonry();
  initReiszeEvent();
  initMediaQuery();
};

const initObserver = function initObserver(io) {
  const placeholders = document.querySelectorAll('.placeholder');
  placeholders.forEach(placeholder => io.observe(placeholder));
};

const initScrollBehaviors = function initScrollBehaviors() {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const originalImg = new Image();
        originalImg.onload = () => {
          if (originalImg.complete) {
            originalImg.classList.add('loaded');
            entry.target.classList.add('placeholder--scale');
            entry.target.appendChild(originalImg);
          }
        };
        originalImg.src = entry.target.dataset.large;
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });
  initObserver(io);
};

window.addEventListener('DOMContentLoaded', () => {
  initMasonry();
  initScrollBehaviors();
});
