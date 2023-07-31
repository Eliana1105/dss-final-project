function updateSelectedOption(option) {
  localStorage.setItem('selectedOption', option.value);

  if (option.value === '1') {
    document.getElementById('checkbox1').checked = true;
    document.getElementById('checkbox2').checked = true;
    document.getElementById('checkbox3').checked = true;
    document.getElementById('checkbox4').checked = true;
    document.getElementById('checkbox5').checked = false;
    document.getElementById('checkbox6').checked = false;
  } else if (option.value === '3') {
    document.getElementById('checkbox5').checked = true;
    document.getElementById('checkbox6').checked = true;
    document.getElementById('checkbox1').checked = false;
    document.getElementById('checkbox2').checked = false;
    document.getElementById('checkbox3').checked = false;
    document.getElementById('checkbox4').checked = false;
  }

  var CheckOptions = [];
  var checkboxes = document.querySelectorAll('input[name="book[]"]:checked');
  checkboxes.forEach(function(checkbox) {
    CheckOptions.push(checkbox.value);
  });
  localStorage.setItem('CheckOptions', JSON.stringify(CheckOptions));

}

function updateCheckOptions(checkbox) {
  var CheckOptions = [];
  var checkboxes = document.querySelectorAll('input[name="book[]"]:checked');
  checkboxes.forEach(function(checkbox) {
    CheckOptions.push(checkbox.value);
  });
  localStorage.setItem('CheckOptions', JSON.stringify(CheckOptions));

}



document.addEventListener('DOMContentLoaded', function() {
    var selectedOption = localStorage.getItem('selectedOption');
    if (selectedOption) {
        var option = document.querySelector('input[name="bookAlls"][value="' + selectedOption + '"]');
        if (option) {
            option.checked = true;
        }
    }

    var CheckOptions = localStorage.getItem('CheckOptions');
    if (CheckOptions) {
        temp = [1,2,3,4,5,6]
        for (var i=0 ;i<temp.length;i++){
          var checkbox = document.querySelector('input[name="book[]"][value="' + temp[i] + '"]');
          checkbox.checked = false;
        }
        CheckOptions = JSON.parse(CheckOptions);

        CheckOptions.forEach(function(option) {
        
        var checkbox = document.querySelector('input[name="book[]"][value="' + option + '"]');
        if (checkbox) {
            checkbox.checked = true;
        }
        });
    }
});
  
function navigateToPage() {
  var selectedOption = document.querySelector('input[name="bookAlls"]:checked');
  var currentPageURL = window.location.href;
  currentPageURL=currentPageURL.split('/')
  currentPageName= currentPageURL.pop()
  if(!currentPageName){
    currentPageName= currentPageURL.pop()
  }
  console.log(currentPageName)
  if (selectedOption) {
    console.log('選中的選項：', selectedOption.value);
    if (selectedOption.value === '1') {
      if(currentPageName !='search_ch')
      {
        document.location.href = "/search_ch";
      }
    } 
    else {
      if(currentPageName !='search2_ch')
      {
       document.location.href = "/search2_ch";
      }
    }
  } else {
    console.log('請選擇一個選項');
  }
}



  
