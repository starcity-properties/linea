import './index.css';
import { ellisOne } from './ellis1.js';
import { ellisTwo } from './ellis2.js';
import { ellisThree } from './ellis3.js';
import { testRoom } from './testRoom.js';
import { style } from './styles.js';
import Floorplan from './linea.js';




const roomRender = new Floorplan("#svg", 0, 0, 600, 600);
roomRender.drawGrid(10, style.gridStyle); 

roomRender.drawRoom(testRoom);
// setTimeout(function() {
//     roomRender.update(roomRender.windows, roomRender.windows[0].id, style.windowStyle.open);
// }, 5000);

// console.log(ellisOne);

// roomRender.drawRoom(ellisOne);

// roomRender.drawRoom(ellisTwo);

// roomRender.drawRoom(ellisThree);

// console.log(roomRender);
// console.log(roomRender.windows);
// console.log(roomRender.slidingDoors);


