const userTableId = "#userTable";
const userForm = "#userForm";
const userModal = "#userModal";
const phpFunctionUrl = "app/functions/user/";

$(document).ready(function() {
    $(userTableId).DataTable({
        "ajax": {
            "url": phpFunctionUrl+"get-users.php",
            "dataSrc": "data"
        },
        "columns": [
            {data:"id", visible: false},
            {data:function(data){
                return data.firstname + ' ' + data.lastname
            }},
            {data:"email"},
            {data:function(data){
                let formattedTimeAgo = getFormattedTimeAgo(data.created_at);
                return formattedTimeAgo;
            }},
            {data:function(data){
                let buttons = "<button type='button' title='Edit this user' class='btn btn-sm btnEdit' data-id='"+data.id+"'><i class='fa-regular fa-pen-to-square'></i></button>";
                return buttons;
            }, className: "text-center", sorting: false}
        ]
    });

    $(userForm).submit(function(e) {
        e.preventDefault();
        let action = $('#userIdInput').length ? "update" : "create";
        post({
            url: phpFunctionUrl+ (action === "update" ? "update-user.php" : "add-user.php"),
            formData: new FormData(this),
            errorMessage: "Failed to "+action+" user.",
            callback: function(response) {
                if (response.success) {
                    swalSuccess({
                        title: action+"d!",
                        text: response.message,
                        callback: function() {
                            refreshTable(userTableId);
                            $(userForm)[0].reset();
                            $(userModal).modal("toggle");
                        }
                    });
                    return;
                }
                swalError(response.message);
            }
        });
    });
});

$(document).on("click", ".btnCreate", function() {
    $(userModal+"Label").html("Create New User");
    $("#userIdInput").remove();
    $(userForm)[0].reset();
});