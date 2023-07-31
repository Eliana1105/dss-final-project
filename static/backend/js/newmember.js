async function newmember() {
    if(window.cid){
      alert("編輯會員請點選下方儲存 \n若想新增會員請重新整理網頁")
      return;
    }
    var button = $('#newmember_btn')
    const originalButtonText = button.html();
    var email = await checkemail();
    var account =  await checkaccount();
    var NAME = $('#inputName');
    if(NAME.val()=="")
    {
        NAME.removeClass('is-valid');
        NAME.addClass('is-invalid');
    }
    else{
        NAME.addClass('is-valid');
        NAME.removeClass('is-invalid');
    }
    var inputUnit = $('#inputUnit');
    if(inputUnit.val()!="")
    {
        inputUnit.addClass('is-valid');
    }
    else
    {
        inputUnit.removeClass('is-valid');
    }
    var inputTel = $('#inputTel');
    if(inputTel.val()!="")
    {
        inputTel.addClass('is-valid');
    }
    else
    {
        inputTel.removeClass('is-valid');
    }
    var inputEffectiveDate = $('#inputEffectiveDate');
    if(inputEffectiveDate.val()=="")
    {
        inputEffectiveDate.removeClass('is-valid');
        inputEffectiveDate.addClass('is-invalid');
    }
    else{
        inputEffectiveDate.addClass('is-valid');
        inputEffectiveDate.removeClass('is-invalid');
    }
    var inputExpiryDate = $('#inputExpiryDate');
    if(inputExpiryDate.val()=="")
    {
        inputExpiryDate.removeClass('is-valid');
        inputExpiryDate.addClass('is-invalid');
    }
    else{
        inputExpiryDate.addClass('is-valid');
        inputExpiryDate.removeClass('is-invalid');
    }
    if(email&&account &&inputExpiryDate.hasClass('is-valid')&& NAME.hasClass('is-valid')&& inputEffectiveDate.hasClass('is-valid') )
    {
      button.prop('disabled', true);
      button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      新增會員中...
    `);
        $.ajax({
            url: "/backend_create_account/",
            type: "POST",
            dataType: "json",
            data:{
              "email":document.getElementById('inputEmail').value,
              "account":document.getElementById('inputAccount').value,
              "name":document.getElementById('inputName').value,
              "phone":document.getElementById('inputTel').value,
              "institution":document.getElementById('inputUnit').value,
              "EffectiveDate":document.getElementById('inputEffectiveDate').value,
              "ExpiryDate":document.getElementById('inputExpiryDate').value,
            },
            success: function(data){
                
              
            button.prop('disabled', false);
            button.html(originalButtonText);
              if (data['status']=='Yes'){
                alert("會員新增成功")
                location.reload(); 
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
}