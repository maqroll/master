// ==UserScript==
// @name           Shortcuts for OWA
// @namespace      http://www.example.com/jQueryPlay/
// @description    Shortcuts for OWA
// @include        https://webmail.indra.es/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require       http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==

$(document).ready(function() {  
    // Marcar como no-leido
    shortcut.add("Ctrl+Alt+U",function() {
        $("#lnkHdrmarkunread").click();
    });

    // Marcar como leido
    shortcut.add("Ctrl+Alt+L",function() {
        $("#lnkHdrmarkread").click();
    });

    // Nuevo
    shortcut.add("Ctrl+Alt+N",function() {
        $("#lnkHdrnewmsg").click();
    });

    // Reply to all
    shortcut.add("Ctrl+Alt+R",function() {
        $("#lnkHdrreplyall").click();
    });

    // Send
    shortcut.add("Ctrl+Alt+S",function() {
        $("#lnkHdrsend").click();
    });

    // Eliminar
    shortcut.add("Ctrl+Alt+D",function() {
        $("#lnkHdrdelete").click();
    });
    
    // Cerrar
    shortcut.add("Esc",function() {
        $("#lnkHdrclose").click();
    });

    // Next message
    shortcut.add("Shift+Down",function() {
        var checkSelected = $(":checkbox:focus");
        if (checkSelected.length) {
            // si hay alguno seleccionado....pasamos al siguiente
            var tr = checkSelected.closest("tr");
            if (tr.length) {
                var nextRow = tr.next();
                if (!$(":checkbox",nextRow).length) {
                    nextRow = nextRow.next();
                }
                if (nextRow.length) {
                    var checkbox = $(":checkbox",nextRow[0]);
                    if (checkbox.length) {
                        checkbox.focus();
                        return;
                    }
                }
            }
        }
        
        // si no hay ninguno seleccionado o es el último
        $(":checkbox:first").focus();
    });

    // Prev message
    shortcut.add("Shift+Up",function() {
        var checkSelected = $(":checkbox:focus");
        if (checkSelected.length) {
            // si hay alguno seleccionado....pasamos al siguiente
            var tr = checkSelected.closest("tr");
            if (tr.length) {
                var prevRow = tr.prev();
                if (!$(":checkbox",prevRow).length) {
                    prevRow = prevRow.prev();
                }
                if (prevRow.length) {
                    var checkbox = $(":checkbox",prevRow[0]);
                    if (checkbox.length) {
                        checkbox.focus();
                        return;
                    }
                }
            }
        }
        
        // si no hay ninguno seleccionado o es el último
        $(":checkbox:last").focus();
    });

    // Next Page
    shortcut.add("Shift+Right",function() {
        $("#lnkNxtPgHdr").click();
    });

    // Prev Page
    shortcut.add("Shift+Left",function() {
        $("#lnkPrvPgHdr").click();
    });
    
});