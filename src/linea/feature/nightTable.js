import Feature from './feature';
import defaultStyle from '../style/styles';

export default class NightTable extends Feature {
  constructor(canvas, origin, outline, id, tableStyle, label) {
    super(canvas);
    this.outline = outline !== undefined && NightTable.addOrigin(outline, origin);
    if (this.outline.length < 4) {
      throw Error('Not enough valid points in NightTable Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = tableStyle !== undefined ? tableStyle : defaultStyle.nightTableStyle.default;
    this.label = label !== undefined ? label : false;
    this.nightTables = [];
    this.features.push(this.nightTables);
  }

  draw() {
    this.nightTables.push(this.drawRectWithLabel(this.outline, this.style, this.label));
  }
}
