function updateSelection(selectedValue, selectionObject) {
  for (var key in selectionObject) {
      selectionObject[key] = 0;
  }
  if (selectedValue in selectionObject) {
      selectionObject[selectedValue] = 1;
  }
}
function search() {
  var selections = {
    'regionstatus':{
      'North': 0,
      'Central': 0,
      'South': 0,
      'East': 0
    },
    'humidity': {
        'Dry': 0,
        'Moderate': 0,
        'Moist': 0
    },
    'temperature': {
        '10-15': 0,
        '16-27': 0,
        '28-32': 0
    },
    'season': {
        'Spring': 0,
        'Summer': 0,
        'Autumn': 0,
        'Winter': 0
    },
    'difficulty': {
        'Easy': 0,
        'Moderate': 0,
        'Difficult': 0
    },
    'irrigation': {
        'Insufficient': 0,
        'Moderate': 0,
        'Adequate': 0
    }
};
updateSelection($('#regionSelect').val(), selections.regionstatus);
updateSelection($('#humiditySelect').val(), selections.humidity);
updateSelection($('#temperatureSelect').val(), selections.temperature);
updateSelection($('#seasonSelect').val(), selections.season);
updateSelection($('#difficultySelect').val(), selections.difficulty);
updateSelection($('#irrigationSelect').val(), selections.irrigation);
  $.ajax({
      url: "/search/",
      type: "POST",
      dataType: "json",
      data:{
        "mydata":selections,
      },
      success: function(data){
        let first = data['data']['first'];
        let second = data['data']['second'];
        let third = data['data']['third'];     
        let res = `/result?suggestedCrops=["${first}", "${second}", "${third}"]`;
        document.location.href=res;
      }
  });
}