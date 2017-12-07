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
    }

    draw() {
        this.drawRoomOutline(this.outline, this.id, this.style);
        this.features.forEach((item) => {
            item.draw();
        });
    }
}
