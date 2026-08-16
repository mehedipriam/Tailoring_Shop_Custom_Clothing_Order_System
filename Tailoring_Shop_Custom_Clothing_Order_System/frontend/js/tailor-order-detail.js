(function () {
  var statusPills = document.getElementById('statusPills');
  if (!statusPills) return;

  var detailStatusBadge = document.getElementById('detailStatusBadge');
  var readyBanner = document.getElementById('readyBanner');
  var requestDeliveryBtn = document.getElementById('requestDeliveryBtn');
  var requestSent = document.getElementById('requestSent');

  statusPills.addEventListener('click', function (event) {
    var pill = event.target.closest('.status-pill');
    if (!pill) return;

    statusPills.querySelectorAll('.status-pill').forEach(function (p) {
      p.classList.remove('is-active');
    });
    pill.classList.add('is-active');

    detailStatusBadge.className = 'badge ' + pill.getAttribute('data-badge-class');
    detailStatusBadge.textContent = pill.getAttribute('data-badge-label');

    var isReady = pill.getAttribute('data-status') === 'ready';
    readyBanner.classList.toggle('is-visible', isReady);
    if (!isReady) {
      requestDeliveryBtn.style.display = '';
      requestSent.classList.remove('is-visible');
    }
  });

  requestDeliveryBtn.addEventListener('click', function () {
    requestDeliveryBtn.style.display = 'none';
    requestSent.classList.add('is-visible');
  });
})();
