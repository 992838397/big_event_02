$(function () {
    var layer = layui.layer;

    // 处理一下时间数据
    // 为art-templete 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr);
        // 年
        var y = padZero(dt.getFullYear());
        // 月
        var m = padZero(dt.getMonth() + 1);
        // 日
        var d = padZero(dt.getDate());
        // 小时
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

        // 补0,小于10补0
        function padZero(n) {
            return n > 9 ? n : '0' + n
        }
    }
    let q = {
        pagenum: 1,        //是	int	页码值
        pagesize: 2,        //	是	int	每页显示多少条数据
        cate_id: '',        //否	string	文章分类的 Id
        state: '',        //否	string	文章的状态，可选值有：已发布、草稿
    }
    // 1.初始化文章列表及调用
    initTeble();
    function initTeble() {      //
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                // 成功 渲染页面数据
                let strHtml = template('tpl-table', res)
                $('tbody').html(strHtml);
                // 调用分页

                renderPage(res.total)
            }
        })
    }


    // 2.删除列表
    $('tbody').on('click', '.btn-delete', function () {
        // 获取到自定义属性 id的值,根据id去删除
        let id = $(this).attr('data-id');
        //eg1
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 请求ajax
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        layer.msg(res.message)
                    }
                    // 成功  提示用户  渲染数据  
                    layer.msg("恭喜您,删除成功")
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    initTeble();

                }
            })

            layer.close(index);
        });

    })


    // 3.初始化分类
    var form = layui.form;
    initCate();
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            data: {},
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //   成功  渲染数据  
                let strHtml = template('tpl-Cate', res)
                $('[name="cate_id"]').html(strHtml)
                // 个别标签需要这个 渲染  如单选 复选之类
                form.render();
            }
        })
    }

    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取两个属性的值
        var state = $("[name=state]").val();
        var cate_id = $('[name=cate_id]').val();
        console.log(state, cate_id);
        // 赋值   拿到这些值之后,传回上面,参数数据给表格调用,然后渲染数据
        q.state = state;
        q.cate_id = cate_id;
        // 初始化文章列表
        initTeble();


    })


    // 5.分页
    let laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            // 获取到当前的分页数
            limit: q.pagesize,
            // 获取到当前的分页
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // 把当前选择的页数传回列表调用
                // 当前分页数赋值给上面分页数,然后数据传入调用
                q.pagesize = obj.limit

                //首次不执行
                if (!first) {
                    //do something
                    // 把当前页传递给初始化文章列表,然后渲染数据 
                    q.pagenum = obj.curr
                    initTeble();
                }
            }
        });



    }






})