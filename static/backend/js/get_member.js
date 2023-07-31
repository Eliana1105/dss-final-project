function get_member() {
    $.ajax({
        url: '/backend_Get_user/',
        type: 'GET',
        success: function(response) {

            // Data table
            var table = $('#recordTable1').DataTable({
            data: response,
            columns: [
                { 
                    data: 'institution'  ,
                    render: function(data, type, row) {
                        if (data) {
                          return data;
                        } else {
                          return '無';
                        }
                      }
                  
                },

                { 
                    data: 'account',
                    render: function(data, type, row) {
                       var accountId = row.id; 
                       return "<a href='/backend_license?id=" + accountId + "'>" + data + "</a>";
                    }
                },
                { data: 'name' },
                { data: 'email'},
                {
                     data: 'phone', 
                     render: function(data, type, row) {
                        if (data) {
                          return data;
                        } else {
                          return '無';
                        }
                      }
                },
                { data: 'end_time' },
                { 
                    data: 'id',
                    
                    render: function(data, type, row) {
                        var rowData = JSON.stringify(row); // Convert the row object to JSON string
                        
                        return '<a href="#" onclick=\'modify(' + rowData + ')\' class="mx-1"><i class="bi bi-pencil-square"></i> 編輯</a>' +
                               '<a  onclick=\'delete_member(' + rowData + ')\'  class="mx-1"><i class="bi bi-x-circle-fill"></i> 刪除</a>';
                      }
                      
                }
            ]
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}