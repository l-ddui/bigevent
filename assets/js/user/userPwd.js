$(function () {
    // 自定义验证规则
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (newPwd) {
            let pwd = $('[name="oldPwd"]').val()
            console.log(pwd);
            if (newPwd == pwd) {
                return '新密码不能和原密码相同'
            }
        },
        rePwd: function (rePwd) {
            let newPwd = $('[name="newPwd"]').val()
            if (rePwd != newPwd) {
                return '两次密码不一致'
            }
        },
    });

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                } else {
                    layui.layer.msg("密码修改成功")
                    $('.layui-form')[0].reset()
                }

            }
        })

    })


})