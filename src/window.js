import Drawing from './drawing.js';

export default class Window extends Drawing {
    constructor(canvas, outline, id, style) {
        super(canvas);
        this.outline = outline;
        this.id = id;
        this.windows = [];
        this.style = style;
    }

    draw() {
        this.drawLine(this.outline, this.style);
    }
};
