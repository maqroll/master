QS_cmds = {
    g:  ['Google Search',       'http://www.google.com/search?q=%s'],
    map:    ['Google Maps',         'http://www.google.com/maps?q=%s'],
    w:  ['Wikipedia Search',        'http://en.wikipedia.org/wiki/%s'],
    a:  ['Amazon Search',       'https://www.amazon.es/s/ref=nb_sb_noss?__mk_es_ES=ÅMÅŽÕÑ&url=search-alias%3Daps&field-keywords=%s'],
    ip: ['IP Address',          'http://www.whatismyip.org/'],
    whois:  ['whois Search',        'http://www.whois-search.com/whois/%s']
    // Dont forget to add a ',' at the end of the previous line when
    // defining new commands!
};

function QS_listCommands() {
    var cmdlist = 'Available commands: ';
    for( var cmd in QS_cmds ) {
        cmdlist += '\n' + cmd + ': ' + QS_cmds[cmd][0];
    }
    alert( cmdlist );
}

function QS_search() {
    var statement = window.prompt( 'Type `help` for a list of commands:' );
    if( !statement ) {
        return; 
    }
    var words = statement.split( ' ' );
    var cmd = words.shift();
    var args = words.join( ' ' );
    if( cmd == 'help' ) {
        QS_listCommands();
    } else if( typeof QS_cmds[cmd] != 'undefined' ) {
        var url = QS_cmds[cmd][1].replace( '%s', escape(args) );
        if(cmd.substring(0,1)==' ') {
            var w=window.open(url);
            w.focus();
        } else {
            window.location.href = url;
        }
    } else {
        alert( 'The command ' + cmd + ' is not defined!' );
    }
}
QS_search();