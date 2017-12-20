import Snap from 'snapsvg-cjs';

export default class Drawing {
  constructor(canvas) {
    this.paper = canvas.paper;
    this.minX = canvas.minX;
    this.minY = canvas.minY;
    this.maxX = canvas.maxX;
    this.maxY = canvas.maxY;
    this.majorGrid = [];
    this.minorGrid = [];
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

  // **********************************************************************
  // Shift Origin
  // **********************************************************************
  // eslint-disable-line
  static addOrigin(outline, origin) {
    let newOutline = outline;
    if (origin.x || origin.y) {
      newOutline = outline.map((item) => {
        const newItem = item;
        newItem.x += origin.x;
        newItem.y += origin.y;
        return newItem;
      });
    }
    return newOutline;
  }

  // **********************************************************************
  // FUNCTIONS TO DRAW A ROOMS OUTLINE
  // **********************************************************************

  // Function to create the string to draw path
  static compilePath(points, closed) {
    const path = [];

    // Iterates through each point object to create path
    // M starts a path
    // A indicates an arc. Uses: xRadius, yRadius, rotation, arc-flag, sweep-flag, endX, endY.
    // L indicate a straight line to (x, y)
    // Z closes the shape of the path
    points.forEach((point, index) => {
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
    if (closed) {
      path.push('Z');
    }

    // make a string out of path
    return path.join(' ');
  }

  drawPathOutline(points, closed, outlineStyle) {
    const pathString = Drawing.compilePath(points, closed);
    const outline = this.paper.path(pathString);
    outline.attr(outlineStyle);

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

    outline.forEach((point) => {
      linePoints.push(Drawing.generatePointArray(point));
    });
    return linePoints;
  }

  drawLine(poinstObject, lineStyle) {
    const points = Drawing.generateLineArray(poinstObject);

    return this.paper.polyline(points).attr(lineStyle);
  }


  // **********************************************************************
  // Generic functions to draw a polygon
  // **********************************************************************

  drawPolygon(pointObject, style) {
    const points = Drawing.generateLineArray(pointObject);

    return this.paper.polygon(points).attr(style);
  }

  // **********************************************************************
  // Generic function to write labels
  // **********************************************************************

  writeLabel(text, origin, style) {
    const label = this.paper.text(origin.x, origin.y, text);
    label.attr(style);

    return label;
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
    return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(circleStyle);
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

  drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
    for (let i = xMin; i < yMax; i += 1) {
      const horizontalLines = {
        outline: [
          { x: xMin, y: i * unitLength },
          { x: xMax * unitLength, y: i * unitLength },
        ],
      };
      if (i % 5 === 0) {
        this.majorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.majorGridLine));
      } else {
        this.minorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.minorGridLine));
      }
    }
  }

  drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
    for (let j = xMin; j < xMax; j += 1) {
      const verticalLines = {
        outline: [
          { x: j * unitLength, y: yMin },
          { x: j * unitLength, y: yMax * unitLength },
        ],
      };
      if (j % 5 === 0) {
        this.majorGrid.push(this.drawLine(verticalLines.outline, gridStyle.majorGridLine));
      } else {
        this.minorGrid.push(this.drawLine(verticalLines.outline, gridStyle.minorGridLine));
      }
    }
  }

  drawGrid(unitLength, gridStyle) {
    const xMax = this.maxX / unitLength;
    const yMax = this.maxY / unitLength;
    const xMin = this.minX;
    const yMin = this.minY;

    this.drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
    this.drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
  }
}
