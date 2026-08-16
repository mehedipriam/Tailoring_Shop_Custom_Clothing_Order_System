(function () {
  var wizardSteps = document.getElementById('wizardSteps');
  if (!wizardSteps) return;

  var totalSteps = 4;
  var currentStep = 1;

  var stepEls = wizardSteps.querySelectorAll('.wizard-step');
  var panelEls = document.querySelectorAll('.wizard-panel');
  var backBtn = document.getElementById('backBtn');
  var continueBtn = document.getElementById('continueBtn');

  function renderStep() {
    stepEls.forEach(function (el) {
      var n = parseInt(el.getAttribute('data-step'), 10);
      el.classList.remove('wizard-step--active', 'wizard-step--done');
      if (n < currentStep) el.classList.add('wizard-step--done');
      else if (n === currentStep) el.classList.add('wizard-step--active');
    });
    panelEls.forEach(function (el) {
      var n = parseInt(el.getAttribute('data-panel'), 10);
      el.classList.toggle('is-active', n === currentStep);
    });
    backBtn.disabled = currentStep === 1;
    continueBtn.textContent = currentStep === totalSteps ? 'Proceed to Payment' : 'Continue';

    if (currentStep === totalSteps) populateReview();
  }

  function customSelectLabel(id) {
    var selected = document.querySelector('#' + id + ' .custom-select__option.is-selected');
    return selected ? selected.textContent : '';
  }

  function populateReview() {
    var serviceDate = document.getElementById('serviceDate').value;
    var selectedFabric = document.querySelector('.fabric-card.is-selected');
    var selectedProfile = document.querySelector('.profile-option.is-selected');

    document.getElementById('reviewGarment').textContent = customSelectLabel('garmentType');
    document.getElementById('reviewFabric').textContent = selectedFabric ? selectedFabric.getAttribute('data-name') : 'Merino Wool';
    document.getElementById('reviewTier').textContent = customSelectLabel('tier');
    document.getElementById('reviewDate').textContent = serviceDate || 'Flexible';
    document.getElementById('reviewTime').textContent = customSelectLabel('deliveryTime');
    document.getElementById('reviewProfile').textContent = selectedProfile ? selectedProfile.getAttribute('data-label') : 'My measurements';
  }

  backBtn.addEventListener('click', function () {
    if (currentStep > 1) {
      currentStep -= 1;
      renderStep();
    }
  });

  continueBtn.addEventListener('click', function () {
    if (currentStep < totalSteps) {
      currentStep += 1;
      renderStep();
    } else {
      window.location.href = 'customer-payment.html';
    }
  });

  // Fabric selection
  var fabricGrid = document.getElementById('fabricGrid');
  fabricGrid.addEventListener('click', function (event) {
    var removeBtn = event.target.closest('.fabric-card__remove');
    if (removeBtn) {
      var cardToRemove = removeBtn.closest('.fabric-card');
      var wasSelected = cardToRemove.classList.contains('is-selected');
      cardToRemove.remove();
      if (wasSelected) {
        var fallback = fabricGrid.querySelector('.fabric-card');
        if (fallback) fallback.classList.add('is-selected');
      }
      return;
    }

    var card = event.target.closest('.fabric-card');
    if (!card) return;
    fabricGrid.querySelectorAll('.fabric-card').forEach(function (c) {
      c.classList.remove('is-selected');
    });
    card.classList.add('is-selected');
  });

  // Measurement profile selection
  var profileOptions = document.getElementById('profileOptions');
  var profileBanner = document.getElementById('profileBanner');
  profileOptions.addEventListener('change', function () {
    profileOptions.querySelectorAll('.profile-option').forEach(function (opt) {
      var input = opt.querySelector('input');
      opt.classList.toggle('is-selected', input.checked);
    });
    var selected = profileOptions.querySelector('.profile-option.is-selected');
    var profileId = selected.getAttribute('data-profile');
    if (profileId === 'new') {
      profileBanner.style.display = 'none';
    } else {
      profileBanner.style.display = '';
      profileBanner.textContent = '✓ Measurements from "' + selected.getAttribute('data-label') + '" will be used';
    }
  });

  // Reference image dropzone
  var dropzone = document.getElementById('dropzone');
  var referenceImage = document.getElementById('referenceImage');
  ['dragover'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropzone.classList.add('is-dragging');
    });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    dropzone.addEventListener(evt, function (e) {
      e.preventDefault();
      dropzone.classList.remove('is-dragging');
    });
  });
  referenceImage.addEventListener('change', function () {
    if (referenceImage.files && referenceImage.files[0]) {
      dropzone.querySelector('.dropzone__title').textContent = referenceImage.files[0].name;
    }
  });

  // Add Custom Fabric modal
  var addFabricBtn = document.getElementById('addFabricBtn');
  var fabricModalOverlay = document.getElementById('fabricModalOverlay');
  var fabricModalClose = document.getElementById('fabricModalClose');
  var fabricModalCancel = document.getElementById('fabricModalCancel');
  var addFabricConfirm = document.getElementById('addFabricConfirm');
  var newFabricName = document.getElementById('newFabricName');
  var newFabricDesc = document.getElementById('newFabricDesc');

  function openFabricModal() {
    fabricModalOverlay.classList.add('is-open');
  }
  function closeFabricModal() {
    fabricModalOverlay.classList.remove('is-open');
    newFabricName.value = '';
    newFabricDesc.value = '';
  }

  addFabricBtn.addEventListener('click', openFabricModal);
  fabricModalClose.addEventListener('click', closeFabricModal);
  fabricModalCancel.addEventListener('click', closeFabricModal);
  fabricModalOverlay.addEventListener('click', function (e) {
    if (e.target === fabricModalOverlay) closeFabricModal();
  });

  addFabricConfirm.addEventListener('click', function () {
    var name = newFabricName.value.trim();
    if (!name) return;
    var desc = newFabricDesc.value.trim() || 'Custom fabric';
    var id = 'custom-' + Date.now();

    var card = document.createElement('div');
    card.className = 'fabric-card is-selected';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('data-fabric', id);
    card.setAttribute('data-tier', 'Custom');
    card.setAttribute('data-name', name);
    card.innerHTML =
      '<button type="button" class="fabric-card__remove" title="Remove fabric">✕</button>' +
      '<div class="fabric-card__swatch" style="background:#A8B5C4"></div>' +
      '<div class="fabric-card__name"></div>' +
      '<div class="fabric-card__desc"></div>' +
      '<span class="fabric-tier fabric-tier--custom">Custom</span>';
    card.querySelector('.fabric-card__name').textContent = name;
    card.querySelector('.fabric-card__desc').textContent = desc;

    fabricGrid.querySelectorAll('.fabric-card').forEach(function (c) {
      c.classList.remove('is-selected');
    });
    fabricGrid.appendChild(card);
    closeFabricModal();
  });

  renderStep();
})();
