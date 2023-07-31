function get_account() {
    $.ajax({
        url: '/account_detail/',
        type: 'GET',
        success: function(response) {
            var userData = response;

            // 將資料設定到對應的 HTML 元素
            $('#name').text(userData[0].name);
    
            $('#account').text(userData[0].account);

            $('#start').text(userData[0].start);

            $('#end').text(userData[0].end);

            $('#inputUnit').val(userData[0].institution);

            $('#inputEmail').val(userData[0].email);

            $('#inputTel').val(userData[0].phone);

            
        },
        error: function(error) {
            console.log(error);
        }
    });
}
get_account();