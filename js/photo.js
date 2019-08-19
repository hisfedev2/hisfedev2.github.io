const initMasonry = function initMasonry() {
  const grid = document.querySelector('.grid');
  let msnry;

  const makeMasonry = function makeMasonry() {
    // eslint-disable-next-line no-undef
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

  makeMasonry();
  initReiszeEvent();
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
          originalImg.classList.add('loaded');
          entry.target.classList.add('placeholder--scale');
        };
        originalImg.src = entry.target.dataset.large;
        entry.target.firstElementChild.classList.remove('loaded');
        entry.target.appendChild(originalImg);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 200px 0px' });
  initObserver(io);
};

window.onload = () => {
  initMasonry();
  initScrollBehaviors();
};
