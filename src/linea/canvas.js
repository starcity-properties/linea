import Snap from 'snapsvg-cjs';

export default class LineaCanvas {
  constructor(id, minX, minY, width, height) {
    this.paper = Snap(id);
    if (width < 0 || height < 0) { // eslint-disable-next-line
      console.warn('Error, negative values for width or height are invalid');
    } else if (width === 0 || height === 0) { // eslint-disable-next-line
      console.warn('Warning, a value of 0 for either width or height disables rendering of the element');
    }
    this.paper.attr({ viewBox: `${minX} ${minY} ${width} ${height}` });
    this.id = id;
    this.minX = minX;
    this.minY = minY;
    this.width = width;
    this.height = height;
  }
}
