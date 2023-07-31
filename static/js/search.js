var conditionNum = 2;
(function () {
  'use strict';

  // 選取搜尋範圍
  var bookCheck = "input[name='book[]']";
  var bookAllsRadio = "input[name='bookAlls']";
  $(bookAllsRadio).on('click', function() {
    $(bookCheck).prop("checked", false);
    if($(this).prop("checked")) {
      $(this).closest("li").find(bookCheck + ', ' + bookAllsRadio).prop("checked", true);
    } else {
      $(this).closest("li").find(bookCheck + ', ' + bookAllsRadio).prop("checked", false);
    }
  });
  
  // 一個主要[漢字/拼音]輸入框, 如果有輸入值,後面的[詞類]才變成可選
  $('.text-main-character').on('keyup', function() {
    if($(this).val().length > 0) {
      $(this).closest(".table-rows--body").find(".text-speech").prop("disabled", false);
    } else {
      $(this).closest(".table-rows--body").find(".text-speech").prop("disabled", true);
    }
  });

  // 檢索語料:檢索條件("鄰近左右ｎ個字內")才可設定次要條件*
  $('input[type=radio][name*=character]').on('click', function() {
    $(".text-n-character").prop("disabled", true);
    if ($(this).filter(':checked').val() != 1) {
      $(this).next(".text-n-character").prop("disabled", false);
    }
  });
})();

// 搜尋條件增減
function conditionChange(type, el) {
  if (type == 2) {
    var copy = $('.search-condition-tmpl').clone(true);
    $('.table-rows--search').append(copy[0]);
    $('form input[name=character]').attr('name', 'character' + conditionNum);
    conditionNum++;
    $('.table-rows--search').find('.search-condition-tmpl').removeClass('search-condition-tmpl d-lg-none d-none');
  } else {
    $(el).closest(".table-rows--body").remove();
  }
}


