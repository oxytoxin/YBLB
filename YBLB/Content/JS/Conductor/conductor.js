$(document).ready(function () {

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: 200 }); //250
    html5QrcodeScanner.render(onScanSuccess, onScanError);

    $('#reader__dashboard_section').closest('div').find('button').addClass('form-control');
    $('#reader__dashboard_section').closest('div').find('a').addClass('form-control mt-2');
    GetAnnoucement2();
    _dispatchedListsel();
    _conductrDataLoadTikets();
    _eventConductor();
});


function _dispatchedListsel() {
    $.get("/Dispatch/GetDispatchSchedule", function (data) {
        const _data = JSON.parse(data);
        $('.opt-sel').html('');
        $.each(_data.Data, function (index, value) {
            var o_layout = `<option value="${value.dispatchID}">YBL- &nbsp;#${value.unitNum}</option>`;
            $('.opt-sel').append(o_layout);
        });
   
    });
}


function _eventConductor() {
    $('#btn-lg-forms').off().on('click', function () {
        $('#logout-modal-confirmation').modal('show');
    });

    $("#f-logout-btn-to-lf2").off().on("click", function () {

        sessionStorage.setItem("userID", "0");
        document.location.href = '/Auth/Login';
    });

}


function _conductrDataLoadTikets() {

    $(".opt-sel").change(function () {
        var _id = $(".opt-sel option:selected").val()

        var obj = {
            I_dispatchedID: _id
        };

        
        $('#tbl-tck').DataTable().destroy();
        $.get("/Conductor/AcceptTicketList", obj, function (data) {
            const _data = JSON.parse(data);
            $('.appender-error').html('');
            if (_data.Data.length > 0) {
                $('#tbl-tck').DataTable({
                    data: _data.Data,
                    "paging": false,
                    columns: [
                        {
                            "data": null,
                            "render": function (d, t, f, m) {
                             
                                var o_layout = `<div class="card">
                                              <div class="card-body">
                                                <h5 class="card-title">${f.ref}</h5>
                                                <small class="card-text">${f.uCname}</small><br>
                                                <small class="card-text">Passenger: ${f.passenger} Compartment: ${f.compartment}</small>
                                              </div>
                                            </div>`;
                                return o_layout;
                            }
                        }
                    ]
                });
            }
            else {
                $('#tbl-tck').DataTable().clear();
                $('#tbl-tck').DataTable().destroy();
                $('.appender-error').append('<h4>No Data To show!</h4>');
            }


           
        });

    });


}



function onScanSuccess(qrCodeMessage) {
    _dispatchedListsel();
    var obj = {
        I_paymentID: qrCodeMessage
    };

    $.get("/Conductor/ScanTicket", obj, function (data) {
        const _data = JSON.parse(data);
        $('.res-container').html('');
        $('.btn-containers').html('');
        $('#result').html('');

        if (_data.Data.length >= 1) {
            $.each(_data.Data, function (index, value) {
                var isPaid = value.isPaid === 0 ? "Unpaid" : "Paid";
                var isPaidClass = value.isPaid === 0 ? "bg-warning text-white" : "bg-success text-white";
                var o_layout = `<div class="${isPaidClass}" style="padding:10px;"><h4>${isPaid}</h4></div>
                                            <p class="mt-3">Name : ${value.uCname}</p>
                                            <p>DateTime : ${value.Date} - ${value.Time}</p>
                                            <p>Terminal : ${value.startPoint} - ${value.endPoint}</p>
                                            <p>Passenger : ${value.seat}</p>
                                            <p>Compartment : ${value.occupiedComp}</p>`;
                var btn = `<button type="button" class="btn btn-success accpt-comm" 
                                                        data-payID="${value.paymentID}" 
                                                        data-dispatchedID="${value.dispatchID}"
                                                        data-mdb-dismiss="modal">Accept!</button>`;
                $('.res-container').append(o_layout);
                $('.btn-containers').append(btn);
                $('#result').append(o_layout);
                //  document.getElementById('result').innerHTML = o_layout;
            });
            $('#modal-on-success-scan').modal('show');

            $('.accpt-comm').off().on('click', function () {
                var _payID = $(this).attr('data-payID');
                var _dispatchedID = $(this).attr('data-dispatchedID');
                var objs = {
                    I_paymentID: _payID,
                    I_dispatchedID: _dispatchedID
                };

                $.get("/Conductor/AcceptTicket", objs, function (data) {
                    const _data = JSON.parse(data);
                    alert(_data.Data[0].msg);

                });
            });
        }
        else {
            var o_layout = `<h2>QR INVALID</h2>`;
            $('.res-container').append(o_layout);
            $('#modal-on-success-scan').modal('show');
        }




    });




}
function onScanError(errorMessage) {
    //handle scan error
}



function GetAnnoucement2() {
    $.get("/Conductor/GetAnnouncement", function (data) {
        const obj = JSON.parse(data);
        $('.ann-container-commuters2').html('');
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
                                <small>${value.react} Likes</small><br>
                                <button id="btn-${value.announceID}s" type="button" class="btn btn-floating mt-2 to-like-btn" data-annID="${value.announceID}">
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </button>
                                <button id="" type="button" class="btn btn-outline-info btn-rounded iqr-modaler disabled" data-annID="${value.announceID}" data-mdb-ripple-color="dark">Inquiries</button>
                            </div>
                        </div>`;
            $('.ann-container-commuters2').prepend(o_layout);
        });

     


        var objGreact = {
            I_userID: sessionStorage.getItem("userID")
        };

        $.get("/Conductor/Reactions", objGreact ,function (data) {
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
            $('#iqr-modal2').modal('show');

            $('#btn-submit-qry').off().on('click', function () {
                var objModel = {
                    I_announceID: id,
                    I_Uqry: $('#textQry').val(),
                    I_userID: _userID
                };

                $.get("/Commuters/ValidateQry", objModel, function (data) {
                    const obj = JSON.parse(data);
                    console.log(obj.Data[0].msg);
                    if (obj.Data[0].msg == '0') {
                        alert('submit');
                        $.get("/Commuters/AddQueries", objModel, function (data) {
                            $('#textQry').val('');
                            $('#iqr-modal2').modal('hide');
                        });
                    }
                    else {
                        alert('Queries has beed queued!');
                        $('#iqr-modal2').modal('hide');
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

        

            $.get("/Conductor/AddReaction", obj , function (data) {
                e.preventDefault();
                GetAnnoucement2();
            });

       
        });



    });
}