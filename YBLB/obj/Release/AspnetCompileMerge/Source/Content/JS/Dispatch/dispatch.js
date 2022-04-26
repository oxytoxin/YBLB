var _stops = '';

$(document).ready(function () {
    Global();
    _event();
});



function Global() {
    //CheckBox
    $('#myForm input').on('change', function () {
        _stops = $('input[name=radioName]:checked', '#myForm').val();
       
    });
    numberOnly('#num_passenger');
    numberOnly('#num_compartment');
    _loadUnit();
    _loadBusClass();
    _loadTerminals();
    tbl_dispatch_view();
}



function _event() {


    //ADD UNIT BUS
    $("#addSchedule").click(function () {
        var obj = {
            unitID: $("#s_ubus option:selected").val(),
            busClassID: $("#s_busclass option:selected").val(),
            startPointID: $("#s_startpoint2 option:selected").val(),
            endPointID: $("#s_endpoint2 option:selected").val(),
            stops: $('input[name=radioName]:checked', '#myForm').val(),
            numPassenger: $("#num_passenger").val(),
            compartment: $("#num_compartment").val(),
            message: $("#message").val(),
            dispatchDATE: $("#datepicker").val(),
            dispatchTIME: $("#timepicker").val()
        };


        if (obj.dispatchDATE === '' || obj.dispatchTIME === '' || obj.stops === '' || obj.numPassenger === '' || obj.compartment === '') {
            alert('Please provide Details');
        }
        else {
          $.post("/Dispatch/AddDispatch", obj, function (data) {
              tbl_dispatch_view();
             // alert(data.Status);
              alert('Dispatch has been added!');
        });
        }
    });

}

function tbl_dispatch_view() {
    $('#tbl_dispatch_view').DataTable().destroy();
    $.get("/Dispatch/GetDispatchSchedule", function (data) {
        const obj = JSON.parse(data);
        $('#tbl_dispatch_view').DataTable({
            data: obj.Data,
            ordering: false,
            info: false,
            columns: [
                {
                    "data": "dispatchDATE",
                    "render": function (d, t, f, m) {
                        var _layout = `
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                                    <div class="container" style="padding:20px;">
                                                  
                                                        <div class="row">
                                                            <div class="col">
                                                                 <div class="badge bg-success text-wrap" style="width:auto;"> <h4>#${f.unitNum}</h4></div>
                                                                 <div class="row mt-2">
                                                                      <div><h6>Dispatch Date: ${f.dispatchDATE}</h6></div>
                                                                      <div><h6>Dispatch Time: ${f.dispatchTIME}</h6></div>
                                                                      <div><p>Class: <span class="badge bg-primary">${f.busClassDesc}</span></p></div>
                                                                 </div>
                                                                  
                                                            </div>
                                                            <div class="col">
                                                                 <div class="row">
                                                                      <h4>Route</h4>
                                                                      <div><p>Start Point: ${f.startPoint}</p></div>
                                                                      <div><p>End Point: ${f.endPoint}</p></div>
                                                                      <div><p>Bus Stop(s) : <span class="badge bg-primary">${f.stops}</span></p></div>
                                                                  
                                                                 </div>
                                                            </div>
                                                            <div class="col">
                                                                    <h4>Vehicle Load</h4>
                                                                    <div><p>Passenger Seats: ${f.numPassenger}</p></div>
                                                                    <div><p>Available Compartment: ${f.compartment}</p></div>
                                                                    <button type="button" class="btn btn-outline-warning btn-rounded" data-mdb-ripple-color="dark">Update</button>
                                                            </div>
                                                            <div class="col">
                                                                            <div class="card">
                                                                              <div class="card-body">
                                                                                <h5 class="card-title">Welcome Message</h5>
                                                                                <div class="text-truncate" style="max-width: 150px;">
                                                                                  <p class="font-weight-light">${f.message}</p>
                                                                                  </div>
                                                                                <button type="button" class="btn btn-warning"><i class="fa-solid fa-pencil"></i></button>
                                                                              </div>
                                                                            </div>
                                                            </div>
                                                        </div>
                                                 <hr>
                                                    </div>
                                                
                                        </div>
                                    </div>
                                </div>
                            `;
                        return _layout;
                    }
                },
                //{
                //    "data": "dispatchDATE"
                //},
                //{
                //    "data": "dispatchTIME"
                //},
                //{
                //    "data": "unitNum"
                //},
                //{
                //    "data": "busClassDesc"
                //},
                //{
                //    "data": "startPoint"
                //},
                //{
                //    "data": "endPoint"
                //},
                //{
                //    "data": "stops"
                //},
                //{
                //    "data": "numPassenger"
                //},
                //{
                //    "data": "compartment"
                //},
                //{
                //    "data": "message"
                //},
                //{
                //    "data": null,
                //    "render": function (d, t, f, m) {
                //        return 'Action';
                //    }
                //},

            ]
        });
    });

}


function numberOnly(id) {
    $(id).keypress(function (e) {

        var charCode = (e.which) ? e.which : event.keyCode

        if (String.fromCharCode(charCode).match(/[^0-9]/g))

            return false;

    });
}

function _loadTerminals() {
    var obj;
    $.get("/Components/GetTerminals", function (data) {
        obj = JSON.parse(data);
        $.each(obj.Data, function (index, value) {
            $('#s_startpoint2').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_endpoint2').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
        });

    });
}

function _loadBusClass() {
    $.get("/components/getbusclass", function (data) {
        var obj = JSON.parse(data);
        $.each(obj.Data, function (index, value) {
            $('#s_busclass').append(`<option value="${value.busClassID}">${value.busClassDesc}</option>`);
        });
        //for (var index = 0; index <= obj.Data.length; index++) {
        //    $('#s_busclass').append(`<option value="${obj.Data[index].busClassID}">${obj.Data[index].busClassDesc}</option>`);
        //}
    });
}

function _loadUnit() {
    $.get("/Components/GetUbus", function (data) {
        var obj = JSON.parse(data);
        $.each(obj.Data, function (index, value) {
            $('#s_ubus').append(`<option value="${value.unitID}">#${value.unitNum}</option>`);
        });
        //for (var index = 0; index <= obj.Data.length; index++) {
        //    $('#s_ubus').append(`<option value="${obj.Data[index].unitID}">#${obj.Data[index].unitNum}</option>`);
        //}


    });
}



