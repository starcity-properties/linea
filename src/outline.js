import Drawing from './drawing.js';

export default class Outline extends Drawing {
    constructor (canvas) {
        super(canvas);
    }

    drawOutline(points, id, outlineStyle) {
        // compilePath() takes points and makes the string to pass into path?
        var path = this.drawPathOutline(points, true, outlineStyle);
        var lastItem = this.walls.push(path) - 1;

        // assign id to object
        this.walls[lastItem].id = id;
    }
}
