function delete_corpus() {
    var button = $('#delete_corpus')
    const originalButtonText = button.html();
    button.prop('disabled', true);
    button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      語料刪除中...
    `);
    // 發送POST請求
    fetch('/backend_delete_corpus/')
    .then(response => {
      originalResponse = response;
      button.prop('disabled', false);
      button.html(originalButtonText);
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
  