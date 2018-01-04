import Snap from 'snapsvg-cjs';
import defaultStyle from './style/styles';

export default class Drawing {
  constructor(canvas) {
    this.paper = canvas.paper;
    this.minX = canvas.minX;
    this.minY = canvas.minY;
    this.width = canvas.width;
    this.height = canvas.height;
    this.majorGrid = [];
    this.minorGrid = [];
    this.labels = [];
  }

  // **********************************************************************
  // EDIT DRAWINGS. WORK IN PROGRESS
  // **********************************************************************
  static update(feature, id, attrObject) {
    // TODO: updating outline or features. Events, moving furniture around, etc
    feature.forEach((item) => {
      if (item.id === id) {
        item.attr(attrObject);
      }
    });
  }

  static removeFeature() {
    // how to do?
  }

  static isNumber(obj) {
    return obj !== undefined && typeof obj === 'number' && !Number.isNaN(obj);
  }

  static isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  static checkOutline(outline) {
    if (outline !== undefined && Array.isArray(outline)) {
      const checkOutline = outline.filter((item) => {
        if (Drawing.isNumber(item.x) && Drawing.isNumber(item.y)) {
          return item;
        }
        // eslint-disable-next-line
        return console.warn(`checkOutline: Error, outline X and Y values must be numbers => 'X: ${item.x}' 'Y: ${item.y}'`) && null;
      });
      return checkOutline;
    }
    // eslint-disable-next-line
    return console.warn(`checkOutline: Error, invalid outline => '${outline}'`) && null;
  }

  // **********************************************************************
  // Shift Origin
  // **********************************************************************
  static addOrigin(outline, origin) {
    const testOutline = Drawing.checkOutline(outline);
    if (testOutline !== undefined || origin !== undefined) {
      const originX = Drawing.isNumber(origin.x) && origin.x;
      const originY = Drawing.isNumber(origin.y) && origin.y;
      let newOutline = testOutline;
      if (newOutline && (originX || originY)) {
        newOutline = newOutline.map((item) => {
          const newItem = item;
          newItem.x += originX;
          newItem.y += originY;
          return newItem;
        });
      }
      return newOutline;
    }
    // eslint-disable-next-line
    return console.warn('addOrigin: Error, invalid outline or origin') && testOutline;
  }

  // **********************************************************************
  // FUNCTIONS TO DRAW A ROOMS OUTLINE
  // **********************************************************************

  // Function to create the string to draw path
  static compilePath(points, closed) {
    const path = [];
    const newPoints = Drawing.checkOutline(points);
    const testClosed = Drawing.isBoolean(closed) && closed;

    // Iterates through each point object to create path
    // M starts a path
    // A indicates an arc. Uses: xRadius, yRadius, rotation, arc-flag, sweep-flag, endX, endY.
    // L indicate a straight line to (x, y)
    // Z closes the shape of the path
    newPoints.forEach((point, index) => {
      if (index === 0) {
        path.push('M', point.x, point.y);
      } else if (point.radius > 0 && point.curve === 'concave') {
        path.push('A', point.radius, point.radius, 0, 0, 1, point.x, point.y);
      } else if (point.radius > 0 && point.curve === 'convex') {
        path.push('A', point.radius, point.radius, 0, 0, 0, point.x, point.y);
      } else {
        path.push('L', point.x, point.y);
      }
    });
    if (testClosed) {
      path.push('Z');
    }

    // make a string out of path
    return path.join(' ');
  }

  drawPathOutline(points, closed, outlineStyle) {
    const pathString = Drawing.compilePath(points, closed);
    const outline = this.paper.path(pathString);
    const newStyle = outlineStyle !== undefined ? outlineStyle : defaultStyle.roomOutline.default;
    outline.attr(newStyle);

    return outline;
  }


  // **********************************************************************
  // Generic functions to draw a line
  // **********************************************************************

  static generatePointArray(point) {
    const pointArray = [];

    pointArray.push(point.x, point.y);
    return pointArray;
  }

  // takes outline object and created array of points to be fed into polyline draw
  static generateLineArray(outline) {
    const linePoints = [];
    const newOutline = Drawing.checkOutline(outline);

    newOutline.forEach((point) => {
      linePoints.push(Drawing.generatePointArray(point));
    });
    return linePoints;
  }

  drawLine(poinstObject, lineStyle) {
    const points = Drawing.generateLineArray(poinstObject);
    const newStyle = lineStyle !== undefined ? lineStyle : defaultStyle.interiorWallStyle.default;

    return this.paper.polyline(points).attr(newStyle);
  }


  // **********************************************************************
  // Generic functions to draw a polygon
  // **********************************************************************

  drawPolygon(pointObject, polyStyle) {
    const points = Drawing.generateLineArray(pointObject);
    const newStyle = polyStyle !== undefined ? polyStyle : defaultStyle.roomOutline.default;

    return this.paper.polygon(points).attr(newStyle);
  }

  // **********************************************************************
  // Generic function to write labels
  // **********************************************************************

  writeLabel(originX, originY, text, labelStyle) {
    const newOriginX = Drawing.isNumber(originX) && originX;
    const newOriginY = Drawing.isNumber(originY) && originY;
    if (newOriginX || newOriginY) {
      const label = this.paper.text(newOriginX, newOriginY, text);
      const newStyle = labelStyle !== undefined ? labelStyle : defaultStyle.labelStyle;
      label.attr(newStyle);
      this.labels.push(label);
    }
  }

  // **********************************************************************
  // Generic functions to transform an object
  // **********************************************************************

  static rotateObject(object, angle, origin) {
    object.transform(`r${angle}, ${origin.x}, ${origin.y}`);
  }

  // **********************************************************************
  // Generic function to draw a circle
  // **********************************************************************

  drawCircle(centerPoint, radius, circleStyle) {
    const newStyle = circleStyle !== undefined ? circleStyle : defaultStyle.circleStyle;
    return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(newStyle);
  }

  // **********************************************************************
  // LINE LENGTH
  // **********************************************************************
  // rewriting this to use snaps function
  static lineLen(pointA, pointB) {
    const len = Snap.len(pointA.x, pointA.y, pointB.x, pointB.y);

    return len;
  }

  static lineMidPnt(pointA, pointB) {
    const midPoint = {};
    midPoint.x = (pointA.x + pointB.x) / 2;
    midPoint.y = (pointA.y + pointB.y) / 2;
    return midPoint;
  }

  // **********************************************************************
  // DRAW GRID
  // **********************************************************************

  drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, majorGridStyle, minorGridStyle) {
    for (let i = yMin; i <= yMax; i += 1) {
      const horizontalLines = {
        outline: [
          { x: xMin * unitLength, y: i * unitLength },
          { x: xMax * unitLength, y: i * unitLength },
        ],
      };
      if (i % 5 === 0) {
        this.majorGrid.push(this.drawLine(horizontalLines.outline, majorGridStyle));
      } else {
        this.minorGrid.push(this.drawLine(horizontalLines.outline, minorGridStyle));
      }
    }
  }

  drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, majorGridStyle, minorGridStyle) {
    for (let j = xMin; j <= xMax; j += 1) {
      const verticalLines = {
        outline: [
          { x: j * unitLength, y: yMin * unitLength },
          { x: j * unitLength, y: yMax * unitLength },
        ],
      };
      if (j % 5 === 0) {
        this.majorGrid.push(this.drawLine(verticalLines.outline, majorGridStyle));
      } else {
        this.minorGrid.push(this.drawLine(verticalLines.outline, minorGridStyle));
      }
    }
  }

  drawGrid(unitLength, majGridStyle, minGridStyle) {
    if (unitLength > 0) {
      const xMax = this.width / unitLength;
      const yMax = this.height / unitLength;
      const xMin = Math.floor(this.minX / unitLength);
      const yMin = Math.floor(this.minY / unitLength);
      const newMajStyle = majGridStyle !== undefined ? majGridStyle : defaultStyle.gridStyle.major;
      const newMinStyle = minGridStyle !== undefined ? minGridStyle : defaultStyle.gridStyle.minor;

      this.drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, newMajStyle, newMinStyle);
      this.drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, newMajStyle, newMinStyle);
    } else {
      // eslint-disable-next-line
      console.warn('drawGrid: Error, unitLength is not a number greater than 0');
    }
  }
}
