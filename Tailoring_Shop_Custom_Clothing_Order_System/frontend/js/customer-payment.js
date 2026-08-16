(function () {
  var payBtn = document.getElementById('payBtn');
  if (!payBtn) return;

  var paymentForm = document.getElementById('paymentForm');
  var paymentSuccess = document.getElementById('paymentSuccess');

  payBtn.addEventListener('click', function () {
    paymentForm.style.display = 'none';
    paymentSuccess.classList.add('is-active');
  });

  var cardNumber = document.getElementById('cardNumber');
  cardNumber.addEventListener('input', function () {
    var digits = cardNumber.value.replace(/\D/g, '').slice(0, 16);
    cardNumber.value = digits.replace(/(.{4})/g, '$1 ').trim();
  });

  var cardExpiry = document.getElementById('cardExpiry');
  cardExpiry.addEventListener('input', function () {
    var digits = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
    cardExpiry.value = digits.length > 2 ? digits.slice(0, 2) + ' / ' + digits.slice(2) : digits;
  });

  var cardCvv = document.getElementById('cardCvv');
  cardCvv.addEventListener('input', function () {
    cardCvv.value = cardCvv.value.replace(/\D/g, '').slice(0, 4);
  });
})();
