(function () {
  var toggleBtn = document.getElementById('toggleAddTailor');
  var cancelBtn = document.getElementById('cancelAddTailor');
  var card = document.getElementById('addTailorCard');
  var form = card;
  var tableBody = document.getElementById('tailorsTableBody');
  var subtitle = document.getElementById('tailorsSubtitle');

  if (!toggleBtn || !card) return;

  function openCard() {
    card.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeCard() {
    card.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    form.reset();
    card.querySelectorAll('.file-field').forEach(function (label) {
      label.classList.remove('has-file');
      label.querySelector('.file-field__name').textContent = 'Click to upload';
    });
  }

  toggleBtn.addEventListener('click', function () {
    if (card.classList.contains('is-open')) {
      closeCard();
    } else {
      openCard();
    }
  });

  if (cancelBtn) cancelBtn.addEventListener('click', closeCard);

  function updateSubtitle() {
    if (!subtitle || !tableBody) return;
    var rows = tableBody.querySelectorAll('tr');
    var active = tableBody.querySelectorAll('.badge--success').length;
    subtitle.textContent = rows.length + ' tailors registered · ' + active + ' currently active';
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementById('tailorName').value.trim() || 'New Tailor';
      var email = document.getElementById('tailorEmail').value.trim() || '—';
      var specialtyEl = document.getElementById('tailorSpecialty').querySelector('.custom-select__value');
      var specialty = specialtyEl ? specialtyEl.textContent : 'Suits & Blazers';

      var row = document.createElement('tr');
      row.innerHTML =
        '<td>' +
          '<p class="admin-table__name"></p>' +
          '<p class="admin-table__email"></p>' +
        '</td>' +
        '<td class="admin-table__specialty"></td>' +
        '<td class="admin-table__mono">0</td>' +
        '<td><span class="badge badge--success">Active</span></td>' +
        '<td class="admin-table__action"><button type="button" class="admin-table-link">Edit</button></td>';

      row.querySelector('.admin-table__name').textContent = name;
      row.querySelector('.admin-table__email').textContent = email;
      row.querySelector('.admin-table__specialty').textContent = specialty;

      tableBody.appendChild(row);
      updateSubtitle();
      closeCard();
    });
  }
})();
