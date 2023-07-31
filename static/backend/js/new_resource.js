function new_resource(){
    var inputBook = $('#inputBook').val();
    var inputIntro = $('#inputIntro').val();
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if(inputBook=="" || inputIntro==""){
        alert("請輸入授權書內容")
        return;
    }
    if (!file) {
    alert('請選擇檔案');
    return;
    }
     // 建立FormData物件，將檔案添加到表單數據中
    const formData = new FormData();
    formData.append('file', file);
    formData.append('resource_name', inputBook);
    formData.append('resource_content', inputIntro);
    // 發送POST請求
    fetch('/backend_new_resource/', {
    method: 'POST',
    body: formData,
    })
    .then(response => {
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
            alert(error);
        });
    }