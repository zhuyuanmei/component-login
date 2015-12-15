/**
 * 登录模块
 * @author zym
 * @version 1.0
 * @since 2015-12-15
 */

define(function(require, exports, module) {
    var Login = function(options) {
        this.settings = $.extend({}, Login.defaults, options);
        this.init();
    };

    Login.prototype = {
            /**
             * 初始化
             */
            init : function() {
                this.create();
            },

            /**
             * 创建
             */
            create : function() {
                var _this = this;

                if(_this.settings.hasNav){
                    //有导航条
                    _this.settings.navTitleObj.css('color',_this.settings.mainColor);
                    _this.settings.navObj.show();

                    if(_this.settings.hasLogo){
                        //有logo图片
                        _this.settings.loginForm.css('margin-top',0);
                        _this.settings.logoObj.css('margin-top',50);
                        _this.settings.logoObj.show();
                    }else{
                        //无logo图片
                        _this.settings.loginForm.css('margin-top',80);
                        _this.settings.logoObj.css('margin-top',50);
                        _this.settings.logoObj.hide();
                    }
                }else{
                    //无导航条
                    _this.settings.navObj.hide();

                    if(_this.settings.hasLogo){
                        //有logo图片
                        _this.settings.loginForm.css('margin-top',0);
                        _this.settings.logoObj.css('margin-top',0);
                        _this.settings.logoObj.show();
                    }else{
                        //无logo图片
                        _this.settings.loginForm.css('margin-top',40);
                        _this.settings.logoObj.css('margin-top',0);
                        _this.settings.logoObj.hide();
                    }
                }

                //显示或隐藏 '忘记密码','立即注册'等模块
                if(_this.settings.hasMoreLink){
                    _this.settings.moreLinkObj.show();
                }else{
                    _this.settings.moreLinkObj.hide();
                }

                //提交btn背景色渲染成主色调
                _this.settings.submitBtn.css('background',_this.settings.mainColor);

                // 事件绑定
                _this.bindEvent();
            },

            /**
             * 错误提示语公用方法
             */
            errorTip : function($target,tip){
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
            },

            /**
             * 校验手机号码
             */
            validatePhone : function($phone, $tip, tip){
                var _this = this;

                var result = false;
                if($.trim($phone.val()) === '' || !(/^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/.test($.trim($phone.val())))){
                    _this.errorTip($tip,tip);
                    result = false;
                }else{
                    result = true;
                }
                return result;
            },

            /**
             * 校验用户名
             */
            validateUserName : function($name, $tip, tip) {
                var _this = this;

                var result = false;
                if($.trim($name.val()) === '' || !(/^[0-9a-zA-Z\u4e00-\u9fa5\uf900-\ufa2d]{2,10}$/.test($.trim($name.val())))){
                    _this.errorTip($tip,tip);
                    result = false;
                }else{
                    result = true;
                }
                return result;
            },

            /**
             * 校验密码
             */
            validatePwd : function($pwd, $tip, tip){
                var _this = this;

                var result = false;
                if($pwd.val().length < 6 || $pwd.val().length > 16 || /^[a-z]+$/.test($pwd.val()) || /^[A-Z]+$/.test($pwd.val()) || /^[0-9]+$/.test($pwd.val()) || /^[`\!\@\#\$\%\^\&\*\(\)\-\+\=\/\.\,\?\>\<\|\\\[\]\{\}\s]+$/.test($pwd.val())){
                    _this.errorTip($tip,tip);
                    result = false;
                }else{
                    result = true;
                }
                return result;
            },

            /**
             * 事件绑定
             */
            bindEvent : function() {
                var _this = this;

                var $mainKey = _this.settings.mainKeyObj,
                    $errorTip = _this.settings.tipObj;
                $mainKey.on('blur',function(){
                    if(_this.settings.mainKeyFlag === 'phone'){
                        _this.validatePhone($mainKey,$errorTip,'请填写正确的手机号码');
                    }else if(_this.settings.mainKeyFlag === 'userName'){
                        _this.validateUserName($mainKey,$errorTip,'由中文、数字、字母或组合的2至10位姓名');
                    }
                });

                var $pwd = _this.settings.pwdObj;
                $pwd.on('blur',function(){
                    _this.validatePwd($pwd,$errorTip,'由字母+数字组合的6至16位密码');
                });

                _this.settings.submitBtn.on('click',function(){
                    if(!(_this.settings.submitBtn.hasClass('disabled'))){
                        var mainKeyResult = false;
                        if(_this.settings.mainKeyFlag === 'phone'){
                            mainKeyResult = _this.validatePhone($mainKey,$errorTip,'请填写正确的手机号码');
                        }else if(_this.settings.mainKeyFlag === 'userName'){
                            mainKeyResult = _this.validateUserName($mainKey,$errorTip,'由中文、数字、字母或组合的2至10位姓名');
                        }

                        if(!mainKeyResult){
                            return false;
                        }

                        var pwdResult = _this.validatePwd($pwd,$errorTip,'由字母+数字组合的6至16位密码');
                        if(!pwdResult){
                            return false;
                        }

                        if(mainKeyResult && pwdResult){
                            _this.settings.submitBtn.addClass('disabled');
                            _this.settings.submitBtn.css('background','#CCCCCC');
                            _this.settings.submitBtn.val('登录中...');

                            var ajaxData = {};

                            if(_this.settings.mainKeyFlag === 'phone'){
                                ajaxData = {phone:$mainKey.val(), pwd:$pwd.val()};
                            }else if(_this.settings.mainKeyFlag === 'userName'){
                                ajaxData = {userName:$mainKey.val(), pwd:$pwd.val()};
                            }else{
                                ajaxData = {mainKey:$mainKey.val(), pwd:$pwd.val()};
                            }

                            $.ajax({
                                type: 'post',
                                url: _this.settings.submitBtn.attr('data-url'),
                                data: ajaxData,
                                dataType: 'json',
                                success: function(res){
                                    _this.settings.submitBtn.removeClass('disabled');
                                    _this.settings.submitBtn.css('background',_this.settings.mainColor);
                                    _this.settings.submitBtn.val('登录');

                                    _this.settings.callBackFunc(res);
                                },
                                error: function(xhr, type){
                                    _this.errorTip(_this.settings.tipObj,'请求服务器异常,稍后再试');
                                }
                            });
                        }
                    }
                });
            }
        };

        /**
         * 默认配置
         */
        Login.defaults = {
            //获取当前官网主色调(决定nav和btn色系)
            mainColor: '',

            //登录导航条标示符
            hasNav: true,

            //登录导航对象
            navObj: null,

            //登录导航title对象
            navTitleObj: null,

            //登录logo图片标示符
            hasLogo: true,

            //登录logo对象
            logoObj: null,

            //登录表单对象
            loginForm: null,

            //主键对象是手机号码或是用户名( phone或userName)
            mainKeyFlag: 'phone',

            //主键对象
            mainKeyObj: null,

            //密码对象
            pwdObj: null,

            //提示信息载体对象
            tipObj: null,

            //'忘记密码','立即注册'等模块标示符
            hasMoreLink: true,

            //'忘记密码','立即注册'等模块对象
            moreLinkObj: null,

            //提交btn对象
            submitBtn: null,

            //ajax回调函数
            callBackFunc: function(){}
        };

        var rLogin = function(options) {
            new Login(options);
        };

        window.rLogin = $.rLogin = $.login = rLogin;
});