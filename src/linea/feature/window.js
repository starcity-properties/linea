import Feature from './feature';

export default class Window extends Feature {
  constructor(canvas, origin, outline, id, style) {
    super(canvas);
    this.outline = this.constructor.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.windows = [];
    this.style = style;
  }

  draw() {
    this.features.push(this.windows.push(this.drawLine(this.outline, this.style)));
  }
}
