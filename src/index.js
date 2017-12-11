import './index.css';
import { kearnyFloorTwo } from './kearnyFloor.js';
import { kearnyFloor2Room1 } from './kearny-f2-r1.js';
import { kearnyFloor2Room2 } from './kearny-f2-r2.js';
import { kearnyFloor2Room3 } from './kearny-f2-r3.js';

import { style } from './styles.js';

import LineaCanvas from './canvas.js';
import Floorplan from './floorplan.js';
import Room from './room.js';
import Feature from './feature.js';
import Window from './window.js';
import SlidingDoor from './sliding-door.js';
import Door from './door.js';

var canvas = new LineaCanvas("#svg", -5, -5, 600, 600);
// console.log(canvas);
// console.log(kearnyFloor2Room1);
// console.log(style);

// console.log(kearnyFloorTwo);
var kearny = new Floorplan(canvas, kearnyFloorTwo.unit.origin, kearnyFloorTwo.room.outline, kearnyFloorTwo.unit.code, style.roomOutline.default);

var jazz = new Room(canvas, {x:0, y: 0}, kearnyFloor2Room1.outline, kearnyFloor2Room1.unit.code, style.roomOutline.default);
var mars = new Room(canvas, {x:0, y:0}, kearnyFloor2Room2.outline, kearnyFloor2Room2.unit.code, style.roomOutline.default);
var closet = new Room(canvas, {x:0, y:0}, kearnyFloor2Room3.outline, kearnyFloor2Room3.unit.code, style.roomOutline.default);

var kearnyWindows = getFeature(kearnyFloorTwo.features, "window");
kearnyWindows = makeWindows(canvas, kearnyWindows, style.windowStyle.default);
var test1 = [kearnyWindows[0], kearnyWindows[1]];
var test2 = [kearnyWindows[2], kearnyWindows[3]];
var test3 = [kearnyWindows[4], kearnyWindows[5]];

// kearny.addFeatures({x:0, y:0}, kearnyWindows);

var windows = getFeature(kearnyFloor2Room1.features, "window");
var jazzWindow = makeWindows(canvas, windows, style.windowStyle.default);

// console.log(kearnyFloor2Room1);
var jazzSlidingDoors = getFeature(kearnyFloor2Room1.features, "slidingDoor");
// console.log(style.doorStyle);
// console.log(jazzSlidingDoors);
jazzSlidingDoors = makeSlidingDoor(canvas, jazzSlidingDoors, style.doorStyle);
// console.log(jazzSlidingDoors);

var marsWindows = getFeature(kearnyFloor2Room2.features, "window");
marsWindows = makeWindows(canvas, marsWindows, style.windowStyle.default);
var marsSlidingDoors = getFeature(kearnyFloor2Room2.features, "slidingDoor");
marsSlidingDoors = makeSlidingDoor(canvas, marsSlidingDoors, style.doorStyle);

var closetDoors = getFeature(kearnyFloor2Room3.features, "door");
closetDoors = makeDoor(canvas, closetDoors, style.doorStyle);
console.log(closetDoors);


kearny.addFeatures({x:0, y:0}, test1, test2, test3);
jazz.addFeatures({x: 0, y: 0}, jazzWindow, jazzSlidingDoors);
mars.addFeatures({x:0, y:0}, marsSlidingDoors, marsWindows);
closet.addFeatures({x:0, y:0}, closetDoors);
// console.log(jazz);

kearny.addRoom(kearnyFloor2Room1.unit.origin, jazz);
kearny.addRoom(kearnyFloor2Room2.unit.origin, mars);
kearny.addRoom(kearnyFloor2Room3.unit.origin, closet);
// console.log(kearny);
kearny.draw();

function makeDoor(canvas, doors, style) {
    var doorsObj = [];

    console.log(style);
    doors.forEach((item) => {
        doorsObj.push(new Door(canvas, item.outline, 90, item.clockwise, item.code, style));
    });

    return doorsObj;
}

function makeSlidingDoor(canvas, slidingDoors, style) {
    var slidingDoorsObj = [];

    slidingDoors.forEach((item) => {
        slidingDoorsObj.push(new SlidingDoor(canvas, item.outline, item.code, style));
    });

    return slidingDoorsObj;
}

function makeWindows(canvas, windows, style) {
    var windowsObj = [];

    windows.forEach((item) => {
        windowsObj.push(new Window(canvas, item.outline, item.code, style));
    });

    return windowsObj;
}

function getFeature(object, feature) {
    var list = [];
    object.forEach((item) => {
        if (item.type === feature)
            list.push(item);
    });

    return list;
};
