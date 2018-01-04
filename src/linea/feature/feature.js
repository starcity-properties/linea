import Drawing from '../drawing';
import defaultStyle from '../style/styles';

export default class Feature extends Drawing {
  constructor(canvas) {
    super(canvas);
    this.features = [];
  }

  drawRectWithLabel(outline, style, label, labelStyle) {
    const rectObjs = [];
    const hasLabel = label !== undefined ? label : false;
    const newOutline = outline !== undefined && Feature.checkOutline(outline);
    if (newOutline.length < 4) {
      throw Error('Not enough valid points in Rect Outline');
    }
    const centerPoint = Feature.lineMidPnt(newOutline[0], newOutline[2]);
    rectObjs.push(this.paper.polygon(Feature.generateLineArray(newOutline)).attr(style));

    if (hasLabel) {
      const newLabelStyle = labelStyle !== undefined ? labelStyle : defaultStyle.labelStyle;
      rectObjs.push(this.paper.text(centerPoint.x, centerPoint.y, label).attr(newLabelStyle));
    }

    return rectObjs;
  }
}
