# component_login
组件名称：用户登录<br>
组件功能：完成登录页面元素-- 导航条，Logo图标，其他链接模块 的动态配置(隐藏或显示)以及相关事件的绑定和回调<br>
组件参数：{<br>
            //获取当前官网主色调(决定nav和btn色系)<br>
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

            //ajax回调函数 (可以自己封装具体方法)
            callBackFunc: function(result){
                if(result.flag){
                    window.location.href = result.url;
                }else{
                    errorTip(this.tipObj,result.msg);
                }
            }

}
