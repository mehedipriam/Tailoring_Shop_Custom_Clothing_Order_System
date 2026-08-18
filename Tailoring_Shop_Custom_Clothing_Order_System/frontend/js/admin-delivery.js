(function () {
  var toggleBtn = document.getElementById('toggleAddDelivery');
  var cancelBtn = document.getElementById('cancelAddDelivery');
  var card = document.getElementById('addDeliveryCard');
  var form = card;
  var list = document.getElementById('deliveryList');
  var subtitle = document.getElementById('deliverySubtitle');

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
    if (!subtitle || !list) return;
    var cards = list.querySelectorAll('.admin-person-card');
    var active = list.querySelectorAll('.badge--success').length;
    subtitle.textContent = cards.length + ' registered · ' + active + ' active';
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementById('deliveryName').value.trim() || 'New Delivery Person';
      var phone = document.getElementById('deliveryPhone').value.trim() || '+1 (555) —';
      var zoneEl = document.getElementById('deliveryZone').querySelector('.custom-select__value');
      var zone = zoneEl ? zoneEl.textContent : 'North Quarter';
      var initial = name.trim().charAt(0).toUpperCase() || '?';

      var wrap = document.createElement('div');
      wrap.className = 'admin-person-card';
      wrap.innerHTML =
        '<div class="admin-person-card__id">' +
          '<span class="admin-avatar"></span>' +
          '<div>' +
            '<p class="admin-person-card__name"></p>' +
            '<p class="admin-person-card__meta"></p>' +
          '</div>' +
        '</div>' +
        '<div class="admin-person-card__actions">' +
          '<div class="admin-person-card__stat">' +
            '<p class="admin-person-card__stat-value">0</p>' +
            '<p class="admin-person-card__stat-label">deliveries</p>' +
          '</div>' +
          '<span class="badge badge--success">Active</span>' +
          '<button type="button" class="admin-table-link">Edit</button>' +
        '</div>';

      wrap.querySelector('.admin-avatar').textContent = initial;
      wrap.querySelector('.admin-person-card__name').textContent = name;
      wrap.querySelector('.admin-person-card__meta').textContent = 'Zone: ' + zone + ' · ' + phone;

      list.appendChild(wrap);
      updateSubtitle();
      closeCard();
    });
  }
})();
