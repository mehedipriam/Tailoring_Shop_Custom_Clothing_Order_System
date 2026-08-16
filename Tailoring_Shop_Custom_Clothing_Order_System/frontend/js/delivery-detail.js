(function () {
  var deliveryStepper = document.getElementById('deliveryStepper');
  if (!deliveryStepper) return;

  var statuses = ['pending', 'accepted', 'on_the_way', 'delivered'];
  var status = 'pending';
  var proofFileName = null;

  var stepEls = deliveryStepper.querySelectorAll('.delivery-stepper__step');
  var actionEls = document.querySelectorAll('.delivery-action');
  var deliveryFlow = document.getElementById('deliveryFlow');
  var deliveredSuccess = document.getElementById('deliveredSuccess');
  var deliveredAt = document.getElementById('deliveredAt');
  var deliveredProof = document.getElementById('deliveredProof');

  function renderStepper() {
    var currentIdx = statuses.indexOf(status);
    stepEls.forEach(function (el) {
      var stepIdx = parseInt(el.getAttribute('data-step'), 10);
      el.classList.remove('delivery-stepper__step--done', 'delivery-stepper__step--active');
      if (currentIdx > stepIdx) el.classList.add('delivery-stepper__step--done');
      else if (currentIdx === stepIdx) el.classList.add('delivery-stepper__step--active');
    });
  }

  function renderAction() {
    var map = { pending: 'accept', accepted: 'start', on_the_way: 'proof' };
    var show = map[status];
    actionEls.forEach(function (el) {
      el.style.display = el.getAttribute('data-action') === show ? '' : 'none';
    });
  }

  function setStatus(next) {
    status = next;
    if (status === 'delivered') {
      deliveryFlow.style.display = 'none';
      deliveredSuccess.style.display = 'block';
      deliveredAt.textContent = 'Delivered at ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      if (proofFileName) {
        deliveredProof.textContent = '✓ Proof photo uploaded: ' + proofFileName;
        deliveredProof.style.display = 'block';
      }
      return;
    }
    renderStepper();
    renderAction();
  }

  document.querySelectorAll('.delivery-action[data-action="accept"]').forEach(function (btn) {
    btn.addEventListener('click', function () { setStatus('accepted'); });
  });
  document.querySelectorAll('.delivery-action[data-action="start"]').forEach(function (btn) {
    btn.addEventListener('click', function () { setStatus('on_the_way'); });
  });

  var proofFile = document.getElementById('proofFile');
  var proofUploadLabel = document.getElementById('proofUploadLabel');
  var proofIcon = document.getElementById('proofIcon');
  var proofText = document.getElementById('proofText');
  var markDeliveredBtn = document.getElementById('markDeliveredBtn');
  var proofWarning = document.getElementById('proofWarning');

  proofFile.addEventListener('change', function () {
    var file = proofFile.files && proofFile.files[0];
    if (!file) return;
    proofFileName = file.name;
    proofUploadLabel.classList.add('has-file');
    proofIcon.textContent = '📸';
    proofText.textContent = proofFileName;
    markDeliveredBtn.disabled = false;
    proofWarning.style.display = 'none';
  });

  markDeliveredBtn.addEventListener('click', function () {
    if (!proofFileName) return;
    setStatus('delivered');
  });

  renderStepper();
  renderAction();
})();
