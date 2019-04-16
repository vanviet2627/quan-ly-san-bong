$(document).ready(function () {
    let check = $('#islogin').val();
    if(check =='false'){
        $('#changes').html('<button type="button" class="primary-btn py-2 text-uppercase d-block mx-auto mt-1" data-toggle="modal" data-target="#signinModal">Đặt sân</button>');
        
    }
    
});