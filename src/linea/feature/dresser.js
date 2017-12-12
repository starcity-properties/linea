import Feature from './feature.js';

export default class Dresser extends Feature {
    constructor(canvas, origin, outline, id, style, label) {
        super(canvas);
        this.outline = this.addOrigin(outline, origin);
        this.origin = origin;
        this.id = id;
        this.style = style;
        this.label = label !== undefined ? label : false;
        this.dressers = [];
    }

    draw() {
        this.features.push(this.dressers.push(this.drawRectWithLabel(this.outline, this.style, this.label)));
    }
}
