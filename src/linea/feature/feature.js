import  Drawing  from '../drawing.js';

export default class Feature extends Drawing {
    constructor(canvas) {
        super(canvas);
        this.features = [];
    }

    drawRectWithLabel(outline, style, label) {
        var rectObjs = [];
        var centerPoint = this.lineMidPoint(outline[0], outline[2]);
        rectObjs.push(
            this.paper.polygon(this.generateLineArray(outline)).attr(style),
        );

        if (label) {
            rectObjs.push(
                this.paper.text(centerPoint.x, centerPoint.y, label).attr({textAnchor: "middle", alignmentBaseline: "middle", fontSize: 8})
            );
        }

        return rectObjs;
    }
};
