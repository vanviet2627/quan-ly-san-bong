$(document).ready(function () {
    let check = $('#islogin').val();
    if(check == 'false'){
        $('#changes').html('<button type="button" class="primary-btn py-2 text-uppercase d-block mx-auto mt-1" data-toggle="modal" data-target="#signinModal">Đặt sân</button>');
    }
    $('form#login').submit(function (e) { 
        e.preventDefault();
        let data = {
            email: $("#email").val(),
            password: $("#password").val()
        }
        $.ajax({
            type: "POST",
            url: "/user/login",
            data: data,
            success: function (response) {
                if(response.acp == 0){
                    $('#thongbao').html('<div class="alert alert-danger" role="alert">'+response.mess+'</div>');
                }else{
                    // window.sessionStorage.setItem("sessionLogin", response.email);
                    // window.location.href = '/user/';
                }
            }
        });
    });
});