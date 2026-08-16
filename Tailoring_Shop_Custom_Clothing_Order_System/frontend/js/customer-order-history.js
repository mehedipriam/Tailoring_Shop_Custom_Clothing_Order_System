(function () {
  var historyList = document.getElementById('historyList');
  if (!historyList) return;

  var overlay = document.getElementById('invoiceOverlay');
  var closeBtn = document.getElementById('invoiceClose');

  historyList.addEventListener('click', function (event) {
    var btn = event.target.closest('.js-invoice-btn');
    if (!btn) return;
    var card = btn.closest('.history-card');

    document.getElementById('invoiceNumber').textContent = 'INVOICE #' + card.getAttribute('data-id');
    document.getElementById('invoiceGarment').textContent = card.getAttribute('data-type');
    document.getElementById('invoiceTailor').textContent = card.getAttribute('data-tailor');
    document.getElementById('invoiceDate').textContent = card.getAttribute('data-date');
    document.getElementById('invoicePaidDate').textContent = card.getAttribute('data-date');
    document.getElementById('invoicePrice').textContent = card.getAttribute('data-price');

    overlay.classList.add('is-open');
  });

  function closeModal() {
    overlay.classList.remove('is-open');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeModal();
  });
})();
