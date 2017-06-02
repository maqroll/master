// ==UserScript==
// @name         gistbox custom style
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.gistboxapp.com/
// @grant        none
// @resource customFont http://fonts.googleapis.com/css?family=Old+Standard+TT
// ==/UserScript==

var interval = 0;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
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
        for (var i = 0; i < mutations.length; i++) {
            for (var j = 0; j < mutations[i].addedNodes.length; j++) {
                if ('classList' in mutations[i].addedNodes[j]) {
                    if (mutations[i].addedNodes[j].classList.contains('focus-view-gist')) {
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
        document.getElementById('ace_editor').innerHTML= document.getElementById('ace_editor').innerHTML.replace('.ace_editor {position: relative;','.ace_editor {position: relative;height: 500px !important;');
        document.getElementsByClassName('filter-by-updated')[0].click();
        clearInterval(interval);
    }
}

interval = setInterval(main, 5000);
