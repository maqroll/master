// ==UserScript==
// @name mercadona
// @namespace http://www.example.com/jQueryPlay/
// @description mercadona
// @include https://www.mercadona.es/ns/*
// @require https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
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

$(document).ready(function() {
    addGlobalStyle("#TaulaLlista tr.pick {background-color: #99d8c9 !important; }");
function searchFrame(name) {                                     // id = the id of the wanted (i)frame
    var result = null,                                         // Stores the result
        search = function (iframes) {                          // Recursively called function
            var n;                                             // General loop counter
            for (n = 0; n < iframes.length; n++) {             // Iterate through all passed windows in (i)frames
                if (iframes[n].frameElement.name == name) {         // Check the id of the (i)frame
                    result = iframes[n];                       // If found the wanted id, store the window to result
                }
                if (!result && iframes[n].frames.length > 0) { // Check if result not found and current window has (i)frames
                    search(iframes[n].frames);                 // Call search again, pass the windows in current window
                }
            }
        };
    search(window.top.frames);                                  // Start searching from the topmost window
    return result;                                              // Returns the wanted window if found, null otherwise
};
    
    shortcut.add("right", function() {
                var frame = searchFrame('mainFrame');
        $('tr.pick td[headers="header4"] img',frame.document).click();
    });
    
    shortcut.add("left", function() {
                var frame = searchFrame('rightFrame');
        $('#tblTicket td.celda221 a',frame.document)[0].click();
    });

    shortcut.add("esc", function() {
        var frame = searchFrame('topbusc');
        var input = $('#busc_ref',frame.document);
        $(input).focus();
    });
    shortcut.add("up", function() {
        var frame = searchFrame('mainFrame');
        $('tr.pick a[title="Incrementar"]',frame.document).click();
    });
    shortcut.add("down", function() {
        var frame = searchFrame('mainFrame');
        $('tr.pick a[title="Decrementar"]',frame.document).click();
    });
    shortcut.add("PageUp",function() {
        var frame = searchFrame('mainFrame');
            $('#TaulaLlista td.lPar',frame.document).removeClass('lPar');
            $('#TaulaLlista td.lPar2',frame.document).removeClass('lPar2');
            var nodo = null;
            var actual = $('#TaulaLlista tbody tr.pick',frame.document);
            var ultimo = $('#TaulaLlista tbody tr:last',frame.document);
            
            if (actual.length == 0 || actual.prevAll().length == 1) {
                nodo = ultimo;
            } else {
                nodo = actual.prev();
            }

            if (actual.length > 0) {
                $(actual).removeClass('pick');
            }
            
            $(nodo).addClass('pick');
    });
    shortcut.add("PageDown",function() {
        var frame = searchFrame('mainFrame');
            $('#TaulaLlista td.lPar',frame.document).removeClass('lPar');
            $('#TaulaLlista td.lPar2',frame.document).removeClass('lPar2');
            var nodo = null;
            var actual = $('#TaulaLlista tbody tr.pick',frame.document);
            var primero = $('#TaulaLlista tbody tr',frame.document)[0];
            
            if (actual.length == 0 || actual.next().length == 0) {
                nodo = primero;
            } else {
                nodo = actual.next();
            }

            if (actual.length > 0) {
                $(actual).removeClass('pick');
            }
            
            $(nodo).addClass('pick');    
    });
        
});