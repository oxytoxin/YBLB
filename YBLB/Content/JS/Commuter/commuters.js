$(document).ready(function () {

    _load_commuter_data();
    _event_commuter();
    Comm_events();

});


function _load_commuter_data() {
    var userID = sessionStorage.getItem("userID");
    GetPaymentList(userID);
    GetNotif(userID);
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

function GetNotif(userIDs) {
    var obj = {
        id: userIDs
    };
    $.get("/Commuters/GetNotifHead", obj, function (data) {
        const _data = JSON.parse(data);
      
        $('.com-notif-containers').html('');
        $.each(_data.Data, function (index, value) {
            var o_layout = `<div class="card mb-3">
                              <div class="card-body">
                                <h5 class="card-title">${value.qDatetime}</h5>
                                <p class="card-text">${value.Uqueries}</p>
                                <button type="button" class="btn btn-primary float-end btn-read-notif"
                                 data-qryID="${value.qryID}"
                                data-userID="${value.userID}"
                                data-announceID="${value.announceID}"
                                data-Uqueries="${value.Uqueries}"
                                data-uCname="${value.uCname}"
                                >Read</button>
                              </div>
                            </div>`;
            $('.com-notif-containers').prepend(o_layout);
        });

        $('.btn-read-notif').off().on('click', function () {
            var _qryID = $(this).attr('data-qryID');
            var _userID = $(this).attr('data-userID');
            var _announceID = $(this).attr('data-announceID');

            var _Uqueries = $(this).attr('data-Uqueries');
            var _uCname = $(this).attr('data-uCname');
          //  $('#modal-notif-commuters').modal('hide'); 

            $('#txt-qry2').text(_Uqueries);
            GetQryBody(_qryID, _userID, _announceID);
            $('#modal-notif-inbox-commuters').modal('show');

            $('#btn-reply-to-qry').off().on('click', function () {
                var _userSendByID = sessionStorage.getItem("userID");
                var objs = {
                    I_qryID: _qryID,
                    I_sendTo: _userID,
                    I_sendBy: 1,
                    I_queriesbody: $('.txt-msg-to-qry-reply').val(),
                    I_announceID: _announceID
                };


                $.get("/Home/Getqrybody", objs, function (data) {
                    const objData = JSON.parse(data);
                    console.log(objData.Data[0].msg);
                    $('.txt-msg-to-qry-reply').val('');
                    GetQryBody(_qryID, _userID, _announceID);
                });


           
            });




        });

    });
}


function GetPaymentList(userIDs) {
    var obj = {
        id: userIDs
    };
    $.get("/Commuters/GetPaymentList", obj , function (data) {
        const _data = JSON.parse(data);
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
                                <button type="button" class="btn btn-outline-primary view-ticket-comm"
                                data-payID="${value.paymentID}"
                                data-unitNum="${value.unitNum}"
                                data-Date="${value.Date}"
                                data-Time="${value.Time}"
                                data-uCname="${value.uCname}"
                                data-seat="${value.seat}"
                                data-occupiedComp="${value.occupiedComp}"
                                data-startPoint="${value.startPoint}"
                                data-endPoint="${value.endPoint}"
                                data-Distance="${value.Distance}"
                                data-mdb-ripple-color="dark">View Ticket</button>
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
            var _paymentID = $(this).attr('data-payID');
            var _unitNum = $(this).attr('data-unitNum');
            var _Date = $(this).attr('data-Date');
            var _Time = $(this).attr('data-Time');
            var _uCname = $(this).attr('data-uCname');
            var _seat = $(this).attr('data-seat');
            var _occupiedComp = $(this).attr('data-occupiedComp');
            var _startPoint = $(this).attr('data-startPoint');
            var _endPoint = $(this).attr('data-endPoint');
            var _Distance = $(this).attr('data-Distance');

            $('#unitNum').text(_unitNum);
            $('#datetimeDispatch').text(_Date + ' - ' + _Time);
            $('#cname').text(_uCname);
            $('#takeSeat').text(_seat);
            $('#takeComp').text(_occupiedComp);
            $('#destination').text(_startPoint + ' - ' + _endPoint);
            $('#destinationDistance').text(_Distance);


            $('#modal-gen-ticket-comm').modal('show');

            $(".qr-container2").html('');
            $(".qr-container2").qrcode({
                text: _paymentID
            });

        });

    });

}


function GetAnnoucement() {
    $.get("/Commuters/GetAnnouncement", function (data) {
        const obj = JSON.parse(data);
        $('.ann-container-commuters').html('');
        $.each(obj.Data, function (index, value) {
            var o_layout = `<div class="card mb-2 lids">
                            <div style="padding:5px;">
                                 <h5 class="card-title">${value.uCname}&nbsp;<small style="font-size:10px;">${value.announceDate}</small></h5>
                            </div>
                           
                            <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src="/FilesUpload/${value.imgPath}" class="img-fluid"/>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${value.announcement}</p>
                                <small>${value.react} Likes</small><br>
                                <button id="btn-${value.announceID}s" type="button" class="btn btn-floating mt-2 to-like-btn" data-annID="${value.announceID}">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </button>
                                <button id="" type="button" class="btn btn-outline-info btn-rounded iqr-modaler" data-annID="${value.announceID}" data-mdb-ripple-color="dark">Inquiries</button>
                            </div>
                        </div>`;
            $('.ann-container-commuters').prepend(o_layout);
        });


        var objGreact = {
            I_userID: sessionStorage.getItem("userID")
        };

        $.get("/Conductor/Reactions", objGreact, function (data) {
            const obj2 = JSON.parse(data);

            

            if (obj2.Data.length === 0) {
                $('div .to-like-btn').addClass("btn-default")
            }
            else {
                $.each(obj2.Data, function (index, value) {
                    if (value.isLiked === 1) {
                        $(`#btn-${value.announceID}s`).addClass("btn-primary");
                        $(`#btn-${value.announceID}s`).attr('data-islikedFrom', value.isLiked);
                    }
                    else {
                        $(`#btn-${value.announceID}s`).addClass("btn-default");
                        $(`#btn-${value.announceID}s`).attr('data-islikedFrom', value.isLiked);
                    }
                });
            }

        });




        $('.iqr-modaler').click(function () {
            var id = $(this).attr('data-annID');
            var _userID = sessionStorage.getItem("userID");
            $('#iqr-modal').modal('show');

            $('#btn-submit-qry').off().on('click', function () {
                var objModel = {
                    I_announceID: id,
                    I_Uqry: $('#textQry').val(),
                    I_userID: _userID
                };

                $.get("/Commuters/ValidateQry", objModel, function (data) {
                    const obj = JSON.parse(data);
             
                    if (obj.Data[0].msg == '0') {
                        $.get("/Commuters/AddQueries", objModel, function (data) {
                            $('#textQry').val('');
                            $('#iqr-modal').modal('hide');
                            GetNotif(_userID);
                        });
                    }
                    else {
                        alert('Queries has beed queued!');
                        $('#iqr-modal').modal('hide');
                    }

                });


              
            });

        });


        $('.to-like-btn').off().on('click', function (e) {
            var _annID = $(this).attr('data-annID');
            var _islikedFrom = $(this).attr('data-islikedFrom');
            var _userID = sessionStorage.getItem("userID");


            var obj = {
                I_announceID: _annID,
                I_userID: _userID,
                I_react: _islikedFrom === '1' ? 0 : 1
            };

           

            $.get("/Conductor/AddReaction", obj, function (data) {
                e.preventDefault();
                GetAnnoucement();
            });


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

        $('#logout-modal-confirmation').modal('show');
    });

    $(".btn-show-profiles").off().on("click", function () {

        $('#modal-update-users').modal('show');
       
    });

    $("#f-logout-btn-to-lf").off().on("click", function () {

       // sessionStorage.setItem("userID", "0");
        sessionStorage.clear();
        document.location.href = '/Auth/Login';
    });

    $("#modal-filter-route-btn").on("click", function () {
        $('#filter-route-to-book-modal').modal('show');
    });


    $("#show-modal-notifs").on("click", function () {
        $('#modal-notif-commuters').modal('show');
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
    $('.userimg-container').html('');
    $.get("/Auth/GetGeneral", obj, function (data) {
        try {
            const _obj = JSON.parse(data);
            var imgDatas = _obj.Data[0].uImg === 'none' ? 'defaultimg.jpg' : _obj.Data[0].uImg;
            var o_imgLayout = `<img src="/FilesUpload/${imgDatas}" class="rounded-circle" height="22"
                                     alt="" loading="lazy" />`;

            $('.userimg-container').html(o_imgLayout);
            $('#I_USERID').val(_obj.Data[0].userID);
            $('#pName').val(_obj.Data[0].uCname);
            $('#pGender').val(_obj.Data[0].uGender);
            $('#pBd').val(_obj.Data[0].uBD);
            $('#pAddress').val(_obj.Data[0].uAddress);
            $('#pEmail').val(_obj.Data[0].uEmail);
            $('#pUsername').val(_obj.Data[0].username);

            $('#userCname').text(_obj.Data[0].uCname);


            $('#btn-update-creds').off().on('click', function () {
                var cred = {
                    I_USERID: _obj.Data[0].userID,
                    I_PASWWORD: $('#passConfirmBase').val()
                };

                if ($('#passConfirmBase').val() === '' || $('#passbase').val() === '') {
                    alert('Please Provide Details!');
                }
                else {
                    $.get("/Components/UpdateCredUsers", cred, function (data) {
                        const obj = JSON.parse(data);
                        alert(obj.Data[0].msg);
                    });
                }



            });






            $('#btn-update-userdetails').off().on('click', function () {
                var det = {
                    I_USERID: _obj.Data[0].userID,
                    I_UADDRESS: $('#pAddress').val().length < 0 ? _obj.Data[0].uAddress : $('#pAddress').val(),
                    I_UEMAIL: $('#pEmail').val().length < 0 ? _obj.Data[0].uEmail : $('#pEmail').val(),
                    I_USERNAME: $('#pUsername').val().length < 0 ? _obj.Data[0].username : $('#pUsername').val()
                };

                if ($('#pAddress').val() === '' || $('#pEmail').val() === '' || $('#pUsername').val() === '') {
                    alert('Please Provide Details!');
                }

                else {
                    $.get("/Components/UpdateDetailsUsers", det, function (data) {
                        const obj = JSON.parse(data);
                        GetGeneral(_obj.Data[0].userID);
                        alert(obj.Data[0].msg);
                    });
                }
            });

        }
        catch {
           
        }
        });




}

function _loadGetTermRoute() {
    $.get("/Commuters/GetTermRoute", function (data) {
        const obj = JSON.parse(data);

        if (obj.Data === null) { }
        else {
            $('.card-container').html('');
            if (obj.Data.length === 0) {
                var layout = `<div class="text-center"><h5>NO DATA LOADED!</h5></div>`;
                $('.card-container').append(layout);
            }
            else {
                $.each(obj.Data, function (index, value) {

                    var _limit = value.numPassenger <= 0 ? 'btn-danger disabled' : 'btn-primary';
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
                                    <button type="button" class="btn ${_limit} btn-show-details"
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
     
    }
    else {
       
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