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


    $('.print-ticketPDF').on('click', function () {
        CreatePDFfromHTML();
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
                        var _limitPass = f.numPassenger <= 0 ? 'btn-danger disabled' : 'btn-primary';
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
                                         <button type="button" class="btn mt-3 btn-booking-modal ${_limitPass}" data-id="${f.dispatchID}"><i class="fa-solid fa-calendar-days"></i> Book</button>
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

                $('#btn_submit_booking').off().on('click', function () {
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
                        console.log(f);
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
                            l_amount = f.TotalSeatFare + f.TotalCompartment// `${f.amount}`;
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
                                                <button type="button" class="btn btn-outline-success btn-to-pay-modal"
                                                data-mdb-ripple-color="dark"
                                                data-terminal="${terminal}" 
                                                data-comp="${f.occupiedComp}" 
                                                data-seat="${f.seat}" 
                                                data-name="${f.uCname}" 
                                                data-id="${f.paymentID}" 
                                                data-amount="${f.amount}" 
                                                data-distance="${f.Distance}">Pay & Generate Ticket</button>
                                                <button type="button" class="btn btn-outline-warning resched-btn"
                                                data-mdb-ripple-color="dark"
                                                data-dispatchID="${f.dispatchID}" 
                                                data-seat="${f.seat}"
                                                data-occupiedComp="${f.occupiedComp}"
                                                data-bookingID="${f.bookingID}">Reschedule</button>
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

                $('.resched-btn').off().on('click', function () {
                    var _bookingID = $(this).attr('data-bookingID');
                    var _dispatchID = $(this).attr('data-dispatchID');
                    var _seat = $(this).attr('data-seat');
                    var _occupiedComp = $(this).attr('data-occupiedComp');

              

                    var obj = {
                        i_dispatchid: _dispatchID
                    };

                    $.get("/Booking/GetTermRoute", obj , function (data) {
                        const _data = JSON.parse(data);
                      

                         $('.resched-container').html('');
                        $.each(_data.Data, function (index, value) {

                            var _limitPass = value.numPassenger - _seat;
                            var _limitComp = value.compartment - _occupiedComp;
                            var validateReschedule = _limitPass <= 0 || _limitComp <= 0 ? "btn-danger disabled" : "btn-warning";
                            var validateRescheduleText = _limitPass <= 0 || _limitComp <= 0 ? "Dispatch is full" : "Set Schedule";
                            var o_layout = `<div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">#${value.unitNum}&nbsp;<text style="font-size: 12px;">${value.busClassDesc}</text></h5>
                            <small><text>${value.dispatchDATE} - ${value.dispatchTIME}</text></small><br>
                            <small>Terminal :&nbsp;<text>${value.StartPoint}</text></small><br>
                            <small>Destination :&nbsp;<text>${value.EndPoint}</text></small><br>
                            <small>Cpty.:&nbsp;<text>${value.numPassenger - _seat}</text>&nbsp;Seat(s)&nbsp;&nbsp;Compartment :&nbsp;<text>${+value.compartment - _occupiedComp}</text>&nbsp;Space(s)</small><br>
                            <p></p>
                            <button type="button" class="btn-set-sched btn btn-sm float-end ${validateReschedule}" data-dispatchID="${value.dispatchID}"><i class="fa-solid fa-calendar-check"></i>&nbsp;${validateRescheduleText}</button>
                        </div>
                    </div>`;
                            $('.resched-container').append(o_layout);
                        });


                        $('.btn-set-sched').off().on('click', function () {
                            var _dispatchIDs = $(this).attr('data-dispatchID');
                            var obj = {
                                i_dispatchid: _dispatchIDs,
                                i_bookingid: _bookingID
                            };

                            $('#modal-success-update').modal('show');

                            $('.btn-update-finished').off().on('click', function () {
                                $.get("/Booking/UpdateBooking", obj, function (data) {
                                    const _data = JSON.parse(data);
                                  
                                    _GetPaymentList();
                                    $('#reschedModal').modal('hide');
                                });
                            });

                       

                        });


                    });




                    $('#reschedModal').modal('show');
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
          //  alert('Done!');
            _GetPaymentList();
            $("#booking-modal").modal('hide');
        });
    }

}

function CreatePDFfromHTML() {
    //DIV Class : html-content
    var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".html-content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }
        pdf.save("Your_PDF_Name.pdf");
       // $(".html-content").hide();
    });
}


function CreatePDFfromHTML_bkp() {
    //DIV Class : html-content
    var HTML_Width = $(".html-content").width();
    var HTML_Height = $(".html-content").height();
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($(".html-content")[0]).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }
        pdf.save("Your_PDF_Name.pdf");
        // $(".html-content").hide();
    });
}