function checkaccount() {
    return new Promise(function (resolve, reject) {
    var Input = $('#inputAccount');
    if(window.account    == Input.val())
    {
      Input.removeClass('is-invalid');
      Input.addClass('is-valid');
      resolve(true);
      return;
    }
    if(Input.val()=="")
    {
        Input.removeClass('is-valid');
        Input.addClass('is-invalid');
        $('#account_error').text('必填');
        resolve(false);
        return ;
    }
    $.ajax({
        url: "/backend_check_account/",
        type: "POST",
        dataType: "json",
        data:{
          "account":document.getElementById('inputAccount').value,
        },
        success: function(data){
            
          
          if (data['status']=='Yes'){
            Input.removeClass('is-invalid');
            Input.addClass('is-valid');
            resolve(true);
          }
          else if(data['status']=='No') {
            Input.removeClass('is-valid');
            Input.addClass('is-invalid');
            $('#account_error').text(data['msg']);
            resolve(false);
          }
          else{
            alert(data['msg']);
            resolve(false);
          }
          
        },
        error: function() {
            alert('請重新登入！');
            resolve(false);
          }
    });
  });
}