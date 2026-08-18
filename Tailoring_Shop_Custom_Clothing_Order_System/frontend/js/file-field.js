(function () {
  document.querySelectorAll('.file-field').forEach(function (label) {
    var input = document.getElementById(label.getAttribute('for'));
    var nameEl = label.querySelector('.file-field__name');
    if (!input || !nameEl) return;

    var defaultText = nameEl.textContent;

    input.addEventListener('change', function () {
      if (input.files && input.files[0]) {
        nameEl.textContent = input.files[0].name;
        label.classList.add('has-file');
      } else {
        nameEl.textContent = defaultText;
        label.classList.remove('has-file');
      }
    });
  });
})();
