import Snap from 'snapsvg-cjs';
import Feature from './feature';
import defaultStyle from '../style/styles';

export default class Bed extends Feature {
  constructor(canvas, origin, outline, id, bedStyle, label, labelStyle) {
    super(canvas);
    this.outline = outline !== undefined && Bed.addOrigin(outline, origin);
    if (this.outline.length < 4) {
      throw Error('Not enough valid points in Bed Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = bedStyle !== undefined ? bedStyle : defaultStyle.bedStyle.default;
    this.label = label !== undefined ? label : false;
    this.labelStyle = labelStyle !== undefined ? labelStyle : defaultStyle.labelStyle;
    this.beds = [];
    this.features.push(this.beds);
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

  draw() {
    const bedObjs = [];
    const hasLabel = this.label;
    const topLPnt = this.outline[0];
    const topRightPnt = this.outline[1];

    const pillBuf = 2;
    const pillLen = (Bed.lineLen(topLPnt, topRightPnt) - (pillBuf * 3)) / 2;
    const pillHt = pillLen * 0.66;

    let pillOnePnts = [];
    pillOnePnts = Bed.getPillPnts(pillBuf, pillBuf, pillLen, pillHt, topLPnt);
    let pillTwoPnts = [];
    pillTwoPnts = Bed.getPillPnts(pillLen + (pillBuf * 2), pillBuf, pillLen, pillHt, topLPnt);

    const pillOne = this.drawPolygon(pillOnePnts, this.style);
    const pillTwo = this.drawPolygon(pillTwoPnts, this.style);
    const drawnBed = this.drawPolygon(this.outline, this.style);

    const pillAngle = Snap.angle(topRightPnt.x, topRightPnt.y, topLPnt.x, topLPnt.y);
    Bed.rotateObject(pillOne, pillAngle, topLPnt);
    Bed.rotateObject(pillTwo, pillAngle, topLPnt);

    bedObjs.push(drawnBed, pillOne, pillTwo);

    if (hasLabel) {
      const bottomRightPnt = this.outline[2];
      const centerPnt = Bed.lineMidPnt(topLPnt, bottomRightPnt);
      this.writeLabel(centerPnt.x + (pillHt / 2), centerPnt.y, this.label, this.labelStyle);
    }

    bedObjs.id = this.id;
    this.beds.push(bedObjs);
  }
}
