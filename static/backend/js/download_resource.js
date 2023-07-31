function download_resource(file){
    let originalResponse;
    const formData = new FormData();
    formData.append('file_name', file);
    fetch('/download_resource/', {
        method: 'POST',
        body: formData,
        })
    .then(response => {
       originalResponse = response;
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
      // 使用之前的 originalResponse 進行操作
      return originalResponse.blob(); // 解析為 Blob
    })
    .then(blob => {
      // 建立一个 URL 来表示下載的文件
      const url = URL.createObjectURL(blob);
      // 創建一个 <a> 元素来觸發文件下載
      const link = document.createElement('a');
      link.href = url;
      link.download = file;
      // 將 <a> 元素添加到頁面上，并模擬點擊
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