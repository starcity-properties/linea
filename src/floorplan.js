import Outline from 'outline.js';

export default class Floorplan extends Outline {
    constructor(canvas, origin, outline, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.rooms = [];
    }

    addRoom(origin, ...rooms) {
        rooms.forEach((item) => {
            item.outline = this.addOrigin(item.outline, origin);
            item.outline = this.addOrigin(item.outline, this.origin);
            item.features.forEach((item) => {
                item.outline = this.addOrigin(item.outline, origin);
            });
            this.features.push(item);
        });
    }

    draw() {
        this.drawOutline(this.outline, this.id, this.style);
        this.rooms.forEach((item) => {
            item.draw();
        });
        this.features.forEach((item) => {
            item.draw();
        });
    }
}
