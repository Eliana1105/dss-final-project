

function logout(){
  localStorage.clear();
    // 發送 AJAX 請求到服務器端
  fetch('/member_logout/') // 將請求發送到注銷的URL
    .then(response => {
      if (response.ok) {
        // 注銷成功，重定向到index
        document.location.href="/index";
      }
      return response.json(); 
    })
    .catch(error => {
      // 處理請求錯誤
      alert(error);
    });
}
