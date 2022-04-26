
var UserLvlSelected = 0;


$(document).ready(function () {

    home_event();
    home_loadFunction();

});


function home_event() {

    var currentScriptPath = function () {

        var scripts = document.querySelectorAll('script[src]');
        var currentScript = scripts[scripts.length - 1].src;
        var currentScriptChunks = currentScript.split('/');
        var currentScriptFile = currentScriptChunks[currentScriptChunks.length - 1];

        return currentScript.replace(currentScriptFile, '');
    }
    console.log(currentScriptPath());


    $('#btn-ssearch-anns').off().on('click', function () {
        GetAnnSearch();
    });

}


function home_loadFunction() {
    GetUvl();
    $('.con-hide').hide();
    GetAnnouncement();
    GetQry();
    GetArchived();
    Getallreg();
    $('#btn-qry-to-list').off().on('click', function () {
        $('#modal-qry-list').modal('show');
    });
}

function GetArchived() {

    if ($('#tbl-archived').DataTable() !== null) {
        $('#tbl-archived').DataTable().destroy();
    }

    $.get("/Home/Getqryheaderarchived", function (data) {
        const obj = JSON.parse(data);

        $('#tbl-archived').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "qryID"
                },
                {
                    "data": "Uqueries"
                },
                {
                    "data": "qDatetime"
                },
                {
                    "data": null,
                    "render": function (q, w, e, r) {
                        var o_layout = `<button type="button"
                                        class="btn btn-primary btn-floating btn-update-archived"
                                        data-id="${e.qryID}">
                                          <i class="fa-solid fa-box-archive"></i>
                                        </button>`;
                        return o_layout;
                    }
                }
            ],
            initComplete: function (settings, json) {
                $('.btn-update-archived').off().on('click', function () {
                    var id = $(this).attr('data-id');

                    var objs = {
                        I_qryID: id,
                        I_Archive: 0
                    };


                    $.get("/Home/Archive", objs, function (data) {
                        const objData = JSON.parse(data);
                        alert(objData.Data[0].msg);
                        GetQry();
                        GetArchived()
                    });
                })
            }
        });

    });
}


function GetQry() {

    $.get("/Home/Getqryheader", function (data) {
        const obj = JSON.parse(data);
      

        $('.inbox-container').html('');
        $.each(obj.Data, function (index, value) {
            var o_layout = `<div class="card mb-3">
                              <div class="card-body">
                                <h5 class="card-title">${value.uCname} <small style="font-size:12px;">${value.qDatetime}</small></h5>
                                <hr>
                                <button type="button" class="btn btn-outline-primary btn-read-inbox"
                                data-qryID="${value.qryID}"
                                data-userID="${value.userID}"
                                data-announceID="${value.announceID}"
                                data-Uqueries="${value.Uqueries}"
                                data-uCname="${value.uCname}"
                                data-mdb-ripple-color="dark">Read</button>
                                <button type="button" class="btn btn-outline-danger btn-archive-inbox"
                                data-qryID="${value.qryID}"
                                data-mdb-ripple-color="dark">Archive</button>
                              </div>
                            </div>`;
            $('.inbox-container').prepend(o_layout);
        });

        $('.btn-read-inbox').off().on('click', function () {
            var _qryID = $(this).attr('data-qryID');
            var _userID = $(this).attr('data-userID');
            var _announceID = $(this).attr('data-announceID');

            var _Uqueries = $(this).attr('data-Uqueries');
            var _uCname = $(this).attr('data-uCname');



            $('.inbox-uname').text(_uCname);
            $('#txt-qry').text(_Uqueries);
            $('#modal-inside-inbox').modal('show');


            GetQryBody(_qryID, _userID, _announceID);

            $('#btn-reply-to-qry').off().on('click', function () {
                var _userSendByID = sessionStorage.getItem("userID");
                var objs = {
                    I_qryID: _qryID,
                    I_sendTo: _userID,
                    I_sendBy: _userSendByID,
                    I_queriesbody: $('.txt-msg-to-qry-reply').val(),
                    I_announceID: _announceID
                };


                $.get("/Home/Getqrybody", objs ,function (data) {
                    const objData = JSON.parse(data);
                    console.log(objData.Data[0].msg);
                    $('.txt-msg-to-qry-reply').val('');
                    GetQryBody(_qryID, _userID, _announceID);
                });


             
            });


        });

        $('.btn-archive-inbox').off().on('click', function () {
            var _qryID = $(this).attr('data-qryID');

            var objs = {
                I_qryID: _qryID,
                I_Archive: 1
            };


            $.get("/Home/Archive", objs, function (data) {
                const objData = JSON.parse(data);
                alert(objData.Data[0].msg);
                GetQry();
                GetArchived();
            });

        });

    });
}

function GetQryBody(_qryID, _MessengerID, _announceID) {

    var obj = {
        I_qryID: _qryID,
        I_sendTo: _MessengerID,
        I_announceID: _announceID
    }

    $('.inbox-qry-result').html('');
    $.get("/Home/GetqrybodyInbox", obj , function (data) {
        const objData = JSON.parse(data);
        $.each(objData.Data, function (index, value) {
            var o_layout = `<p class="note note-light">
                                <strong>${value.qDateTime}</strong> ${value.queriesbody}
                            </p>`;
            $('.inbox-qry-result').append(o_layout);
        });
        


    });
}

function Getallreg() {
    $.get("/Home/GetAllReg", function (data) {
        const obj = JSON.parse(data);
        $('.totregs').text('');
        $('.totcomms').text('');
        $('.totpost').text('');
        $.each(obj.Data, function (index, value) {
            $('.totregs').text(value.TotalReg);
            $('.totcomms').text(value.TotalComment);
            $('.totpost').text(value.TotalPost);
        }    
        );
    });

}


function GetAnnSearch() {

    var obj = {
        I_queriesbody: $('#ssanounce').val().length > 0 ? $('#ssanounce').val() : ' '
    };

    $.get("/Home/GetAnnSearch", obj , function (data) {
        const obj = JSON.parse(data);
        console.log(obj);
        $('#ann-container').html('');
        $.each(obj.Data, function (index, value) {
            var o_layout = `<div class="mb-3 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">${value.uCname}</h4>
                            <small>${value.announceDate}</small>
                            <p class="card-text">${value.announcement}</p>
                                <div class="mb-2">
                                  <img src="/FilesUpload/${value.imgPath}" style='height: 50%; width: 50%; object-fit: contain'/>
                                </div>

                        
                            <div class="collapse mt-3" id="collapse${value.announceID}">
                                <div id="ann-comment-container">
                                    <div class="card mt-2 mb-2">
                                        <div class="card-body">
                                            <p class="card-title">Herald Sombrio</p>
                                            <small class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>
                                            <button type="button" class="btn btn-primary">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;
            $('#ann-container').append(o_layout);
        });

    });



}


function GetAnnouncement() {
    $.get("/Home/GetAnnouncement", function (data) {
        const obj = JSON.parse(data);
        $('#ann-container').html('');
        $.each(obj.Data, function (index, value) {
            var o_layout = `<div class="mb-3 mt-3">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">${value.uCname}</h4>
                            <small>${value.announceDate}</small>
                            <p class="card-text">${value.announcement}</p>
                                <div class="mb-2">
                                  <img src="/FilesUpload/${value.imgPath}" style='height: 50%; width: 50%; object-fit: contain'/>
                                </div>

                        
                            <div class="collapse mt-3" id="collapse${value.announceID}">
                                <div id="ann-comment-container">
                                    <div class="card mt-2 mb-2">
                                        <div class="card-body">
                                            <p class="card-title">Herald Sombrio</p>
                                            <small class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</small>
                                            <button type="button" class="btn btn-primary">Button</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>`;
            $('#ann-container').append(o_layout);
        });

    });
}




function GetUvl() {
    $.get("/Components/GetUserlvl", function (data) {
        const obj = JSON.parse(data);

      
        $('.list-ulvl').html('');
        $.each(obj.Data, function (index, value) {
            //$('.list-ulvl').append(`<option value="${value.terminalID}">${value.Tcode}&nbsp;-&nbsp;${value.userlvlID}</option>`);
            $('.list-ulvl').append(`<li><a class="dropdown-item seed-btn" data-id="${value.userlvlID}" href="#">${value.userLvl}</a></li>`);
        });


        $(".seed-btn").click(function () {
            var id = $(this).attr('data-id');
            $('#UserLvlID').val(id);
            UserLvlSelected = id;
        });


    });




}