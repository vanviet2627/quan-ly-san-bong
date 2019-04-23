$(document).ready(function () {
    let check = $('#islogin').val();
    if(check == 'false'){
        $('#changes').html('<button type="button" class="primary-btn py-2 text-uppercase d-block mx-auto mt-1" data-toggle="modal" data-target="#signinModal">Đặt sân</button>');
    }
    $('form#login').submit(function (e) { 
        e.preventDefault();
        var phoneNumber = $("#phoneNumber").val()
        var password = $("#password").val()
        let data = {
            phoneNumber: phoneNumber,
            password: password
        }
        $.ajax({
            type: "POST",
            url: "/login",
            data: data,
            success: function (response) {
                if(response.acp == 0){
                    $('#thongbao').html('<div class="alert alert-danger" role="alert">'+response.mess+'</div>');
                }else{
                    window.sessionStorage.setItem("isLogin", true);
                    window.location.href = '/user';
                }
            }
        });
    });
    $('form#signup').submit(function (e) { 
        e.preventDefault();
        var phoneNumber = $("#phoneNumber").val()
        var password = $("#password").val()
        let data = {
            phoneNumber: phoneNumber,
            password: password
        }
        $.ajax({
            type: "POST",
            url: "/signup",
            data: data,
            success: function (response) {
                if(response.acp == 0){
                    $('#thongbao').html('<div class="alert alert-danger" role="alert">'+response.mess+'</div>');
                }else{
                    alert("Đăng ký thành công!");
                    window.sessionStorage.setItem("isLogin", true);
                    window.location.href = '/user';
                }
            }
        });
    });
    
});