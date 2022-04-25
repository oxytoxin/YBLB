
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


}


function home_loadFunction() {

    GetUvl();
    $('.con-hide').hide();
    GetAnnouncement();

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
                            <button class="btn btn-primary mt-1"
                                    type="button"
                                    data-mdb-toggle="collapse"
                                    data-mdb-target="#collapse${value.announceID}"
                                    aria-expanded="false"
                                    aria-controls="collapse${value.announceID}">
                                Comment
                            </button>

                        
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

        console.log(obj.Data);
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