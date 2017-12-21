import './index.css';
import kFloorTwo from './example-floorplans/kFloor';
import kFloor2Room1 from './example-floorplans/k-f2-r1';
import kFloor2Room2 from './example-floorplans/k-f2-r2';
import kFloor2Room3 from './example-floorplans/k-f2-r3';

import style from './src/linea/style/styles';

// import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from 'linea';

// import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from './dist/linea/linea';

import { LineaCanvas, Floorplan, Room, InteriorWall, Window, SlidingDoor, Bed, NightTable, Dresser, Door } from './dist/minified-linea/linea-min';

// import LineaCanvas from './src/linea/canvas';
// import Floorplan from './src/linea/floorplan';
// import Room from './src/linea/room';
// import Feature from './src/linea/feature/feature';
// import Window from './src/linea/feature/window';
// import SlidingDoor from './src/linea/feature/sliding-door';
// import Door from './src/linea/feature/door';
// import Dresser from './src/linea/feature/dresser';
// import Bed from './src/linea/feature/bed';
// import NightTable from './src/linea/feature/nightTable';
// import InteriorWall from './src/linea/feature/interiorWall';


function makeInteriorWall(canvas, interiorWalls, interiorWallStyle) {
  const interiorWallsObj = [];

  interiorWalls.forEach((item) => {
    interiorWallsObj.push(new InteriorWall(canvas, item.origin, item.outline, item.code, interiorWallStyle, item.label));
  });

  return interiorWallsObj;
}

function makeNightTable(canvas, nightTables, nightTableStyle) {
  const nightTablesObj = [];

  nightTables.forEach((item) => {
    nightTablesObj.push(new NightTable(canvas, item.origin, item.outline, item.code, nightTableStyle, item.label));
  });

  return nightTablesObj;
}

function makeBed(canvas, beds, bedStyle) {
  const bedsObj = [];

  beds.forEach((item) => {
    bedsObj.push(new Bed(canvas, item.origin, item.outline, item.code, bedStyle, item.label));
  });

  return bedsObj;
}

function makeDoor(canvas, doors, doorStyle) {
  const doorsObj = [];

  doors.forEach((item) => {
    doorsObj.push(new Door(canvas, item.origin, item.outline, 90, item.clockwise, item.code, doorStyle));
  });

  return doorsObj;
}

function makeSlidingDoor(canvas, slidingDoors, slidingDoorStyle) {
  const slidingDoorsObj = [];

  slidingDoors.forEach((item) => {
    slidingDoorsObj.push(new SlidingDoor(canvas, item.origin, item.outline, item.code, slidingDoorStyle));
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

function makeDresser(canvas, dressers, dresserStyle) {
  const dressersObj = [];

  dressers.forEach((item) => {
    dressersObj.push(new Dresser(canvas, item.origin, item.outline, item.code, dresserStyle, item.label));
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
const k = new Floorplan(canvas, kFloorTwo.unit.origin, kFloorTwo.room.outline, kFloorTwo.unit.code, style.roomOutline.default);

const jazz = new Room(canvas, { x: 0, y: 0 }, kFloor2Room1.outline, kFloor2Room1.unit.code, style.roomOutline.default);
const mars = new Room(canvas, { x: 0, y: 0 }, kFloor2Room2.outline, kFloor2Room2.unit.code, style.roomOutline.default);
const closet = new Room(canvas, { x: 0, y: 0 }, kFloor2Room3.outline, kFloor2Room3.unit.code, style.roomOutline.default);

let kDryErase = getFeature(kFloorTwo.features, 'interiorWall');
kDryErase = makeInteriorWall(canvas, kDryErase, style.interiorWallStyle.default);

let kWindows = getFeature(kFloorTwo.features, 'window');
kWindows = makeWindows(canvas, kWindows, style.windowStyle.default);

const test1 = [kWindows[0], kWindows[1]];
const test2 = [kWindows[2], kWindows[3]];
const test3 = [kWindows[4], kWindows[5]];

const windows = getFeature(kFloor2Room1.features, 'window');
const jazzWindow = makeWindows(canvas, windows, style.windowStyle.default);

let jazzSlidingDoors = getFeature(kFloor2Room1.features, 'slidingDoor');
jazzSlidingDoors = makeSlidingDoor(canvas, jazzSlidingDoors, style.doorStyle);

let jazzBed = getFeature(kFloor2Room1.features, 'bed');
jazzBed = makeBed(canvas, jazzBed, style.bedStyle.default);

let jazzBarCart = getFeature(kFloor2Room1.features, 'nightTable');
jazzBarCart = makeNightTable(canvas, jazzBarCart, style.nightTableStyle.default);

let marsWindows = getFeature(kFloor2Room2.features, 'window');
marsWindows = makeWindows(canvas, marsWindows, style.windowStyle.default);

let marsSlidingDoors = getFeature(kFloor2Room2.features, 'slidingDoor');
marsSlidingDoors = makeSlidingDoor(canvas, marsSlidingDoors, style.doorStyle);

let closetDoors = getFeature(kFloor2Room3.features, 'door');
closetDoors = makeDoor(canvas, closetDoors, style.doorStyle);

let dresserTables = getFeature(kFloorTwo.features, 'dresser');
dresserTables = makeDresser(canvas, dresserTables, style.dresserStyle.default);

k.addFeatures({ x: 0, y: 0 }, test1, test2, test3);
k.addFeatures({ x: 0, y: 0 }, kDryErase);
jazz.addFeatures({ x: 0, y: 0 }, jazzWindow, jazzSlidingDoors);
jazz.addFeatures({ x: 0, y: 0 }, jazzBed);
jazz.addFeatures({ x: 0, y: 0 }, jazzBarCart);
mars.addFeatures({ x: 0, y: 0 }, marsSlidingDoors, marsWindows);
closet.addFeatures({ x: 0, y: 0 }, closetDoors);
k.addFeatures({ x: 0, y: 0 }, dresserTables);

k.addRoom(kFloor2Room1.unit.origin, jazz);
k.addRoom(kFloor2Room2.unit.origin, mars);
k.addRoom(kFloor2Room3.unit.origin, closet);

k.drawGrid(10, style.gridStyle);
k.draw();

