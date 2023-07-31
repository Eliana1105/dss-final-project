function login() {
    $.ajax({
        url: "/login/",
        type: "POST",
        dataType: "json",
        data:{
          "account":document.getElementById('account').value,
          "pwd":document.getElementById('password').value
        },
        success: function(data){
          if (data['status']=='Yes'){
            alert(document.getElementById('account').value+' 歡迎回來!');
            document.location.href="/search_ch";
          }
          else{
            alert(data['msg']);
          }
          
        }
    });
}

function login_en() {
    $.ajax({
        url: "/login/",
        type: "POST",
        dataType: "json",
        data:{
          "account":document.getElementById('account').value,
          "pwd":document.getElementById('password').value
        },
        success: function(data){
          if (data['status']=='Yes'){
            alert(document.getElementById('account').value+', wecolone back!');
            document.location.href="/search_en";
          }
          else{
            alert(data['msg']);
          }
          
        }
    });
}