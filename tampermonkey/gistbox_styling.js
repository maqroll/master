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
    document.getElementsByClassName('filter-bar')[0].style.display="none";
    document.getElementsByClassName('split-view-list')[0].style.width="0px";
    document.getElementsByClassName('split-view-content')[0].style.left="0px";
    document.getElementsByClassName('focus-view-header')[0].style.display="none";
}

function show() {
    document.getElementsByClassName('filter-bar')[0].style.display="block";
    document.getElementsByClassName('split-view-list')[0].style.width="354px";
    document.getElementsByClassName('split-view-content')[0].style.left="355px";
    document.getElementsByClassName('focus-view-header')[0].style.display="block";
}

function update() {
    if (detail) {
        hide();
    } else {
        show();
    }
    // available space for editor
    if (document.getElementsByClassName('add-another-file-container').length > 0) { document.getElementsByClassName('add-another-file-container')[0].style.display = "none";}
    var availableHeight = document.documentElement.clientHeight - document.getElementsByClassName('gist-file-header')[0].getBoundingClientRect().bottom - 10;
    document.getElementById('ace_editor').innerHTML= document.getElementById('ace_editor').innerHTML.replace(/ace_editor {position: relative;(height: [0-9]*px !important;)?/,'ace_editor {position: relative;height: ' + availableHeight + 'px !important;');
    if (document.getElementsByClassName('gist-file-code').length > 0) { document.getElementsByClassName('gist-file-code')[0].style.height = availableHeight + 'px';}
    if (document.getElementsByClassName('focus-view-content').length > 0) { document.getElementsByClassName('focus-view-content')[0].style.height = (document.documentElement.clientHeight - 57) + 'px';}
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
                obs.observe( obj, { childList:true, subtree:true });
            }
            else if( eventListenerSupported ){
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();

    observeDOM( document ,function(mutations){
        update();

        for (var i = 0; i < mutations.length; i++) {
            for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                if ('classList' in mutations[i].addedNodes[j]) {
                    if (mutations[i].addedNodes[j].classList.contains('focus-view-gist') || mutations[i].addedNodes[j].classList.contains('focus-view-edit-gist')) {
                        var btnAdd = mutations[i].addedNodes[j].querySelectorAll('.add-another-file');
                        if (btnAdd) {
                            btnAdd[0].style.display = 'none';
                        }
                    }
                }
            }
        }
    });

    if (
        (document.getElementsByClassName('sidebar-view-container').length > 0) &&
        (document.getElementsByClassName('content-view-container').length > 0) &&
        (document.getElementsByClassName('icon-question-sign').length > 0) &&
        (document.getElementsByClassName('icon-cut').length > 0))
    {
        document.getElementsByClassName('sidebar-view-container')[0].style.height="0px";
        document.getElementsByClassName('content-view-container')[0].style['padding-left']="0px";
        document.body.style.background="none";

        addGlobalStyle("body{font:normal 120% 'Old Standard TT', serif;;}");

        document.getElementsByClassName('icon-question-sign')[0].style.display="none";
        document.getElementsByClassName('icon-cut')[0].style.display="none";
        document.getElementsByClassName('filter-by-updated')[0].click();
        clearInterval(interval);
    }

    shortcut.add("Alt+Right",function() {
        detail = false;
        show();
    });

    shortcut.add("Alt+Left",function() {
        detail = true;
        hide();
    });

}

interval = setInterval(main, 5000);
