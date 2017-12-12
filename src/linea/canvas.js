import Snap from 'snapsvg-cjs';

export default class LineaCanvas {
    constructor(id, minX, minY, maxX, maxY) {
        this.paper = Snap(id);
        this.paper.attr({ viewBox: minX + " " + minY + " " + maxX + " " + maxY });
        this.id = id;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
    }
}
