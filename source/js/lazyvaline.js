'use strict'

function query(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function addScript(url) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    s.async = false
    document.body.appendChild(s);
}

function loadValine() {
    addScript('https://unpkg.com/valine/dist/Valine.min.js');
    addScript('/js/valine_config.js');
}

var runningOnBrowser = typeof window !== "undefined";
var isBot = runningOnBrowser && !("onscroll" in window) || typeof navigator !== "undefined" && /(gle|ing|ro|msn)bot|crawl|spider|yand|duckgo/i.test(navigator.userAgent);
var supportsIntersectionObserver = runningOnBrowser && "IntersectionObserver" in window;

setTimeout(function () {
    if (!isBot && supportsIntersectionObserver) {
        var io = new IntersectionObserver(function(entries) {
            // console.log('In IO');
            if (entries[0].isIntersecting) {
                // console.log('In loading');
                loadValine();
                io.disconnect();
            }
        });
        io.observe(document.getElementById('valine_container'));
    } else {
        loadValine();
    }
});