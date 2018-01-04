import Feature from './feature';
import defaultStyle from '../style/styles';

export default class Window extends Feature {
  constructor(canvas, origin, outline, id, windowStyle) {
    super(canvas);
    this.outline = outline !== undefined && Window.addOrigin(outline, origin);
    if (this.outline.length < 2) {
      throw Error('Not enough valid points in Window Outline');
    }
    this.origin = origin !== undefined && origin;
    this.id = id !== undefined && id;
    this.style = windowStyle !== undefined ? windowStyle : defaultStyle.windowStyle.default;
    this.windows = [];
    this.features.push(this.windows);
  }

  draw() {
    this.windows.push(this.drawLine(this.outline, this.style));
  }
}
