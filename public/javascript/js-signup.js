

$(document).ready(function () {

    /*
        Validation form 
    */
    $('.form-horizontal').submit(function () {
        var email = $('#email').val();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        var user = $('#name').val();
        var ru = /^[a-zA-Z0-9À ÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐđĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
        var pw = $('#password').val();
        if (pw.length < 6 || pw.length >= 30) {
            return false
        }
        if ((user.length < 5 || user.length >= 50)) {
            return false
        }
        if (re.test(email) && ru.test(user)) {
            return true
        } else {
            return false
        }
    })

    $('.form-group #email').blur(function () {
        var email = $('#email').val();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (re.test(email)) {
            $('#err-email').hide();
        } else {
            $('#err-email').show();
            $('#err-email').text('Email không đúng định dạng')
        }
    })

    $('.form-group #name').blur(function () {
        var user = $('#name').val();
        var ru = /^[a-zA-Z0-9À ÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐđĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;

        if (ru.test(user)) {
            $('#err-user').hide();
            $('#err-user1').hide();

        } if (user.length < 5 || user.length >= 50) {

            $('#err-user1').hide();
            $('#err-user').show();
            $('#err-user').text('Tên từ 5 đến 50 ký tự');

        } else if (!ru.test(user)) {
            $('#err-user').hide()
            $('#err-user1').show();
            $('#err-user1').text('Không có ký tự đặc biệt');
        }

        $('.form-group #password').blur(function () {
            var pw = $('#password').val();
            if (pw.length < 6 || pw.length >= 30) {
                $('#err-pw').show().text('Mật khẩu phải dài từ 6 đến 30 ký tự');
            } else {
                $('#err-pw').hide();
            }
        })
    });

    /*
        shopping-cart button 
    */

    $('.bootstrap-touchspin .update').blur(function () {
        var name = $(this).closest('.search');
        var val = Number(name.find('.update').val());
        if (val < 1) {
            name.find('.update').val(1)
        }
    })
    $('.btn-2').click(function () {
        var name = $(this).closest('.search');
        var val = Number(name.find('.form-control').val());
        name.find('.form-control').val(++val)

    });
    $('.btn-1').click(function () {
        var name = $(this).closest('.search');

        var val = Number(name.find('.form-control').val())
        if (val > 1) {
            name.find('.form-control').val(--val);

        }
    });

    /*
        Update-cart
    */
    $('.update-cart').click(function () {
        var close = $(this).closest('tr');
        var id = $(this).attr('id')
        var soluong = close.find('.update').val();
        if (soluong < 1) {
            soluong = close.find('.update').val('1')
        }
        $.ajax({
            url: '/update-cart/' + id,
            method: 'POST',

            data: { soluong: soluong },
            success: function (reponse) {
                //console.log(reponse);
                location.href = "/shopping-cart";
            }
        })
    });

    /*
        Ajax address
    */

    $('#province').change(function () {
        var province = $('#province').val();
        
        $.post('/dictrict', { 'value1': province }, function (data) {
            $('#dictrict').html('<option value="">Chọn Quận/Huyện</option>');
            $('#ward').html('<option value="">Chọn Xã</option>');
            data.forEach(elm => {
                //console.log(elm.dictrict)
                $('#dictrict').append(`<option value="${elm._id}"> ${elm.dictrict} </option>`);
            })
        })
    })

    $('#dictrict').change(function () {
        var dictrict = $(this).val();
        $.post('/ward', { 'value2': dictrict }, function (data) {
            $('#ward').html('<option value="">Chọn Xã</option>');
            data.forEach(elm => {
                $('#ward').append(`<option value="">${elm.ward}</option>`)
                //console.log(elm.ward);
            })
        })
    })
    /*
        Ajax dat-hang
    */
    $('.dat-hang .submit').click(function () {
        var province = $('.dat-hang #province option:selected').text();
        var dictrict = $('.dat-hang #dictrict option:selected').text();
        var ward = $('.dat-hang #ward option:selected').text();
        var name = $("input[name = 'name']").val();
        var sdt = $("input[name = 'sdt']").val();
        var message = $("textarea[name = 'message']").val();

        $.post('/dat-hang',
            { 'valPro': province, 'valDic': dictrict, 'valWard': ward, 'name': name, 'sdt': sdt, 'message': message }, function (data) {
                window.location.href = '/';

                
            })

    })

    /*
        /chi-tiet
        Product-image
    */

    
    $('.product-main-image .zoomcontainer').eq(0).addClass('active1')
    //imageZoom("active1", "myresult");
	$('.product-other-image img').click(function(event) {
		var index1 = $(this).index();
		$('.product-main-image .img-zoom-lens').remove();
		$('.product-main-image .active1').removeClass('active1');
		$(".product-main-image img").eq(index1).addClass('active1')
		imageZoom("active1", "myresult");
    });
    
    // chitiet.ejs

    
    $('.carousel-inner .item:first').addClass('active');


    $('.search').keyup(function() {
        var val = $(this).val();
        if(val != ''){
            $.post('/search', {search : val}, function(data) {
                $('.suggest').html('');                    
                $('.suggest').append(data); 
                console.log(data);
            })
        }else{
            $('.suggest').html(''); 
            
        }
        
        console.log(val); 
    })
    $('button.click').click(function() {
        alert('dđ')
    })

})

    /*
        Ajax redirect
    */

    $('.redirect').click(function() {
        var redirect = window.location.href;
        //alert(redirect)
        window.location = `/user/login?redirect=${redirect}`
    })