import Outline from './outline';
import defaultStyle from './style/styles';

export default class Room extends Outline {
  constructor(canvas, origin, outline, id, roomStyle) {
    super(canvas);
    this.outline = outline !== undefined && Room.addOrigin(outline, origin);
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = roomStyle !== undefined ? roomStyle : defaultStyle.roomOutline.default;
    this.features = [];
  }


  draw() {
    this.drawOutline(this.outline, this.id, this.style);
    this.features.forEach((item) => {
      item.draw();
    });
  }
}
