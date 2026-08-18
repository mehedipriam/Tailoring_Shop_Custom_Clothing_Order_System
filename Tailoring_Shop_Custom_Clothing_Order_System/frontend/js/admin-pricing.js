(function () {
  var toggleBtn = document.getElementById('toggleNewCategory');
  var cancelBtn = document.getElementById('cancelNewCategory');
  var card = document.getElementById('newCategoryCard');
  var tableBody = document.getElementById('pricingTableBody');

  if (tableBody) {
    tableBody.addEventListener('click', function (event) {
      var btn = event.target.closest('.price-row-remove');
      if (!btn) return;
      var row = btn.closest('tr');
      if (row) row.remove();
    });
  }

  if (!toggleBtn || !card) return;

  function openCard() {
    card.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeCard() {
    card.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    card.reset();
  }

  toggleBtn.addEventListener('click', function () {
    if (card.classList.contains('is-open')) {
      closeCard();
    } else {
      openCard();
    }
  });

  if (cancelBtn) cancelBtn.addEventListener('click', closeCard);

  card.addEventListener('submit', function (event) {
    event.preventDefault();

    var garment = document.getElementById('newGarmentType').value.trim() || 'New Garment';
    var fabric = document.getElementById('newFabric').value.trim() || 'New Fabric';

    var row = document.createElement('tr');
    row.innerHTML =
      '<td class="price-table__garment"></td>' +
      '<td class="price-table__fabric"></td>' +
      '<td data-label="Base (৳)"><input type="text" class="price-input" value="0"></td>' +
      '<td data-label="Premium (৳)"><input type="text" class="price-input" value="0"></td>' +
      '<td data-label="Luxury (৳)"><input type="text" class="price-input" value="0"></td>' +
      '<td data-label="Making Charge (৳)"><input type="text" class="price-input" value="0"></td>' +
      '<td data-label="Per m Fabric (৳)"><input type="text" class="price-input" value="0"></td>' +
      '<td class="price-table__action"><button type="button" class="price-row-remove" aria-label="Remove row">✕</button></td>';

    row.querySelector('.price-table__garment').textContent = garment;
    row.querySelector('.price-table__fabric').textContent = fabric;

    tableBody.appendChild(row);
    closeCard();
  });
})();
