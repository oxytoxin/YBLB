

$(document).ready(function () {

    _GetAllusers();

});


function _GetAllusers() {

    if ($('#tbl_userdetails').DataTable() !== null) {
        $('#tbl_userdetails').DataTable().destroy();
    }

    $.get("/Components/GetAllusers", function (data) {
        var obj = JSON.parse(data);
        console.log()
        $('#tbl_userdetails').DataTable({
            data: obj.Data,
            columns: [
                {
                    "data": "uImg",
                    "render": function (d) {

                        var data = d === 'none' ? "defaultimg.jpg" : d;

                        var o_layout = `<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                <img src="/FilesUpload/${data}" class="img-fluid"/>
                            </div>`;
                        return o_layout;
                    }
                },
                {
                    "data": "uCname"
                },
                {
                    "data": "uGender"
                },
                {
                    "data": "uBD"
                },
                {
                    "data": "uAddress"
                },
                {
                    "data": "uEmail"
                },
                {
                    "data": "userLvl"
                },
                {
                    "data": "username"
                },
                {
                    "data": null,
                    "render": function (q, w, e, r) {
                        var o_layout = `<button type="button" class="btn btn-outline-warning btn-update-users" 
                                        data-userID="${e.userID}"
                                        data-uAddress="${e.uAddress}"
                                        data-uBD="${e.uBD}"
                                        data-uCname="${e.uCname}"
                                        data-uEmail="${e.uEmail}"
                                        data-uGender="${e.uGender}"
                                        data-uImg="${e.uImg}"
                                        data-username="${e.username}"
                                        data-mdb-ripple-color="dark">Update</button>`;

                        return o_layout;
                    }
                },
            ],
            initComplete: function (settings, json) {
                $('.btn-update-users').off().on('click', function () {
                    var _userID = $(this).attr('data-userID');
                    var _uAddress = $(this).attr('data-uAddress');
                    var _uBD = $(this).attr('data-uBD');
                    var _uCname = $(this).attr('data-uCname');
                    var _uEmail = $(this).attr('data-uEmail');
                    var _uGender = $(this).attr('data-uGender');
                    var _uImg = $(this).attr('data-uImg');
                    var _username = $(this).attr('data-username');

                    var obj = {
                        userID  :  _userID,
                        uAddress : _uAddress,
                        uBD : _uBD,
                        uCname: _uCname,
                        uEmail : _uEmail,
                        uGender: _uGender,
                        uImg: _uImg,
                        username: _username
                    };

                    $('#modal-update-users').modal('show');
                    $('#I_USERID').val(_userID);
                    $('#pName').val(_uCname);
                    $('#pGender').val(_uGender);
                    $('#pBd').val(_uBD);
                    $('#pAddress').val(_uAddress);
                    $('#pEmail').val(_uEmail);
                    $('#pUsername').val(_username);

                    $('#btn-update-creds').off().on('click', function () {
                        var cred = {
                            I_USERID: _userID,
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
                            I_USERID: _userID,
                            I_UADDRESS: $('#pAddress').val().length < 0 ? _uAddress : $('#pAddress').val(),
                            I_UEMAIL: $('#pEmail').val().length < 0 ? _uEmail : $('#pEmail').val(),
                            I_USERNAME: $('#pUsername').val().length < 0 ? _username : $('#pUsername').val()
                        };

                        if ($('#pAddress').val() === '' || $('#pEmail').val() === '' || $('#pUsername').val() === '') {
                            alert('Please Provide Details!');
                        }

                        else {
                            $.get("/Components/UpdateDetailsUsers", det , function (data) {
                                const obj = JSON.parse(data);
                                _GetAllusers();
                                alert(obj.Data[0].msg);
                            });
                        }

                      

                    });

                });
            }
        });


    });
}