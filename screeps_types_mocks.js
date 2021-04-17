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

global.TOP = 1
global.TOP_RIGHT = 2;
global.RIGHT = 3;
global.BOTTOM_RIGHT = 4;
global.BOTTOM = 5;
global.BOTTOM_LEFT = 6;
global.LEFT = 7;
global.TOP_LEFT = 8;

global.Memory = new function () {

};

global.CreepMemory = function () {

};

global.RoomPosition = function (x, y, roomName) {
    this.x = x;
    this.y = y;
    this.roomName = roomName;
};

global.Creep = function () {
    this.memory = new CreepMemory()
}