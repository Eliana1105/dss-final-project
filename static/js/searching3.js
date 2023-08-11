var main_value;
var mode;
var number;
var conditionJson;
var CheckOptions_value;
var RadioValue;
function searching(){
    var condition=[]

    main_value =document.getElementById("main_character").value;
    search_pattern_arrary=[]
    search_pattern_arrary.push(document.getElementById("main_character").value);
    if(!main_value){
        alert('請輸入檢索關鍵字')
        return
      }

    var CheckOptions = [];
    var checkboxes = document.querySelectorAll('input[name="book[]"]:checked');
        checkboxes.forEach(function(checkbox) {
            CheckOptions.push(checkbox.value);
    });
    CheckOptions_value=JSON.stringify(CheckOptions);
    
    var selectedRadio = document.querySelector('input[name="bookAlls"]:checked');
    RadioValue = JSON.stringify(selectedRadio.value);
   

    //抓取搜尋關鍵字
    var inputs = document.getElementsByClassName("input_character");
    var selectElements = document.getElementsByClassName("form-select");
    for (var i = 0; i < inputs.length; i++) {
      var combinedValue = []
      var value = inputs[i].value;
      if(value){
        var selectedValue = selectElements[i].value;
        combinedValue.push(selectedValue);
        if(selectedValue == "or" ||selectedValue == "and"){
            search_pattern_arrary.push(value);
        }
        
        combinedValue.push(value);
        condition.push(combinedValue);   
      }  
    }
    //抓取檢索條件：同一ipu內/鄰近左右ｎ個字內
    var radio=document.querySelectorAll(".m-1")
    mode = "";
    number=document.getElementById("number").value;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            mode = radio[i].value;
            break; // 找到被選取的按鈕後中斷迴圈
        }
    }    
    if(mode==2){
        if(!number){
          alert('請輸入相鄰的字數')
          return
        } 
    }
    conditionJson = JSON.stringify(condition);
    $.ajax({
        url: '/log_search/',
        type: 'POST',
    
        data:{
            "main_value":main_value,
            "check" : RadioValue,
        },
    
        success: function(data) {
              
      },  
      error: function(error) {
          console.log(error);
      }
    
      });
    updatePagination(1);
    
}

function updatePagination(currentPage){
    $.ajax({
        url: '/search_corpus/',
        type: 'POST',
        dataType: 'json',
        data:{
            "main_value":main_value,
            "mode":mode,
            "text_number":number,
            "condition":conditionJson,
            "checkbox_value": CheckOptions_value,
            "selected_value": RadioValue,
            "page":currentPage
        },
        success: function(data) {
            var find_string = '<div id="searchScope"class="alert px-2 py-1"role="alert"><p class="m-2"><strong>找到'+data['serach_num']+' 筆 / 總共'+ data['total']+' 筆。</strong></p></div>';
            $('#find_bar').html(find_string);            
            var temp = '';
            temp+='<div class="table-cell d-lg-table-cell d-none">編號</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none">出處</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none">音檔編號</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none text-start text-result2">內容</div>';
            $('#search_header').html(temp);
            temp = '<div><a class="badge bg-primary text-light text-decoration-none" href="javascript:void(0);"><i class="bi bi-file-earmark-arrow-up"></i> 匯出</a></div>';
            $('#search_export').html(temp);
            data_array = JSON.parse(data['search_corpus']);
            var totalPages = Math.ceil(data['serach_num']/50);
            temp = '';
    
            temp +=' <ul class="pagination flex-wrap justify-content-center">';
            if(currentPage== 1){
                temp +=' <li class="page-item disabled">';
            }
            else{
                temp +=' <li class="page-item">';
            }
            temp +='<a class="page-link" onclick="updatePagination('
            temp +=currentPage-1;
            temp += ')" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
            temp +=' </li>';
            var sart_page = currentPage-4;
            var  max_page = currentPage+5;
            if(sart_page<=0){
                sart_page=1;
                max_page = 10
            }
            for(var i=sart_page; i <= max_page;i++){
                if(i>totalPages){
                    break;
                }
                if(i == currentPage){
                    temp+=' <li class="page-item active">';
                }
                else{
                    temp+='  <li class="page-item">';
                }
                temp +='<a class="page-link" onclick="updatePagination('
                temp +=i;
                temp += ')">';
                temp+=i;
                temp+='</a></li>';
            }
            if(currentPage == totalPages){
                temp +=' <li class="page-item disabled">';
            }
            else{
                temp +=' <li class="page-item">';
            }
            temp+= '<a class="page-link" onclick="updatePagination(';
            temp +=currentPage+1;
            temp += ')" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
            temp+=' </li> </ul>'
            $('#Pagination1').html(temp);
            $('#Pagination2').html(temp);
            temp = ''
            for (var i = 0;  i<data_array.length; i++) {
        
                temp +=' <div id="';
                temp += 'content_';
                temp += i+1;
                temp +='"class="table-row table-rows--body  py-1 flex-wrap align-items-center">';
                temp +=' <div class="table-cell d-table-cell" data-title="編號">';
                temp+=i+1+(50*(currentPage-1));
                temp += '</div><div class="table-cell d-table-cell" data-title="語料庫名稱" title="">'
                temp += data_array[i]['theme'];
                temp +='</div>';
                temp +='<div class="table-cell d-table-cell" data-title="音檔編號">';
        
                temp+='<a  class="text-keyword2" data-bs-toggle="modal" data-bs-target="#keywordModal' 
                temp+=i+1;
                temp+='">';
                temp += data_array[i]['filename'];
                temp+='</a>';
        
        
                
        
                temp += '<div class="modal fade" id="keywordModal';
                temp+=i+1;
                temp+= '" tabindex="-1" data-bs-backdrop="true"  aria-hidden="true">';
                temp +='<div class="modal-dialog modal-dialog-scrollable modal-xl"><div class="modal-content"> <div class="modal-header"><h5 class="modal-title">';
                temp +=' <h5 class="modal-title">'
                temp +=data_array[i]['theme']
                temp +='/'
                temp +=data_array[i]['filename']
                temp +='</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><br><div class="content">'
                var sub_content =  data_array[i]['sub_content'];
                for (var j = 0; j < sub_content.length; j++){
                temp+='<div class="table-cell text-start text-results" data-title="內容">';
                  temp += sub_content[j];
                  temp +='</div>';
        
                }
                temp +='</div>   <div class="modal-footer">   <div class="row align-items-center w-100"> <div class="font-sizing col-6 text-start"> ';
                temp +=' <button type="button" class="size0 btn btn-outline-secondary" onclick="fontSize(0, \'.modal\')">小</button>';
                temp+='<button type="button" class="size1 btn btn-outline-secondary active" onclick="fontSize(1, \'.modal\')">中</button>'
                temp+='<button type="button" class="size2 btn btn-outline-secondary " onclick="fontSize(2, \'.modal\')">大</button>'
                temp +=' </div><div class="col-6 text-end"> <button type="button" class="btn btn-dark" data-bs-dismiss="modal">關閉</button></div> </div></div></div></div></div></div>'
        
        
        
        
        
                temp +='</div>  <div class="table-cell d-table-cell text-start text-result2" data-title="內容">';
                temp +=' <p class="my-2">';
                // 替換非法字元
                var str = data_array[i]['ipu'];
                str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                let result = [str];
                //分割關鍵字
                for (let i = 0; i < search_pattern_arrary.length; i++) {
                var delimiter = search_pattern_arrary[i];
                var tempResult = [];
                for (let j = 0; j < result.length; j++) {
                    var substrings = result[j].split(delimiter);
                    var lastSubstrIndex = substrings.length - 1;
        
                    for (let k = 0; k < substrings.length; k++) {
                    tempResult.push(substrings[k]);
        
                    if (k < lastSubstrIndex) {
                        tempResult.push(delimiter);
                    }
                    }
                }
                
                result = tempResult;
                }
        
                for (var j = 0; j < result.length; j++)
                {
                    if(search_pattern_arrary.includes( result[j])){
                    temp +=' <span class="bg-primary text-white"> ';
                    temp += result[j];
                    temp +=' </span>';
                        }   
                    else{
                        temp += result[j];
                    }
                }
                temp +=' </p></div></div>'
              }
            $('#search_content').html(temp);
        },  
        error: function(error) {
            console.log(error);
        }
    });
}

    



function clean(){
    var inputElement = document.getElementById('main_character');
    inputElement.value = '';

    var numberElement = document.getElementById('number');
    numberElement.value = '';
  
    var selectElements = document.querySelectorAll('.form-select');
    for (var i = 0; i < selectElements.length; i++) {
      selectElements[i].value = "and";
    }
  
    var inputs = document.getElementsByClassName("input_character");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  
    var radioButton = document.querySelector('input[name="character0"][value="1"]');
    radioButton.checked = true;

    // 取得所有條件 div
    const divs = document.querySelectorAll(".table-rows--body-sub");

    // 只留下最後一個條件 div
    for (let i = 0; i < divs.length - 2; i++) {
        divs[i].remove();
    }
  }


function searching_en(){
    var condition=[]

    main_value =document.getElementById("main_character").value;
    search_pattern_arrary=[]
    search_pattern_arrary.push(document.getElementById("main_character").value);
    if(!main_value){
        alert('Please enter search keyword')
        return
      }

    var CheckOptions = [];
    var checkboxes = document.querySelectorAll('input[name="book[]"]:checked');
        checkboxes.forEach(function(checkbox) {
            CheckOptions.push(checkbox.value);
    });
    CheckOptions_value=JSON.stringify(CheckOptions);
    
    var selectedRadio = document.querySelector('input[name="bookAlls"]:checked');
    RadioValue = JSON.stringify(selectedRadio.value);
   

    //抓取搜尋關鍵字
    var inputs = document.getElementsByClassName("input_character");
    var selectElements = document.getElementsByClassName("form-select");
    for (var i = 0; i < inputs.length; i++) {
      var combinedValue = []
      var value = inputs[i].value;
      if(value){
        var selectedValue = selectElements[i].value;
        combinedValue.push(selectedValue);
        if(selectedValue == "or" ||selectedValue == "and"){
            search_pattern_arrary.push(value);
        }
        
        combinedValue.push(value);
        condition.push(combinedValue);   
      }  
    }
    //抓取檢索條件：同一ipu內/鄰近左右ｎ個字內
    var radio=document.querySelectorAll(".m-1")
    mode = "";
    number=document.getElementById("number").value;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            mode = radio[i].value;
            break; // 找到被選取的按鈕後中斷迴圈
        }
    }    
    if(mode==2){
        if(!number){
          alert('Please enter the number of adjacent characters');
          return;
        } 
    }

    conditionJson = JSON.stringify(condition);
    $.ajax({
        url: '/log_search/',
        type: 'POST',
    
        data:{
            "main_value":main_value,
            "check" : RadioValue,
        },
    
        success: function(data) {
              
      },  
      error: function(error) {
          console.log(error);
      }
    
      });
    updatePagination_en(1)
    
}

function updatePagination_en(currentPage){
    $.ajax({
        url: '/search_corpus/',
        type: 'POST',
        dataType: 'json',
        data:{
            "main_value":main_value,
            "mode":mode,
            "text_number":number,
            "condition":conditionJson,
            "checkbox_value": CheckOptions_value,
            "selected_value": RadioValue,
            "page":currentPage
        },
        success: function(data) {
            var find_string = '<div id="searchScope"class="alert px-2 py-1"role="alert"><p class="m-2"><strong>Found '+data['serach_num']+' records / Total of '+ data['total']+' records。</strong></p></div>';
            $('#find_bar').html(find_string);            
            var temp = '';
            temp+='<div class="table-cell d-lg-table-cell d-none">SNO</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none">Source</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none">Audio file identifier</div>';
            temp+='<div class="table-cell d-lg-table-cell d-none text-start text-result2">Contnet</div>';
            $('#search_header').html(temp);
            temp = '<div><a class="badge bg-primary text-light text-decoration-none" href="javascript:void(0);"><i class="bi bi-file-earmark-arrow-up"></i>Export</a></div>';
            $('#search_export').html(temp);
            data_array = JSON.parse(data['search_corpus']);
            var totalPages = Math.ceil(data['serach_num']/50);
            temp = '';
    
            temp +=' <ul class="pagination flex-wrap justify-content-center">';
            if(currentPage== 1){
                temp +=' <li class="page-item disabled">';
            }
            else{
                temp +=' <li class="page-item">';
            }
            temp +='<a class="page-link" onclick="updatePagination_en('
            temp +=currentPage-1;
            temp += ')" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
            temp +=' </li>';
            var sart_page = currentPage-4;
            var  max_page = currentPage+5;
            if(sart_page<=0){
                sart_page=1;
                max_page = 10
            }
            for(var i=sart_page; i <= max_page;i++){
                if(i>totalPages){
                    break;
                }
                if(i == currentPage){
                    temp+=' <li class="page-item active">';
                }
                else{
                    temp+='  <li class="page-item">';
                }
                temp +='<a class="page-link" onclick="updatePagination_en('
                temp +=i;
                temp += ')">';
                temp+=i;
                temp+='</a></li>';
            }
            if(currentPage == totalPages){
                temp +=' <li class="page-item disabled">';
            }
            else{
                temp +=' <li class="page-item">';
            }
            temp+= '<a class="page-link" onclick="updatePagination_en(';
            temp +=currentPage+1;
            temp += ')" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
            temp+=' </li> </ul>'
            $('#Pagination1').html(temp);
            $('#Pagination2').html(temp);
            temp = ''
            for (var i = 0;  i<data_array.length; i++) {
        
                temp +=' <div id="';
                temp += 'content_';
                temp += i+1;
                temp +='"class="table-row table-rows--body  py-1 flex-wrap align-items-center">';
                temp +=' <div class="table-cell d-table-cell" data-title="編號">';
                temp+=i+1+(50*(currentPage-1));
                temp += '</div><div class="table-cell d-table-cell" data-title="語料庫名稱" title="">'
                if(data_array[i]['theme'] == "中研院台灣華語社會語音語料庫") {
                    temp += "Sinica Sociophonetic Corpus";
                }
                else if(data_array[i]['theme'] == "龜兔賽跑NH") {
                    temp +="The Hare and the Tortoise (NH)"
                }
                else{
                    temp +="The Hare and the Tortoise (HI)"
                }
                temp +='</div>';
                temp +='<div class="table-cell d-table-cell" data-title="音檔編號">';
        
                temp+='<a  class="text-keyword2" data-bs-toggle="modal" data-bs-target="#keywordModal' 
                temp+=i+1;
                temp+='">';
                temp += data_array[i]['filename'];
                temp+='</a>';
        
        
                
        
                temp += '<div class="modal fade" id="keywordModal';
                temp+=i+1;
                temp+= '" tabindex="-1" data-bs-backdrop="true"  aria-hidden="true">';
                temp +='<div class="modal-dialog modal-dialog-scrollable modal-xl"><div class="modal-content"> <div class="modal-header"><h5 class="modal-title">';
                temp +=' <h5 class="modal-title">'
                if(data_array[i]['theme'] == "中研院台灣華語社會語音語料庫") {
                    temp += "Sinica Sociophonetic Corpus";
                }
                else if(data_array[i]['theme'] == "龜兔賽跑NH") {
                    temp +="The Hare and the Tortoise (NH)"
                }
                else{
                    temp +="The Hare and the Tortoise (HI)"
                }
                temp +='/'
                temp +=data_array[i]['filename']
                temp +='</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><br><div class="content">'
                var sub_content =  data_array[i]['sub_content'];
                for (var j = 0; j < sub_content.length; j++){
                temp+='<div class="table-cell text-start text-results" data-title="內容">';
                  temp += sub_content[j];
                  temp +='</div>';
        
                }
                temp +='</div>   <div class="modal-footer">   <div class="row align-items-center w-100"> <div class="font-sizing col-6 text-start"> ';
                temp +=' <button type="button" class="size0 btn btn-outline-secondary" onclick="fontSize(0, \'.modal\')">S</button>';
                temp+='<button type="button" class="size1 btn btn-outline-secondary active" onclick="fontSize(1, \'.modal\')">M</button>'
                temp+='<button type="button" class="size2 btn btn-outline-secondary " onclick="fontSize(2, \'.modal\')">L</button>'
                temp +=' </div><div class="col-6 text-end"> <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button></div> </div></div></div></div></div></div>'
        
        
        
        
        
                temp +='</div>  <div class="table-cell d-table-cell text-start text-result2" data-title="內容">';
                temp +=' <p class="my-2">';
                // 替換非法字元
                var str = data_array[i]['ipu'];
                str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                let result = [str];
                //分割關鍵字
                for (let i = 0; i < search_pattern_arrary.length; i++) {
                var delimiter = search_pattern_arrary[i];
                var tempResult = [];
                for (let j = 0; j < result.length; j++) {
                    var substrings = result[j].split(delimiter);
                    var lastSubstrIndex = substrings.length - 1;
        
                    for (let k = 0; k < substrings.length; k++) {
                    tempResult.push(substrings[k]);
        
                    if (k < lastSubstrIndex) {
                        tempResult.push(delimiter);
                    }
                    }
                }
                
                result = tempResult;
                }
        
                for (var j = 0; j < result.length; j++)
                {
                    if(search_pattern_arrary.includes( result[j])){
                    temp +=' <span class="bg-primary text-white"> ';
                    temp += result[j];
                    temp +=' </span>';
                        }   
                    else{
                        temp += result[j];
                    }
                }
                temp +=' </p></div></div>'
              }
            $('#search_content').html(temp);
        },  
        error: function(error) {
            console.log(error);
        }
    });
}