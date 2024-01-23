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
        "title": "Ooops!",
        "text": message,
        "icon": "error"
    });
}

function refreshTable(tableId) {
    $(tableId).DataTable().ajax.reload(null, false);
}

function get(parameters) {
    checker(parameters);

    $.ajax({
        "url": parameters.url,
        "method": "GET",
        "dataType": "JSON"
    }).done(function(response) {
        parameters.callback(response);
    }).fail(function(response) {
        console.log(response);
        parameters.errorMessage != undefined ? swalError(parameters.errorMessage) : swalError();
    })
}

function post(parameters) {
    checker(parameters)

    $.ajax({
        "url": parameters.url,
        "method": "POST",
        "data": parameters.formData,
        "processData": false,
        "contentType": false,
        "dataType": "JSON"
    }).done(function(response) {
        parameters.callback(response);
    }).fail(function(response) {
        console.log(response);
        parameters.errorMessage != undefined ? swalError(parameters.errorMessage) : swalError();
    });
}

function checker(parameters) {
    if (!parameters) {
        throw "Properties not set.";
    }
    
    if (!parameters.url) {
        throw "AJAX URL not set.";
    }

    if (!parameters.callback) {
        throw "callback function not set."
    }
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

function getFormattedTimeAgo(timestamps) {
    let dateObject = new Date(timestamps);
    let currentDateTime = new Date();
    let secondsAgo = Math.floor((currentDateTime - dateObject) / 1000);

    if (secondsAgo < 60) {
        return secondsAgo + ' seconds ago';
    } else if (secondsAgo < 3600) {
        let minutesAgo = Math.floor(secondsAgo / 60);
        return minutesAgo + ' minute' + (minutesAgo === 1 ? '' : 's') + ' ago';
    } else if (secondsAgo < 86400) {
        let hoursAgo = Math.floor(secondsAgo / 3600);
        return hoursAgo + ' hour' + (hoursAgo === 1 ? '' : 's') + ' ago';
    } else if (secondsAgo < 2592000) {  // 30 days
        let daysAgo = Math.floor(secondsAgo / 86400);
        return daysAgo + ' day' + (daysAgo === 1 ? '' : 's') + ' ago';
    } else if (secondsAgo < 31536000) {  // 365 days
        let monthsAgo = Math.floor(secondsAgo / 2592000);
        return monthsAgo + ' month' + (monthsAgo === 1 ? '' : 's') + ' ago';
    } else {
        let yearsAgo = Math.floor(secondsAgo / 31536000);
        return yearsAgo + ' year' + (yearsAgo === 1 ? '' : 's') + ' ago';
    }
}
