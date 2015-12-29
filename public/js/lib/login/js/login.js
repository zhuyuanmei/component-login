define(function(){var t=function(s){this.settings=$.extend({},t.defaults,s),this.init()};t.prototype={init:function(){this.create()},create:function(){var t=this,s=t.settings.tipObj;t.settings.hasNav?(t.settings.navTitleObj.css("color",t.settings.mainColor),t.settings.navObj.show(),t.settings.hasLogo?(t.settings.loginForm.css("margin-top",0),t.settings.logoObj.css("margin-top",50),t.settings.logoObj.show(),s.css("top","55%")):(t.settings.loginForm.css("margin-top",80),t.settings.logoObj.css("margin-top",50),t.settings.logoObj.hide(),s.css("top","30%"))):(t.settings.navObj.hide(),t.settings.hasLogo?(t.settings.loginForm.css("margin-top",0),t.settings.logoObj.css("margin-top",0),t.settings.logoObj.show(),s.css("top","45%")):(t.settings.loginForm.css("margin-top",40),t.settings.logoObj.css("margin-top",0),t.settings.logoObj.hide(),s.css("top","20%"))),t.settings.hasMoreLink?t.settings.moreLinkObj.show():t.settings.moreLinkObj.hide(),t.settings.submitBtn.css("background",t.settings.mainColor),t.bindEvent()},errorTip:function(t,s){t.show(),t.text(s),setTimeout(function(){t.removeClass("error-tip"),t.addClass("error-tip-fade"),setTimeout(function(){t.removeClass("error-tip-fade"),t.addClass("error-tip"),t.hide()},500)},2e3)},validatePhone:function(t,s,n){var i=this,e=!1;return""!==$.trim(t.val())&&/^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/.test($.trim(t.val()))?e=!0:(i.errorTip(s,n),e=!1),e},validateUserName:function(t,s,n){var i=this,e=!1;return""!==$.trim(t.val())&&/^[0-9a-zA-Z\u4e00-\u9fa5\uf900-\ufa2d]{2,10}$/.test($.trim(t.val()))?e=!0:(i.errorTip(s,n),e=!1),e},validatePwd:function(t,s,n){var i=this,e=!1;return t.val().length<6||t.val().length>16||/^[a-z]+$/.test(t.val())||/^[A-Z]+$/.test(t.val())||/^[0-9]+$/.test(t.val())||/^[`\!\@\#\$\%\^\&\*\(\)\-\+\=\/\.\,\?\>\<\|\\\[\]\{\}\s]+$/.test(t.val())?(i.errorTip(s,n),e=!1):e=!0,e},bindEvent:function(){var t=this,s=t.settings.mainKeyObj,n=t.settings.tipObj;s.on("blur",function(){t.settings.hasNav&&t.settings.navObj.css({position:"fixed",top:0,left:0}),"phone"===t.settings.mainKeyFlag?t.validatePhone(s,n,"请填写正确的手机号码"):"userName"===t.settings.mainKeyFlag&&t.validateUserName(s,n,"由中文、数字、字母或组合的2至10位姓名")});var i=t.settings.pwdObj;i.on("blur",function(){t.settings.hasNav&&t.settings.navObj.css({position:"fixed",top:0,left:0}),t.validatePwd(i,n,"由字母+数字组合的6至16位密码")}),t.settings.hasNav&&(s.on("focus",function(){t.settings.navObj.css({position:"absolute",top:0,left:0})}),i.on("focus",function(){t.settings.navObj.css({position:"absolute",top:0,left:0})})),t.settings.submitBtn.on("click",function(){if(t.settings.navObj.css({position:"absolute",top:0,left:0}),!t.settings.submitBtn.hasClass("disabled")){var e=!1;if("phone"===t.settings.mainKeyFlag?e=t.validatePhone(s,n,"请填写正确的手机号码"):"userName"===t.settings.mainKeyFlag&&(e=t.validateUserName(s,n,"由中文、数字、字母或组合的2至10位姓名")),!e)return!1;var a=t.validatePwd(i,n,"由字母+数字组合的6至16位密码");if(!a)return!1;if(e&&a){t.settings.submitBtn.addClass("disabled"),t.settings.submitBtn.css("background","#CCCCCC"),t.settings.submitBtn.val("登录中...");var o={};o="phone"===t.settings.mainKeyFlag?{phone:s.val(),pwd:i.val()}:"userName"===t.settings.mainKeyFlag?{userName:s.val(),pwd:i.val()}:{mainKey:s.val(),pwd:i.val()},$.ajax({type:"post",url:t.settings.submitBtn.attr("data-url"),data:o,dataType:"json",success:function(s){t.settings.submitBtn.removeClass("disabled"),t.settings.submitBtn.css("background",t.settings.mainColor),t.settings.submitBtn.val("登录"),t.settings.callBackFunc(s)},error:function(){t.errorTip(n,"请求服务器异常,稍后再试")}})}}})}},t.defaults={mainColor:"",hasNav:!0,navObj:null,navTitleObj:null,hasLogo:!0,logoObj:null,loginForm:null,mainKeyFlag:"phone",mainKeyObj:null,pwdObj:null,tipObj:null,hasMoreLink:!0,moreLinkObj:null,submitBtn:null,callBackFunc:function(){}};var s=function(s){new t(s)};window.rLogin=$.rLogin=$.login=s});