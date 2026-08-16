(function () {
  var requestsList = document.getElementById('requestsList');
  if (!requestsList) return;

  var newRequestsSection = document.getElementById('newRequestsSection');
  var requestCountBadge = document.getElementById('requestCountBadge');
  var assignedList = document.getElementById('assignedList');

  function updateRequestCount() {
    var remaining = requestsList.querySelectorAll('.order-card').length;
    if (remaining === 0) {
      newRequestsSection.style.display = 'none';
    } else {
      requestCountBadge.textContent = String(remaining);
    }
  }

  requestsList.addEventListener('click', function (event) {
    var card = event.target.closest('.order-card');
    if (!card) return;

    if (event.target.closest('.js-accept-request')) {
      var assigned = document.createElement('article');
      assigned.className = 'order-card';
      assigned.innerHTML =
        '<div class="order-card__top">' +
          '<div class="order-card__id-row">' +
            '<span class="order-card__id">DEL-467</span>' +
            '<span class="badge badge--warning">Pending</span>' +
            '<span class="badge badge--navy">From Tailor</span>' +
          '</div>' +
        '</div>' +
        '<div class="order-card__bottom">' +
          '<div>' +
            '<p class="order-card__name">Navy Wool Suit</p>' +
            '<p class="order-card__meta">Alexandra Harrington · 24 Kensington Road, Apt 3B, MC 10112</p>' +
          '</div>' +
          '<a href="delivery-detail.html" class="detail-btn detail-btn--primary" style="padding:6.8px 12.8px; font-size:12px">View &amp; Deliver</a>' +
        '</div>';
      assignedList.insertBefore(assigned, assignedList.firstChild);
      card.remove();
      updateRequestCount();
      return;
    }

    if (event.target.closest('[data-action="reject"]')) {
      card.remove();
      updateRequestCount();
    }
  });
})();
