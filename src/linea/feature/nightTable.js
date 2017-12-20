import Feature from './feature';

export default class NightTable extends Feature {
  constructor(canvas, origin, outline, id, style, label) {
    super(canvas);
    this.outline = NightTable.addOrigin(outline, origin);
    this.origin = origin;
    this.id = id;
    this.style = style;
    this.label = label !== undefined ? label : false;
    this.nightTables = [];
  }

  draw() {
    this.nightTables.push(this.drawRectWithLabel(this.outline, this.style, this.label));
    this.features.push(this.nightTables);
  }
}
