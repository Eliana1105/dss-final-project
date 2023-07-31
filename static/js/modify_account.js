function modify_account() {
    var inputEmail=document.getElementById('inputEmail').value;
    if(inputEmail==''){
        alert("請輸入email!")
    }
    $.ajax({
        url: "/Modify_account/",
        type: "POST",
        dataType: "json",
        data:{
            "account":document.getElementById('account').textContent,
            "email":document.getElementById('inputEmail').value,
            "phone":document.getElementById('inputTel').value,
            "institution":document.getElementById('inputUnit').value,
        },
        success: function(data){
            if (data['status']=='Yes'){
            alert("修改成功！")
            }
            else if(data['status']=='No') {
            alert(data['msg']);
            }
            else{
            alert(data['msg']);
            }           
        },
        error: function() {
            alert("no");
            }
    });
}


function modify_password() {
    var password_old=document.getElementById('password').value;
    var password_new=document.getElementById('pwNew').value;
    var password_new2=document.getElementById('pwNew2').value;
    if(password_old=='' || password_new=="" ||password_new2=="" ){
        alert("請輸入密碼!")
        return
    }
    if(password_new != password_new2){
        alert("輸入密碼不相同")
        return
    }
    $.ajax({
        url: "/Modify_password/",
        type: "POST",
        dataType: "json",
        data:{
            "account":document.getElementById('account').textContent,
            "password":password_old,
            "password_new":password_new,
        },
        success: function(data){
            if (data['status']=='Yes'){
            alert("修改成功！")
            }
            else if(data['status']=='No') {
            alert(data['msg']);
            }
            else{
            alert(data['msg']);
            }           
        },
        error: function() {
            alert("no");
            }
    });
}