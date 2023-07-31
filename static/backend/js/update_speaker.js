function update_speaker() {
    // 獲取檔案上傳元素
    const fileInput = document.getElementById('speaker_file');
    const file = fileInput.files[0];

     // 檢查是否有選擇檔案
    if (!file) {
        alert('請選擇檔案');
        return;
      }
    var button = $('#update_speaker');
    const originalButtonText = button.html();
    
    // 禁用按鈕並顯示進度指示器
    button.prop('disabled', true);
    button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      語者上傳中...
    `);
    // 建立FormData物件，將檔案添加到表單數據中
    const formData = new FormData();
    formData.append('speaker_file', file);
    
    // 發送POST請求
    fetch('/backend_update_speaker/', {
      method: 'POST',
      body: formData,
    })
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
