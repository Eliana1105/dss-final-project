var mainJson;
var radioValue;
var number;
var check;
var conditionJson;
function searching1(){
    var main=[]
    var condition=[]
    search_pattern_arrary=[]

    ////抓取主要搜尋關鍵字＆詞性
    var main_value =document.getElementById("main_character").value;
    if(!main_value){
      alert('請輸入檢索關鍵字')
      return
    }
    main.push(main_value);
    var MainselectElement = document.getElementById("myMainSelect");
    var MainselectedValue = MainselectElement.value;
    main.push(MainselectedValue);
    search_pattern_arrary.push(main[0])

    //抓取次要搜尋關鍵字＆搜尋條件＆詞性
    var inputs = document.getElementsByClassName("input_character");
    var selectElements = document.getElementsByClassName("mode");
    var selectPos = document.getElementsByClassName("mySelect");
    for (var i = 0; i < inputs.length; i++) {
        var combinedValue = []
        var value = inputs[i].value;
        if(value){
          var selectedValue = selectElements[i].value;
          var selectedPosValue = selectPos[i].value;
          combinedValue.push(selectedValue);
          combinedValue.push(value);
          combinedValue.push(selectedPosValue);
          if(selectedValue == "or" ||selectedValue == "and"){
            search_pattern_arrary.push(value);
        }         
          condition.push(combinedValue);             
        }  
      }
    console.log(search_pattern_arrary)

    //抓取檢索條件：同一ipu內/鄰近左右ｎ個字內 (同一語者)/ (跨語者)
    var radio=document.querySelectorAll(".m-1")
    radioValue = "";
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            radioValue = radio[i].value;
            break; // 找到被選取的按鈕後中斷迴圈
        }
    }    
    if( !$("#text1").prop("disabled"))
    {
      number=$("#text1  ").val();
    }
    if( !$("#text2").prop("disabled"))
    {
      number=$("#text2").val();
    }
    if(radioValue==2 || radioValue==3){
      if(!number){
        alert('請輸入相鄰的字數')
        return
      }
    }

    check=[];
    for(var i = 1 ;i<=4;i++){
      if($('#checkbox'+i).is(":checked")){
        check.push('checkbox'+i)
      }
    }
    mainJson = JSON.stringify(main);
    conditionJson = JSON.stringify(condition);
    check = JSON.stringify(check);
    var selectedRadio = document.querySelector('input[name="bookAlls"]:checked');
    RadioValue = JSON.stringify(selectedRadio.value);
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

    updatePagination(1)

    
}
function updatePagination(currentPage){
  $.ajax({
    url: '/search_MHcorpus/',
    type: 'POST',

    data:{
        "main":mainJson,
        "mode":radioValue,
        "text_number":number,
        "check" : check,
        "condition":conditionJson,
        "page":currentPage-1
    },

    success: function(data) {
      var find_string = '<div id="searchScope"class="alert px-2 py-1"role="alert"><p class="m-2"><strong>找到'+data['serach_num']+' 筆 / 總共'+ data['total']+' 筆。</strong></p></div>';
      $('#find_bar').html(find_string);
      var temp = '';
      temp+='<div class="table-cell d-lg-table-cell d-none">編號</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">出處</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">對話編號</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">語者</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none text-start text-result2">內容</div>';
      $('#search_header').html(temp);
      temp = '<div><a class="badge bg-primary text-light text-decoration-none" href="javascript:void(0);"><i class="bi bi-file-earmark-arrow-up"></i> 匯出</a></div>';
      $('#search_export').html(temp);
      var data_array = JSON.parse(data['search_corpus']);
      temp="";          
      var totalPages = Math.ceil(data['serach_num']/5);
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
  temp = '';
  for (var i = 0; i < data_array.length; i++) {
    temp +='  <div id="'
    temp += 'content_';
    temp += i+1;
    temp +='"class="table-row table-rows--body d-flex py-1 flex-wrap align-items-start">';
    temp+=' <div class="table-cell d-table-cell" data-title="編號"><p class="my-md-2 my-0">';
    temp+=i+1+(5*(currentPage-1));
    mytheme="";
    temp+='</p></div>';
    temp+='<div class="table-cell d-table-cell" data-title="語料庫名稱" title="主題語料庫"><p class="my-md-2 my-0">';
    if (data_array[i]['theme']== 'MTCC') {
      temp +="現代漢語主題對話語音語料庫 MTCC";
      mytheme = "現代漢語主題對話語音語料庫 MTCC"
    }
    else if ( data_array[i]['theme']=='MCDC_8'){
      temp +="現代漢語連續口語對話語音語料庫 MCDC8";
      mytheme = "現代漢語連續口語對話語音語料庫 MCDC8"
    }
    else if ( data_array[i]['theme']=='MCDC_22'){
      temp +="現代漢語連續口語對話語音語料庫 MCDC22";
      mytheme = "現代漢語連續口語對話語音語料庫 MCDC22"
    }
    else{
      mytheme = "現代漢語地圖導引口語語音語料庫 MMTC"
      temp +="現代漢語地圖導引口語語音語料庫 MMTC";
    }
    temp+='</p></div>';
    temp+='<div class="table-cell d-table-cell" data-title="對話編號"><p class="my-md-2 my-0">';
    temp+='<a  class="text-keyword2" data-bs-toggle="modal" data-bs-target="#keywordModal' 
    temp+=i+1;
    temp+='">';
    temp += data_array[i]['talk_id'];
    temp+='</a>';



    temp += '<div class="modal fade" id="keywordModal';
    temp+=i+1;
    temp+= '" tabindex="-1" data-bs-backdrop="true"  aria-hidden="true">';
    temp +='<div class="modal-dialog modal-dialog-scrollable modal-xl"><div class="modal-content"> <div class="modal-header"><h5 class="modal-title">';
    temp +=' <h5 class="modal-title">'
    temp +=mytheme
    temp +='/'
    temp +=data_array[i]['talk_id']
    temp +='</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><br><div class="content">'
    var sub_content =  data_array[i]['sub_content'];
    for (var j = 0; j < sub_content.length; j++){
      if(sub_content[j]['speaker'] == 'A'){
        temp+='<div class="d-flex"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> A</p>';
        temp+=' </div>'
        temp+='<div class="table-cell text-start text-results" data-title="內容">'
      }
      else {
        temp+='<div class="d-flex  align-items-start"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> B</p>';
        temp+=' </div>';
        temp+='<div class="table-cell text-start text-results" data-title="內容">';
      }
      temp +='<p class="my-2"> <span class="border border-info bg-info bg-opacity-10 px-1 me-2">漢</span>';
      temp += sub_content[j]['ipu'];
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-success bg-success bg-opacity-10 px-1 me-2">拼</span>';
      temp += sub_content[j]['pinyin'];
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-warning bg-warning bg-opacity-10 px-1 me-2">POS</span>';
      temp+=sub_content[j]['pos'];
      temp +='</p> </div> </div>';

    }
    temp +='</div>   <div class="modal-footer">   <div class="row align-items-center w-100"> <div class="font-sizing col-6 text-start"> ';
    temp +=' <button type="button" class="size0 btn btn-outline-secondary" onclick="fontSize(0, \'.modal\')">小</button>';
    temp+='<button type="button" class="size1 btn btn-outline-secondary active" onclick="fontSize(1, \'.modal\')">中</button>'
    temp+='<button type="button" class="size2 btn btn-outline-secondary " onclick="fontSize(2, \'.modal\')">大</button>'
    temp +=' </div><div class="col-6 text-end"> <button type="button" class="btn btn-dark" data-bs-dismiss="modal">關閉</button></div> </div></div></div></div></div></div>'
    temp+='</p></div>';
    temp +=' <div class="table-cell d-table-cell text-content">';
    var content =  data_array[i]['content'];
    for (var j = 0; j < content.length; j++){
      if(content[j]['speaker'] == 'A'){
        temp+='<div class="d-flex"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> A</p>';
        temp+=' </div>'
        temp+='<div class="table-cell text-start text-results" data-title="內容">'
      }
      else {
        temp+='<div class="d-flex  align-items-start"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> B</p>';
        temp+=' </div>';
        temp+='<div class="table-cell text-start text-results" data-title="內容">';
      }
      temp +='<p class="my-2"> <span class="border border-info bg-info bg-opacity-10 px-1 me-2">漢</span>';
      var str = content[j]['ipu'];
      str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      let result = [str];
      //分割關鍵字
      for (let k = 0; k < search_pattern_arrary.length; k++) {
        var delimiter = search_pattern_arrary[k];
        var tempResult = [];
        for (let j = 0; j < result.length; j++) {
            var substrings = result[j].split(delimiter);
            var lastSubstrIndex = substrings.length - 1;

            for (let g = 0; g < substrings.length; g++) {
            tempResult.push(substrings[g]);

            if (g < lastSubstrIndex) {
                tempResult.push(delimiter);
            }
            }
        }
        
          result = tempResult;
      }

      for (var h = 0; h < result.length; h++)
      {
          if(search_pattern_arrary.includes( result[h])){
          temp +='<span class="bg-primary text-white">';
          temp += result[h];
          temp +=' </span>';
              }   
          else{
              temp += result[h];
          }
      }
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-success bg-success bg-opacity-10 px-1 me-2">拼</span>';
      str = content[j]['pinyin'];
      let result2 = [str];
      //分割關鍵字
      for (let k = 0; k < search_pattern_arrary.length; k++) {
        var delimiter = search_pattern_arrary[k];
        var tempResult = [];
        for (let j = 0; j < result2.length; j++) {
            var substrings = result2[j].split(delimiter);
            var lastSubstrIndex = substrings.length - 1;

            for (let g = 0; g < substrings.length; g++) {
            tempResult.push(substrings[g]);

            if (g < lastSubstrIndex) {
                tempResult.push(delimiter);
            }
            }
        }
        
        result2 = tempResult;
      }

      for (var h = 0; h < result2.length; h++)
      {
          if(search_pattern_arrary.includes( result2[h])){
          temp +='<span class="bg-primary text-white">';
          temp += result2[h];
          temp +=' </span>';
              }   
          else{
              temp += result2[h];
          }
      }
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-warning bg-warning bg-opacity-10 px-1 me-2">POS</span>';
      temp+=content[j]['pos'];
      temp +='</p> </div> </div>';

    }     
    temp+='</div></div> ';
  }
    $('#search_content').html(temp);
          
  },  
  error: function(error) {
      console.log(error);
  }

  });

  
}
function clean1(){

  var inputElement = document.getElementById('main_character');

  inputElement.value = '';

  var selectElement = document.getElementById('myMainSelect');
  selectElement.value = "";

  var radioButton = document.querySelector('input[name="character0"][value="1"]');
  radioButton.checked = true;

  var text1Element = document.getElementById('text1');
  text1Element.value = '';

  var text2Element = document.getElementById('text2');
  text2Element.value = '';

  var selectElements = document.querySelectorAll('.form-select.mode');
  for (var i = 0; i < selectElements.length; i++) {
    selectElements[i].value = "and";
  }

  var inputs = document.getElementsByClassName("input_character");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }

  var selectPos = document.getElementsByClassName("mySelect");
  for (var i = 0; i < selectPos.length; i++) {
    selectPos[i].value = "";
  }

  // 取得所有條件 div
  const divs = document.querySelectorAll(".table-rows--body-sub");

  // 只留下最後一個條件 div
  for (let i = 0; i < divs.length - 2; i++) {
    divs[i].remove();
  }
  
}
function removet2(){
  var text2Element = document.getElementById('text2');
  text2Element.value = '';
}
function removet1(){
  var text1Element = document.getElementById('text1');
  text1Element.value = '';
}



function searching1_en(){
  var main=[]
  var condition=[]
  search_pattern_arrary=[]
  ////抓取主要搜尋關鍵字＆詞性
  var main_value =document.getElementById("main_character").value;
  if(!main_value){
    alert('Please enter search keyword')
    return
  }
  main.push(main_value);
  var MainselectElement = document.getElementById("myMainSelect");
  var MainselectedValue = MainselectElement.value;
  main.push(MainselectedValue);
  search_pattern_arrary.push(main[0])

  //抓取次要搜尋關鍵字＆搜尋條件＆詞性
  var inputs = document.getElementsByClassName("input_character");
  var selectElements = document.getElementsByClassName("mode");
  var selectPos = document.getElementsByClassName("mySelect");
  for (var i = 0; i < inputs.length; i++) {
      var combinedValue = []
      var value = inputs[i].value;
      if(value){
        var selectedValue = selectElements[i].value;
        var selectedPosValue = selectPos[i].value;
        combinedValue.push(selectedValue);
        combinedValue.push(value);
        combinedValue.push(selectedPosValue);
        if(selectedValue == "or" ||selectedValue == "and"){
          search_pattern_arrary.push(value);
      }         
        condition.push(combinedValue);             
      }  
    }
  console.log(search_pattern_arrary)

  //抓取檢索條件：同一ipu內/鄰近左右ｎ個字內 (同一語者)/ (跨語者)
  var radio=document.querySelectorAll(".m-1")
  radioValue = "";
  for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
          radioValue = radio[i].value;
          break; // 找到被選取的按鈕後中斷迴圈
      }
  }    
  if( !$("#text1").prop("disabled"))
  {
    number=$("#text1  ").val();
  }
  if( !$("#text2").prop("disabled"))
  {
    number=$("#text2").val();
  }
  if(radioValue==2 || radioValue==3){
    if(!number){
      alert('Please enter the number of adjacent characters');
      return;
    }
  }

  check=[];
  for(var i = 1 ;i<=4;i++){
    if($('#checkbox'+i).is(":checked")){
      check.push('checkbox'+i)
    }
  }
  mainJson = JSON.stringify(main);
  conditionJson = JSON.stringify(condition);
  check = JSON.stringify(check);

  $.ajax({
    url: '/log_search/',
    type: 'POST',

    data:{
        "main_value":main_value,
        "check" : radioValue,
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
    url: '/search_MHcorpus/',
    type: 'POST',

    data:{
        "main":mainJson,
        "mode":radioValue,
        "text_number":number,
        "check" : check,
        "condition":conditionJson,
        "page":currentPage-1
    },

    success: function(data) {
      var find_string = '<div id="searchScope"class="alert px-2 py-1"role="alert"><p class="m-2"><strong>Found '+data['serach_num']+' records / Total of '+ data['total']+' records。</strong></p></div>';
      $('#find_bar').html(find_string);
      var temp = '';
      temp+='<div class="table-cell d-lg-table-cell d-none">SNO.</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">Source</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">Talk_ID</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none">Speaker</div>';
      temp+='<div class="table-cell d-lg-table-cell d-none text-start text-result2">Content</div>';
      $('#search_header').html(temp);
      temp = '<div><a class="badge bg-primary text-light text-decoration-none" href="javascript:void(0);"><i class="bi bi-file-earmark-arrow-up"></i> Export</a></div>';
      $('#search_export').html(temp);
      var data_array = JSON.parse(data['search_corpus']);
      temp="";          
      var totalPages = Math.ceil(data['serach_num']/5);
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
  temp = '';
  for (var i = 0; i < data_array.length; i++) {
    temp +='  <div id="'
    temp += 'content_';
    temp += i+1;
    temp +='"class="table-row table-rows--body d-flex py-1 flex-wrap align-items-start">';
    temp+=' <div class="table-cell d-table-cell" data-title="編號"><p class="my-md-2 my-0">';
    temp+=i+1+(5*(currentPage-1));
    mytheme="";
    temp+='</p></div>';
    temp+='<div class="table-cell d-table-cell" data-title="語料庫名稱" title="主題語料庫"><p class="my-md-2 my-0">';
    if (data_array[i]['theme']== 'MTCC') {
      temp +="Mandarin Topic-oriented Conversational Corpus (MTCC)";
      mytheme = "Mandarin Topic-oriented Conversational Corpus (MTCC)"
    }
    else if ( data_array[i]['theme']=='MCDC_8'){
      temp +="Mandarin Conversational Dialgoue Corpus (MCDC8)";
      mytheme = "Mandarin Conversational Dialgoue Corpus (MCDC8)"
    }
    else if ( data_array[i]['theme']=='MCDC_22'){
      temp +="Mandarin Conversational Dialogue Corpus (MCDC22)";
      mytheme = "Mandarin Conversational Dialogue Corpus (MCDC22)"
    }
    else{
      mytheme = "Mandarin Map Task Corpus (MMTC)"
      temp +="Mandarin Map Task Corpus (MMTC)";
    }
    temp+='</p></div>';
    temp+='<div class="table-cell d-table-cell" data-title="對話編號"><p class="my-md-2 my-0">';
    temp+='<a  class="text-keyword2" data-bs-toggle="modal" data-bs-target="#keywordModal' 
    temp+=i+1;
    temp+='">';
    temp += data_array[i]['talk_id'];
    temp+='</a>';



    temp += '<div class="modal fade" id="keywordModal';
    temp+=i+1;
    temp+= '" tabindex="-1" data-bs-backdrop="true"  aria-hidden="true">';
    temp +='<div class="modal-dialog modal-dialog-scrollable modal-xl"><div class="modal-content"> <div class="modal-header"><h5 class="modal-title">';
    temp +=' <h5 class="modal-title">'
    temp +=mytheme
    temp +='/'
    temp +=data_array[i]['talk_id']
    temp +='</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><br><div class="content">'
    var sub_content =  data_array[i]['sub_content'];
    for (var j = 0; j < sub_content.length; j++){
      if(sub_content[j]['speaker'] == 'A'){
        temp+='<div class="d-flex"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> A</p>';
        temp+=' </div>'
        temp+='<div class="table-cell text-start text-results" data-title="內容">'
      }
      else {
        temp+='<div class="d-flex  align-items-start"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> B</p>';
        temp+=' </div>';
        temp+='<div class="table-cell text-start text-results" data-title="內容">';
      }
      temp +='<p class="my-2"> <span class="border border-info bg-info bg-opacity-10 px-1 me-2">漢</span>';
      temp += sub_content[j]['ipu'];
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-success bg-success bg-opacity-10 px-1 me-2">拼</span>';
      temp += sub_content[j]['pinyin'];
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-warning bg-warning bg-opacity-10 px-1 me-2">POS</span>';
      temp+=sub_content[j]['pos'];
      temp +='</p> </div> </div>';

    }
    temp +='</div>   <div class="modal-footer">   <div class="row align-items-center w-100"> <div class="font-sizing col-6 text-start"> ';
    temp +=' <button type="button" class="size0 btn btn-outline-secondary" onclick="fontSize(0, \'.modal\')">S</button>';
    temp+='<button type="button" class="size1 btn btn-outline-secondary active" onclick="fontSize(1, \'.modal\')">M</button>'
    temp+='<button type="button" class="size2 btn btn-outline-secondary " onclick="fontSize(2, \'.modal\')">L</button>'
    temp +=' </div><div class="col-6 text-end"> <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button></div> </div></div></div></div></div></div>'
    temp+='</p></div>';
    temp +=' <div class="table-cell d-table-cell text-content">';
    var content =  data_array[i]['content'];
    for (var j = 0; j < content.length; j++){
      if(content[j]['speaker'] == 'A'){
        temp+='<div class="d-flex"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> A</p>';
        temp+=' </div>'
        temp+='<div class="table-cell text-start text-results" data-title="內容">'
      }
      else {
        temp+='<div class="d-flex  align-items-start"> <div class="table-cell text-talks" data-title="語者">'
        temp +='<p class="my-2 text-primary"><i class="bi bi-person-fill"></i> B</p>';
        temp+=' </div>';
        temp+='<div class="table-cell text-start text-results" data-title="內容">';
      }
      temp +='<p class="my-2"> <span class="border border-info bg-info bg-opacity-10 px-1 me-2">漢</span>';
      var str = content[j]['ipu'];
      str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      let result = [str];
      //分割關鍵字
      for (let k = 0; k < search_pattern_arrary.length; k++) {
        var delimiter = search_pattern_arrary[k];
        var tempResult = [];
        for (let j = 0; j < result.length; j++) {
            var substrings = result[j].split(delimiter);
            var lastSubstrIndex = substrings.length - 1;

            for (let g = 0; g < substrings.length; g++) {
            tempResult.push(substrings[g]);

            if (g < lastSubstrIndex) {
                tempResult.push(delimiter);
            }
            }
        }
        
          result = tempResult;
      }

      for (var h = 0; h < result.length; h++)
      {
          if(search_pattern_arrary.includes( result[h])){
          temp +='<span class="bg-primary text-white">';
          temp += result[h];
          temp +=' </span>';
              }   
          else{
              temp += result[h];
          }
      }
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-success bg-success bg-opacity-10 px-1 me-2">拼</span>';
      str = content[j]['pinyin'];
      let result2 = [str];
      //分割關鍵字
      for (let k = 0; k < search_pattern_arrary.length; k++) {
        var delimiter = search_pattern_arrary[k];
        var tempResult = [];
        for (let j = 0; j < result2.length; j++) {
            var substrings = result2[j].split(delimiter);
            var lastSubstrIndex = substrings.length - 1;

            for (let g = 0; g < substrings.length; g++) {
            tempResult.push(substrings[g]);

            if (g < lastSubstrIndex) {
                tempResult.push(delimiter);
            }
            }
        }
        
        result2 = tempResult;
      }

      for (var h = 0; h < result2.length; h++)
      {
          if(search_pattern_arrary.includes( result2[h])){
          temp +='<span class="bg-primary text-white">';
          temp += result2[h];
          temp +=' </span>';
              }   
          else{
              temp += result2[h];
          }
      }
      temp +='</p>';
      temp +='<p class="my-2"> <span class="border border-warning bg-warning bg-opacity-10 px-1 me-2">POS</span>';
      temp+=content[j]['pos'];
      temp +='</p> </div> </div>';

    }     
    temp+='</div></div> ';
  }
    $('#search_content').html(temp);
          
  },  
  error: function(error) {
      console.log(error);
  }

  });

  
}


