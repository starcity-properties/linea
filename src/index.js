import './index.css';
import { kearnyFloorTwo } from './example-floorplans/kearnyFloor.js';
import { kearnyFloor2Room1 } from './example-floorplans/kearny-f2-r1.js';
import { kearnyFloor2Room2 } from './example-floorplans/kearny-f2-r2.js';
import { kearnyFloor2Room3 } from './example-floorplans/kearny-f2-r3.js';

import { style } from './linea/style/styles.js';

import LineaCanvas from './linea/canvas.js';
import Floorplan from './linea/floorplan.js';
import Room from './linea/room.js';
import Feature from './linea/feature/feature.js';
import Window from './linea/feature/window.js';
import SlidingDoor from './linea/feature/sliding-door.js';
import Door from './linea/feature/door.js';
import Dresser from './linea/feature/dresser.js';
import Bed from './linea/feature/bed.js';
import NightTable from './linea/feature/nightTable.js';
import InteriorWall from './linea/feature/interiorWall.js';

var canvas = new LineaCanvas("#svg", -5, -5, 600, 600);
var kearny = new Floorplan(canvas, kearnyFloorTwo.unit.origin, kearnyFloorTwo.room.outline, kearnyFloorTwo.unit.code, style.roomOutline.default);

var jazz = new Room(canvas, {x:0, y: 0}, kearnyFloor2Room1.outline, kearnyFloor2Room1.unit.code, style.roomOutline.default);
var mars = new Room(canvas, {x:0, y:0}, kearnyFloor2Room2.outline, kearnyFloor2Room2.unit.code, style.roomOutline.default);
var closet = new Room(canvas, {x:0, y:0}, kearnyFloor2Room3.outline, kearnyFloor2Room3.unit.code, style.roomOutline.default);

var kearnyDryErase = getFeature(kearnyFloorTwo.features, "interiorWall");
kearnyDryErase = makeInteriorWall(canvas, kearnyDryErase, style.interiorWallStyle.default);

var kearnyWindows = getFeature(kearnyFloorTwo.features, "window");
kearnyWindows = makeWindows(canvas, kearnyWindows, style.windowStyle.default);

var test1 = [kearnyWindows[0], kearnyWindows[1]];
var test2 = [kearnyWindows[2], kearnyWindows[3]];
var test3 = [kearnyWindows[4], kearnyWindows[5]];

var windows = getFeature(kearnyFloor2Room1.features, "window");
var jazzWindow = makeWindows(canvas, windows, style.windowStyle.default);

var jazzSlidingDoors = getFeature(kearnyFloor2Room1.features, "slidingDoor");
jazzSlidingDoors = makeSlidingDoor(canvas, jazzSlidingDoors, style.doorStyle);

var jazzBed = getFeature(kearnyFloor2Room1.features, "bed");
jazzBed = makeBed(canvas, jazzBed, style.bedStyle.default);

var jazzBarCart = getFeature(kearnyFloor2Room1.features, "nightTable");
jazzBarCart = makeNightTable(canvas, jazzBarCart, style.nightTableStyle.default);

var marsWindows = getFeature(kearnyFloor2Room2.features, "window");
marsWindows = makeWindows(canvas, marsWindows, style.windowStyle.default);

var marsSlidingDoors = getFeature(kearnyFloor2Room2.features, "slidingDoor");
marsSlidingDoors = makeSlidingDoor(canvas, marsSlidingDoors, style.doorStyle);

var closetDoors = getFeature(kearnyFloor2Room3.features, "door");
closetDoors = makeDoor(canvas, closetDoors, style.doorStyle);

var dresserTables = getFeature(kearnyFloorTwo.features, "dresser");
dresserTables = makeDresser(canvas, dresserTables, style.dresserStyle.default);

kearny.addFeatures({x:0, y:0}, test1, test2, test3);
kearny.addFeatures({x:0, y:0}, kearnyDryErase);
jazz.addFeatures({x: 0, y: 0}, jazzWindow, jazzSlidingDoors);
jazz.addFeatures({x: 0, y: 0}, jazzBed);
jazz.addFeatures({x: 0, y: 0}, jazzBarCart);
mars.addFeatures({x:0, y:0}, marsSlidingDoors, marsWindows);
closet.addFeatures({x:0, y:0}, closetDoors);
kearny.addFeatures({x:0, y:0}, dresserTables);

kearny.addRoom(kearnyFloor2Room1.unit.origin, jazz);
kearny.addRoom(kearnyFloor2Room2.unit.origin, mars);
kearny.addRoom(kearnyFloor2Room3.unit.origin, closet);

kearny.drawGrid(10, style.gridStyle);
kearny.draw();

function makeInteriorWall(canvas, interiorWalls, style) {
    var interiorWallsObj = [];

    interiorWalls.forEach((item) => {
        interiorWallsObj.push(new InteriorWall(canvas, item.origin, item.outline, item.code, style, item.label));
    });

    return interiorWallsObj;
}

function makeNightTable(canvas, nightTables, style) {
    var nightTablesObj = [];

    nightTables.forEach((item) => {
        nightTablesObj.push(new NightTable(canvas, item.origin, item.outline, item.code, style, item.label));
    });

    return nightTablesObj;
}

function makeBed(canvas, beds, style) {
    var bedsObj = [];

    beds.forEach((item) => {
        bedsObj.push(new Bed(canvas, item.origin, item.outline, item.code, style, item.label));
    });

    return bedsObj;
}

function makeDoor(canvas, doors, style) {
    var doorsObj = [];

    doors.forEach((item) => {
        doorsObj.push(new Door(canvas, item.origin, item.outline, 90, item.clockwise, item.code, style));
    });

    return doorsObj;
}

function makeSlidingDoor(canvas, slidingDoors, style) {
    var slidingDoorsObj = [];

    slidingDoors.forEach((item) => {
        slidingDoorsObj.push(new SlidingDoor(canvas, item.origin, item.outline, item.code, style));
    });

    return slidingDoorsObj;
}

function makeWindows(canvas, windows, style) {
    var windowsObj = [];

    windows.forEach((item) => {
        windowsObj.push(new Window(canvas, item.origin, item.outline, item.code, style));
    });

    return windowsObj;
}

function makeDresser(canvas, dressers, style) {
    var dressersObj = [];

    dressers.forEach((item) => {
        dressersObj.push(new Dresser(canvas, item.origin, item.outline, item.code, style, item.label));
    });

    return dressersObj;
}

function getFeature(object, feature) {
    var list = [];
    object.forEach((item) => {
        if (item.type === feature)
            list.push(item);
    });

    return list;
};
