(function () {
  var starRating = document.getElementById('starRating');
  if (!starRating) return;

  var words = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  var stars = starRating.querySelectorAll('.star-rating__star');
  var starWord = document.getElementById('starWord');
  var submitBtn = document.getElementById('submitReview');
  var value = 0;

  function paint(n) {
    stars.forEach(function (s) {
      var starN = parseInt(s.getAttribute('data-star'), 10);
      s.classList.toggle('is-filled', starN <= n);
    });
  }

  stars.forEach(function (s) {
    var n = parseInt(s.getAttribute('data-star'), 10);
    s.addEventListener('mouseenter', function () { paint(n); });
    s.addEventListener('click', function () {
      value = n;
      paint(value);
      starWord.textContent = words[value];
      submitBtn.disabled = false;
    });
  });

  starRating.addEventListener('mouseleave', function () {
    paint(value);
  });

  submitBtn.addEventListener('click', function () {
    if (value === 0) return;
    document.getElementById('ratingForm').style.display = 'none';
    document.getElementById('ratingSuccess').style.display = 'block';
  });
})();
