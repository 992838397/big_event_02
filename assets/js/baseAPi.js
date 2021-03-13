$(function () {
    var baseURL = "http://api-breakingnews-web.itheima.net";
    // 拦截所有ajax请求,  get post ajax
    // 处理参数
    $.ajaxPrefilter(function (options) {
        // 优化URL
        // 拦截之后添加域名 http://api-breakingnews-web.itheima.net
        // console.log(options.url);
        options.url = baseURL + options.url;
        console.log(options);



    })

})