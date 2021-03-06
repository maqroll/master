// TODO: inject array from cdn & github
// TODO: implement all wildcards
// use https://jscompress.com/ to compress
// replace %s con %25s para que funcione decodeURI
// https://code.tutsplus.com/tutorials/create-bookmarklets-the-right-way--net-18154
javascript:(function(){
var QS_cmds = {
    g:  ['Google Search',       'http://www.google.com/search?q=%s'],
    map:    ['Google Maps',         'http://www.google.com/maps?q=%s'],
    w:  ['Wikipedia Search',        'http://en.wikipedia.org/wiki/%s'],
    a:  ['Amazon Search',       'https://www.amazon.es/s/ref=nb_sb_noss?__mk_es_ES=ÅMÅŽÕÑ&url=search-alias%3Daps&field-keywords=%s'],
    ip: ['IP Address',          'http://www.whatismyip.org/'],
    whois:  ['whois Search',        'http://www.whois-search.com/whois/%s']
};

function QS_listCommands() {
    var cmdlist = 'Available commands: ';
    for( var cmd in QS_cmds ) {
        cmdlist += '\n' + cmd + ': ' + QS_cmds[cmd][0];
    }
    alert( cmdlist );
};

function QS_search() {
    var statement = window.prompt( 'Type `help` for a list of commands:' );
    if( !statement ) {
        return; 
    }
    var select = window.getSelection ? window.getSelection() : (document.getSelection ? document.getSelection() : (document.selection ? document.selection.createRange().text : ''));
    var words = statement.split( ' ' );
    var cmd = words.shift();
    var newtab = false;
    if(cmd == '') {
        cmd = words.shift();
        newtab = true;
    }
    var args = words.join( ' ' );
    if(select != ''){ //selection takes precedence
        args = select;
    }
    if( cmd == 'help' ) {
        QS_listCommands();
    } else if( typeof QS_cmds[cmd] != 'undefined' ) {
        var url = QS_cmds[cmd][1].replace( '%s', escape(args) );
        if(newtab) {
            var w=window.open(url);
            w.focus();
        } else {
            window.location.href = url;
        }
    } else {
        alert( 'The command ' + cmd + ' is not defined!' );
    }
};
QS_search();
})()