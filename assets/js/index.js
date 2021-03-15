$(function () {
    //1.获取用户信息
    getUserInof();
    // 2.退出功能实现
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            // 清除本地保存的token  跳转页面
            // 1.清空token
            localStorage.removeItem('token');
            // 跳转页面
            location.href = '/login.html'
            // 这是取消弹窗
            layer.close(index);
        });
    })

})

// 获取用户信息(封装到入口函数的外面了)
//原因，后面其他页面要调用
function getUserInof() {
    // 发送ajax
    $.ajax({
        // type: 'POST',
        url: '/my/userinfo',
        // 身份验证！！！
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功
            renderAvatar(res.data)
        },
        // 不管成不成功都执行一次
        // 登陆 拦截
        // complete: function (res) {
        //     console.log(res.responseJSON);
        //     let obj = res.responseJSON;
        //     if (obj.status == 1 && obj.message == '身份认证失败！') {
        //         // 删除本地token  跳转页面
        //         // 删除token
        //         localStorage.removeItem('token')
        //         // 跳转页面
        //         location.href = '/login.html'
        //     }


        // }
    })
}
function renderAvatar(user) {
    // 1.渲染名称(nickname优先,username)
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp,&nbsp;" + name);
    //2渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();

    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }

}