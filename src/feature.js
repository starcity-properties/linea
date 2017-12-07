import { Drawing } from './drawing.js';

export class Feature extends Drawing {
    constructor(canvas) {
        super(canvas);
        this.paper = canvas.paper;
        this.features = [];
    }
};
