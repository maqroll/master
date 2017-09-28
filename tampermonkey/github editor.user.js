// ==UserScript==
// @name    GitHub Markdown editor
// @namespace   me
// @include   https://github.com/*
// @include   https://gist.github.com/*
// @version   1
// @grant     none
// ==/UserScript==


document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementsByClassName('CodeMirror')[0].style.height='auto';
    }
}
