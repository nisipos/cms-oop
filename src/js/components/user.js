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
                let status = "";
                let status_color = "";
                if (data.is_active == 1) {
                    status = "Active";
                    status_color = "success";
                }
                if (data.is_active == 0) {
                    status = "Inactive";
                    status_color = "danger"
                }
                let label = '<span class="badge rouded-pill bg-'+status_color+'">'+status+'</span>';
                return label;
            }, className: "text-center"},
            {data:function(data){
                let formattedTimeAgo = getFormattedTimeAgo(data.created_at);
                return formattedTimeAgo;
            }},
            {data:function(data){
                let buttons = "<button type='button' title='Edit this user' class='btn btn-sm btnEdit' data-id='"+data.id+"'><i class='fa-regular fa-pen-to-square'></i></button>";
                return buttons;
            }, className: "text-center", sorting: false}
        ],
        responsive: true
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

$(document).on("click", ".btnEdit", function() {
    let id = $(this).attr("data-id");
    $("#userCreationNote").hide();
  
    $.ajax({
        "url": phpFunctionUrl+"get-user.php",
        data: {"id":id},
        "method": "GET",
        "dataType": "json"
    }).done(function(data){
        $(userModal+"Label").html("Edit "+data.username);
        $("#userIdInput").remove();
        $('<input>').attr({
            type: "hidden",
            id: "userIdInput",
            name: "userId",
            value: id
        }).prependTo(userForm);
  
        $("#firstNameInput").val(data.firstname);
        $("#lastNameInput").val(data.lastname);
        $("#emailInput").val(data.email);
        $(userModal).modal("toggle");
    }).fail(function(response){
        Swal.fire('Ooops!', 'Failed to retrieve user.', 'error');
        console.log(response)
    });
});

$(document).on("click", ".btnCreate", function() {
    $(userModal+"Label").html("Create New User");
    $("#userIdInput").remove();
    $(userForm)[0].reset();
    $("#userCreationNote").show();
});