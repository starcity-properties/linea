import Outline from './outline.js';

export default class Floorplan extends Outline {
    constructor(canvas, origin, outline, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.rooms = [];
        this.features = [];
    }

    addRoom(origin, ...rooms) {
        rooms.forEach((item) => {
            item.outline = this.addOrigin(item.outline, origin);
            item.outline = this.addOrigin(item.outline, this.origin);
            item.features.forEach((item) => {
                item.outline = this.addOrigin(item.outline, origin);
            });
            this.rooms.push(item);
        });
    }

    // need to add origin modifier to this
    addFeatures(origin, feature1, ...moreFeatures) {
        feature1.forEach((item) => {
            item.outline = this.addOrigin(item.outline, origin);
            item.outline = this.addOrigin(item.outline, this.origin);
            this.features.push(item);
        });
        moreFeatures.forEach((item) => {
            item.forEach((item2) => {
                item2.outline = this.addOrigin(item2.outline, origin);
                item2.outline = this.addOrigin(item2.outline, this.origin);
                this.features.push(item2);
            });
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
