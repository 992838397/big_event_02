$(function () {
    var layer = layui.layer;
    var form = layui.form;
    // 1.文章类别列表展示
    initArtCateList();
    // 封装函数
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                // 模板引擎调用
                let str = template('tpl-art-cate', { list: res.data });
                $('tbody').html(str)
            }
        })
    }
    // 2.点击添加类别
    $('#btnAdd').on('click', function () {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            // 定义了一个模板引擎渲染数据
            content: $('#dialog-add').html()
        });

    })

    var index = null;
    // 3.提交添加类别  事件委托
    $('body').on('submit', '#form-add', function (e) {
        // e.preventDefalue();
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                //   成功  把页面数据在渲染一遍
                layer.msg('恭喜您,添加类别成功');
                initArtCateList();
                // 关闭弹窗
                layer.close(index);


            }
        })

    })




    var btn_Edit = null;
    //4.修改类别
    $('tbody').on('click', '.btn-edit', function () {
        btn_Edit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            // 定义了一个模板引擎渲染数据
            content: $('#dialog-edit').html()
        });
        // 获取页面上的ID值
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + id,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                //   成功   渲染全部数据
                // 用于给指定表单集合的元素赋值和取值。
                // 如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值。
                //  form.val()  配合 lay-filter使用
                form.val('form-edit', res.data);


            }
        })
    })
    // 4.提交
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message);
                }
                //   成功 获取最新的页面 用户数据及关闭弹窗
                layer.msg('恭喜您,成功修改了类别')
                initArtCateList();
                // 关闭弹窗
                layer.close(btn_Edit)
            }
        })
    })
    //5.删除
    $('body').on('click', '.btn-delete', function (e) {
        // 获取ID  ,然后用ID值去删除
        let id = $(this).attr('data-id');
        //eg1
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                //   data: {},
                success: (res) => {
                    console.log(res);
                    if (res.status != 0) {
                        layer.msg(res.message)
                    }
                    //   成功  更新新的数据 
                    layer.msg("恭喜您,删除成功")
                    initArtCateList()
                }
            })

            layer.close(index);
        });

    })











})