function send_newpwd() {
    // 獲取用户输入的mail
    $.ajax({
      url: "/send_password/",
      type: "POST",
      dataType: "json",
      data:{
        "email":document.getElementById('email').value,
      },
      success: function(data){  
        if (data['status']=='Yes'){
          alert(data['msg']);
        }
        else if(data['status']=='No') {
          alert(data['msg']);
        }
        else if(data['status']=='illegal') {
          alert(data['msg']);
        }
        else{
          alert(data['msg']);
        }
        
      },
      error: function() {
          alert('請重新登入！');
          resolve(false);
        }
    })
  }