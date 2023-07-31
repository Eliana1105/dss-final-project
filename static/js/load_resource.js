function get_resource() {
    $.ajax({
        url: '/backend_get_resource/',
        type: 'GET',
        success: function(response) {
            temp=""
            for( var i=0;i<response.length ;i++){
                console.log(response[i])
                temp +='<div class="accordion-item"><h2 class="accordion-header" id="resources-headingOne"> <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#resources-collapseOne" aria-expanded="false" aria-controls="resources-collapseOne">';
                temp +=response[i].FName;
                temp +='</button></h2><div id="resources-collapseOne" class="accordion-collapse collapse" aria-labelledby="resources-headingOne" data-bs-parent="#accordionResources"><div class="accordion-body"><p>';
                temp +=response[i].Fcontent;
                temp +='</p><div class="d-flex justify-content-center py-2">';
                temp += '  <a href="#" class="btn btn-outline-primary text-center"';
                temp += ' onclick="download_resource(\'';
                temp += response[i].download_name;
                temp += '\')"';
                temp += ' >同意並下載</a>';
                
                temp +='</div></div></div></div>';
            }
            $('#accordionResources').html(temp);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
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
$(document).ready(function() {
    get_resource()
  });