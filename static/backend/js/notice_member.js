function notice(data) {

    if (!window.cid){
        alert("若想通知新帳號密碼請點選下方帳號列編輯，在點擊此按鈕")
        return;
      }
      var button = $('#notice_member_btn')
      const originalButtonText = button.html();
      button.prop('disabled', true);
      button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      通知會員中...
    `);
    $.ajax({
      url: "/backend_Notice_user/",
      type: "POST",
      dataType: "json",
      data:{
        "id":window.cid,
      },
      success: function(data){
          
        
      button.prop('disabled', false);
      button.html(originalButtonText);
        if (data['status']=='Yes'){
          alert("會員通知成功")
        }
        else{
          alert(data['msg']);
        }
        
      },
      error: function() {
          alert('請重新登入！');
        }
  });
   
  }