// ==UserScript==
// @name    GitHub Markdown editor
// @namespace   me
// @include   https://github.com/*
// @include   https://gist.github.com/*
// @version   1
// @grant     none
// @require   http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js 
// ==/UserScript==

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if (document.querySelector('div.CodeMirror')) {
            document.querySelector('div.CodeMirror').style.height='auto';
            document.querySelector('div.CodeMirror').CodeMirror.focus();
        }

        if (document.querySelector('div.CodeMirror-lines')) {
            document.querySelector('div.CodeMirror-lines').style.fontSize='15px';
        }

        shortcut.add("Ctrl+O",function() {
            var editBtn = document.querySelector('a[aria-label="Edit this Gist"]');
            editBtn.click();
        });

        shortcut.add("Esc",function() {
            var cancelBtn = document.querySelector('a.btn-danger');
            cancelBtn.click();
        });

        shortcut.add("Ctrl+S",function() {
            var saveBtn = document.querySelector('form.js-blob-form button.btn.btn-primary');
            saveBtn.click();
        });
    }
};
