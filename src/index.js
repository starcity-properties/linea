import './index.css';
import { ellisOne } from './ellis1.js';
import { ellisTwo } from './ellis2.js';
import { ellisThree } from './ellis3.js';
import { testRoom } from './testRoom.js';
import { style } from './styles.js';
import Floorplan from './linea.js';



    // *******************************************************************************************
    // WRITE SIZE LABELS STARTS HERE
    // *******************************************************************************************

    writeLabel(text) {
        var label = this.paper.text(50, 50, text);

        label.attr({fontFamily: "Roboto", fontSize: 20, fontWeight: "bold", fontStyle: "italic"});
        label.attr({textAnchor: "right", fill: "blue", textDecoration: "none", writingMode: "tb", direction: "ltr"});
    }


    getMiddlePoint(a, b, distance) {
        var middle = {};

        middle.x = (a.x - (((distance/2) * (a.x - b.x))/distance));
        middle.y = (a.y - (((distance/2) * (a.y - b.y))/distance));

        return middle;
    }

    shiftPoint(a, b, d, shift) {
        var point = {};

        point.x = (a.x - ((shift * (a.x - b.x))/d));
        point.y = (a.y - ((shift * (a.y - b.y))/d));

        return point;
    }

    drawDiagonal(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        var m = this.getMiddlePoint(a, b, d);

        if (a.x < b.x && a.y < b.y) { // shift line down and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x - 8, a.y + 8, b.x - 8, b.y + 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x - 20, m.y + 20, Math.round(d));
        } else if (a.x < b.x && a.y > b.y) { // shift line down and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x+ 8, a.y + 8, b.x + 8, b.y + 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x + 20, m.y + 20, Math.round(d));
        } else if (a.x > b.x && a.y < b.y) { // shift line up and cut short from a
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x - 8, a.y - 8, b.x - 8, b.y - 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x - 20, m.y - 20, Math.round(d));
        } else { // shift line up and cut short from b
            a = this.shiftPoint(a, b, d, 10);
            b = this.shiftPoint(b, a, d, 10);
            this.drawLine([a.x + 8, a.y - 8, b.x + 8, b.y - 8], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(m.x + 20, m.y - 20, Math.round(d));
        }
        label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
    }


    drawDistance(a, b) {
        var d = Snap.len(a.x, a.y, b.x, b.y);
        var label = [];
        if (a.y === b.y && b.x > a.x) { // line is going right, shift line down
            this.drawLine([a.x + 10, a.y + 10, b.x - 10, b.y + 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x + (d/2), a.y + 20, d);
            label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
        } else if (a.y === b.y && a.x > b.x) { // line is going left, shift line up
            this.drawLine([a.x - 10, a.y - 10, b.x + 10, b.y - 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(b.x + (d/2), b.y - 20, d);
            label.attr({textAnchor: "middle", fontStyle: "Arial", fontSize: 10});
        } else if (b.y > a.y && b.x === a.x) { // line is going down, shift line left
            this.drawLine([a.x - 10, a.y + 10, b.x - 10, b.y - 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x - 30, a.y + (d/2), d);
            label.attr({textAnchor: "right", fontStyle: "Arial", fontSize: 10});
        } else if (b.x === a.x && a.y > b.y) { // line is going up, shift line right
            this.drawLine([a.x + 10, a.y - 10, b.x + 10, b.y + 10], {stroke: "gray", strokeWidth: 1});
            label = this.paper.text(a.x + 20, a.y - (d/2), d);
            label.attr({textAnchor: "left", fontStyle: "Arial", fontSize: 10});
        } else { // line is diagonal need to determine which direction and where to draw it
            this.drawDiagonal(a, b);
        }

    }

    writeSizes(points) {
        var len = points.length;
        for (var i = 0; i < len - 1; i++) {
            // console.log("round: " + i);
            this.drawDistance(points[i], points[i + 1]);
            // var distance = this.calculateDistance(points[i], points[i + 1]);
            // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
        }
        // console.log("round: " + i);
        this.drawDistance(points[i], points[0]);
        // var distance = this.calculateDistance(points[i], points[0]);
        // this.paper.text(points[i].x + 20, points[i].y + 20, distance).attr({fontFamily: "Arial", fontSize: 10});
    }

}


var roomRender = new Floorplan("#svg", 0, 0, 600, 600);
// roomRender.drawGrid(10);

// roomRender.drawRoom(roomData);

// setTimeout(function() {
//     roomRender.update(roomRender.windows, roomRender.windows[0].id, style.windowStyle.open);
// }, 5000);

// console.log(ellisOne);

// roomRender.drawRoom(ellisOne);
// roomRender.drawRoomOutline(ellisOne.room.outline, ellisOne.unit.code, style.roomOutline.default);

// roomRender.drawCircle({x: 50, y: 50}, 3, "red");
// roomRender.writeLabel("testing");
// roomRender.writeSizes(ellisOne.room.outline);

roomRender.drawRoom(ellisTwo);
roomRender.writeSizes(ellisTwo.room.outline);

// roomRender.drawRoom(ellisThree);
// roomRender.writeSizes(ellisThree.room.outline);

// console.log(roomRender);
// console.log(roomRender.windows);
// console.log(roomRender.slidingDoors);


