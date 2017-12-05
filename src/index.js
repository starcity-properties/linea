import './index.css';
import { ellisOne } from './ellis1.js';
import { ellisTwo } from './ellis2.js';
import { ellisThree } from './ellis3.js';
import { testRoom } from './testRoom.js';
import { style } from './styles.js';
// import Floorplan from './linea.js';
import { lineaCanvas, Room, Floor, Features } from './linea.js';
import { kearnyFloorTwo } from './kearnyFloor.js';
import { kearnyFloor2Room1 } from './kearny-f2-r1.js';
import {kearnyFloorTwoFull } from './kearnyFloorFull.js';

var floorTest = new Floor("#svg", -5, -5, 600, 600);

// floorTest.drawFloor(testRoom);
floorTest.drawFloor(kearnyFloorTwoFull);
// floorTest.drawRoom(kearnyFloorTwo, kearnyFloorTwo.unit.origin);
// floorTest.drawRoom(kearnyFloor2Room1, { x: 0, y: 0 });

// var roomRender = new Floorplan("#svg", 0, 0, 600, 600);
// roomRender.drawGrid(10, style.gridStyle);

// roomRender.drawRoom(testRoom);
// roomRender.writeSizes(testRoom.room.outline);


// setTimeout(function() {
//     roomRender.update(roomRender.windows, roomRender.windows[0].id, style.windowStyle.open);
// }, 5000);

// console.log(ellisOne);

// roomRender.drawRoom(ellisOne);
// roomRender.drawRoomOutline(ellisOne.room.outline, ellisOne.unit.code, style.roomOutline.default);

// roomRender.drawCircle({x: 50, y: 50}, 3, "red");
// roomRender.writeLabel("testing");
// roomRender.writeSizes(ellisOne.room.outline);

// roomRender.drawRoom(ellisTwo);
// roomRender.writeSizes(ellisTwo.room.outline);

// roomRender.drawRoom(ellisThree);
// roomRender.writeSizes(ellisThree.room.outline);

// console.log(roomRender);
// console.log(roomRender.windows);
// console.log(roomRender.slidingDoors);


