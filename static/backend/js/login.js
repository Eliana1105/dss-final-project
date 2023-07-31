function login() {
    $.ajax({
        url: "/backend_login/",
        type: "POST",
        dataType: "json",
        data:{
          "account":document.getElementById('account').value,
          "pwd":document.getElementById('password').value
        },
        success: function(data){
          if (data['status']=='Yes'){
            alert(document.getElementById('account').value+' 歡迎回來!');
            document.location.href="/backend_corpus";
          }
          else{
            alert(data['msg']);
          }
          
        }
    });
}