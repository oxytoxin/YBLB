$(document).ready(function () {

    _credentials_Event() ;
});

var _passWord = "";
var _isValidpassWord = false;
var _passWordBase = "";
var _passWordConfirm = "";

function _credentials_Event() {

    $('#proceed-btn').click(function () {
        document.location.href = '/Auth/Login'
    });

    $('#btn-proc-reguser').click(function () {
        document.location.href = '/Registrations/Registration'
    });

    $('#proc-to-logins').click(function () {
        document.location.href = '/Auth/Login'
    });
    

    $('#testbtn').click(function () {
        var obj = {
            I_USERNAME: $('#u_name_txt').val(),
            I_PASWWORD: $('#u_pass_txt').val()
        };

        console.log(obj)

        $.get("/Components/UserLogin", obj, function (data) {
            const obj = JSON.parse(data);
            console.log(obj);
            if (obj.Data[0].isValid === 1) {
                sessionStorage.setItem("userID", obj.Data[0].UID);
                if (obj.Data[0].USERLVL === 1) {
                    document.location.href = '/Home/Index';
                }
                if (obj.Data[0].USERLVL === 2) {
                    document.location.href = '/Commuters/Index';
                }
                if (obj.Data[0].USERLVL === 3) {
                    document.location.href = '/Commuters/Index';
                }
                
            }
            else {
                alert('Account not Exist!');
            }
        });

    });



    $("#btn_add_userRegs").click(function () {

        var validator = {
            I_UCNAME: null,
            I_UBD: null,
            I_UADDRESS: null,
            I_UEMAIL: null,
            I_USERNAME: null,
            I_PASWWORD: _passWord,
            isValid : false
        }


        if (!isValidEmailAddress($('#txt_uemail').val()) || $('#txt_cname').val().length === 0 || $('#datepicker2s').val().length === 0 || $('#txt_address').val().length === 0 || $('#txt_username').val().length === 0) {
            validator.I_UEMAIL = $('#txt_uemail').val().length === 0 ? 'Empty!' : $('#txt_uemail').val();
            validator.I_UCNAME = $('#txt_cname').val().length === 0 ? 'Empty!' : $('#txt_cname').val();
            validator.I_UBD = $('#datepicker2s').val().length === 0 ? 'Empty!' : $('#datepicker2s').val();
            validator.I_UADDRESS = $('#txt_address').val().length === 0 ? 'Empty!' : $('#txt_address').val();
            validator.I_USERNAME = $('#txt_username').val().length === 0 ? 'Empty!' : $('#txt_username').val();
       
            validator.isValid = false;
            $('#dt1').text('Email : ' + $('#txt_uemail').val());
            $('#dt2').text('Name : ' + $('#txt_cname').val());
            $('#dt3').text('BirthDate : ' + $('#datepicker2s').val());
            $('#dt4').text('Address : ' + $('#txt_address').val());
            $('#dt5').text('Username : ' + $('#txt_username').val() );
            $('#errorModalRegUser').modal('show');
        }

        else {
            validator.isValid = true;

            if ($('#chkAgree').is(":checked") && _isValidpassWord === true) {
                var obj = {
                    I_UCNAME: $('#txt_cname').val(),
                    I_UGENDER: $("#s_gender option:selected").val(),
                    I_UBD: $("#datepicker2s").val(),
                    I_UADDRESS: $('#txt_address').val(),
                    I_UEMAIL: $('#txt_uemail').val(),
                    I_USERLVLID: 3,
                    I_UIMG: 'none',
                    I_UACTIVE: 1,
                    I_USERNAME: $('#txt_username').val(),
                    I_PASWWORD: _passWord
                };

                $.get("/Components/UserReg", obj , function (data) {
                    const obj = JSON.parse(data);
                    if (obj.Data[0].Result === 'Complete!') {
                        $('#modal-success-reg').modal('show');
                    }
                    else {
                        $('#modal-userexist-reg').modal('show');
                    }
                });

            } else {
                if (_isValidpassWord === false) {
                    alert('Password is not Confirmed!');
                }
                else {
                    alert('Please Agree');
                }
            }
        }
       
    });


    $('#passbase').keyup((e) => {
        _passWordBase = e.currentTarget.value;
        if (_passWordBase === _passWordConfirm) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-check trailing text-success"></i>`);
            _passWord = e.currentTarget.value;
            _isValidpassWord = true;
        }
        if (e.currentTarget.value !== _passWordConfirm) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-xmark trailing text-danger"></i>`);
        }

    });

    $('#passbase').keydown((e) => {
        _passWordBase = e.currentTarget.value;
        if (_passWordBase === _passWordConfirm) {
            $("#ic-txt").remove();  
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-check trailing text-success"></i>`);
            _passWord = e.currentTarget.value;
            _isValidpassWord = true;
        }
        if (e.currentTarget.value !== _passWordConfirm) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-xmark trailing text-danger"></i>`);
        }
    });



    $('#passConfirmBase').keyup((e) => {
        _passWordConfirm = e.currentTarget.value;
        if (_passWordBase === _passWordConfirm) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-check trailing text-success"></i>`);
            _passWord = e.currentTarget.value;
            _isValidpassWord = true;
        }
        if (_passWordBase !== e.currentTarget.value) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-xmark trailing text-danger"></i>`);
        }
    });

    $('#passConfirmBase').keydown((e) => {
        _passWordConfirm = e.currentTarget.value;
        if (_passWordBase === _passWordConfirm) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-check trailing text-success"></i>`);
            _passWord = e.currentTarget.value;
            _isValidpassWord = true;
        }
        if (_passWordBase !== e.currentTarget.value) {
            $("#ic-txt").remove();
            $('.conpass').append(`<i id="ic-txt" class="fa-solid fa-circle-xmark trailing text-danger"></i>`);
        }
    });




}




function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};