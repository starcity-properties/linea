import Feature from './feature';

export default class Dresser extends Feature {
  constructor(canvas, origin, outline, id, style, label) {
    super(canvas);
    this.outline = Dresser.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.label = label !== undefined ? label : false;
    this.dressers = [];
  }

  draw() {
    this.dressers.push(this.drawRectWithLabel(this.outline, this.style, this.label));
    this.features.push(this.dressers);
  }
}
