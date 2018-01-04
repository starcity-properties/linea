import Feature from './feature';
import defaultStyle from '../style/styles';

export default class Stairs extends Feature {
  constructor(canvas, origin, outline, span, vertical, stairsStyle) {
    super(canvas);
    this.outline = Stairs.checkOutline(outline) && outline;
    this.origin = origin !== undefined && origin;
    this.span = span !== undefined && span;
    // this.vertical = Stairs.isBoolean(vertical) && vertical;
    this.vertical = vertical;
    this.style = stairsStyle !== undefined ? stairsStyle : defaultStyle.stairStyle.default;
    this.stairs = [];
    this.features.push(this.stairs);
  }

  draw() {
    const xMin = this.outline.reduce((prev, curr) => (prev.x < curr.x ? prev : curr)).x / this.span;
    const yMin = this.outline.reduce((prev, curr) => (prev.y < curr.y ? prev : curr)).y / this.span;
    const xMax = this.outline.reduce((prev, curr) => (prev.x > curr.x ? prev : curr)).x / this.span;
    const yMax = this.outline.reduce((prev, curr) => (prev.y > curr.y ? prev : curr)).y / this.span;
    if (this.vertical !== undefined && this.vertical) {
      this.drawVerticalGrid(xMin, yMin, xMax, yMax, this.span, this.style, this.style);
    } else if (this.vertical !== undefined) {
      this.drawHorizontalGrid(xMin, yMin, xMax, yMax, this.span, this.style, this.style);
    }
    // eslint-disable-next-line
    console.log("xMin: " + xMin * this.span + " yMin: " + yMin * this.span + " xMax: " + xMax * this.span + " yMax: " + yMax * this.span);
  }
}
