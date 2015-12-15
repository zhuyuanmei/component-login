/**
 * 如何调用【登录】功能
 * @since 2015.12.15
 */
define(function (require, exports, module) {
    //提示语公用函数
    var errorTip = function($target,tip){
        $target.show();
        $target.text(tip);

        setTimeout(function(){
            $target.removeClass('error-tip');
            $target.addClass('error-tip-fade');

            setTimeout(function(){
                $target.removeClass('error-tip-fade');
                $target.addClass('error-tip');

                $target.hide();
            },500);
        },2000);
    };

    //'登录'模块
    if($('#J_Login').length){
        var Login  = require('login');

        $.login({
            //获取当前官网主色调(决定nav和btn色系)
            mainColor: '#00A0E9',

            //登录导航条标示符
            hasNav: true,

            //登录导航对象
            navObj: $('#J_LoginNav'),

            //登录导航title对象
            navTitleObj: $('#J_NavTitle'),

            //登录logo图片标示符
            hasLogo: true,

            //登录logo对象
            logoObj: $('#J_LoginLogo'),

            //登录表单对象
            loginForm: $('#J_LoginForm'),

            //主键对象是手机号码或是用户名( phone或userName)
            mainKeyFlag: 'phone',

            //主键对象
            mainKeyObj: $('#J_TelNumber'),

            //密码对象
            pwdObj: $('#J_PwdNumber'),

            //提示信息载体对象
            tipObj: $('#J_ErrorTip'),

            //'忘记密码','立即注册'等模块标示符
            hasMoreLink: true,

            //'忘记密码','立即注册'等模块对象
            moreLinkObj: $('#J_MoreLink'),

            //提交btn对象
            submitBtn: $('#J_SubmitData'),

            //ajax回调函数
            callBackFunc: function(result){
                if(result.flag){
                    window.location.href = result.url;
                }else{
                    errorTip(this.tipObj,result.msg);
                }
            }
        });
    }
});