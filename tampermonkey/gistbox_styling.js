// ==UserScript==
// @name         gistbox custom style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.gistboxapp.com/
// @grant        none
// @run-at      context-menu
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName('sidebar-view-container')[0].style.display="none";
    document.getElementsByClassName('content-view-container')[0].style['padding-left']="0px";
    document.body.style.background="none";

})();
