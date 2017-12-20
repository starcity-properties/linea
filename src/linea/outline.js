import Drawing from './drawing';

export default class Outline extends Drawing {
  constructor(canvas) {
    super(canvas);
    this.walls = [];
    this.features = [];
  }

  addFeature(origin, ...features) {
    features.forEach((item) => {
      const newItem = item;
      newItem.outline = this.addOrigin(newItem.outline, origin);
      newItem.outline = this.addOrigin(newItem.outline, this.origin);
      this.features.push(newItem);
    });
  }

  drawOutline(points, id, outlineStyle) {
    // compilePath() takes points and makes the string to pass into path?
    const path = this.drawPathOutline(points, true, outlineStyle);
    const lastItem = this.walls.push(path) - 1;

    // assign id to object
    this.walls[lastItem].id = id;
  }
}
