import './index.css';
import kFloorTwo from './example-floorplans/kFloor';
import kFloor2Room1 from './example-floorplans/k-f2-r1';
import kFloor2Room2 from './example-floorplans/k-f2-r2';
import kFloor2Room3 from './example-floorplans/k-f2-r3';

import defaultStyle from './src/linea/style/styles';

// Test linea from Node Modules
// import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from 'linea';

// Test unminified linea
// import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from './dist/linea/linea';

// Test minified linea
// import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from './dist/minified-linea/linea-min';

// Test individual Class Files
import LineaCanvas from './src/linea/canvas';
import Floorplan from './src/linea/floorplan';
import Room from './src/linea/room';
import Feature from './src/linea/feature/feature';
import Window from './src/linea/feature/window';
import SlidingDoor from './src/linea/feature/sliding-door';
import Door from './src/linea/feature/door';
import Dresser from './src/linea/feature/dresser';
import Bed from './src/linea/feature/bed';
import NightTable from './src/linea/feature/nightTable';
import InteriorWall from './src/linea/feature/interiorWall';

function makeInteriorWall(canvas, interiorWalls, interiorWallStyle) {
  const interiorWallsObj = [];

  interiorWalls.forEach((item) => {
    interiorWallsObj.push(new InteriorWall(canvas, item.origin, item.outline, item.code, interiorWallStyle));
  });

  return interiorWallsObj;
}

function makeNightTable(canvas, nightTables, nightTableStyle, labelStyle) {
  const nightTablesObj = [];

  nightTables.forEach((item) => {
    nightTablesObj.push(new NightTable(canvas, item.origin, item.outline, item.code, nightTableStyle, item.label, labelStyle));
  });

  return nightTablesObj;
}

function makeBed(canvas, beds, bedStyle, labelStyle) {
  const bedsObj = [];

  beds.forEach((item) => {
    bedsObj.push(new Bed(canvas, item.origin, item.outline, item.code, bedStyle, item.label, labelStyle));
  });

  return bedsObj;
}

function makeDoor(canvas, doors, doorStyle, doorStopStyle, doorProjStyle) {
  const doorsObj = [];

  doors.forEach((item) => {
    doorsObj.push(new Door(canvas, item.origin, item.outline, 90, item.clockwise, item.code, doorStyle, doorStopStyle, doorProjStyle));
  });

  return doorsObj;
}

function makeSlidingDoor(canvas, slidingDoors, slidingDoorStyle, doorProjStyle) {
  const slidingDoorsObj = [];

  slidingDoors.forEach((item) => {
    slidingDoorsObj.push(new SlidingDoor(canvas, item.origin, item.outline, item.code, slidingDoorStyle, doorProjStyle));
  });

  return slidingDoorsObj;
}

function makeWindows(canvas, windows, windowStyle) {
  const windowsObj = [];

  windows.forEach((item) => {
    windowsObj.push(new Window(canvas, item.origin, item.outline, item.code, windowStyle));
  });

  return windowsObj;
}

function makeDresser(canvas, dressers, dresserStyle, labelStyle) {
  const dressersObj = [];

  dressers.forEach((item) => {
    dressersObj.push(new Dresser(canvas, item.origin, item.outline, item.code, dresserStyle, item.label, labelStyle));
  });

  return dressersObj;
}

function getFeature(object, feature) {
  const list = [];
  object.forEach((item) => {
    if (item.type === feature) { list.push(item); }
  });

  return list;
}


const canvas = new LineaCanvas('#svg', -5, -5, 600, 600);
const k = new Floorplan(canvas, kFloorTwo.unit.origin, kFloorTwo.room.outline, kFloorTwo.unit.code);

const jazz = new Room(canvas, { x: 0, y: 0 }, kFloor2Room1.outline, kFloor2Room1.unit.code);
const mars = new Room(canvas, { x: 0, y: 0 }, kFloor2Room2.outline, kFloor2Room2.unit.code);
const closet = new Room(canvas, { x: 0, y: 0 }, kFloor2Room3.outline, kFloor2Room3.unit.code);

let kDryErase = getFeature(kFloorTwo.features, 'interiorWall');
kDryErase = makeInteriorWall(canvas, kDryErase, defaultStyle.interiorWallStyle.default);

let kWindows = getFeature(kFloorTwo.features, 'window');
kWindows = makeWindows(canvas, kWindows, defaultStyle.windowStyle.default);

const test1 = [kWindows[0], kWindows[1]];
const test2 = [kWindows[2], kWindows[3]];
const test3 = [kWindows[4], kWindows[5]];

const windows = getFeature(kFloor2Room1.features, 'window');
const jazzWindow = makeWindows(canvas, windows, defaultStyle.windowStyle.default);

let jazzSlidingDoors = getFeature(kFloor2Room1.features, 'slidingDoor');
jazzSlidingDoors = makeSlidingDoor(canvas, jazzSlidingDoors, defaultStyle.doorStyle.door.default, defaultStyle.doorStyle.projection.default);

let jazzBed = getFeature(kFloor2Room1.features, 'bed');
jazzBed = makeBed(canvas, jazzBed, defaultStyle.bedStyle.default, defaultStyle.labelStyle);

let jazzBarCart = getFeature(kFloor2Room1.features, 'nightTable');
jazzBarCart = makeNightTable(canvas, jazzBarCart, defaultStyle.nightTableStyle.default, defaultStyle.labelStyle);

let marsWindows = getFeature(kFloor2Room2.features, 'window');
marsWindows = makeWindows(canvas, marsWindows, defaultStyle.windowStyle.default);

let marsSlidingDoors = getFeature(kFloor2Room2.features, 'slidingDoor');
marsSlidingDoors = makeSlidingDoor(canvas, marsSlidingDoors, defaultStyle.doorStyle.door.default, defaultStyle.doorStyle.projection.default);

let closetDoors = getFeature(kFloor2Room3.features, 'door');
closetDoors = makeDoor(canvas, closetDoors, defaultStyle.doorStyle.door.default, defaultStyle.doorStyle.doorStop.default, defaultStyle.doorStyle.projection.default);

let dresserTables = getFeature(kFloorTwo.features, 'dresser');
dresserTables = makeDresser(canvas, dresserTables, defaultStyle.dresserStyle.default, defaultStyle.labelStyle);

k.addFeature({ x: 0, y: 0 }, test1, test2, test3);
k.addFeature({ x: 0, y: 0 }, kDryErase);
jazz.addFeature({ x: 0, y: 0 }, jazzWindow, jazzWindow, jazzSlidingDoors);
jazz.addFeature({ x: 0, y: 0 }, jazzBed);
jazz.addFeature({ x: 0, y: 0 }, jazzBarCart);
mars.addFeature({ x: 0, y: 0 }, marsSlidingDoors, marsWindows);
closet.addFeature({ x: 0, y: 0 }, closetDoors);
k.addFeature({ x: 0, y: 0 }, dresserTables);

k.addRoom(kFloor2Room1.unit.origin, jazz);
k.addRoom(kFloor2Room2.unit.origin, mars);
k.addRoom(kFloor2Room3.unit.origin, closet);

k.drawGrid(10);
k.draw();

