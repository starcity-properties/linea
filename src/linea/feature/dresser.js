import Feature from './feature';
import defaultStyle from '../style/styles';

export default class Dresser extends Feature {
  constructor(canvas, origin, outline, id, dresserStyle, label, labelStyle) {
    super(canvas);
    this.outline = outline !== undefined && Dresser.addOrigin(outline, origin);
    if (this.outline.length < 4) {
      throw Error('Not enough valid points in Dresser Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = dresserStyle !== undefined ? dresserStyle : defaultStyle.dresserStyle.default;
    this.label = label !== undefined ? label : false;
    this.labelStyle = labelStyle !== undefined ? labelStyle : defaultStyle.labelStyle;
    this.dressers = [];
    this.features.push(this.dressers);
  }

  draw() {
    const dresser = this.drawRectWithLabel(this.outline, this.style, this.label, this.labelStyle);
    this.dressers.push(dresser);
  }
}
