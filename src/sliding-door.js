import Drawing from './drawing.js';

export default class SlidingDoor extends Drawing {
    constructor(canvas, outline, id, style) {
        super(canvas);
        this.outline = outline;
        // console.log(outline);
        this.id = id;
        this.slidingDoors = [];
        this.doorStyle = style.door.default;
        this.projectionStyle = style.projection.default;
    }

    draw() {
        var doorSegment = [this.outline[0], this.outline[1]];
        var projection = [this.outline[1], this.outline[2]];
        var lines = [];

        lines.push(this.drawLine(doorSegment, this.doorStyle),
                   this.drawLine(projection, this.projectionStyle));

        this.slidingDoors.push(lines);
    }
};
