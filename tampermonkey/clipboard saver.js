// ==UserScript==
// @name clipboard saver
// @grant GM_setClipboard
// @namespace http://www.example.com/jQueryPlay/
// @description save clicks in clipboard
// @include *://*/*
// @require https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==


$(document).ready(function() {
    $('body').on('click', function(event){
        // prevent magnet links from executing
        //debugger;
        var link = null;
        if (!$(event.target).is("a")) {
            var enlace = $(event.target).closest("a");
            if (enlace) {
                link = enlace[0];
            }
        } else {
            link = event.target; 
        }
            
        if (link && (typeof link.href !== 'undefined') && link.href != null) {
        if ((/^magnet:\?/).test(link.href)) {
            GM_setClipboard(link.href,"text");
            event.preventDefault();
        } else {
            //if (event.altKey && event.ctrlKey) {
                GM_setClipboard(link.href,"text");
            //}
        }
        }
    });
});