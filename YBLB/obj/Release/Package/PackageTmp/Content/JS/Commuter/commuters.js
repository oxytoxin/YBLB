$(document).ready(function () {

    _load_commuter_data();
    _event_commuter();
    Comm_events();

});


function _load_commuter_data() {
    var userID = sessionStorage.getItem("userID");
    GetPaymentList(userID);
    _loadGetTermRoute();
    _loadTermDestCommuter();
    GetAnnoucement();
    numberOnly('#t-passenger-i');
    numberOnly('#t-comp-i');
    $('.bkd-hide').hide();
}

function Comm_events() {

    $('#t-passenger-i').keyup((e) => {
        var data = e.currentTarget.value;
        var _t = data * $('#fare-total-amount-c').text();
        $('#tf-pass').text(_t);
        var ressult_ = parseFloat($('#tf-pass').text()) + parseFloat($('#tf-comp').text())
        $('#tf-tamount').text(ressult_ === 'NaN' ? '0' : ressult_);
    });

    $('#t-comp-i').keyup((e) => {
        var data = e.currentTarget.value;
        var _t = data * $('#fare-total-comp-c').text();
        $('#tf-comp').text(_t);
        var ressult_ = parseFloat($('#tf-comp').text()) + parseFloat($('#tf-pass').text());
        $('#tf-tamount').text(ressult_ === 'NaN' ? '0' : ressult_);
    });

}

function FareCompute() {
    var result = $('#t-passenger-i').text() * $('#fare-total-amount-c').text();
    $('#tf-pass').text(result);
}


function GetPaymentList(userIDs) {
    var obj = {
        id: userIDs
    };
    $.get("/Commuters/GetPaymentList", obj , function (data) {
        const _data = JSON.parse(data);
        console.log(_data.Data);
        $('.ticket-comm-container1').html('');
        $.each(_data.Data, function (index, value) {

            var isPaid = '';
            var statusClass = '';

            if (value.isPaid === 0) {
                isPaid = 'Unpaid - Please Settle now!';
                statusClass = 'bg-danger';
            }

            if (value.isPaid === 1) {
                isPaid = 'Paid';
                statusClass = 'bg-success';
            }

            if (value.isPaid === 2) {
                isPaid = 'Pending Request';
                statusClass = 'bg-warning';
            }


            var o_layout = `<div class="card mb-2">
                            <div class="card-body">
                                <p>REFERENCE: <text>${value.REFERENCES}</text></p>
                                <small>Terminal :&nbsp;<small>${value.startPoint} - ${value.endPoint}</small></small><br>
                                <small>Distance:&nbsp;<small>${value.Distance} KM</small></small><br>
                                <small>DateTime:&nbsp;<small>${value.Date} - ${value.Time}</small></small><br>
                                <div class="p-1 mb-2 ${statusClass} bg-gradient text-white">${isPaid}</div>
                                <button type="button" class="btn btn-outline-success pay-ticket-comm" data-bkid="${value.bookingID}" data-ref="${value.REFERENCES}" data-mdb-ripple-color="dark">Pay Ticket!</button>
                                <button type="button" class="btn btn-outline-primary view-ticket-comm" data-mdb-ripple-color="dark">View Ticket</button>
                            </div>
                        </div>`;
            $('.ticket-comm-container1').prepend(o_layout);
        });

        $('.pay-ticket-comm').off().on('click', function () {
            var ref = $(this).attr('data-ref');
            var bkid = $(this).attr('data-bkid');
            $('.lead-bkid').val(bkid);
            $('.lead-ref').val(ref);
            $('#verify-modal').modal('show');
        });

        $('.view-ticket-comm').off().on('click', function () {
            alert('test');
        });

    });

}


function GetAnnoucement() {
    $.get("/Commuters/GetAnnouncement", function (data) {
        const obj = JSON.parse(data);
        $('.ann-container-commuters').html('');
        $.each(obj.Data, function (index, value) {
            var o_layout = `<div class="card mb-2">
                            <div style="padding:5px;">
                                 <h5 class="card-title">${value.uCname}&nbsp;<small style="font-size:10px;">${value.announceDate}</small></h5>
                            </div>
                           
                            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src="/FilesUpload/${value.imgPath}" class="img-fluid"/>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${value.announcement}</p>
                                <small>200 Likes</small><br>
                                <button type="button" class="btn btn-default btn-floating mt-2">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </button>
                                <button id="" type="button" class="btn btn-outline-info btn-rounded iqr-modaler" data-annID="${value.announceID}" data-mdb-ripple-color="dark">Inquiries</button>
                            </div>
                        </div>`;
            $('.ann-container-commuters').prepend(o_layout);
        });

        $('.iqr-modaler').click(function () {
            var id = $(this).attr('data-annID');
            $('#iqr-modal').modal('show');
        });



    });


}


function _event_commuter() {
    var userID = sessionStorage.getItem("userID");
    var dispatchIDGlobal = 0;

    if (userID === null) { }
    else {
        GetGeneral(userID);
    }
    
    $("#btn-logout-form").off().on("click", function () {
        sessionStorage.setItem("userID", "0");
        document.location.href = '/Auth/Login';
    });

    $("#modal-filter-route-btn").on("click", function () {
        $('#filter-route-to-book-modal').modal('show');
    });

    $(".btn-filter-route-com").on("click", function () {
        _GetDispatchRoute_com();
        $('#filter-route-to-book-modal').modal('hide');
    });

    $(".btn-show-details").on("click", function () {
      
        $("#bus-id").text("#" + $(this).attr('data-busnum'));
        $("#t-sp").text("Terminal : " + $(this).attr('data-sp'));
        $("#t-ep").text("Destination : " +$(this).attr('data-ep'));
        $("#t-date").text("Date : " +$(this).attr('data-date'));
        $("#t-time").text("Time : " +$(this).attr('data-time'));
        $("#t-seats").text("Available Seat(s) : " +$(this).attr('data-seats'));
        $("#t-comps").text("Available Comp(s) : " +$(this).attr('data-comps'));
        $("#t-class").text("Class : " +$(this).attr('data-class'));
        $("#t-stops").text("Stops : " +$(this).attr('data-stops'));
        $("#t-message").text($(this).attr('data-message'));
        $(".d_id").text($(this).attr('data-dispatchID'));
        dispatchIDGlobal = $(this).attr('data-dispatchID');
        $('#modal-details-routes-com').modal('show');
    });

    $(".btn-book-success").on("click", function () {
        $('#modal-details-routes-com').modal('hide');
        $('#modal-to-booking').modal('show');
    });

    $(".btn-book-success-final").off().on("click", function () {
        _addBookings_commuter(dispatchIDGlobal);
    });




}

function GetGeneral(id) {

    var obj = {
        I_USERID : id
    };
    try {
        $.get("/Auth/GetGeneral", obj, function (data) {
            const _obj = JSON.parse(data);
            $('#userCname').text(_obj.Data[0].uCname);
        });
    }
    catch {
        alert('Error!');
    }


}

function _loadGetTermRoute() {
    $.get("/Commuters/GetTermRoute", function (data) {
        const obj = JSON.parse(data);
        $('.card-container').html('');
        if (obj.Data.length === 0) {
            var layout = `<div class="text-center"><h5>NO DATA LOADED!</h5></div>`;
            $('.card-container').append(layout);
        }
        else {
            $.each(obj.Data, function (index, value) {
           
                var layout = ` <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title"><b>#${value.unitNum}</b></h5>
                                    <div class="">
                                        <div class="row">
                                            <div class="col">
                                                <small><b>Date:</b> ${value.dispatchDATE}</small><br/>
                                                <small><b>Cpty:</b> ${value.numPassenger} seat(s)</small>
                                            </div>
                                            <div class="col">
                                                <small><b>Time:</b> ${value.dispatchTIME}</small><br/>
                                                <small><b>Comp:</b> ${value.compartment} spaces</small>
                                            </div>
                                        </div>
                                    </div>
                                <div class="float-end mt-3">
                                    <button type="button" class="btn btn-primary btn-show-details"
                                    data-busnum="${value.unitNum}"
                                    data-sp="${value.StartPoint}"
                                    data-ep="${value.EndPoint}"
                                    data-date="${value.dispatchDATE}"
                                    data-time="${value.dispatchTIME}"
                                    data-seats="${value.numPassenger}"
                                    data-comps="${value.compartment}"
                                    data-class="${value.busClassDesc}"
                                    data-stops="${value.stops}"
                                    data-message="${value.message}"
                                    data-dispatchID="${value.dispatchID}"
                                    >
                                        <i class="fa-solid fa-circle-exclamation"></i>
                                        Details
                                    </button>
                                </div>

                            </div>
                        </div>`;

                $('.card-container').append(layout);

            });
        }
    }).done(function () {
        _event_commuter();
    });;
}



function _loadTermDestCommuter() {
    $.get("/Components/GetTerminals", function (data) {
        var obj = JSON.parse(data);

        $.each(obj.Data, function (index, value) {
            $('#s_terminal-com').append(`<option value="${value.TRouteCode}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_destination-com').append(`<option value="${value.TRouteCode}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
        });
    });
}



function _GetDispatchRoute_com() {

    var obj = {
        I_Date: $("#datepicker-r").val(),
        I_Time: $("#timepicker-r").val(),
        I_startPoint: $("#s_terminal-com option:selected").val(),
        I_endPoint: $("#s_destination-com option:selected").val()
    };


    $.get("/Booking/GetDispatchRoute", obj, function (data) {
        const _data = JSON.parse(data);
        $('.card-container').html('');
        if (_data.Data.length === 0) {
            var layout = `<div class="text-center"><h5>NO DATA LOADED!</h5></div>`;
            $('.card-container').append(layout);
        }
        else {
            $.each(_data.Data, function (index, value) {
                var layout = ` <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title"><b>#${value.unitNum}</b></h5>
                                    <div class="">
                                        <div class="row">
                                            <div class="col">
                                                <small><b>Date:</b> ${value.dispatchDATE}</small><br/>
                                                <small><b>Cpty:</b> ${value.numPassenger} seat(s)</small>
                                            </div>
                                            <div class="col">
                                                <small><b>Time:</b> ${value.dispatchTIME}</small><br/>
                                                <small><b>Comp:</b> ${value.compartment} spaces</small>
                                            </div>
                                        </div>
                                    </div>
                                <div class="float-end mt-3">
                                    <button type="button" class="btn btn-primary btn-show-details"
                                    data-busnum="${value.unitNum}"
                                    data-sp="${value.StartPoint}"
                                    data-ep="${value.EndPoint}"
                                    data-date="${value.dispatchDATE}"
                                    data-time="${value.dispatchTIME}"
                                    data-seats="${value.numPassenger}"
                                    data-comps="${value.compartment}"
                                    data-class="${value.busClassDesc}"
                                    data-stops="${value.stops}"
                                    data-message="${value.message}"
                                    >
                                        <i class="fa-solid fa-circle-exclamation"></i>
                                        Details
                                    </button>
                                </div>

                            </div>
                        </div>`;

                $('.card-container').append(layout);

            });
        }

  
    }).done(function () {
        _event_commuter();
    });
}



function _addBookings_commuter(ref) {

    var obj = {
        i_dispatchid: ref,
        i_passenger: $('#t-passenger-i').val(),
        i_compartment: $('#t-comp-i').val(),
        i_remarks: $('#t-remarks-i').val(),
        i_startPoint: $("#s_terminal2 option:selected").val(),
        i_endPoint: $("#s_destination2 option:selected").val(),
        i_userID: sessionStorage.getItem("userID")
    }

    if ($('#t-passenger-i').val() === '' || $('#t-comp-i').val() === '') {
        console.log('Please Provide Data');
        console.log(obj);
    }
    else {
        console.log(obj);
        $.post("/Booking/AddBooking", obj , function () {
            $('#t-passenger-i').val('');
            $('#t-comp-i').val('');
            $('#t-remarks-i').val('');
            $('#tf-pass').html('');
            $('#tf-comp').html('');
            $('#tf-tamount').html('');
            $("#modal-to-booking").modal('hide');
        });
    }

}