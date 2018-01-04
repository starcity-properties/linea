import Outline from './outline';
import defaultStyle from './style/styles';

export default class Floorplan extends Outline {
  constructor(canvas, origin, outline, id, outlineStyle) {
    super(canvas);
    this.outline = outline !== undefined && Floorplan.addOrigin(outline, origin);
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = outlineStyle !== undefined ? outlineStyle : defaultStyle.roomOutline.default;
    this.rooms = [];
    this.features = [];
  }

  addRoom(origin, ...rooms) {
    rooms.forEach((item) => {
      const newItem = item.outline !== undefined && item;
      if (newItem) {
        newItem.outline = origin !== undefined &&
          Floorplan.addOrigin(item.outline, origin);
        newItem.outline = this.origin !== undefined &&
          Floorplan.addOrigin(item.outline, this.origin);
        newItem.features.forEach((feature) => {
          const newFeature = feature;
          newFeature.outline = origin !== undefined &&
            Floorplan.addOrigin(newFeature.outline, origin);
          return newFeature;
        });
        this.rooms.push(newItem);
      } else {
        // eslint-disable-next-line
        console.warn(`Room or room outline is udefined ${item}`);
      }
    });
  }

  draw() {
    this.drawOutline(this.outline, this.id, this.style);
    this.rooms.forEach((item) => {
      item.draw();
    });
    this.features.forEach((item) => {
      item.draw();
    });
  }
}
