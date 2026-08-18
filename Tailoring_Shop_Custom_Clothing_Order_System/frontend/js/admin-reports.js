(function () {
  var tabs = document.querySelectorAll('.admin-tab');
  var panels = document.querySelectorAll('.admin-tab-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');

      tabs.forEach(function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      panels.forEach(function (panel) {
        panel.classList.toggle('is-active', panel.getAttribute('data-tab-panel') === target);
      });
    });
  });

  var periodBtns = document.querySelectorAll('.period-toggle__btn');
  periodBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      periodBtns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    });
  });

  var monthNames = { feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', jul: 'July' };
  var monthPills = document.querySelectorAll('.month-pill');
  var salesRows = document.querySelectorAll('#monthlySalesTable tbody tr');
  var revenueLabel = document.getElementById('salesRevenueLabel');
  var revenueValue = document.getElementById('salesRevenueValue');
  var ordersLabel = document.getElementById('salesOrdersLabel');
  var ordersValue = document.getElementById('salesOrdersValue');

  monthPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var month = pill.getAttribute('data-month');

      monthPills.forEach(function (p) { p.classList.toggle('is-active', p === pill); });
      salesRows.forEach(function (row) { row.classList.toggle('is-current', row.getAttribute('data-month') === month); });

      var row = document.querySelector('#monthlySalesTable tbody tr[data-month="' + month + '"]');
      if (!row || !revenueValue || !ordersValue) return;

      var label = (monthNames[month] || month).toUpperCase();
      revenueLabel.textContent = label + ' — TOTAL REVENUE';
      revenueValue.textContent = '৳' + row.getAttribute('data-revenue');
      ordersLabel.textContent = label + ' — ORDERS PLACED';
      ordersValue.textContent = row.getAttribute('data-orders');
    });
  });

  function tableToCsv(table) {
    var rows = table.querySelectorAll('tr');
    var lines = [];
    rows.forEach(function (row) {
      var cells = row.querySelectorAll('th, td');
      var values = Array.prototype.map.call(cells, function (cell) {
        var text = cell.textContent.trim().replace(/\s+/g, ' ');
        if (text.indexOf(',') !== -1 || text.indexOf('"') !== -1) {
          text = '"' + text.replace(/"/g, '""') + '"';
        }
        return text;
      });
      lines.push(values.join(','));
    });
    return lines.join('\r\n');
  }

  function downloadCsv(table, filename) {
    if (!table) return;
    var csv = tableToCsv(table);
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  var exportGarmentsBtn = document.getElementById('exportGarmentsCsv');
  if (exportGarmentsBtn) {
    exportGarmentsBtn.addEventListener('click', function () {
      downloadCsv(document.getElementById('garmentsTable'), 'top-garments-by-revenue.csv');
    });
  }

  var exportPurchasesBtn = document.getElementById('exportPurchasesCsv');
  if (exportPurchasesBtn) {
    exportPurchasesBtn.addEventListener('click', function () {
      downloadCsv(document.getElementById('purchasesTable'), 'fabric-material-purchases.csv');
    });
  }
})();
