$(function () {
    //1.获取用户信息
    getUserInof();
})

// 获取用户信息(封装到入口函数的外面了)
//原因，后面其他页面要调用
function getUserInof() {
    // 发送ajax
    $.ajax({
        // type: 'POST',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },

        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user) {
    // 1.渲染名称(nickname优先,username)
    var name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp,&nbsp;" + name);
    //2渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().arrt('src', 'user.user_pic');
        $('.text.avatar').hide();

    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }

}