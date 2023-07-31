function delete_member(data) {
    let jsonString = JSON.stringify(data);
    jsonString = jsonString.trim();
  
    if (!jsonString.startsWith('{')) {
      jsonString = jsonString.slice(jsonString.indexOf('{'));
    }
  
    if (!jsonString.endsWith('}')) {
      jsonString = jsonString.slice(0, jsonString.lastIndexOf('}') + 1);
    }
  
    const row = JSON.parse(jsonString);
    var result = confirm("確定要刪除會員" +row.account );
    if (result) {
        $.ajax({
            url: "/backend_Delete_user/",
            type: "POST",
            dataType: "json",
            data:{
              "id":row.id,
            },
            success: function(data){
              if (data['status']=='Yes'){
                location.reload(); 
              }
              else{
                alert(data['msg']);
              }
              
            }
        });

    }
  
  }