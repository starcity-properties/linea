import Feature from './feature';
import defaultStyle from '../style/styles';

export default class InteriorWall extends Feature {
  constructor(canvas, origin, outline, id, interiorWallStyle) {
    super(canvas);
    this.outline = outline !== undefined && InteriorWall.addOrigin(outline, origin);
    if (this.outline.length < 2) {
      throw Error('Not enough valid points in InteriorWall Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = interiorWallStyle !== undefined
      ? interiorWallStyle : defaultStyle.interiorWallStyle.default;
    this.interiorWalls = [];
    this.features.push(this.interiorWalls);
  }

  draw() {
    this.interiorWalls.push(this.drawLine(this.outline, this.style));
  }
}
