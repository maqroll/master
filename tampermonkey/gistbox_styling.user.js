// ==UserScript==
// @name         gistbox custom style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @require http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @author       You
// @match        https://app.gistboxapp.com/
// @grant        none
// @resource customFont http://fonts.googleapis.com/css?family=Old+Standard+TT
// ==/UserScript==

var interval = 0;
var detail = false;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function hide() {
    if (document.getElementsByClassName('filter-bar').length > 0) { document.getElementsByClassName('filter-bar')[0].style.display="none";}
    if (document.getElementsByClassName('split-view-list').length > 0) { document.getElementsByClassName('split-view-list')[0].style.width="0px";}
    if (document.getElementsByClassName('split-view-content').length > 0) { document.getElementsByClassName('split-view-content')[0].style.left="0px";}
    if (document.getElementsByClassName('focus-view-header').length > 0) { document.getElementsByClassName('focus-view-header')[0].style.display="none";}
}

function show() {
    if (document.getElementsByClassName('filter-bar').length > 0) { document.getElementsByClassName('filter-bar')[0].style.display="block";}
    if (document.getElementsByClassName('split-view-list').length > 0) { document.getElementsByClassName('split-view-list')[0].style.width="354px";}
    if (document.getElementsByClassName('split-view-content').length > 0) { document.getElementsByClassName('split-view-content')[0].style.left="355px";}
    if (document.getElementsByClassName('focus-view-header').length > 0) { document.getElementsByClassName('focus-view-header')[0].style.display="block";}
}

function update() {
    if (detail) {
        hide();
    } else {
        show();
    }
    // available space for editor
    if (document.getElementsByClassName('add-another-file-container').length > 0) { document.getElementsByClassName('add-another-file-container')[0].style.display = "none";}
    if (document.getElementsByClassName('add-another-file').length > 0) { document.getElementsByClassName('add-another-file')[0].style.display = "none";}
    if (document.getElementsByClassName('gist-file-header').length > 0) { 
        var availableHeight = document.documentElement.clientHeight - document.getElementsByClassName('gist-file-header')[0].getBoundingClientRect().bottom - 20;
        document.getElementById('ace_editor').innerHTML= document.getElementById('ace_editor').innerHTML.replace(/ace_editor {position: relative;(height: [0-9]*px !important;)?/,'ace_editor {position: relative;height: ' + availableHeight + 'px !important;');
    }
    //document.getElementById('ace_editor').innerHTML= document.getElementById('ace_editor').innerHTML.replace(/ace_editor {position: relative;(height: [0-9]*px !important;)?/,'ace_editor {position: relative;height: 300px !important;');}
    //if (document.getElementsByClassName('gist-file-code').length > 0) { document.getElementsByClassName('gist-file-code')[0].style.height = availableHeight + 'px';}
    if (document.getElementsByClassName('focus-view-content').length > 0) { document.getElementsByClassName('focus-view-content')[0].style.height = (document.documentElement.clientHeight - 57) + 'px';}
    if (document.getElementsByClassName('ace_editor').length > 0) { 
        ace.edit(document.getElementsByClassName('ace_editor')[0]).renderer.updateFull();
        ace.edit(document.getElementsByClassName('ace_editor')[0]).resize();
        ace.edit(document.getElementsByClassName('ace_editor')[0]).setOptions({
            fontSize: "14pt"
        });
    }
}

function main() {
    'use strict';

    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function(obj, callback){
            if( MutationObserver ){
                // define a new observer
                var obs = new MutationObserver(function(mutations, observer){
                    if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                        callback(mutations);
                });
                // have the observer observe foo for changes in children
                obs.observe( obj, { attributes:false, childList:true, subtree:true });
            }
            else if( eventListenerSupported ){
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();

    observeDOM( document.body ,function(mutations){
        update();
    });

    if (
        (document.getElementsByClassName('sidebar-view-container').length > 0) &&
        (document.getElementsByClassName('content-view-container').length > 0) &&
        (document.getElementsByClassName('icon-question-sign').length > 0) &&
        (document.getElementsByClassName('icon-cut').length > 0))
    {
        debugger;
        document.getElementsByClassName('sidebar-view-container')[0].style.height="0px";
        document.getElementsByClassName('content-view-container')[0].style['padding-left']="0px";
        document.body.style.background="none";

        addGlobalStyle("body{font:normal 120% 'Old Standard TT', serif;}");

        document.getElementsByClassName('icon-question-sign')[0].style.display="none";
        document.getElementsByClassName('icon-cut')[0].style.display="none";
        document.getElementsByClassName('filter-by-updated')[0].click();
        clearInterval(interval);
    }

    shortcut.add("Alt+Right",function() {
        detail = false;
        update();
    });

    shortcut.add("Alt+Left",function() {
        detail = true;
        update();
    });

}

interval = setInterval(main, 5000);
