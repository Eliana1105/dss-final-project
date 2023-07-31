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

// 設定字體大小
function fontSize(n, type) {
  if (type == undefined) type = 'main';
  var isMob = ($(window).width() < 767.98) ? true : false;
  let size = isMob ? '0.8rem' : '18px';
  // 小:0, 中:1, 大:2
  switch (n) {
    case 0:
      size = isMob ? '0.7rem' : '16px';
      break;
    case 2:
      size = isMob ? '1rem' : '20px';
      break;
    default:
      size = isMob ? '0.8rem' : '18px';
      break;
  }
  $(type).find('.font-sizing button').removeClass('active');
  $(type).find('.content').css('font-size', size);
  $(type).find('.size' + n).addClass('active');
}

function logout(){
  localStorage.clear();
    // 發送 AJAX 請求到服務器端
  fetch('/member_logout/') // 將請求發送到注銷的URL
    .then(response => {
      if (response.ok) {
        // 注銷成功，重定向到index
        document.location.href="/index";
      }
      return response.json(); 
    })
    .catch(error => {
      // 處理請求錯誤
      alert(error);
    });
}