import Outline from 'outline.js';

export default class Floor extends Outline {
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
}
