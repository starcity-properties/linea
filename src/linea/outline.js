import Drawing from './drawing';
import defaultStyle from './style/styles';

export default class Outline extends Drawing {
  constructor(canvas) {
    super(canvas);
    this.walls = [];
    this.features = [];
  }

  addFeature(origin, ...features) {
    features.forEach((array) => {
      array.forEach((item) => {
        const newItem = item.outline !== undefined && item;
        if (newItem) {
          newItem.outline = origin !== undefined &&
            Outline.addOrigin(newItem.outline, origin);
          newItem.outline = this.origin !== undefined &&
            Outline.addOrigin(newItem.outline, this.origin);
          this.features.push(newItem);
        } else {
          // eslint-disable-next-line
          console.warn(`addFeature: Error, feature or feature outline is undefined ${item}`);
        }
      });
    });
  }

  drawOutline(points, id, outlineStyle) {
    const newStyle = outlineStyle !== undefined ? outlineStyle : defaultStyle.roomOutline.default;
    const path = points && this.drawPathOutline(points, true, newStyle);
    const lastItem = path && this.walls.push(path) - 1;

    // Assign id to object
    if (path && id) {
      this.walls[lastItem].id = id;
    } else {
      // eslint-disable-next-line
      console.warn("drawOutline: Warning, Floor/Room does not have an id");
    }
  }
}
