(function () {
  var pillsWrap = document.getElementById('profilePills');
  if (!pillsWrap) return;

  var activeProfileName = document.getElementById('activeProfileName');
  var savedNote = document.getElementById('savedNote');
  var saveBtn = document.getElementById('saveMeasurements');

  pillsWrap.addEventListener('click', function (event) {
    var pill = event.target.closest('.profile-pill');
    if (!pill || pill.id === 'newProfileToggle') return;

    if (event.target.classList.contains('profile-pill__remove')) {
      pill.remove();
      return;
    }

    pillsWrap.querySelectorAll('.profile-pill').forEach(function (p) {
      p.classList.remove('is-active');
    });
    pill.classList.add('is-active');
    activeProfileName.textContent = pill.querySelector('.profile-pill__name').textContent;
    savedNote.style.display = 'none';
    saveBtn.textContent = 'Save Measurements';
  });

  saveBtn.addEventListener('click', function () {
    saveBtn.textContent = '✓ Saved';
    savedNote.style.display = '';
  });

  var newProfileToggle = document.getElementById('newProfileToggle');
  var newProfileForm = document.getElementById('newProfileForm');
  var newProfileName = document.getElementById('newProfileName');
  var newProfileAdd = document.getElementById('newProfileAdd');
  var newProfileCancel = document.getElementById('newProfileCancel');

  newProfileToggle.addEventListener('click', function () {
    newProfileToggle.style.display = 'none';
    newProfileForm.style.display = 'flex';
    newProfileName.focus();
  });

  function closeNewProfileForm() {
    newProfileForm.style.display = 'none';
    newProfileToggle.style.display = '';
    newProfileName.value = '';
  }

  newProfileCancel.addEventListener('click', closeNewProfileForm);

  newProfileAdd.addEventListener('click', function () {
    var name = newProfileName.value.trim();
    if (!name) return;

    var pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'profile-pill';
    pill.setAttribute('data-profile', 'p-' + Date.now());
    pill.innerHTML =
      '<span class="profile-pill__name"></span>' +
      '<span class="profile-pill__meta">Updated just now</span>' +
      '<span class="profile-pill__remove" title="Remove profile">🗑</span>';
    pill.querySelector('.profile-pill__name').textContent = name;

    pillsWrap.insertBefore(pill, newProfileToggle);
    closeNewProfileForm();
  });
})();
