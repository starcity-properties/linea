import Outline from './outline';

export default class Room extends Outline {
  constructor(canvas, origin, outline, id, style) {
    super(canvas);
    this.outline = Room.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.features = [];
  }

  // need to add origin modifier to this
  addFeatures(origin, ...moreFeatures) {
    moreFeatures.forEach((array) => {
      array.forEach((item) => {
        const newItem = item;
        newItem.outline = Room.addOrigin(newItem.outline, origin);
        newItem.outline = Room.addOrigin(newItem.outline, this.origin);
        this.features.push(item);
      });
    });
  }

  draw() {
    this.drawOutline(this.outline, this.id, this.style);
    this.features.forEach((item) => {
      item.draw();
    });
  }
}
