




$(document).ready(function () {

    GetUL();
    _loadBusClass2();
    _loadTerminalstbl();
    _loadFare();
    _loadUnits();
    components_evnts();
    
});


function components_evnts() {

    //ADD FARE
    $("#addFare").click(function () {

        var obj = {
            Spoint: $("#s_startpoint option:selected").val(),
            Epoint: $("#s_endpoint option:selected").val(),
            FAmount: $("#f_amount").val(),
            Distance: $("#set_distance").val(),
            CompAmount: $("#f_compartment").val()
        };

        $.post("/Components/AddFare", obj, function () {
            _loadFare();
            $('#setFare').modal('hide');
        });

    });


    //ADD TERMINALS
    $("#addTerminals").click(function () {

        if ($("#tName").val().length === 0 && $("#tCode").val().length === 0) {

            $("#modalPop-dialog").removeClass("bg-success").addClass("bg-danger");
            $('#modalPop').modal('show');
            $('#modalPop_msg').text('Please Provide Details');
        }
        else {
            var obj = {
                TCode: $("#tCode").val(),
                TName: $("#tName").val(),
                TDesc: $("#tDesc").val(),
                TRouteCode: $("#troute").val()

            };
            $.post("/Components/AddTerminal", obj, function () {
                $('#addUnit').modal('hide');
                $("#modalPop-dialog").removeClass("bg-danger").addClass("bg-success");
                $('#modalPop_msg').text('Data Inserted!');
                $('#modalPop').modal('show');
                _loadTerminalstbl();
            });

        }
    });

    //ADD UNIT BUS
    $("#addUbus").click(function () {

        if ($("#unitNum").val().length === 0 && $("#unitNum").val().length === 0) {

            $("#modalPop-dialog").removeClass("bg-success").addClass("bg-danger");
            $('#modalPop').modal('show');
            $('#modalPop_msg').text('Please Provide Details');
        }
        else {
            var obj = {
                unitNum: $("#unitNum").val(),
                plateNum: $("#plateNumtxt").val()
            };
            $.post("/Components/AddUbus", obj, function () {
                _loadUnits();
            });
            $('#addUnit').modal('hide');
            $("#modalPop-dialog").removeClass("bg-danger").addClass("bg-success");
            $('#modalPop_msg').text('Data Inserted!');
            $('#modalPop').modal('show');
        }
    });

    //ADD BUSCLASS
    $("#b_buss_class").click(function () {

        if ($("#i_busClass").val().length === 0) {

            alert('Please Provide Details');
        }
        else {
            var obj = {
                BusClassDesc: $("#i_busClass").val()
            };

            $.post("/Components/AddBusClass", obj, function () {
                $("#i_busClass").val('');
                $('#addOptionBusClass').modal('hide');
                _loadBusClass2();
            });
        }


    });

}


function _loadUnits() {

    if ($('#examples').DataTable() !== null) {
        $('#examples').DataTable().destroy();
    }

    $.get("/Components/GetUbus", function (data) {
        const obj = JSON.parse(data);
        $('#examples').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "unitID",
                    "render": function (d, t, f, m) {
                        return `<div style="color:blue;"> ${d} </div>`;
                    }
                },
                {
                    "data": "plateNum"
                },
                {
                    "data": "unitNum"
                }
            ]
        });
    });
}

function _loadFare() {

    if ($('#tbl_fare').DataTable() != null) {
        $('#tbl_fare').DataTable().destroy();
    }

    $.get("/Components/GetFare", function (data) {
        const obj = JSON.parse(data);
        $('#tbl_fare').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": null,
                    "render": function (d, t, f, m) {
                        var data = f.TcodeStart + ' - ' + f.TcodeEnd;
                        return data;
                    }
                },
                {
                    "data": "StartPoint"
                },
                {
                    "data": "EndPoint"
                },
                {
                    "data": "FareAmount",
                    "render": function (data) {
                        return `<h5>₱ ${data}</h5>`;
                    }
                },
                {
                    "data": null,
                    "render": function (d, t, f, m) {
                        var isActive = f.isActive === 1 ? 'checked' : '';
                        var style = `
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <a class="update-fare-details" style="color: #3b5998;" href="#!"
                                                data-id="${f.FareID}"
                                                data-codes="${f.TcodeStart}"
                                                data-codee="${f.TcodeEnd}"
                                                data-FareAmount="${f.FareAmount}"
                                                data-CompAmount="${f.CompAmount}"
                                                data-Distance="${f.Distance}"
                                                role="button">
                                               <i class="fa-solid fa-pencil"></i>
                                            </a>
                                         </div>

                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input cbx-update-fare"
                                                type="checkbox"
                                                data-id="${f.FareID}"
                                                role="switch" ${isActive}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                         
                            `;
                        return style;
                    }
                }
            ],
            initComplete: function (settings, json) {

                $('.update-fare-details').off().on('click', function () {
                    var id = $(this).attr('data-id');
                    var codes = $(this).attr('data-codes');
                    var codee = $(this).attr('data-codee');
                    var FareAmount = $(this).attr('data-FareAmount');
                    var CompAmount = $(this).attr('data-CompAmount');
                    var Distance = $(this).attr('data-Distance');
                    $('#tcodetxt').text(codes + '-' + codee);
                    $('#modal-update-fare-details').modal('show');


                    $('.btn-update-fare-submit').off().on('click', function (e) {
                        e.preventDefault();
                        var obj = {
                            FareID: id,
                            FareAmount: $('#f_Terminal').val().length > 0 ? $('#f_Terminal').val() : FareAmount,
                            CompAmount: $('#f_compartments').val().length > 0 ? $('#f_compartments').val() : CompAmount,
                            Distance: $('#f_Distance').val().length > 0 ? $('#f_Distance').val() : Distance
                        };

                        $.post("/Components/UpdateFareDetails", obj, function () {
                            _loadFare();
                            $('#f_Terminal').val('');
                            $('#f_compartments').val('');
                            $('#f_Distance').val('');
                            $('#modal-update-fare-details').modal('hide');
                        });


                    });


                });


                $('.cbx-update-fare').change(function () {
                    var id = $(this).attr('data-id');
                    var obj = {
                        FareID: id,
                        FareStatus: null
                    };
                    if ($(this).is(':checked')) {

                        obj.FareStatus = 1;
                    } else {
                        obj.FareStatus = 0;
                    }
                    $.post("/Components/UpdateFareStatus", obj, function () {

                    });
                });
            }
        });
    });
}


function _loadTerminalstbl() {

    if ($('#tbl_terminals').DataTable() !== null) {
        $('#tbl_terminals').DataTable().destroy();
    }

    $.get("/Components/GetTerminals", function (data) {
        var obj = JSON.parse(data);
        $('#tbl_terminals').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "Tcode"
                },
                {
                    "data": "Tname"
                },
                {
                    "data": "TDesc"
                },
                {
                    "data": "TRouteCode"
                }
            ]
        });

        $.each(obj.Data, function (index, value) {
            $('#s_startpoint').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
            $('#s_endpoint').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.Tname}</option>`);
        });


    });
}



function GetUL() {

    $.get("/Components/GetUserlvl", function (data) {
        const obj = JSON.parse(data);

        $('#tbl_userlvl').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "userlvlID"
                },
                {
                    "data": "userLvl"
                },
                {
                    "data": null,
                    "render": function (m, t, c, d) {
                        return `<button type="button" class="btn btn-outline-warning ulvl-btn disabled" data-id="${c.userlvlID}" data-mdb-ripple-color="dark">Update</button>`
                    }
                }
            ],
            initComplete: function (settings, json) {
         
                $(".ulvl-btn").click(function () {
                    var id = $(this).attr('data-id');
                    alert(id);
                });
            }
        });

    });

}


function _loadBusClass2() {


    if ($('#tbl_bussclass').DataTable() !== null) {
        $('#tbl_bussclass').DataTable().destroy();
    }
    

    $.get("/components/getbusclass", function (data) {
        var obj = JSON.parse(data);

        $('#tbl_bussclass').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "busClassDesc"
                },
                {
                    "data": null,
                    "render": function (m, t, c, d) {
                        return `<button type="button" class="btn btn-outline-warning ubusaction-btn" data-id="${c.busClassID}" data-mdb-ripple-color="dark">Update</button>`
                    }
                }
            ],
            initComplete: function (settings, json) {
                $('.ubusaction-btn').off().on('click', function () {
                    var id = $(this).attr('data-id');
                    $('#modal-update-ubussclass').modal('show');

                    $('#btn-u-bussclass').off().on('click', function (e) {
                        e.preventDefault();
                        var obj = {
                            BusClassID: id,
                            BusClassDesc: $('#u-buss-class').val()
                        };

                        $.post("/Components/UpdateBusClass", obj, function () {
                            _loadBusClass2();
                            $('#u-buss-class').val('');
                            $('#modal-update-ubussclass').modal('hide');
                        });

                   
                    });

                });
            }
        });

    });
}