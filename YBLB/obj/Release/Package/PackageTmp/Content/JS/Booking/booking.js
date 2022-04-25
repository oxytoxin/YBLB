$(document).ready(function () {
    _loadTermDest();
    _GetPaymentList();
    _eventBooking();

});


function _eventBooking() {
    numberOnly('#i_passenger');
    numberOnly('#i_compartment');

    $("#btn_searchRoute").click(function () {
        _GetDispatchRoute();
    });

    $('#s_terminal2').on('change', function () {
       // alert($(this).find(":selected").val());
       
        _getBookingFare($("#s_terminal2 option:selected").val(), $("#s_destination2 option:selected").val());
    });

    $('#s_destination2').on('change', function () {
       // alert($(this).find(":selected").val());
        
        _getBookingFare($("#s_terminal2 option:selected").val(), $("#s_destination2 option:selected").val());
    });


}

function _getBookingFare(a,b) {
    var obj = {
        I_startPoint : a,
        I_endPoint : b
    }

    $.get("/Booking/GetBookFare", obj, function (data) {
        var _data = JSON.parse(data);
        if (_data.Data.length > 0) {
            $('#regRate').text(_data.Data[0].FareAmount);
            $('#fare-total-amount-c').text(_data.Data[0].FareAmount);
            $('#fare-total-comp-c').text(_data.Data[0].CompAmount);
            
        }
        else {
            $('#regRate').text('');
            alert('Data is not Registered!')
        }
        
        
    });
}


function _loadTermDest() {
    $.get("/Components/GetTerminals", function (data) {
        var obj = JSON.parse(data);
        $.each(obj.Data, function (index, value) {
            $('#s_terminal').append(`<option value="${value.TRouteCode}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_destination').append(`<option value="${value.TRouteCode}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_terminal2').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_destination2').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
        });
    });
}


function _GetDispatchRoute() {

    var obj = {
        I_Date: $("#datepicker2").val(),
        I_Time: $("#timepicker2").val(),
        I_startPoint: $("#s_terminal option:selected").val(),
        I_endPoint: $("#s_destination option:selected").val()
    };


    $.get("/Booking/GetDispatchRoute", obj ,function (data) {
        const _data = JSON.parse(data);
        if ($('#tbl_dispatchRoutes').DataTable() != null) {
            $('#tbl_dispatchRoutes').DataTable().destroy();
        }
        $('#tbl_dispatchRoutes').DataTable({
            data: _data.Data,
            columns: [
                {
                    "data": null,
                    "render": function (d, t, f, m) {
                        var _layout = `
                        <div class="card">
                          <div class="card-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col">
                                        <h2>#${f.unitNum}</h2>
                                         <small class="card-text">${f.dispatchDATE}</small><br/>
                                         <small class="card-text">${f.dispatchTIME}</small>
                                    </div>
                                    <div class="col">
                                         <p>From : <b>${f.StartPoint}</b></p>
                                         <p>Destination : <b>${f.EndPoint}</b></p>
                                         <p>Stop(s) : <b>${f.stops}</b></p>
                                    </div>
                                    <div class="col">
                                         <p>Seat(s) : <b>${f.numPassenger}</b> Available</p>
                                         <p>Compartment : <b>${f.compartment}</b></p>
                                         <button type="button" class="btn btn-primary mt-3 btn-booking-modal" data-id="${f.dispatchID}"><i class="fa-solid fa-calendar-days"></i> Book</button>
                                    </div>
                                </div>
                            </div>
                           
                          </div>
                        </div>`;

                        return _layout;
                    }
                }
            ],
            initComplete: function (settings, json) {
                var dispatchID = '';
                $(".btn-booking-modal").click(function () {
                     dispatchID = $(this).attr('data-id');
                    $('#refNum').text(dispatchID);
                    $("#booking-modal").modal('show');
                });

                $('#btn_submit_booking').on('click', function () {
                    _addBookings(dispatchID);
                });
            }

        });
    });
}


function _GetPaymentList() {

    $.get("/Booking/GetPaymentList", function (data) {
        const _data = JSON.parse(data);

        if ($('#tbl_tickets').DataTable() != null) {
            $('#tbl_tickets').DataTable().destroy();
        }
        $('#tbl_tickets').DataTable({
            data: _data.Data,
            "columnDefs": [
                { "orderable": false, "targets": [0] }
            ],
            columns: [
                {
                    "data": null,
                    "render": function (d, t, f, m) {
                        var l_isPaid = '';
                        var l_amount = '';
                        var l_seat = '';
                        var l_TotalCompartment = '';
                        var terminal = f.startPoint + " - " + f.endPoint;
                        if (f.isPaid === 1) {
                            l_isPaid = `<span class="badge bg-success">Paid</span>`;
                        }

                        if (f.isPaid === 2) {
                            l_isPaid = `<span class="badge bg-warning">Pending</span>`;
                        }

                        if (f.isPaid === 0) {
                            l_isPaid = `<span class="badge bg-warning text-dark">Pending</span>`;
                        }
                        if (f.amount === null) {
                            l_amount = `<span class="badge bg-danger">Fare Not Set!</span>      <button type="button" class="btn btn-outline-danger btn-sm" data-mdb-ripple-color="dark">Resolve!</button>`;
                        }
                        if (f.amount > 0) {
                            l_amount = `${f.amount}`;
                        }
                        if (f.TotalSeatFare === null) {
                            l_seat = `<span class="badge bg-danger">Fare Not Set!</span>`;
                        }
                        if (f.TotalSeatFare > 0) {
                            l_seat = `${f.TotalSeatFare}`;
                        }

                        if (f.TotalCompartment === null) {
                            l_TotalCompartment = `<span class="badge bg-danger">Fare Not Set!</span>`
                        }
                        if (f.TotalCompartment > 0) {
                            l_TotalCompartment = `${f.TotalCompartment}`;
                        }


                        var _layout = `<ul class="nav nav-tabs mb-3" id="ex1-${f.REFERENCES}" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link active"
                                       id="ex1-tab-1"
                                       data-mdb-toggle="tab"
                                       href="#ex1-tabs-1-${f.REFERENCES}"
                                       role="tab"
                                       aria-controls="ex1-tabs-1"
                                       aria-selected="true">Ticket</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link"
                                       id="ex1-tab-2"
                                       data-mdb-toggle="tab"
                                       href="#ex1-tabs-2-${f.REFERENCES}"
                                       role="tab"
                                       aria-controls="ex1-tabs-2"
                                       aria-selected="false">Details</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <a class="nav-link view-ref-modals-1"
                                       id="ex1-tab-2"
                                       data-mdb-toggle="tab"
                                       data-imgPath="${f.imgPath}"
                                       data-payRef="${f.PayREFERENCES}"
                                       href="#"
                                       role="tab"
                                       aria-controls="ex1-tabs-2"
                                       aria-selected="false"><i class="fa-solid fa-ticket-simple"></i> View References</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="ex1-content">
                                <div class="tab-pane fade show active"
                                     id="ex1-tabs-1-${f.REFERENCES}"
                                     role="tabpanel"
                                     aria-labelledby="ex1-tab-1-${f.REFERENCES}">
                                        <div class="container">
                                            <div class="row">
                                                <div class="col">
                                                     <p><span class="badge bg-secondary">${f.REFERENCES}</span></p>
                                                     <small>Terminal :${f.startPoint}</small><br/>
                                                     <small>Destination :${f.endPoint}</small>
                                            </div>
                                                <div class="col">
                                                     <p>Amount : &#8369;&nbsp;${l_amount}</p>
                                                     <small>Date :${f.Date}</small><br/>
                                                     <small>Time :${f.Time}</small>
                                                </div>
                                                <div class="col">
                                                    <h5>Payment</h5>
                                                    <p>Status : ${l_isPaid}</p>
                                                </div>
                                            </div>
                                        </div>
                                          
                                </div>
                                <div class="tab-pane fade" id="ex1-tabs-2-${f.REFERENCES}" role="tabpanel" aria-labelledby="ex1-tab-2-${f.REFERENCES}">
                                    <div class="container">
                                            <div class="row">
                                                <div class="col">
                                                    <h5>${f.uCname}</h5>
<button type="button" class="btn btn-outline-success btn-to-pay-modal" data-mdb-ripple-color="dark" data-terminal="${terminal}" data-comp="${f.TotalCompartment}" data-seat="${f.TotalSeatFare}" data-name="${f.uCname}" data-id="${f.paymentID}" data-amount="${f.amount}" data-distance="${f.Distance}">Pay & Generate Ticket</button>
<button type="button" class="btn btn-outline-warning" data-mdb-ripple-color="dark" data-id="${f.paymentID}">Reschedule</button>
                                                </div>
                                                <div class="col">
                                                     <p>Seat Amount :&#8369;&nbsp;${l_seat}</p>
                                                     <small>Seat(s) :${f.seat}</small><br/>
                                                     <small>Price  :&#8369;&nbsp;${f.fare}</small>
                                                </div>
                                                <div class="col">
                                                     <p>Compartment Amount :&#8369;&nbsp;${l_TotalCompartment}</p>
                                                     <small>Occupied :&nbsp;${f.occupiedComp}</small><br/>
                                                     <small>Price :&#8369;&nbsp;${f.compartment}</small>
                                                </div>
                                            </div>
                                    </div>
                                   
                                </div>
                            </div>`;
                        return _layout;
                    }

                }
            ],
            initComplete: function (settings, json) {

                var _id = '';

                $(".btn-to-pay-modal").click(function () {
                    _id = $(this).attr('data-id');
                    var _amount = $(this).attr('data-amount');
                    var _name = $(this).attr('data-name');
                    var _seat = $(this).attr('data-seat');
                    var _comp = $(this).attr('data-comp');
                    var _term = $(this).attr('data-terminal');
                    var _termDist = $(this).attr('data-distance');
                    var _selected = $('input[name=radioName]:checked', '#radios-btn').val();
                    $("#total-to-pay").text(_amount);
                    $("#paymodal").modal('show');
                    $('#ticket-name').text(_name);  
                    $('#ticket-amount').text(_amount);
                    $('#ticket-dist').text(_termDist + ' KM');
                    $('#ticket-type').text(_selected);
                    $('#ticket-seat').text(_seat);
                    $('#ticket-comp').text(_comp);
                    $('#ticket-terminal').text(_term);

                    $(".qr-container").html('');
                    $(".qr-container").qrcode({
                        text: _id
                    });

                });

                $('#radios-btn input').on('change', function () {
                   var _selected = $('input[name=radioName]:checked', '#radios-btn').val();
                    $('#ticket-type').text(_selected);
                });

                

                $(".btn-to-pre-pay").click(function () {
                    $("#confirm-to-pay-modal").modal('show');
                });

                $(".btn-proc-to-pay").click(function () {
                
                    var obj = {
                        i_id: _id
                    }
                    $.post("/Booking/UpdatePayment", obj, function () {

                        alert('done');
                        _GetPaymentList();
                        $("#confirm-to-pay-modal").modal('hide');
                        $("#paymodal").modal('hide');

                    });

                });

                $('.view-ref-modals-1').off().on('click', function () {
                    var _path = $(this).attr('data-imgPath');
                    var _payRef = $(this).attr('data-payRef');
                    $('.ref-img-container').html('');
                    $('#ref-nums').text(_payRef);
                    $('.ref-img-container').append(`<img src="/GcashPaymentAndOther/${_path}" style='height: 100%; width: 100%; object-fit: contain' />`);
                  
                    $("#view-ref-modal").modal('show');
                });

                

            }

        });
    });


}


function _addBookings(ref) {
   

    var obj = {
        i_dispatchid: ref,
        i_passenger: $('#i_passenger').val(),
        i_compartment: $('#i_compartment').val(),
        i_remarks: $('#i_remarks').val(),
        i_startPoint: $("#s_terminal2 option:selected").val(),
        i_endPoint: $("#s_destination2 option:selected").val(),
        i_userID: 1
    }

    if ($('#i_passenger').val() === '' || $('#i_compartment').val() === '') {
        alert('Empty');
    }
    else {
        $.post("/Booking/AddBooking", obj, function () {
            $('#i_passenger').val('');
            $('#i_compartment').val('');
            $('#i_remarks').val('')
            alert('Done!');
            $("#booking-modal").modal('hide');
        });
    }

}

