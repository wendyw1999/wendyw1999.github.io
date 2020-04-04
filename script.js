var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
$(document).on('click','#send', function() {
    if ($('#phone').val().length == 0) {
        console.log("Empty")

        return;
  } else if ($('#phone').val().length !=11) {
        console.log("not 11");
        return;
        }
        $("#send").attr("disabled", true);

    // var that = $(this);
    //  var timeo = 60;
    //  var timeStop = setInterval(function(){
    //      timeo--;
    //      if (timeo>0) {
    //          that.text('重新发送 (' + timeo +')');
    //          that.attr('disabled','disabled');//禁止点击
    //      }else{
    //          timeo = 60;//当减到0时赋值为60
    //          that.text('获取验证码'); 
    //          clearInterval(timeStop);//清除定时器
    //          that.removeAttr('disabled');//移除属性，可点击
    //      }
    //  },1000)
 })

 $(document).on('click',"#submit",function() {
     $("#send").attr("disabled", true);
 })


//  ————————————————
//  版权声明：本文为CSDN博主「lily2016n」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
//  原文链接：https://blog.csdn.net/lily2016n/java/article/details/78969033