function download_spaker(){
    let originalResponse;
    var button = $('#download_speaker');
    const originalButtonText = button.html();
    button.prop('disabled', true);
    button.html(`
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      語者下載中...
    `);
    fetch('/backend_download_speaker/')
    .then(response => {
       originalResponse = response;
       button.prop('disabled', false);
       button.html(originalButtonText);
      if (!response.ok) {
        throw new Error('請重新登錄!');
      }
      if (!response.headers.get('Content-Type').includes('application/json')) {
        return response;
      }
      return response.json(); 
    })
    .then(data => {
      // 判斷 data.message 是否存在
      if (data.message) {
        throw new Error(data.message);
      }
      // 使用之前儲存的 originalResponse操作
      return originalResponse.blob(); // 解析為 Blob
    })
    .then(blob => {
      // 建立一个 URL 表示下載的文件
      const url = URL.createObjectURL(blob);
      // 創建一个 <a> 元素来觸發文件下載
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sinca_Corpora_Speaker.xlsx';
      // 將 <a> 元素添加到頁面上，並模拟點擊
      document.body.appendChild(link);
      link.click();
      // 删除 <a> 元素和 URL 
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      alert(error);
    }); 
  }