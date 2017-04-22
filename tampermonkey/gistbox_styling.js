// ==UserScript==
// @name         gistbox custom style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.gistboxapp.com/
// @grant        none
// @resource customFont http://fonts.googleapis.com/css?family=Old+Standard+TT
// ==/UserScript==

var interval = 0;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function main() {
    'use strict';

    if (
        (document.getElementsByClassName('sidebar-view-container').length > 0) &&
        (document.getElementsByClassName('content-view-container').length > 0) &&
        (document.getElementsByClassName('icon-question-sign').length > 0) &&
        (document.getElementsByClassName('icon-cut').length > 0))
    {
        document.getElementsByClassName('sidebar-view-container')[0].style.height="0px";
        document.getElementsByClassName('content-view-container')[0].style['padding-left']="0px";
        document.body.style.background="none";

        addGlobalStyle("body{font:normal 120% 'Old Standard TT', serif;;}");

        document.getElementsByClassName('icon-question-sign')[0].style.display="none";
        document.getElementsByClassName('icon-cut')[0].style.display="none";
        document.getElementById('ace_editor').innerHTML= document.getElementById('ace_editor').innerHTML.replace('.ace_editor {position: relative;','.ace_editor {position: relative;height: 500px !important;');
        clearInterval(interval);
    }
}

interval = setInterval(main, 5000);
