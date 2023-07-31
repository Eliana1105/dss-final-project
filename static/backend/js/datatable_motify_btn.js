function modify(data) {
    let jsonString = JSON.stringify(data);
    jsonString = jsonString.trim();
  
    if (!jsonString.startsWith('{')) {
      jsonString = jsonString.slice(jsonString.indexOf('{'));
    }
  
    if (!jsonString.endsWith('}')) {
      jsonString = jsonString.slice(0, jsonString.lastIndexOf('}') + 1);
    }
  
    const row = JSON.parse(jsonString);
    // Access individual values from the row object
    window.cid = row.id;
    window.email = row.email;
    window.account = row.account;
    $(inputName).val(row.name);
    $(inputAccount).val(row.account);
    $(inputUnit).val(row.institution);
    $(inputEmail).val(row.email);
    $(inputTel).val(row.phone);
  
  }