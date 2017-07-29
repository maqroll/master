// ==UserScript==
// @name OWA shortcuts
// @namespace http://www.example.com/jQueryPlay/
// @description OWA shorcuts
// @include https://webmail.indra.es/*
// @require https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://cdnjs.cloudflare.com/ajax/libs/ace/1.1.3/ace.js
// @require http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @require https://raw.githubusercontent.com/cfinke/Typo.js/master/typo/typo.js
// @resource awesome http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css
// @resource customFont https://fonts.googleapis.com/css?family=Cardo:400,400italic,700&subset=latin,latin-ext
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

function addStyleSheet(style){
    var getHead = document.getElementsByTagName("HEAD")[0];
    var cssNode = window.document.createElement( 'style' );
    var elementStyle= getHead.appendChild(cssNode);
    elementStyle.innerHTML = style;
    return elementStyle;
}

var aceEditor;

function updateTextArea() {
    $('textarea[name=txtbdy]').val(aceEditor.getSession().getValue());
    $('#printArea').text(aceEditor.getSession().getValue());
}  

$(document).ready(function() {
    //debugger;
    addGlobalStyle('input[type="checkbox"]:focus { outline:3px solid #000000; }');
    var customFont = GM_getResourceText("customFont");
    GM_addStyle (customFont);

    addGlobalStyle("body{font:normal 200% Cardo;}");
    addGlobalStyle("td.fld a{font:normal 200% Cardo;}");
    addGlobalStyle("DIV.PlainText{font:normal 150% Cardo;}");
    addGlobalStyle("table.lvw{font-style:italic; font-size:235%;}");
    addGlobalStyle(".bdy{font:normal 100% Cardo;}");
    addGlobalStyle("TD,TH{font-size: 75%}");
    addGlobalStyle("@media print{.no-print, .no-print * {display: none !important; } #luis {display: none !important; } #printArea{display:block !important;} }");
    //addGlobalStyle("@media screen { textarea[name=txtbdy] {display: none; }}");
    addGlobalStyle("table.lvw tr.pick {background-color: #99d8c9;}");
    
    addStyleSheet('@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css";'); 
    
    var subject = $('#txtsbj').val();
    
    if (subject) {
        document.title = subject;
    }
    
    var folders = {
        idINBOX:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQDNe5IO7ac7TqmJafz1a9qcAAAADglCAAAB",
        idDRAFTS:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQDNe5IO7ac7TqmJafz1a9qcAAAADghQAAAB",
        idSENT:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQDNe5IO7ac7TqmJafz1a9qcAAAADglEAAAB",
        idTODO:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQA05cOIyrmAQJ7byiEdX6rVAAADcBFDAAAB",
        idWAITING:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQD4Z4%2fQ82g0Sp3OynI5kW%2bAAAAClKVlAAAB",
        idHOWTO:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQD4Z4%2fQ82g0Sp3OynI5kW%2bAAAAClKWJAAAB",
        idARCHIVE:"LgAAAACp9VNvDBbBQZ1o6eQ6yCd5AQC1y7tKBvUzQ4GUmRDqzbG1AAAAuS%2f%2bAAAB"
    };
    
    
    // FORMATO
    var noprint = ['table.nvwh100','table.mnTbl tr:eq(0)','table.tbhd','td.spc','table.tbft','td.tdLogoB','td.nvft'];
    _.each(noprint, function(el) {
        $(el).addClass('no-print');
    });
    
    var hide = ['table.brwst',
                'span.unrd',
                'span.itm',
                '#imgLogo',
                'td.dv',
                'img.nvImg',
                'td.pImg img',
                'table.snfmb',
                'td.ml',
                'table.pnt tr:eq(2)',
                'table.pnt tr:eq(3)',
                // Barra de herramientas
                'table.cntntwh100 tr:eq(0)',
               'table.pntc td.rsz',
               'td.tp',
                'td.txt:contains("Correo")',
               '#lnkNavMail',
               '#lnkNavContact'];
    _.each(hide, function(el) {
        $(el).hide();
    });
    
    var removeClass = {
        'table.ob': 'ob',
        'td.frst' : 'frst',
        '#lnkNavCal': 'pn lb',
        'table:not(:has(table)):has(#lnkNavCal)': 'pnt'
    };
    
    _.each(removeClass,function(val,key) {
        $(key).removeClass(val);
    });
    
    $('tr a[title="Historial de conversaciones"]').closest("tr").hide();
    $('tr a[title="Correo no deseado"]').closest("tr").hide();
    $('tr a[title="JIRA"]').closest("tr").hide();
    $('tr a[title="noticias"]').closest('tr').hide();
    
    $('table:not(:has(table)):has(#lnkNavCal)').addClass('snt');
    $('td:not(:has(td)):has(#lnkNavCal)').addClass('fld bld');
    
    var empty = [
        "a[title='Bandeja de entrada']",
        "a[title='Borradores']",
        "a[title='Elementos enviados']",
        "a[title='Elementos eliminados']",
        "a[title='HowTo']",
        "a[title='ToDo']",
        "a[title='Waiting']",
        "a[title='Calendario']",
        "a[title='z']"
    ];
    
    _.each(empty,function(el){
        $(el).empty();
    });
    
    $("<i class='fa fa-inbox'></i>").appendTo("a[title='Bandeja de entrada']");
    $("<i class='fa fa-eraser'></i>").appendTo("a[title='Borradores']");
    $("<i class='fa fa-send-o'></i>").appendTo("a[title='Elementos enviados']");
    $("<i class='fa fa-trash-o'></i>").appendTo("a[title='Elementos eliminados']");
    $("<i class='fa fa-book'></i>").appendTo("a[title='HowTo']");
    $("<i class='fa fa-list'></i>").appendTo("a[title='ToDo']");
    $("<i class='fa fa-pause'></i>").appendTo("a[title='Waiting']");
    $("<i class='fa fa-calendar'></i>").appendTo("a[title='Calendario']");
    $("<i class='fa fa-archive'></i>").appendTo("a[title='z']");    
    
    
    $("a[title='Elementos eliminados']").closest('tr').insertAfter($("a[title='Elementos enviados']").closest('tr'));
    $("a[title='HowTo']").closest('tr').insertAfter($("a[title='Waiting']").closest('tr'));    
    
    // Coloca primero los no leidos
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
    
    function getTarget() {
        var seleccionados = $(":checkbox:checked");
        var foco = $("table.lvw tr.pick");
        
        if (seleccionados.length)
            return seleccionados;
        
        // Asumimos que vamos a operar con él y lo marcamos
        $(foco).find(":checkbox").prop("checked",true);
        return foco;
    }
    
    function prepareSortedRows() {
        var i=0,rows = $('td h1 a').get();
        $.each(rows, function(index,row) {
            $(row).attr('onclick',$(row).attr('onclick').replace(/onClkRdMsg\(this, '([^']+)', \d+, (\d+)\);/,"onClkRdMsg(this, '$1', "+i+", $2);"));
            i = i + 1;
        });
    }
    
    prepareSortedRows();
    
    // Default search
    $('#selSch option').filter(function() { 
        return ($(this).text() == 'Esta carpeta y subcarpetas');
    }).prop('selected', true);
    
    var cursors = {
        // Mark selected
        "right": function() {
            var actual = $('table.lvw tr.pick');
            
            if (actual.length > 0) {
                var checkbox = $(":checkbox",actual);
                if (checkbox.is(':checked')) {
                    checkbox.prop('checked',false);
                } else {
                    checkbox.prop('checked',true);
                }
            }
        },
        // Navegacion
        "Down": function() {
            debugger;
            var nodo = null;
            var actual = $('table.lvw tr.pick');
            var primero = $('table.lvw tr')[3];
            
            if (actual.length == 0 || actual.next().length == 0) {
                nodo = primero;
            } else {
                nodo = actual.next();
            }

            if (actual.length > 0) {
				$(actual).removeClass('pick');
            }
            
            $(nodo).addClass('pick');
        },
        "Up": function() {
            debugger;
            var nodo = null;
            var actual = $('table.lvw tr.pick');
            var ultimo = $('table.lvw tr:last');
            
            if (actual.length == 0 || actual.prevAll().length == 2) {
                nodo = ultimo;
            } else {
                nodo = actual.prev();
            }

            if (actual.length > 0) {
				$(actual).removeClass('pick');
            }
            
            $(nodo).addClass('pick');
        }
    };
    
    _.each(cursors, function(val,key){
        shortcut.add(key,val,{'disable_in_input':true});
    });
    
    
    var shortcuts = {
        // Open selected
        "Ctrl+Shift+Enter": function() {
            var actual = $('table.lvw tr.pick');
            
            if (actual.length > 0) {
                var link = $("a",actual);
                debugger;
                if (link.length == 1) {
                    link[0].click();
                } 
            }
        },
        // Marcar como no leido
        "Alt+U": function() {
            var target = getTarget();
            if (!target.length) {
                $('input[name="chkhd"]').click();
            }
            $("#lnkHdrmarkunread").click();
        },
        // Marcar como leido
        "Alt+L": function() {
            var target = getTarget();
            if (!target.length) {
                $('input[name="chkhd"]').click();
            }
            $("#lnkHdrmarkread").click();
        },
        // cancelar
        "Esc":function() {
            debugger;
            if ($('#clrBtn').length) {
                $('#clrBtn')[0].click();
            } else {
                if($("#lnkHdrclose").length) {
                    $("#lnkHdrclose").click();
                } else {
                    if ($(":focus").length) {
                        $(":focus").blur();
                    } else {
                        if ($(":checkbox:checked").length) {
                            $(":checkbox:checked").prop("checked",false);
                        } else {
                            $("tr.pick").removeClass('pick');
                        }
                    }
                }
            }
        },
        // Buscar
        "Alt+b":function() {
            $('#txtSch').focus();
        }
    };
    
    _.each(shortcuts, function(val,key){
        shortcut.add(key,val);
    });

    var links = {
        // Nuevo
        "Alt+N":["#lnkHdrnewmsg","#lnkHdrnewmtng"],
        // Responder a todos
        "Alt+R":"#lnkHdrreplyall",
        // Send
        "Alt+S":"#lnkHdrsend",
        // Limpiar papelera
        "Alt+Delete":'#lnkHdremptyfolder',
        // Borrar
        "Delete":"#lnkHdrdelete",
        // Pagina siguiente
        "Alt+pagedown":"#lnkNxtPgHdr",
        // Pagina anterior
        "Alt+pageup":"#lnkPrvPgHdr",
        // Comprobar nombres
        "Alt+C":"#lnkHdrchecknames",
        // Guardar
        "Alt+G":"#lnkHdrsave"
    };
    
    _.each(links, function(val,key) {
        shortcut.add(key,function(){
            debugger;
            if (val.constructor === Array) {
                var link = _.find(val,function(l) {
                    return $(l).length > 0; 
                });
                
                if (link) {
                    $(link).click();
                }
            } else {
            	$(val).click();
            }
        });
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
                toFolder = folders.idDRAFTS;
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
    
    shortcut.add("F1",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idINBOX);
        } else {
            //$('a[title="Bandeja de entrada"]')[0].click();
            onClkPN(0);
        }
    });
    
    shortcut.add("F2",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idDRAFTS);
        } else {
            $('a[title="Borradores"]')[0].click();
        }
    });
    
    shortcut.add("F3",function() {
        // si estamos editando un item lo enviamos
        if (gup('ae') === 'Item') {
            $(links['Alt+S']).click();
        } else {
            $('a[title="Elementos enviados"]')[0].click();
        }
    });
    
    shortcut.add("F4",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            $(links['Delete']).click();
        } else {
            $('a[title="Elementos eliminados"]')[0].click();
        }
    });
    
    shortcut.add("F5",function() {
        debugger;
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idTODO);
        } else {
            $('a[title="ToDo"]')[0].click();
        }
    });
    
    shortcut.add("F6",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idWAITING);
        } else {
            $('a[title="Waiting"]')[0].click();
        }
    });
    
    shortcut.add("F7",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idHOWTO);
        } else {
            $('a[title="HowTo"]')[0].click();
        }
    });
    
    shortcut.add("F8",function() {
        $('#lnkNavCal')[0].click();
    });

    shortcut.add("F9",function() {
        if (($(':checkbox:checked').length > 0) || (gup('ae') === 'Item')) {
            moveTo(folders.idARCHIVE);
        } else {
            $('a[title="z"]')[0].click();
        }
    });
    
    
    // editor
    $(function () {
        $('textarea[name=txtbdy]').each(function () {
            var textarea = $(this);
            
            var printArea = $('<span>', {
                id: 'printArea',
                position: 'absolute',
                'style': "overflow: visible; display: none; unicode-bidi: embed; font-family: monospace; white-space: pre;"
            }).insertBefore(textarea);
            
            var editDiv = $('<div>', {
                id: 'luis',
                position: 'absolute',
                width: textarea.width(),
                height: textarea.height(),
                'class': textarea.attr('class')
            }).insertBefore(textarea);
            
            textarea.css('display', 'none');
            
            editor = "luis"; // This should be the id of your editor element.
            lang = "es_ES";
            dicPath = "file:///d|/tools/dictionaries/es_ES/es_ES.dic";
            affPath = "file:///d|/tools/dictionaries/es_ES/es_ES.aff";

            aceEditor = ace.edit(editDiv[0]);
            aceEditor.renderer.setShowGutter(true);
            aceEditor.getSession().setValue(textarea.val());
            $('#printArea').text(textarea.val());
            aceEditor.getSession().setUseWrapMode(true);
            aceEditor.commands.bindKeys({"ctrl-s":null, "ctrl-alt-s":null});
            aceEditor.on('change', function() {updateTextArea();});

            // ------------------------------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------
            
            
            if (aceEditor) {
                $("#txtto").focus();
            }
        });
        
        
    });
    
    var expire = $('a').filter(function() { return $(this).text() === "Haga clic aquí para recuperar el último elemento en el que estaba trabajando"; });
    if (expire.length) {
        expire[0].click();
    }
});    
