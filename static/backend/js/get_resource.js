function get_resource() {
    $.ajax({
        url: '/backend_get_resource/',
        type: 'GET',
        success: function(response) {

            // Data table
            var table = $('#recordTable1').DataTable({
            data: response,
            columns: [
                { 
                    data: 'FName'  
                  
                },

                { 
                    data: 'Fcontent',
                    render: function(data, type, row) {
                        if(data.length < 10) {
                            return data ;
                        }
                        else{
                            return data.substring(0, 10) +"....";
                        }
                 }
                },
                { 
                    data: 'download_name' ,
                    render: function(data, type, row) {
                        return "<a  href='#' onclick='download_resource(\"" +data+"\")'>" + data + "</a>";
                 }
                },
                { data: 'time'},
                {
                     data: 'id', 
                     render: function(data, type, row) {
                        return "<a  href='#' onclick='delete_resource(\"" +data+"\")'>"+ '<i class="bi bi-x-circle-fill"></i> 刪除</a>';
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