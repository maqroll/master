// ==UserScript==
// @name    GitHub Markdown editor
// @namespace   me
// @include   https://github.com/*
// @include   https://gist.github.com/*
// @version   1
// @grant     none
// @require   http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js 
// ==/UserScript==


$(document).ready(function(){
    $('div.CodeMirror').height('auto');

    shortcut.add("Ctrl+E",function() {
        var editBtn = document.querySelector('a[aria-label="Edit this Gist"]');
        editBtn.click();
    });

    shortcut.add("Esc",function() {
        var cancelBtn = document.querySelector('a.btn-danger');
        cancelBtn.click();
    });

    shortcut.add("Ctrl+S",function() {
        var saveBtn = document.querySelector('form.js-blob-form');
        saveBtn.submit();
    });
    
});
