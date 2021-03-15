$(function () {
    var baseURL = "http://api-breakingnews-web.itheima.net";
    // 拦截所有ajax请求,  get post ajax
    // 处理参数
    $.ajaxPrefilter(function (options) {
        // 优化URL
        //1. 拦截之后添加域名 http://api-breakingnews-web.itheima.net
        options.url = baseURL + options.url;
        console.log(options);

        //2. 身份验证
        // 判断是否有 / my / 有就添加  身份验证功能,无则跳出
        if (options.url.indexOf(/my/) != -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
            // 3.登陆拦截   不管成不成功都执行一次
            options.complete = function (res) {
                console.log(res.responseJSON);
                let obj = res.responseJSON;
                console.log(obj);
                if (obj.status == 1 && obj.message == '身份认证失败！') {
                    // 删除本地token  跳转页面
                    // 删除token
                    localStorage.removeItem('token')
                    // 跳转页面
                    location.href = '/login.html';
                }
            }
        }
    })
})