function delete_speaker() {
    // 發送POST請求
    fetch('/backend_delete_speaker/')
    .then(response => {
      originalResponse = response;
     if (!response.ok) {
       throw new Error('請重新登錄!');
     }

     return response.json(); 
   })
   .then(data => {
    alert(data.message)
  })
      .catch(error => {
        alert( error);
      });
  }
  