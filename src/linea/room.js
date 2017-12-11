import Outline from './outline.js';

export default class Room extends Outline {
    constructor(canvas, origin, outline, id, style) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.features = [];
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
        this.features.forEach((item) => {
            item.draw();
        });
    }
}
