$(function () {
    // 需求1: 点击去注册，跳转注册页面,登陆隐藏,注册显示
    $('.link_res').on('click', function () {
        $('.login-box').hide();
        $('.res-box').show();
    })
    //同上面一样
    $('.link_login').on('click', function () {
        $('.res-box').hide();
        $('.login-box').show();
    })
    // console.log(layui.form);


    // 需求2:校验表单 自定义验证规则
    // 获取layui.form表单
    var form = layui.form;
    // console.log(form);
    // console.log();
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码规则
        repwd: function (value) {
            // value是再次确认密码的值
            // console.log(value);
            // pwd拿到的是密码的值
            let pwd = $('.res-box input[name=password]').val();
            // 做比较,如果密码不一致,则终止函数
            if (value != pwd) {
                return "两次密码不一致,请重新输入";
            }
        }
    });


    // 需求3:注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 阻止默认跳转
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.res-box [name=username]').val(),
                password: $('.res-box [name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                // 判断返回状态
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码

                layer.msg("注册成功请登入！");
                // 手动切换到登陆表单
                $('.link_login').click();
                // 重置表单
                $('#form_reg')[0].reset();
            }
        })
    })

    // 需求4:登陆功能
    $('#form_login').submit(function (e) {
        // 阻止默认事件
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提示信息 保存token 跳转页面
                layer.msg('恭喜你,登入成功');
                // 保存token 未来接口要用到
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })

    })



})