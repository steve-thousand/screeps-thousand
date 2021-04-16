/**
 * Setup some globals for us to use during testing
 */

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
global.Game = new function () {
    this.time = 1;
    this.cpu = {
        getUsed: () => { },
    };
    this.map = {
        visual: {
            circle: () => { }
        }
    }
};

global.RoomPosition = function (x, y, roomName) {
    this.x = x;
    this.y = y;
    this.roomName = roomName;
};