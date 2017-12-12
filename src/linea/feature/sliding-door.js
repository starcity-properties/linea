import Feature from './feature.js';

export default class SlidingDoor extends Feature {
    constructor(canvas, origin, outline, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
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

        this.features.push(this.slidingDoors.push(lines));
    }
};
