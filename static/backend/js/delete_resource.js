function delete_resource(id) {
    var result = confirm("確定要刪除授權檔案" );
    if (result) {
    const formData = new FormData();
    formData.append('id', id);
    // 發送POST請求
    fetch('/backend_delete_resource/', {
        method: 'POST',
        body: formData,
        })
    .then(response => {
      originalResponse = response;
     if (!response.ok) {
       throw new Error('請重新登錄!');
     }

     return response.json(); 
   })
   .then(data => {
    alert(data.message)
    location.reload(); 
  })
      .catch(error => {
        alert( error);
      });
  }
}
  