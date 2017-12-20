import Snap from 'snapsvg-cjs';
import Feature from './feature';

export default class Bed extends Feature {
  constructor(canvas, origin, outline, id, style, label) {
    super(canvas);
    this.outline = Bed.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.label = label !== undefined ? label : false;
    this.beds = [];
  }

  static getPillPnts(xOffset, yOffset, lenght, height, origin) {
    const pill = [
      { x: (origin.x + xOffset), y: (origin.y + yOffset) },
      { x: (origin.x + xOffset + lenght), y: (origin.y + yOffset) },
      { x: (origin.x + xOffset + lenght), y: (origin.y + yOffset + height) },
      { x: (origin.x + xOffset), y: (origin.y + yOffset + height) },
    ];

    return pill;
  }

  drawBed(outline, style, id, label) {
    const bedObjs = [];
    const hasLabel = label !== undefined ? label : false;
    const topLPnt = outline[0];
    const topRightPnt = outline[1];

    const pillBuf = 2;
    const pillLen = (Bed.lineLen(topLPnt, topRightPnt) - (pillBuf * 3)) / 2;
    const pillHt = pillLen * 0.66;

    let pillOnePnts = [];
    pillOnePnts = Bed.getPillPnts(pillBuf, pillBuf, pillLen, pillHt, topLPnt);
    let pillTwoPnts = [];
    pillTwoPnts = Bed.getPillPnts(pillLen + (pillBuf * 2), pillBuf, pillLen, pillHt, topLPnt);

    const pillOne = this.drawPolygon(pillOnePnts, style);
    const pillTwo = this.drawPolygon(pillTwoPnts, style);
    const drawnBed = this.drawPolygon(outline, style);

    const pillAngle = Snap.angle(topRightPnt.x, topRightPnt.y, topLPnt.x, topLPnt.y);

    Bed.rotateObject(pillOne, pillAngle, topLPnt);
    Bed.rotateObject(pillTwo, pillAngle, topLPnt);

    bedObjs.push(drawnBed, pillOne, pillTwo);

    if (hasLabel) {
      const bottomRightPnt = outline[2];
      const centerPnt = Bed.lineMidPnt(topLPnt, bottomRightPnt);
      const newLabel = this.paper.text(centerPnt.x + (pillHt / 2), centerPnt.y, label);
      newLabel.attr({ textAnchor: 'middle', alignmentBaseline: 'middle', fontSize: 8 });
      bedObjs.push(newLabel);
    }

    bedObjs.id = id;
    this.beds.push(bedObjs);
  }

  draw() {
    this.features.push(this.beds.push(this.drawBed(this.outline, this.style, this.id, this.label)));
  }
}
