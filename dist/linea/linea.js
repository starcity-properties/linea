(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("snapsvg-cjs"));
	else if(typeof define === 'function' && define.amd)
		define("linea", ["snapsvg-cjs"], factory);
	else if(typeof exports === 'object')
		exports["linea"] = factory(require("snapsvg-cjs"));
	else
		root["linea"] = factory(root["Snap"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Styles to be used in rendering our floorplans
var defaultStyle = {
  labelStyle: {
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize: 8
  },
  circleStyle: {
    stroke: 'black'
  },
  gridStyle: {
    major: {
      stroke: '#cccccc',
      strokeWidth: 1
    },
    minor: {
      stroke: '#eaeaea',
      strokeWidth: 1
    }
  },
  roomOutline: {
    default: {
      stroke: '#000000',
      strokeWidth: 8,
      fill: '#f4e4d7',
      fillOpacity: 0.5
    }
  },
  interiorWallStyle: {
    default: {
      stroke: '#000000',
      strokeWidth: 1,
      fill: '#f4e4d7',
      fillOpacity: 1
    }
  },
  windowStyle: {
    default: {
      stroke: '#f9f9f9',
      strokeWidth: 6,
      fill: 'none',
      fillOpacity: 1,
      strokeLinecap: 'round'
    },
    open: {
      stroke: 'yellow',
      strokeWidth: 6,
      fill: 'none',
      fillOpacity: 1
    }
  },
  doorStyle: {
    door: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 6,
        fill: 'none',
        fillOpacity: 1
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 6,
        fill: 'none',
        fillOpacity: 1
      }
    },
    projection: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 3,
        fill: 'none',
        fillOpacity: 1,
        strokeDasharray: '4 8',
        strokeLinecap: 'round'
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 3,
        fill: 'none',
        fillOpacity: 1,
        strokeDasharray: '0',
        strokeLinecap: 'round'
      }
    },
    doorStop: {
      default: {
        stroke: '#c1272d',
        strokeWidth: 1,
        fill: 'none',
        fillOpacity: 1
      },
      open: {
        stroke: '#ff00ff',
        strokeWidth: 1,
        fill: 'none',
        fillOpacity: 1
      }
    }
  },
  bedStyle: {
    default: {
      stroke: 'black',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1
    }
  },
  dresserStyle: {
    default: {
      stroke: 'grey',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1
    }
  },
  nightTableStyle: {
    default: {
      stroke: 'grey',
      strokeWidth: 1,
      fill: 'none',
      fillOpacity: 1
    }
  }
};

exports.default = defaultStyle;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = __webpack_require__(3);

var _drawing2 = _interopRequireDefault(_drawing);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feature = function (_Drawing) {
  _inherits(Feature, _Drawing);

  function Feature(canvas) {
    _classCallCheck(this, Feature);

    var _this = _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this, canvas));

    _this.features = [];
    return _this;
  }

  _createClass(Feature, [{
    key: 'drawRectWithLabel',
    value: function drawRectWithLabel(outline, style, label, labelStyle) {
      var rectObjs = [];
      var hasLabel = label !== undefined ? label : false;
      var newOutline = outline !== undefined && Feature.checkOutline(outline);
      if (newOutline.length < 4) {
        throw Error('Not enough valid points in Rect Outline');
      }
      var centerPoint = Feature.lineMidPnt(newOutline[0], newOutline[2]);
      rectObjs.push(this.paper.polygon(Feature.generateLineArray(newOutline)).attr(style));

      if (hasLabel) {
        var newLabelStyle = labelStyle !== undefined ? labelStyle : _styles2.default.labelStyle;
        rectObjs.push(this.paper.text(centerPoint.x, centerPoint.y, label).attr(newLabelStyle));
      }

      return rectObjs;
    }
  }]);

  return Feature;
}(_drawing2.default);

exports.default = Feature;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(2);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawing = function () {
  function Drawing(canvas) {
    _classCallCheck(this, Drawing);

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


  _createClass(Drawing, [{
    key: 'drawPathOutline',
    value: function drawPathOutline(points, closed, outlineStyle) {
      var pathString = Drawing.compilePath(points, closed);
      var outline = this.paper.path(pathString);
      var newStyle = outlineStyle !== undefined ? outlineStyle : _styles2.default.roomOutline.default;
      outline.attr(newStyle);

      return outline;
    }

    // **********************************************************************
    // Generic functions to draw a line
    // **********************************************************************

  }, {
    key: 'drawLine',
    value: function drawLine(poinstObject, lineStyle) {
      var points = Drawing.generateLineArray(poinstObject);
      var newStyle = lineStyle !== undefined ? lineStyle : _styles2.default.interiorWallStyle.default;

      return this.paper.polyline(points).attr(newStyle);
    }

    // **********************************************************************
    // Generic functions to draw a polygon
    // **********************************************************************

  }, {
    key: 'drawPolygon',
    value: function drawPolygon(pointObject, polyStyle) {
      var points = Drawing.generateLineArray(pointObject);
      var newStyle = polyStyle !== undefined ? polyStyle : _styles2.default.roomOutline.default;

      return this.paper.polygon(points).attr(newStyle);
    }

    // **********************************************************************
    // Generic function to write labels
    // **********************************************************************

  }, {
    key: 'writeLabel',
    value: function writeLabel(originX, originY, text, labelStyle) {
      var newOriginX = Drawing.isNumber(originX) && originX;
      var newOriginY = Drawing.isNumber(originY) && originY;
      if (newOriginX || newOriginY) {
        var label = this.paper.text(newOriginX, newOriginY, text);
        var newStyle = labelStyle !== undefined ? labelStyle : _styles2.default.labelStyle;
        label.attr(newStyle);
        this.labels.push(label);
      }
    }

    // **********************************************************************
    // Generic functions to transform an object
    // **********************************************************************

  }, {
    key: 'drawCircle',


    // **********************************************************************
    // Generic function to draw a circle
    // **********************************************************************

    value: function drawCircle(centerPoint, radius, circleStyle) {
      var newStyle = circleStyle !== undefined ? circleStyle : _styles2.default.circleStyle;
      return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(newStyle);
    }

    // **********************************************************************
    // LINE LENGTH
    // **********************************************************************
    // rewriting this to use snaps function

  }, {
    key: 'drawHorizontalGrid',


    // **********************************************************************
    // DRAW GRID
    // **********************************************************************

    value: function drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, majorGridStyle, minorGridStyle) {
      for (var i = yMin; i <= yMax; i += 1) {
        var horizontalLines = {
          outline: [{ x: xMin * unitLength, y: i * unitLength }, { x: xMax * unitLength, y: i * unitLength }]
        };
        if (i % 5 === 0) {
          this.majorGrid.push(this.drawLine(horizontalLines.outline, majorGridStyle));
        } else {
          this.minorGrid.push(this.drawLine(horizontalLines.outline, minorGridStyle));
        }
      }
    }
  }, {
    key: 'drawVerticalGrid',
    value: function drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, majorGridStyle, minorGridStyle) {
      for (var j = xMin; j <= xMax; j += 1) {
        var verticalLines = {
          outline: [{ x: j * unitLength, y: yMin * unitLength }, { x: j * unitLength, y: yMax * unitLength }]
        };
        if (j % 5 === 0) {
          this.majorGrid.push(this.drawLine(verticalLines.outline, majorGridStyle));
        } else {
          this.minorGrid.push(this.drawLine(verticalLines.outline, minorGridStyle));
        }
      }
    }
  }, {
    key: 'drawGrid',
    value: function drawGrid(unitLength, majGridStyle, minGridStyle) {
      if (unitLength > 0) {
        var xMax = this.width / unitLength;
        var yMax = this.height / unitLength;
        var xMin = Math.floor(this.minX / unitLength);
        var yMin = Math.floor(this.minY / unitLength);
        var newMajStyle = majGridStyle !== undefined ? majGridStyle : _styles2.default.gridStyle.major;
        var newMinStyle = minGridStyle !== undefined ? minGridStyle : _styles2.default.gridStyle.minor;

        this.drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, newMajStyle, newMinStyle);
        this.drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, newMajStyle, newMinStyle);
      } else {
        // eslint-disable-next-line
        console.warn('drawGrid: Error, unitLength is not a number greater than 0');
      }
    }
  }], [{
    key: 'update',
    value: function update(feature, id, attrObject) {
      // TODO: updating outline or features. Events, moving furniture around, etc
      feature.forEach(function (item) {
        if (item.id === id) {
          item.attr(attrObject);
        }
      });
    }
  }, {
    key: 'removeFeature',
    value: function removeFeature() {
      // how to do?
    }
  }, {
    key: 'isNumber',
    value: function isNumber(obj) {
      return obj !== undefined && typeof obj === 'number' && !Number.isNaN(obj);
    }
  }, {
    key: 'isBoolean',
    value: function isBoolean(obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    }
  }, {
    key: 'checkOutline',
    value: function checkOutline(outline) {
      if (outline !== undefined && Array.isArray(outline)) {
        var checkOutline = outline.filter(function (item) {
          if (Drawing.isNumber(item.x) && Drawing.isNumber(item.y)) {
            return item;
          }
          // eslint-disable-next-line
          return console.warn('checkOutline: Error, outline X and Y values must be numbers => \'X: ' + item.x + '\' \'Y: ' + item.y + '\'') && null;
        });
        return checkOutline;
      }
      // eslint-disable-next-line
      return console.warn('checkOutline: Error, invalid outline => \'' + outline + '\'') && null;
    }

    // **********************************************************************
    // Shift Origin
    // **********************************************************************

  }, {
    key: 'addOrigin',
    value: function addOrigin(outline, origin) {
      var testOutline = Drawing.checkOutline(outline);
      if (testOutline !== undefined || origin !== undefined) {
        var originX = Drawing.isNumber(origin.x) && origin.x;
        var originY = Drawing.isNumber(origin.y) && origin.y;
        var newOutline = testOutline;
        if (newOutline && (originX || originY)) {
          newOutline = newOutline.map(function (item) {
            var newItem = item;
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

  }, {
    key: 'compilePath',
    value: function compilePath(points, closed) {
      var path = [];
      var newPoints = Drawing.checkOutline(points);
      var testClosed = Drawing.isBoolean(closed) && closed;

      // Iterates through each point object to create path
      // M starts a path
      // A indicates an arc. Uses: xRadius, yRadius, rotation, arc-flag, sweep-flag, endX, endY.
      // L indicate a straight line to (x, y)
      // Z closes the shape of the path
      newPoints.forEach(function (point, index) {
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
  }, {
    key: 'generatePointArray',
    value: function generatePointArray(point) {
      var pointArray = [];

      pointArray.push(point.x, point.y);
      return pointArray;
    }

    // takes outline object and created array of points to be fed into polyline draw

  }, {
    key: 'generateLineArray',
    value: function generateLineArray(outline) {
      var linePoints = [];
      var newOutline = Drawing.checkOutline(outline);

      newOutline.forEach(function (point) {
        linePoints.push(Drawing.generatePointArray(point));
      });
      return linePoints;
    }
  }, {
    key: 'rotateObject',
    value: function rotateObject(object, angle, origin) {
      object.transform('r' + angle + ', ' + origin.x + ', ' + origin.y);
    }
  }, {
    key: 'lineLen',
    value: function lineLen(pointA, pointB) {
      var len = _snapsvgCjs2.default.len(pointA.x, pointA.y, pointB.x, pointB.y);

      return len;
    }
  }, {
    key: 'lineMidPnt',
    value: function lineMidPnt(pointA, pointB) {
      var midPoint = {};
      midPoint.x = (pointA.x + pointB.x) / 2;
      midPoint.y = (pointA.y + pointB.y) / 2;
      return midPoint;
    }
  }]);

  return Drawing;
}();

exports.default = Drawing;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = __webpack_require__(3);

var _drawing2 = _interopRequireDefault(_drawing);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Outline = function (_Drawing) {
  _inherits(Outline, _Drawing);

  function Outline(canvas) {
    _classCallCheck(this, Outline);

    var _this = _possibleConstructorReturn(this, (Outline.__proto__ || Object.getPrototypeOf(Outline)).call(this, canvas));

    _this.walls = [];
    _this.features = [];
    return _this;
  }

  _createClass(Outline, [{
    key: 'addFeature',
    value: function addFeature(origin) {
      var _this2 = this;

      for (var _len = arguments.length, features = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        features[_key - 1] = arguments[_key];
      }

      features.forEach(function (array) {
        array.forEach(function (item) {
          var newItem = item.outline !== undefined && item;
          if (newItem) {
            newItem.outline = origin !== undefined && Outline.addOrigin(newItem.outline, origin);
            newItem.outline = _this2.origin !== undefined && Outline.addOrigin(newItem.outline, _this2.origin);
            _this2.features.push(newItem);
          } else {
            // eslint-disable-next-line
            console.warn('addFeature: Error, feature or feature outline is undefined ' + item);
          }
        });
      });
    }
  }, {
    key: 'drawOutline',
    value: function drawOutline(points, id, outlineStyle) {
      var newStyle = outlineStyle !== undefined ? outlineStyle : _styles2.default.roomOutline.default;
      var path = points && this.drawPathOutline(points, true, newStyle);
      var lastItem = path && this.walls.push(path) - 1;

      // Assign id to object
      if (path && id) {
        this.walls[lastItem].id = id;
      } else {
        // eslint-disable-next-line
        console.warn("drawOutline: Warning, Floor/Room does not have an id");
      }
    }
  }]);

  return Outline;
}(_drawing2.default);

exports.default = Outline;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styles = __webpack_require__(0);

Object.defineProperty(exports, 'defaultStyle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_styles).default;
  }
});

var _canvas = __webpack_require__(7);

Object.defineProperty(exports, 'LineaCanvas', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_canvas).default;
  }
});

var _drawing = __webpack_require__(3);

Object.defineProperty(exports, 'Drawing', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawing).default;
  }
});

var _outline = __webpack_require__(4);

Object.defineProperty(exports, 'Outline', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outline).default;
  }
});

var _floorplan = __webpack_require__(8);

Object.defineProperty(exports, 'Floorplan', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_floorplan).default;
  }
});

var _room = __webpack_require__(9);

Object.defineProperty(exports, 'Room', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_room).default;
  }
});

var _feature = __webpack_require__(1);

Object.defineProperty(exports, 'Feature', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_feature).default;
  }
});

var _window = __webpack_require__(10);

Object.defineProperty(exports, 'Window', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_window).default;
  }
});

var _door = __webpack_require__(11);

Object.defineProperty(exports, 'Door', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_door).default;
  }
});

var _slidingDoor = __webpack_require__(12);

Object.defineProperty(exports, 'SlidingDoor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slidingDoor).default;
  }
});

var _bed = __webpack_require__(13);

Object.defineProperty(exports, 'Bed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bed).default;
  }
});

var _dresser = __webpack_require__(14);

Object.defineProperty(exports, 'Dresser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dresser).default;
  }
});

var _interiorWall = __webpack_require__(15);

Object.defineProperty(exports, 'InteriorWall', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_interiorWall).default;
  }
});

var _nightTable = __webpack_require__(16);

Object.defineProperty(exports, 'NightTable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nightTable).default;
  }
});

var _stairs = __webpack_require__(17);

Object.defineProperty(exports, 'Stairs', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_stairs).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snapsvgCjs = __webpack_require__(2);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineaCanvas = function LineaCanvas(id, minX, minY, width, height) {
  _classCallCheck(this, LineaCanvas);

  this.paper = (0, _snapsvgCjs2.default)(id);
  if (width < 0 || height < 0) {
    // eslint-disable-next-line
    console.warn('Error, negative values for width or height are invalid');
  } else if (width === 0 || height === 0) {
    // eslint-disable-next-line
    console.warn('Warning, a value of 0 for either width or height disables rendering of the element');
  }
  this.paper.attr({ viewBox: minX + ' ' + minY + ' ' + width + ' ' + height });
  this.id = id;
  this.minX = minX;
  this.minY = minY;
  this.width = width;
  this.height = height;
};

exports.default = LineaCanvas;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outline = __webpack_require__(4);

var _outline2 = _interopRequireDefault(_outline);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Floorplan = function (_Outline) {
  _inherits(Floorplan, _Outline);

  function Floorplan(canvas, origin, outline, id, outlineStyle) {
    _classCallCheck(this, Floorplan);

    var _this = _possibleConstructorReturn(this, (Floorplan.__proto__ || Object.getPrototypeOf(Floorplan)).call(this, canvas));

    _this.outline = outline !== undefined && Floorplan.addOrigin(outline, origin);
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = outlineStyle !== undefined ? outlineStyle : _styles2.default.roomOutline.default;
    _this.rooms = [];
    _this.features = [];
    return _this;
  }

  _createClass(Floorplan, [{
    key: 'addRoom',
    value: function addRoom(origin) {
      var _this2 = this;

      for (var _len = arguments.length, rooms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rooms[_key - 1] = arguments[_key];
      }

      rooms.forEach(function (item) {
        var newItem = item.outline !== undefined && item;
        if (newItem) {
          newItem.outline = origin !== undefined && Floorplan.addOrigin(item.outline, origin);
          newItem.outline = _this2.origin !== undefined && Floorplan.addOrigin(item.outline, _this2.origin);
          newItem.features.forEach(function (feature) {
            var newFeature = feature;
            newFeature.outline = origin !== undefined && Floorplan.addOrigin(newFeature.outline, origin);
            return newFeature;
          });
          _this2.rooms.push(newItem);
        } else {
          // eslint-disable-next-line
          console.warn('Room or room outline is udefined ' + item);
        }
      });
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.drawOutline(this.outline, this.id, this.style);
      this.rooms.forEach(function (item) {
        item.draw();
      });
      this.features.forEach(function (item) {
        item.draw();
      });
    }
  }]);

  return Floorplan;
}(_outline2.default);

exports.default = Floorplan;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outline = __webpack_require__(4);

var _outline2 = _interopRequireDefault(_outline);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_Outline) {
  _inherits(Room, _Outline);

  function Room(canvas, origin, outline, id, roomStyle) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, canvas));

    _this.outline = outline !== undefined && Room.addOrigin(outline, origin);
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = roomStyle !== undefined ? roomStyle : _styles2.default.roomOutline.default;
    _this.features = [];
    return _this;
  }

  _createClass(Room, [{
    key: 'draw',
    value: function draw() {
      this.drawOutline(this.outline, this.id, this.style);
      this.features.forEach(function (item) {
        item.draw();
      });
    }
  }]);

  return Room;
}(_outline2.default);

exports.default = Room;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_Feature) {
  _inherits(Window, _Feature);

  function Window(canvas, origin, outline, id, windowStyle) {
    _classCallCheck(this, Window);

    var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, canvas));

    _this.outline = outline !== undefined && Window.addOrigin(outline, origin);
    if (_this.outline.length < 2) {
      throw Error('Not enough valid points in Window Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = windowStyle !== undefined ? windowStyle : _styles2.default.windowStyle.default;
    _this.windows = [];
    _this.features.push(_this.windows);
    return _this;
  }

  _createClass(Window, [{
    key: 'draw',
    value: function draw() {
      this.windows.push(this.drawLine(this.outline, this.style));
    }
  }]);

  return Window;
}(_feature2.default);

exports.default = Window;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(2);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Door = function (_Feature) {
  _inherits(Door, _Feature);

  function Door(canvas, origin, outline, angle, clockwise, id, dStyle, dStopStyle, dProjectionStyle) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this, canvas));

    _this.outline = outline !== undefined && Door.addOrigin(outline, origin);
    if (_this.outline.length < 2) {
      throw Error('Not enough valid points in Door Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.angle = angle !== undefined && angle;
    _this.radius = Door.lineLen(_this.outline[0], _this.outline[1]);
    _this.curve = clockwise ? 'concave' : 'convex';
    _this.doors = [];
    _this.doorStyle = dStyle !== undefined ? dStyle : _styles2.default.doorStyle.door.default;
    _this.doorStopStyle = dStopStyle !== undefined ? dStopStyle : _styles2.default.doorStyle.doorStop.default;
    _this.projectionStyle = dProjectionStyle !== undefined ? dProjectionStyle : _styles2.default.doorStyle.projection.default;
    _this.features.push(_this.doors);
    return _this;
  }

  _createClass(Door, [{
    key: 'draw',
    value: function draw() {
      var lines = [];
      var hinge = this.outline[0];
      var end = this.outline[1];
      var openPoint = {
        x: 0, y: 0, radius: this.radius, curve: this.curve
      };

      var baseAngle = _snapsvgCjs2.default.rad(_snapsvgCjs2.default.angle(hinge.x, hinge.y, end.x, end.y)) - Math.PI;
      var doorAngle = Door.getDoorAngle(this.curve, baseAngle, this.angle);

      openPoint.x = this.radius * Math.cos(doorAngle) + hinge.x;
      openPoint.y = this.radius * Math.sin(doorAngle) + hinge.y;

      var door = [hinge, end];
      var curve = [end, openPoint];
      var stop = [hinge, openPoint];
      lines.push(this.drawLine(door, this.doorStyle), this.drawLine(stop, this.doorStopStyle), this.drawPathOutline(curve, false, this.projectionStyle));

      this.doors.push(lines);
    }
  }], [{
    key: 'getDoorAngle',
    value: function getDoorAngle(curve, baseAngle, angle) {
      var doorAngle = 0;

      if (curve === 'concave') {
        doorAngle = baseAngle + _snapsvgCjs2.default.rad(angle);
      } else {
        doorAngle = baseAngle - _snapsvgCjs2.default.rad(angle);
      }

      if (doorAngle > 2 * Math.PI) {
        doorAngle %= 2 * Math.PI;
      } else if (doorAngle < 0) {
        doorAngle = 2 * Math.PI - Math.abs(doorAngle) % (2 * Math.PI);
      }

      return doorAngle;
    }
  }]);

  return Door;
}(_feature2.default);

exports.default = Door;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlidingDoor = function (_Feature) {
  _inherits(SlidingDoor, _Feature);

  function SlidingDoor(canvas, origin, outline, id, doorStyle, doorProjStyle) {
    _classCallCheck(this, SlidingDoor);

    var _this = _possibleConstructorReturn(this, (SlidingDoor.__proto__ || Object.getPrototypeOf(SlidingDoor)).call(this, canvas));

    _this.outline = outline !== undefined && SlidingDoor.addOrigin(outline, origin);
    if (_this.outline.length < 3) {
      throw Error('Not enough valid points in SlidingDoor Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.slidingDoors = [];
    _this.doorStyle = doorStyle !== undefined ? doorStyle : _styles2.default.doorStyle.door.default;
    _this.projStyle = doorProjStyle !== undefined ? doorProjStyle : _styles2.default.doorStyle.projection.default;
    _this.features.push(_this.slidingDoors);
    return _this;
  }

  _createClass(SlidingDoor, [{
    key: 'draw',
    value: function draw() {
      var doorSegment = [this.outline[0], this.outline[1]];
      var projection = [this.outline[1], this.outline[2]];
      var lines = [];

      lines.push(this.drawLine(doorSegment, this.doorStyle), this.drawLine(projection, this.projStyle));

      this.slidingDoors.push(lines);
    }
  }]);

  return SlidingDoor;
}(_feature2.default);

exports.default = SlidingDoor;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(2);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bed = function (_Feature) {
  _inherits(Bed, _Feature);

  function Bed(canvas, origin, outline, id, bedStyle, label, labelStyle) {
    _classCallCheck(this, Bed);

    var _this = _possibleConstructorReturn(this, (Bed.__proto__ || Object.getPrototypeOf(Bed)).call(this, canvas));

    _this.outline = outline !== undefined && Bed.addOrigin(outline, origin);
    if (_this.outline.length < 4) {
      throw Error('Not enough valid points in Bed Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = bedStyle !== undefined ? bedStyle : _styles2.default.bedStyle.default;
    _this.label = label !== undefined ? label : false;
    _this.labelStyle = labelStyle !== undefined ? labelStyle : _styles2.default.labelStyle;
    _this.beds = [];
    _this.features.push(_this.beds);
    return _this;
  }

  _createClass(Bed, [{
    key: 'draw',
    value: function draw() {
      var bedObjs = [];
      var hasLabel = this.label;
      var topLPnt = this.outline[0];
      var topRightPnt = this.outline[1];

      var pillBuf = 2;
      var pillLen = (Bed.lineLen(topLPnt, topRightPnt) - pillBuf * 3) / 2;
      var pillHt = pillLen * 0.66;

      var pillOnePnts = [];
      pillOnePnts = Bed.getPillPnts(pillBuf, pillBuf, pillLen, pillHt, topLPnt);
      var pillTwoPnts = [];
      pillTwoPnts = Bed.getPillPnts(pillLen + pillBuf * 2, pillBuf, pillLen, pillHt, topLPnt);

      var pillOne = this.drawPolygon(pillOnePnts, this.style);
      var pillTwo = this.drawPolygon(pillTwoPnts, this.style);
      var drawnBed = this.drawPolygon(this.outline, this.style);

      var pillAngle = _snapsvgCjs2.default.angle(topRightPnt.x, topRightPnt.y, topLPnt.x, topLPnt.y);
      Bed.rotateObject(pillOne, pillAngle, topLPnt);
      Bed.rotateObject(pillTwo, pillAngle, topLPnt);

      bedObjs.push(drawnBed, pillOne, pillTwo);

      if (hasLabel) {
        var bottomRightPnt = this.outline[2];
        var centerPnt = Bed.lineMidPnt(topLPnt, bottomRightPnt);
        this.writeLabel(centerPnt.x + pillHt / 2, centerPnt.y, this.label, this.labelStyle);
      }

      bedObjs.id = this.id;
      this.beds.push(bedObjs);
    }
  }], [{
    key: 'getPillPnts',
    value: function getPillPnts(xOffset, yOffset, lenght, height, origin) {
      var pill = [{ x: origin.x + xOffset, y: origin.y + yOffset }, { x: origin.x + xOffset + lenght, y: origin.y + yOffset }, { x: origin.x + xOffset + lenght, y: origin.y + yOffset + height }, { x: origin.x + xOffset, y: origin.y + yOffset + height }];

      return pill;
    }
  }]);

  return Bed;
}(_feature2.default);

exports.default = Bed;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dresser = function (_Feature) {
  _inherits(Dresser, _Feature);

  function Dresser(canvas, origin, outline, id, dresserStyle, label, labelStyle) {
    _classCallCheck(this, Dresser);

    var _this = _possibleConstructorReturn(this, (Dresser.__proto__ || Object.getPrototypeOf(Dresser)).call(this, canvas));

    _this.outline = outline !== undefined && Dresser.addOrigin(outline, origin);
    if (_this.outline.length < 4) {
      throw Error('Not enough valid points in Dresser Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = dresserStyle !== undefined ? dresserStyle : _styles2.default.dresserStyle.default;
    _this.label = label !== undefined ? label : false;
    _this.labelStyle = labelStyle !== undefined ? labelStyle : _styles2.default.labelStyle;
    _this.dressers = [];
    _this.features.push(_this.dressers);
    return _this;
  }

  _createClass(Dresser, [{
    key: 'draw',
    value: function draw() {
      var dresser = this.drawRectWithLabel(this.outline, this.style, this.label, this.labelStyle);
      this.dressers.push(dresser);
    }
  }]);

  return Dresser;
}(_feature2.default);

exports.default = Dresser;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteriorWall = function (_Feature) {
  _inherits(InteriorWall, _Feature);

  function InteriorWall(canvas, origin, outline, id, interiorWallStyle) {
    _classCallCheck(this, InteriorWall);

    var _this = _possibleConstructorReturn(this, (InteriorWall.__proto__ || Object.getPrototypeOf(InteriorWall)).call(this, canvas));

    _this.outline = outline !== undefined && InteriorWall.addOrigin(outline, origin);
    if (_this.outline.length < 2) {
      throw Error('Not enough valid points in InteriorWall Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = interiorWallStyle !== undefined ? interiorWallStyle : _styles2.default.interiorWallStyle.default;
    _this.interiorWalls = [];
    _this.features.push(_this.interiorWalls);
    return _this;
  }

  _createClass(InteriorWall, [{
    key: 'draw',
    value: function draw() {
      this.interiorWalls.push(this.drawLine(this.outline, this.style));
    }
  }]);

  return InteriorWall;
}(_feature2.default);

exports.default = InteriorWall;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NightTable = function (_Feature) {
  _inherits(NightTable, _Feature);

  function NightTable(canvas, origin, outline, id, tableStyle, label) {
    _classCallCheck(this, NightTable);

    var _this = _possibleConstructorReturn(this, (NightTable.__proto__ || Object.getPrototypeOf(NightTable)).call(this, canvas));

    _this.outline = outline !== undefined && NightTable.addOrigin(outline, origin);
    if (_this.outline.length < 4) {
      throw Error('Not enough valid points in NightTable Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.id = id !== undefined && id;
    _this.style = tableStyle !== undefined ? tableStyle : _styles2.default.nightTableStyle.default;
    _this.label = label !== undefined ? label : false;
    _this.nightTables = [];
    _this.features.push(_this.nightTables);
    return _this;
  }

  _createClass(NightTable, [{
    key: 'draw',
    value: function draw() {
      this.nightTables.push(this.drawRectWithLabel(this.outline, this.style, this.label));
    }
  }]);

  return NightTable;
}(_feature2.default);

exports.default = NightTable;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(1);

var _feature2 = _interopRequireDefault(_feature);

var _styles = __webpack_require__(0);

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stairs = function (_Feature) {
  _inherits(Stairs, _Feature);

  function Stairs(canvas, origin, outline, span, vertical, stairsStyle) {
    _classCallCheck(this, Stairs);

    var _this = _possibleConstructorReturn(this, (Stairs.__proto__ || Object.getPrototypeOf(Stairs)).call(this, canvas));

    _this.outline = outline !== undefined && Stairs.checkOutline(outline);
    if (_this.outline.length < 4) {
      throw Error('Not enough valid points in Stairs Outline');
    }
    _this.origin = origin !== undefined && origin;
    _this.span = span !== undefined && span;
    _this.vertical = Stairs.isBoolean(vertical) && vertical;
    _this.style = stairsStyle !== undefined ? stairsStyle : _styles2.default.stairStyle.default;
    _this.stairs = [];
    _this.features.push(_this.stairs);
    return _this;
  }

  _createClass(Stairs, [{
    key: 'draw',
    value: function draw() {
      var xMin = this.outline.reduce(function (prev, curr) {
        return prev.x < curr.x ? prev : curr;
      }).x / this.span;
      var yMin = this.outline.reduce(function (prev, curr) {
        return prev.y < curr.y ? prev : curr;
      }).y / this.span;
      var xMax = this.outline.reduce(function (prev, curr) {
        return prev.x > curr.x ? prev : curr;
      }).x / this.span;
      var yMax = this.outline.reduce(function (prev, curr) {
        return prev.y > curr.y ? prev : curr;
      }).y / this.span;
      if (this.vertical !== undefined && this.vertical) {
        this.drawVerticalGrid(xMin, yMin, xMax, yMax, this.span, this.style, this.style);
      } else if (this.vertical !== undefined) {
        this.drawHorizontalGrid(xMin, yMin, xMax, yMax, this.span, this.style, this.style);
      }
    }
  }]);

  return Stairs;
}(_feature2.default);

exports.default = Stairs;

/***/ })
/******/ ]);
});