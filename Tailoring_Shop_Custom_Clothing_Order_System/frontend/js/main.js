(function () {
  var toggle = document.querySelector('.navbar__toggle');
  var links = document.querySelector('.navbar__links');

  if (!toggle || !links) return;

  function closeMenu() {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', function (event) {
    if (!links.classList.contains('is-open')) return;
    if (links.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
})();
