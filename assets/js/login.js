$(function(){
    // 点击事件
    $('#link_login').on('click', function () {
      $('.login-box').hide()
      $('.reg-box').show()
  })

  $('#link_reg').on('click', function () {
      $('.reg-box').hide()
      $('.login-box').show()
  })
  // 表格输入格式
  let form = layui.form
  let layer = layui.layer
  form.verify({
      pwd: [/^[\S]{6,12}$/, '密码必须6到12位,而且不能出现空格'],

      repwd: function (value) {
          let pwd = $('#password').val()
          if (pwd !== value) {
              return '两次密码不一致！'
          }

      }
})
// 给注册表单添加提交行为

//   注册事件         
$('#form_reg').on('submit',function(e){
e.preventDefault()
   // 发请求ajax
   $.ajax({
      method:'post',
      url:'/api/reg',
      // contentType:'application/json',
      data:$(this).serialize(),
      success(res){
         if(res.code!==0) return layer.msg(res.message)
        layer.msg('注册成功')
        $('#link_reg').click()
      }
   })
})

// 登录事件
$('#login-box').on('submit',function(e){
   e.preventDefault()
   $.ajax({
      method:'post',
      url:'/api/login',
      // contentType:'application/json',
      data:$(this).serialize(),
      success(res){
         if(res.code!==0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('token',res.token)
        location.href='/home.html'
      }
   })
})
})