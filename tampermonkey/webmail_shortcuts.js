// ==UserScript==
// @name Shortcuts for OWA
// @namespace http://www.example.com/jQueryPlay/
// @description Shortcuts for OWA
// @include https://webmail.indra.es/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js
// @require http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @resource awesome http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css
// @resource customFont http://fonts.googleapis.com/css?family=Vollkorn
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

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

$('a[title="Bandeja de entrada"]').text('[1] Inbox');
$('a[title="Borradores"]').text('[2] Drafts');
$('a[title="Elementos enviados"]').text('[3] Sent');
$('a[title="Elementos eliminados"]').text('Trash');
$('a[title="ToDo"]').text('[4] ToDo');
$('a[title="Waiting"]').text('[5] Waiting');
$('a[title="HowTo"]').text('[6] HowTo');
$('table.brwst').hide();
$('tr a[title="Historial de conversaciones"]').closest("tr").hide();
$('tr a[title="Correo no deseado"]').closest("tr").hide();
$('tr a[title="JIRA"]').closest("tr").hide();
$('tr a[title="noticias"]').closest('tr').hide();

$(document).ready(function() {
    addGlobalStyle('input[type="checkbox"]:focus { outline:3px solid #000000; }');
    var customFont = GM_getResourceText("customFont");
    GM_addStyle (customFont);
    addGlobalStyle("font-family: 'Vollkorn', serif;");
    addGlobalStyle("body{font:normal 200% Vollkorn;}");
    addGlobalStyle("td.fld a{font:normal 200% Vollkorn;}");
    addGlobalStyle("DIV.PlainText{font:normal 150% Vollkorn;}");
    addGlobalStyle("table.lvw{font-style:italic; font-size:235%;}");
    addGlobalStyle(".bdy{font:normal 100% Vollkorn;}");
    var awesomeCss = GM_getResourceText ("awesome");
    
    var subject = $('#txtsbj').val();

    if (subject) {
        document.title = subject;
    }
    
    GM_addStyle (awesomeCss);
    var idINBOX = "";

    var idDRAFTS = "";
    
    var idSENT = "";
    
    var idTODO = "";
    
    var idWAITING = "";

    var idHOWTO = "";
    
    var editor;

    function sortTable() {
        var rows = $('table.lvw tbody > tr').get();
        rows = rows.slice(3);
        $.each(rows, function(index,row) {
            if ($(row).css('font-weight') !== 'bold') {
                $('table.lvw').children('tbody').append(row);
            }
        });
    }
    
    sortTable();
    
    $('#selSch option').filter(function() { 
        return ($(this).text() == 'Esta carpeta y subcarpetas');
    }).prop('selected', true);
    
    // Marcar como no-leido
    shortcut.add("Alt+U",function() {
        if ($(':checkbox:checked').length == 0) {
            $('input[name="chkhd"]').click();
        }
        $("#lnkHdrmarkunread").click();
    });
    
    // Marcar como leido
    shortcut.add("Alt+L",function() {
        if ($(':checkbox:checked').length == 0) {
            $('input[name="chkhd"]').click();
        }
        $("#lnkHdrmarkread").click();
    });
    
    // Nuevo
    shortcut.add("Alt+N",function() {
        $("#lnkHdrnewmsg").click();
    });
    
    // Reply to all
    shortcut.add("Alt+R",function() {
        $("#lnkHdrreplyall").click();
    });
    
    // Send
    shortcut.add("Alt+S",function() {
        updateTextArea();
        $("#lnkHdrsend").click();
    });
    
    // Eliminar
    shortcut.add("Alt+D",function() {
        $("#lnkHdrdelete").click();
    });
    // Cerrar
    shortcut.add("Esc",function() {
        debugger;
        if ($('#clrBtn').length) {
            debugger;
            $('#clrBtn')[0].click();
        } else {
            if($("#lnkHdrclose").length) {
                $("#lnkHdrclose").click();
            } else {
                if ($(":focus").length) {
                    $(":focus").blur();
                } else {
                    $(":checkbox:checked").prop("checked",false);
                }
            }
        }
    });
    
    // Next message
    shortcut.add("Alt+down",function() {
        var checkSelected = $(":checkbox:focus");
        if (checkSelected.length) {
            if (checkSelected.is(':checked')) {
                checkSelected.prop('checked', false);
            } 
            // si hay alguno seleccionado....pasamos al siguiente
            var tr = checkSelected.closest("tr");
            if (tr.length) {
                var nextRow = tr.next();
                if (!$(":checkbox[name!='chkhd']",nextRow).length) {
                    nextRow = nextRow.next();
                }
                if (nextRow.length) {
                    var checkbox = $(":checkbox[name!='chkhd']",nextRow[0]);
                    if (checkbox.length) {
                        checkbox.focus();
                        $(":checkbox:focus").prop('checked',true);
                        return true;
                    }
                }
            }
        }
        // si no hay ninguno seleccionado o es el último
        $(":checkbox[name!='chkhd']:first").focus();
        $(":checkbox:focus").prop('checked',true);
    });
    
    // Prev message
    shortcut.add("Alt+Up",function() {
        var checkSelected = $(":checkbox:focus");
        if (checkSelected.length) {
            if (checkSelected.is(':checked')) {
                checkSelected.prop('checked', false);
            } 
            // si hay alguno seleccionado....pasamos al siguiente
            var tr = checkSelected.closest("tr");
            if (tr.length) {
                var prevRow = tr.prev();
                if (!$(":checkbox[name!='chkhd']",prevRow).length) {
                    prevRow = prevRow.prev();
                }
                if (prevRow.length) {
                    var checkbox = $(":checkbox[name!='chkhd']",prevRow[0]);
                    if (checkbox.length) {
                        checkbox.focus();
                        $(":checkbox:focus").prop('checked',true);
                        return true;
                    }
                }
            }
        }
        // si no hay ninguno seleccionado o es el último
        $(":checkbox[name!='chkhd']:last").focus();
        $(":checkbox:focus").prop('checked',true);
        return true;
    });

    shortcut.add("Alt+b",function() {
        debugger;
        $('#txtSch').focus();
    });
    
    shortcut.add("Alt+x",function() {
        onClkTb('emptyfolder');
    });
    
    // Next Page
    shortcut.add("Alt+pagedown",function() {
        $("#lnkNxtPgHdr").click();
    });
    
    // Prev Page
    shortcut.add("Alt+pageup",function() {
        $("#lnkPrvPgHdr").click();
    });
    
    function moveTo(id) {
        var ids = [];
        var toFolder = "";
        
        if ($(':input[name$="hidfldid"]').length) {
            toFolder = $(':input[name$="hidfldid"]').attr('value');
        } else {
            if (gup('id')) {
                toFolder = gup('id');
            } else { // estamos en el reply guardado (siempre en la carpeta borradores.
                toFolder = idDRAFTS;
            }
        }
        
        var checkChecked = $(":checkbox:checked");
        if (checkChecked.length) {
            checkChecked.each(function(i,e) {
                if ($(this).attr("value")) {
                    ids.push($(this).attr("value"));
                }
            });
        } else {
            if (gup('id')) {
                ids.push(decodeURIComponent(gup('id')));
            } else {
                ids.push($(':input[name$="hidid"]').attr('value'));
            }
        }
        
        $('#frm :hidden').remove('[name!="hidcanary"]');
        $('#frm :checkbox').each(function(i,e){
            $(this).prop('checked',false);
        });
        $('<input>').attr({
            type: 'hidden',
            name: 'hidpnst'
        }).appendTo('#frm');
        
        $('<input>').attr({
            type: 'hidden',
            name: 'hidactbrfld'
        }).appendTo('#frm');
        
        $('<input>').attr({
            type: 'hidden',
            name: 'tfId',
            value: decodeURIComponent(id)
        }).appendTo('#frm');
        $.each(ids,function(i,e){
            $('<input>').attr({
                type: 'hidden',
                name: 'hidid',
                value: e
            }).appendTo('#frm');
            
            $('<input>').attr({
                type: 'hidden',
                name: 'hidt',
                value: 'IPM.Note'
            }).appendTo('#frm');
        });
        
        if ($(':input[name$="hidpid"]').length) {
            $(':input[name$="hidpid"]').attr('value','MoveItem');
        } else {
            $('<input>').attr({
                type: 'hidden',
                name: 'hidpid',
                value: 'MoveItem'
            }).appendTo('#frm');
        }
        /*$('<input>').attr({
type: 'hidden',
name: 'hidcanary',
value: 'qL5ThzXi6U-Xv_MIMh7IIGGTcGhxitBIsUueTElr4fJm_qCBPeyD8-7RY6ySA9pSSWQHI6zjkMc.'
}).appendTo('#frm'); */
    $('#frm').attr('action','https://webmail.indra.es/owa/?ae=PreFormAction&a=Move&t=IPF.Note&fid=' + toFolder);
    $('#frm').submit();
}
    
    shortcut.add("Alt+1",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idINBOX);
        } else {
        $('a[title="Bandeja de entrada"]')[0].click();
        }
    });

    shortcut.add("Alt+2",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idDRAFTS);
        } else {
        $('a[title="Borradores"]')[0].click();
        }
    });

    shortcut.add("Alt+3",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idSENT);
        } else {
        $('a[title="Elementos enviados"]')[0].click();
        }
    });

    shortcut.add("Alt+4",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idTODO);
        } else {
        $('a[title="ToDo"]')[0].click();
        }
    });

    shortcut.add("Alt+5",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idWAITING);
        } else {
        $('a[title="Waiting"]')[0].click();
        }
    });

    shortcut.add("Alt+6",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(idHOWTO);
        } else {
        $('a[title="HowTo"]')[0].click();
        }
    });

    shortcut.add("Alt+C",function() {
        updateTextArea();
        $('#lnkHdrchecknames').click();
    });

     function updateTextArea() {
        $('textarea[name=txtbdy]').val(editor.getSession().getValue());
    };    

    shortcut.add("Alt+G",function() {
        updateTextArea();
        $('#lnkHdrsave').click();
    });
    

    $(function () {
        $('textarea[name=txtbdy]').each(function () {
            var textarea = $(this);
  
            var editDiv = $('<div>', {
                id: 'luis',
                position: 'absolute',
                width: textarea.width(),
                height: textarea.height(),
                'class': textarea.attr('class')
            }).insertBefore(textarea);
 
            textarea.css('visibility', 'hidden');
 
            editor = ace.edit(editDiv[0]);
            editor.renderer.setShowGutter(false);
            editor.getSession().setValue(textarea.val());
            editor.getSession().setUseWrapMode(true);
            editor.commands.bindKeys({"ctrl-s":null, "ctrl-alt-s":null});
            //editor.getSession().setMode("ace/mode/" + mode);
            // editor.setTheme("ace/theme/idle_fingers");
            
            // copy back to textarea on form submit...
            // TODO: Esto no funciona.
            //textarea.closest('form').submit(function () {
            //    textarea.val(editor.getSession().getValue());
            //});
 
        });
        if (editor) {
            $("#txtto").focus();
            //debugger;
            //editor.focus();
        }
    });
    //var editor = ace.edit("editor");
    //editor.setTheme("ace/theme/monokai");
    //editor.getSession().setMode("ace/mode/javascript");

});