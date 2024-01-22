function sweetAlert(swal, callback = null) {
    Swal.fire({
        'title': swal.title != undefined ? swal.title : 'Done',
        'text': swal.message,
        'icon': swal.icon != undefined ? swal.icon : 'success'
    }).then((result) => {
        if (callback) {
            callback(result);
        }
    });
}

function swalSuccess(parameters) {
    Swal.fire({
        'title': parameters.title,
        'text': parameters.message,
        'icon': 'success'
    }).then((result) => {
        if (parameters.callback) {
            parameters.callback(result)
        }
    });
}

function swalError(message = "Something went wrong!") {
    Swal.fire({
        'title': 'Ooops!',
        'text': message,
        'icon': 'error'
    });
}

function refreshTable($tableId) {
    $($tableId).DataTable().ajax(null, false);
}

// ------------------------------------------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', event => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});
