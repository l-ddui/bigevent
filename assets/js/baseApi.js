$.ajaxPrefilter(function (options) {
    let baseUrrl = 'http://ajax.frontend.itheima.net'

    options.url = baseUrrl + options.url

    if (options.url.indexOf("/my/") != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        // console.log(res.responseJSON);

        let obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 销毁 token
            localStorage.removeItem('token')
            // 跳转到首页
            location.href = '/login.html'
        }
    }


})