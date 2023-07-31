function checkemail() {
    return new Promise(function (resolve, reject) {
    var emailInput = $('#inputEmail');
    if(window.email == emailInput.val())
    {
      emailInput.removeClass('is-invalid');
      emailInput.addClass('is-valid');
      resolve(true);
      return;
    }
    if(emailInput.val()=="")
    {
        emailInput.removeClass('is-valid');
        emailInput.addClass('is-invalid');
        $('#email_error').text('必填');
        resolve(false);
        return ;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailInput.val()))
    {
        emailInput.removeClass('is-valid');
        emailInput.addClass('is-invalid');
        $('#email_error').text('非法格式');
        resolve(false);
        return ;
    }
    var button = $('#checkemail_btn');
    const originalButtonText = button.html();
    button.prop('disabled', true);
    button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      驗證信箱中...
    `);
    $.ajax({
        url: "/backend_check_email/",
        type: "POST",
        dataType: "json",
        data:{
          "email":document.getElementById('inputEmail').value,
        },
        success: function(data){
          button.prop('disabled', false);
          button.html(originalButtonText);
          
          if (data['status']=='Yes'){
            emailInput.removeClass('is-invalid');
            emailInput.addClass('is-valid');
            resolve(true);
          }
          else if(data['status']=='No') {
            emailInput.removeClass('is-valid');
            emailInput.addClass('is-invalid');
            $('#email_error').text(data['msg']);
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