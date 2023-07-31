function logout() {
    $.ajax({
        url: "/backend_logout/",
        type: "POST",
        dataType: "json",
        success: function(data){
          if (!data['status']=='Yes'){
            alert(data['msg']);
          }
          
        }
    });
}