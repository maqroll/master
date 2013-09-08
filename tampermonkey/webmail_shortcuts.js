// ==UserScript==
// @name           Shortcuts for OWA
// @namespace      http://www.example.com/jQueryPlay/
// @description    Shortcuts for OWA
// @include        https://webmail.indra.es/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
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
    
});