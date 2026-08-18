(function () {
  var toggle = document.querySelector('.dash-hamburger');
  var sidebar = document.querySelector('.dash-sidebar');
  var backdrop = document.querySelector('.dash-backdrop');
  var demoSwitcher = document.querySelector('.demo-switcher');

  if (!toggle || !sidebar || !backdrop) return;

  function openMenu() {
    sidebar.classList.add('is-open');
    backdrop.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    if (demoSwitcher) demoSwitcher.classList.add('is-hidden');
  }

  function closeMenu() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (demoSwitcher) demoSwitcher.classList.remove('is-hidden');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMenu();
  });
})();
