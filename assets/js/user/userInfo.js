$(function () {
    let form = layui.form
    let layer = layui.layer
    // 自定义验证规则
    form.verify({
        nickname: [
            /^[\S]{2,12}$/,
            '昵称必须2到12位，且不能出现空格'
        ]
    })
    // 渲染用户信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('userInfoForm', res.data)
            }
        })
    }
    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("用户信息修改成功")
                window.parent.getUserInfo()
            }
        })

    })
    // $('#userinfo').on('submit', function (e) {
    //     e.preventDefault()
    // })





})