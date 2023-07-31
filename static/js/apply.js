function apply(){
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if (!file) {
    alert('請選擇檔案');
    return;
    }
     // 建立FormData物件，將檔案添加到表單數據中
    const formData = new FormData();
    formData.append('file', file);
    // 發送POST請求
    fetch('/apply_confirm/', {
    method: 'POST',
    body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error();
            }
            return response.json(); 
        })
        .then(data => {
            alert(data.message)
        })
        .catch(error => {
            alert(error);
        });
    }