// ==UserScript==
// @name         yoMamaBrew - Youtube Volume
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to fix youtube volume
// @author       Me
// @match           *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var player;

    // "Hey dad, look at this timer I copied off stackoverflow!"
    // TODO: Remove me
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function demo() {
        console.log('Taking a break...');
        await sleep(2000);
        console.log('Two seconds later, showing sleep in a loop...');

        //Sleep in loop
        for (let i = 0; i < 5; i++) {
            if (i === 3) {
                await sleep(2000);
                console.log(i);
            }
        }
    }

    //Currently garbage.  Waits 2 sec hoping youtube loaded...
    //.then()......

    demo().then(() => {

        const getPlayer = () => {
            var ytd_player = document.getElementsByTagName("ytd-player")[0];
            if (ytd_player) {
                return ytd_player.getPlayer();
            }
            else console.log("I failed to get the player");
        }

        //Fetch the video player
        player = getPlayer();
        console.log("Success! [Volume is: " + player.getVolume() + "]");



        //Add event listener to fire when a key is pressed.
        //Listen for key combos:
        // Volume Up: (Alt & -)
        // Volume Down: (Alt & +)
        function KeyPress(e) {
            var evtobj = window.event ? event : e
            var volume = player.getVolume();

               // Volume plus 1.
            if (evtobj.keyCode == 187 && evtobj.altKey) {
                player.setVolume(( volume + 1 ));
                console.log("current volume: " + player.getVolume());
            }

            // Volume subtract 1.
            if (evtobj.keyCode == 189 && evtobj.altKey) {
                player.setVolume(( volume - 1 ));
                console.log("current volume: " + player.getVolume());
            }
        }
        document.onkeydown = KeyPress;
    // END 2s loading delay ------------
    })

    // ------------------------   End User Script   ------------------------ //
})();