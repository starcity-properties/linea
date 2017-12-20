import Outline from './outline';

export default class Floorplan extends Outline {
  constructor(canvas, origin, outline, id, style) {
    super(canvas);
    this.outline = Floorplan.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.rooms = [];
    this.features = [];
  }

  addRoom(origin, ...rooms) {
    rooms.forEach((item) => {
      const newItem = item;
      newItem.outline = Floorplan.addOrigin(item.outline, origin);
      newItem.outline = Floorplan.addOrigin(item.outline, this.origin);
      newItem.features.forEach((feature) => {
        const newFeature = feature;
        newFeature.outline = Floorplan.addOrigin(newFeature.outline, origin);
        return newFeature;
      });
      this.rooms.push(newItem);
    });
  }

  // need to add origin modifier to this
  addFeatures(origin, ...Features) {
    Features.forEach((array) => {
      array.forEach((feature) => {
        const newFeature = feature;
        newFeature.outline = Floorplan.addOrigin(newFeature.outline, origin);
        newFeature.outline = Floorplan.addOrigin(newFeature.outline, this.origin);
        this.features.push(newFeature);
      });
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
