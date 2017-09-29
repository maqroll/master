// ==UserScript==
// @name         totp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  totp generator
// @require      https://raw.githubusercontent.com/jiangts/JS-OTP/master/dist/jsOTP.min.js
// @author       maqroll
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    // from http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
    shortcut={all_shortcuts:{},add:function(e,t,a){var r={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(a)for(var n in r)void 0===a[n]&&(a[n]=r[n]);else a=r;var s=a.target;"string"==typeof a.target&&(s=document.getElementById(a.target)),e=e.toLowerCase();var o=function(r){if(r=r||window.event,a.disable_in_input){var n;if(r.target?n=r.target:r.srcElement&&(n=r.srcElement),3==n.nodeType&&(n=n.parentNode),"INPUT"==n.tagName||"TEXTAREA"==n.tagName)return}r.keyCode?code=r.keyCode:r.which&&(code=r.which);var s=String.fromCharCode(code).toLowerCase();188==code&&(s=","),190==code&&(s=".");var o=e.split("+"),d=0,c={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},l={esc:27,escape:27,tab:9,space:32,return:13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,break:19,insert:45,home:36,delete:46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},p={shift:{wanted:!1,pressed:!1},ctrl:{wanted:!1,pressed:!1},alt:{wanted:!1,pressed:!1},meta:{wanted:!1,pressed:!1}};r.ctrlKey&&(p.ctrl.pressed=!0),r.shiftKey&&(p.shift.pressed=!0),r.altKey&&(p.alt.pressed=!0),r.metaKey&&(p.meta.pressed=!0);for(var i=0;k=o[i],i<o.length;i++)"ctrl"==k||"control"==k?(d++,p.ctrl.wanted=!0):"shift"==k?(d++,p.shift.wanted=!0):"alt"==k?(d++,p.alt.wanted=!0):"meta"==k?(d++,p.meta.wanted=!0):k.length>1?l[k]==code&&d++:a.keycode?a.keycode==code&&d++:s==k?d++:c[s]&&r.shiftKey&&(s=c[s])==k&&d++;if(d==o.length&&p.ctrl.pressed==p.ctrl.wanted&&p.shift.pressed==p.shift.wanted&&p.alt.pressed==p.alt.wanted&&p.meta.pressed==p.meta.wanted&&(t(r),!a.propagate))return r.cancelBubble=!0,r.returnValue=!1,r.stopPropagation&&(r.stopPropagation(),r.preventDefault()),!1};this.all_shortcuts[e]={callback:o,target:s,event:a.type},s.addEventListener?s.addEventListener(a.type,o,!1):s.attachEvent?s.attachEvent("on"+a.type,o):s["on"+a.type]=o},remove:function(e){e=e.toLowerCase();var t=this.all_shortcuts[e];if(delete this.all_shortcuts[e],t){var a=t.event,r=t.target,n=t.callback;r.detachEvent?r.detachEvent("on"+a,n):r.removeEventListener?r.removeEventListener(a,n,!1):r["on"+a]=!1}}},shortcut.add("Alt+O",function(){var e=new jsOTP.totp(30,6).getOtp("YOURPASSPHRASEGOESHERE");document.activeElement.value=e});    
    
    
    (function(){
        shortcut.add("Alt+O",function() {
            debugger;
            var totp = new jsOTP.totp(30,6);
            var timeCode = totp.getOtp('YOURPASSPHRASEGOESHERE');
            var focused = document.activeElement;
            focused.value=timeCode;
        });
    })();
    

})();