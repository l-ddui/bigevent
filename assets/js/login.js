$(function () {
    $('#toReg').click(function () {
        $('.loginBox').hide()
        $('.regBox').show()

    })
    $('#toLogin').click(function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })

    // 自定义校验规则
    let form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('#form_reg input[name=password]').val()
            if (value != pwd) {
                return '两次密码输入不一致！'
            }
        }
    })

    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        let username = $('#form_login [name="username"]').val().trim()
        let password = $('#form_login [name="password"]').val().trim()
        // console.log(username, pwd);
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: { username, password },
            success: (res) => {
                if (res.status != 0) {
                    return alert(res.message)
                } else {
                    alert(res.message)
                    localStorage.setItem("token", res.token)
                    location.href = '/index.html'
                }

            }
        })
    })

    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        // console.log(123);
        let username = $('#form_reg [name="username"]').val().trim()
        let password = $('#form_reg [name="password"]').val().trim()
        let rePwd = $('#form_reg [name="rePwd"]').val().trim()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: { username, password },
            success: (res) => {
                if (res.status != 0) {
                    return alert(res.message)
                } else {
                    alert(res.message)
                    $('.regBox').hide()
                    $('.loginBox').show()
                }

            }
        })


    })


})