$(function () {



    // 1.定义自定义验证各种
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 1.2 新旧密码不重复
        samePwd: function (value) {
            // console.log($('[name=oldpwd]'));

            // value是新密码
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和新密码不能相同'
            }
        },
        // 1.3两次密码必须相同
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次新密码不一致';
            }

        }

    })

    // 2.表单提交
    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })

    })


})
