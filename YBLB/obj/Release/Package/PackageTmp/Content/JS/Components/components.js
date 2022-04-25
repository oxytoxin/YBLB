




$(document).ready(function () {

    GetUL();
    let com = new _components();
    com.main();
    
});

class _components {



    main() {
        var _components_ = this;
        _components_._loadUnit();
        _components_._loadTerminals();
        _components_._loadFare();
        _components_._event(); 

    }
    
    _event() {

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
                    $('#examples').DataTable().destroy();

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
                });
                $('#addUnit').modal('hide');
                $("#modalPop-dialog").removeClass("bg-danger").addClass("bg-success");
                $('#modalPop_msg').text('Data Inserted!');
                $('#modalPop').modal('show');
            }
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
                });
      
            }
        });


        //ADD FARE
        $("#addFare").click(function () {

            //if ($("#tName").val().length === 0 && $("#tCode").val().length === 0) {

            //    $("#modalPop-dialog").removeClass("bg-success").addClass("bg-danger");
            //    $('#modalPop').modal('show');
            //    $('#modalPop_msg').text('Please Provide Details');
            //}

            var obj = {
                Spoint: $("#s_startpoint option:selected").val(),
                Epoint: $("#s_endpoint option:selected").val(),
                FAmount: $("#f_amount").val(),
                Distance: $("#set_distance").val(),
                CompAmount: $("#f_compartment").val()
            };

            $.post("/Components/AddFare", obj, function () {
                alert('success');
            });

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
                });
            }


        });

        
    }

    _loadUnit() {
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

    _loadTerminals() {
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

            //for (var index = 0; index <= obj.Data.length; index++) {
            //    $('#s_startpoint').append(`<option value="${obj.Data[index].terminalID}">${obj.Data[index].Tcode}&nbsp;-&nbsp;${obj.Data[index].Tname}</option>`);
            //    $('#s_endpoint').append(`<option value="${obj.Data[index].terminalID}">${obj.Data[index].Tcode}&nbsp;-&nbsp;${obj.Data[index].Tname}</option>`);
            //}
        });
    }

    _loadFare() {
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
                            var style = `
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <a style="color: #3b5998;" href="#!" role="button">
                                               <i class="fa-solid fa-pencil"></i>
                                            </a>
                                         </div>

                                        <div class="col">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                         
                            `;
                            return style;
                        }
                    }
                ]
            });
        });
    }

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
                        return `<button type="button" class="btn btn-outline-warning ulvl-btn" data-id="${c.userlvlID}" data-mdb-ripple-color="dark">Update</button>`
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