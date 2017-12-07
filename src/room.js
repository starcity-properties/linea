import Outline from 'outline.js';

export default class Room extends Outline {
    constructor(canvas, origin, outline, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.features = [];
    }

    addFeature(origin, ...args) {
        args.forEach((item) => {
            item.outline = this.addOrigin(item.outline, origin);
            item.outline = this.addOrigin(item.outline. this.origin);
        });
    }

    draw() {
        this.drawRoomOutline(this.outline, this.id, this.style);
        this.features.forEach((item) => {
            item.draw();
        });
    }
}
