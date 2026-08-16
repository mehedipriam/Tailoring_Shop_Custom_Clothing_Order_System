(function () {
  var selects = document.querySelectorAll('.custom-select');
  if (!selects.length) return;

  function closeSelect(select) {
    select.classList.remove('is-open');
    select.querySelector('.custom-select__trigger').setAttribute('aria-expanded', 'false');
  }

  function closeAll(except) {
    selects.forEach(function (s) {
      if (s !== except) closeSelect(s);
    });
  }

  selects.forEach(function (select) {
    var trigger = select.querySelector('.custom-select__trigger');
    var valueEl = select.querySelector('.custom-select__value');
    var list = select.querySelector('.custom-select__list');
    var options = select.querySelectorAll('.custom-select__option');

    function selectOption(option, focusTrigger) {
      options.forEach(function (o) {
        o.classList.remove('is-selected');
        o.setAttribute('aria-selected', 'false');
      });
      option.classList.add('is-selected');
      option.setAttribute('aria-selected', 'true');
      valueEl.textContent = option.textContent;
      select.setAttribute('data-value', option.getAttribute('data-value') || '');
      closeSelect(select);
      if (focusTrigger) trigger.focus();
      select.dispatchEvent(new CustomEvent('customselect:change', {
        bubbles: true,
        detail: { value: option.getAttribute('data-value') || '', label: option.textContent }
      }));
    }

    trigger.addEventListener('click', function () {
      var isOpen = select.classList.contains('is-open');
      closeAll(select);
      if (isOpen) {
        closeSelect(select);
      } else {
        select.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        var selected = select.querySelector('.custom-select__option.is-selected');
        if (selected) selected.scrollIntoView({ block: 'nearest' });
      }
    });

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        selectOption(option, false);
      });
    });

    trigger.addEventListener('keydown', function (event) {
      var current = select.querySelector('.custom-select__option.is-selected');
      var optArray = Array.prototype.slice.call(options);
      var idx = optArray.indexOf(current);

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!select.classList.contains('is-open')) {
          closeAll(select);
          select.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          return;
        }
        var nextIdx = event.key === 'ArrowDown'
          ? Math.min(idx + 1, optArray.length - 1)
          : Math.max(idx - 1, 0);
        selectOption(optArray[nextIdx], true);
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!select.classList.contains('is-open')) {
          closeAll(select);
          select.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        } else {
          closeSelect(select);
        }
      } else if (event.key === 'Escape') {
        closeSelect(select);
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.custom-select')) closeAll(null);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeAll(null);
  });
})();
