(function () {
  'use strict';

  // TOP
  $('body').append('<a href="#top" id="topBtn" class="topBtn">TOP</a>');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 100) {$('#topBtn').fadeIn(); } else {$('#topBtn').fadeOut(); }
  });
  $('#topBtn').click(function() {
    $('html').animate({scrollTop: 0}, 400);
    return false;
  });
})();
