// ==UserScript==
// @name         gistbox custom style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.gistboxapp.com/
// @grant        none
// @resource customFont http://fonts.googleapis.com/css?family=Vollkorn
// @run-at      context-menu
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {
    'use strict';

    document.getElementsByClassName('sidebar-view-container')[0].style.display="none";
    document.getElementsByClassName('content-view-container')[0].style['padding-left']="0px";
    document.body.style.background="none";

    addGlobalStyle("body{font:normal 100% Vollkorn;}");
})();
