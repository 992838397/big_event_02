$(function () {
    //1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return "昵称长度为1~6位"
            }

        }
    })


    //2. 用户渲染
    initUserInfo();
    // 导出layer
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功渲染
                // 赋值或者取值,有则取值,无则赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 3.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        // 从新用户渲染
        initUserInfo();
    })
    // 4.修改用户信息
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POSt',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg("用户信息修改失败")
                }
                //   成功
                layer.msg('恭喜你,用户信息修改成功')
                //   借调父页面中的更新用户信息和头像方法
                // 更新一下用户信息和头像
                window.parent.getUserInof();
            }
        })
    })





})
