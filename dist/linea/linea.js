(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("snapsvg-cjs"));
	else if(typeof define === 'function' && define.amd)
		define("linea", ["snapsvg-cjs"], factory);
	else if(typeof exports === 'object')
		exports["linea"] = factory(require("snapsvg-cjs"));
	else
		root["linea"] = factory(root["Snap"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = __webpack_require__(2);

var _drawing2 = _interopRequireDefault(_drawing);

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
    value: function drawRectWithLabel(outline, style, label) {
      var rectObjs = [];
      var centerPoint = Feature.lineMidPnt(outline[0], outline[2]);
      rectObjs.push(this.paper.polygon(Feature.generateLineArray(outline)).attr(style));

      if (label) {
        rectObjs.push(this.paper.text(centerPoint.x, centerPoint.y, label).attr({ textAnchor: 'middle', alignmentBaseline: 'middle', fontSize: 8 }));
      }

      return rectObjs;
    }
  }]);

  return Feature;
}(_drawing2.default);

exports.default = Feature;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(1);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Drawing = function () {
  function Drawing(canvas) {
    _classCallCheck(this, Drawing);

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


  _createClass(Drawing, [{
    key: 'drawPathOutline',
    value: function drawPathOutline(points, closed, outlineStyle) {
      var pathString = Drawing.compilePath(points, closed);
      var outline = this.paper.path(pathString);
      outline.attr(outlineStyle);

      return outline;
    }

    // **********************************************************************
    // Generic functions to draw a line
    // **********************************************************************

  }, {
    key: 'drawLine',
    value: function drawLine(poinstObject, lineStyle) {
      var points = Drawing.generateLineArray(poinstObject);

      return this.paper.polyline(points).attr(lineStyle);
    }

    // **********************************************************************
    // Generic functions to draw a polygon
    // **********************************************************************

  }, {
    key: 'drawPolygon',
    value: function drawPolygon(pointObject, style) {
      var points = Drawing.generateLineArray(pointObject);

      return this.paper.polygon(points).attr(style);
    }

    // **********************************************************************
    // Generic function to write labels
    // **********************************************************************

  }, {
    key: 'writeLabel',
    value: function writeLabel(text, origin, style) {
      var label = this.paper.text(origin.x, origin.y, text);
      label.attr(style);

      return label;
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
      return this.paper.circle(centerPoint.x, centerPoint.y, radius).attr(circleStyle);
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

    value: function drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
      for (var i = xMin; i < yMax; i += 1) {
        var horizontalLines = {
          outline: [{ x: xMin, y: i * unitLength }, { x: xMax * unitLength, y: i * unitLength }]
        };
        if (i % 5 === 0) {
          this.majorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.majorGridLine));
        } else {
          this.minorGrid.push(this.drawLine(horizontalLines.outline, gridStyle.minorGridLine));
        }
      }
    }
  }, {
    key: 'drawVerticalGrid',
    value: function drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle) {
      for (var j = xMin; j < xMax; j += 1) {
        var verticalLines = {
          outline: [{ x: j * unitLength, y: yMin }, { x: j * unitLength, y: yMax * unitLength }]
        };
        if (j % 5 === 0) {
          this.majorGrid.push(this.drawLine(verticalLines.outline, gridStyle.majorGridLine));
        } else {
          this.minorGrid.push(this.drawLine(verticalLines.outline, gridStyle.minorGridLine));
        }
      }
    }
  }, {
    key: 'drawGrid',
    value: function drawGrid(unitLength, gridStyle) {
      var xMax = this.maxX / unitLength;
      var yMax = this.maxY / unitLength;
      var xMin = this.minX;
      var yMin = this.minY;

      this.drawHorizontalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
      this.drawVerticalGrid(xMin, yMin, xMax, yMax, unitLength, gridStyle);
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
    value: function removeFeature() {}
    // how to do?


    // **********************************************************************
    // Shift Origin
    // **********************************************************************
    // eslint-disable-line

  }, {
    key: 'addOrigin',
    value: function addOrigin(outline, origin) {
      var newOutline = outline;
      if (origin.x || origin.y) {
        newOutline = outline.map(function (item) {
          var newItem = item;
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

  }, {
    key: 'compilePath',
    value: function compilePath(points, closed) {
      var path = [];

      // Iterates through each point object to create path
      // M starts a path
      // A indicates an arc. Uses: xRadius, yRadius, rotation, arc-flag, sweep-flag, endX, endY.
      // L indicate a straight line to (x, y)
      // Z closes the shape of the path
      points.forEach(function (point, index) {
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

      outline.forEach(function (point) {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = __webpack_require__(2);

var _drawing2 = _interopRequireDefault(_drawing);

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

      features.forEach(function (item) {
        var newItem = item;
        newItem.outline = _this2.addOrigin(newItem.outline, origin);
        newItem.outline = _this2.addOrigin(newItem.outline, _this2.origin);
        _this2.features.push(newItem);
      });
    }
  }, {
    key: 'drawOutline',
    value: function drawOutline(points, id, outlineStyle) {
      // compilePath() takes points and makes the string to pass into path?
      var path = this.drawPathOutline(points, true, outlineStyle);
      var lastItem = this.walls.push(path) - 1;

      // assign id to object
      this.walls[lastItem].id = id;
    }
  }]);

  return Outline;
}(_drawing2.default);

exports.default = Outline;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = __webpack_require__(6);

Object.defineProperty(exports, 'LineaCanvas', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_canvas).default;
  }
});

var _drawing = __webpack_require__(2);

Object.defineProperty(exports, 'Drawing', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_drawing).default;
  }
});

var _outline = __webpack_require__(3);

Object.defineProperty(exports, 'Outline', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_outline).default;
  }
});

var _floorplan = __webpack_require__(7);

Object.defineProperty(exports, 'Floorplan', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_floorplan).default;
  }
});

var _room = __webpack_require__(8);

Object.defineProperty(exports, 'Room', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_room).default;
  }
});

var _feature = __webpack_require__(0);

Object.defineProperty(exports, 'Feature', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_feature).default;
  }
});

var _window = __webpack_require__(9);

Object.defineProperty(exports, 'Window', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_window).default;
  }
});

var _door = __webpack_require__(10);

Object.defineProperty(exports, 'Door', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_door).default;
  }
});

var _slidingDoor = __webpack_require__(11);

Object.defineProperty(exports, 'SlidingDoor', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_slidingDoor).default;
  }
});

var _bed = __webpack_require__(12);

Object.defineProperty(exports, 'Bed', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_bed).default;
  }
});

var _dresser = __webpack_require__(13);

Object.defineProperty(exports, 'Dresser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_dresser).default;
  }
});

var _interiorWall = __webpack_require__(14);

Object.defineProperty(exports, 'InteriorWall', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_interiorWall).default;
  }
});

var _nightTable = __webpack_require__(15);

Object.defineProperty(exports, 'NightTable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nightTable).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snapsvgCjs = __webpack_require__(1);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LineaCanvas = function LineaCanvas(id, minX, minY, maxX, maxY) {
  _classCallCheck(this, LineaCanvas);

  this.paper = (0, _snapsvgCjs2.default)(id);
  this.paper.attr({ viewBox: minX + ' ' + minY + ' ' + maxX + ' ' + maxY });
  this.id = id;
  this.minX = minX;
  this.minY = minY;
  this.maxX = maxX;
  this.maxY = maxY;
};

exports.default = LineaCanvas;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outline = __webpack_require__(3);

var _outline2 = _interopRequireDefault(_outline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Floorplan = function (_Outline) {
  _inherits(Floorplan, _Outline);

  function Floorplan(canvas, origin, outline, id, style) {
    _classCallCheck(this, Floorplan);

    var _this = _possibleConstructorReturn(this, (Floorplan.__proto__ || Object.getPrototypeOf(Floorplan)).call(this, canvas));

    _this.outline = Floorplan.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
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
        var newItem = item;
        newItem.outline = Floorplan.addOrigin(item.outline, origin);
        newItem.outline = Floorplan.addOrigin(item.outline, _this2.origin);
        newItem.features.forEach(function (feature) {
          var newFeature = feature;
          newFeature.outline = Floorplan.addOrigin(newFeature.outline, origin);
          return newFeature;
        });
        _this2.rooms.push(newItem);
      });
    }

    // need to add origin modifier to this

  }, {
    key: 'addFeatures',
    value: function addFeatures(origin) {
      var _this3 = this;

      for (var _len2 = arguments.length, Features = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        Features[_key2 - 1] = arguments[_key2];
      }

      Features.forEach(function (array) {
        array.forEach(function (feature) {
          var newFeature = feature;
          newFeature.outline = Floorplan.addOrigin(newFeature.outline, origin);
          newFeature.outline = Floorplan.addOrigin(newFeature.outline, _this3.origin);
          _this3.features.push(newFeature);
        });
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _outline = __webpack_require__(3);

var _outline2 = _interopRequireDefault(_outline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_Outline) {
  _inherits(Room, _Outline);

  function Room(canvas, origin, outline, id, style) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, canvas));

    _this.outline = Room.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
    _this.features = [];
    return _this;
  }

  // need to add origin modifier to this


  _createClass(Room, [{
    key: 'addFeatures',
    value: function addFeatures(origin) {
      var _this2 = this;

      for (var _len = arguments.length, moreFeatures = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        moreFeatures[_key - 1] = arguments[_key];
      }

      moreFeatures.forEach(function (array) {
        array.forEach(function (item) {
          var newItem = item;
          newItem.outline = Room.addOrigin(newItem.outline, origin);
          newItem.outline = Room.addOrigin(newItem.outline, _this2.origin);
          _this2.features.push(item);
        });
      });
    }
  }, {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_Feature) {
  _inherits(Window, _Feature);

  function Window(canvas, origin, outline, id, style) {
    _classCallCheck(this, Window);

    var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, canvas));

    _this.outline = _this.constructor.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.windows = [];
    _this.style = style;
    return _this;
  }

  _createClass(Window, [{
    key: 'draw',
    value: function draw() {
      this.features.push(this.windows.push(this.drawLine(this.outline, this.style)));
    }
  }]);

  return Window;
}(_feature2.default);

exports.default = Window;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(1);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Door = function (_Feature) {
  _inherits(Door, _Feature);

  function Door(canvas, origin, outline, angle, direction, id, style) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this, canvas));

    _this.outline = Door.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.angle = angle;
    _this.radius = Door.lineLen(_this.outline[0], _this.outline[1]);
    _this.curve = direction ? 'concave' : 'convex';
    _this.doors = [];
    _this.doorStyle = style.door.default;
    _this.projectionStyle = style.projection.default;
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
      var supportAngle = Door.getSupportAngle(baseAngle, hinge, end, this.radius);
      var doorAngle = Door.getDoorAngle(this.curve, baseAngle, this.angle, supportAngle);

      openPoint.x = this.radius * Math.cos(doorAngle) + hinge.x;
      openPoint.y = this.radius * Math.sin(doorAngle) + hinge.y;

      var door = [hinge, end];
      var curve = [end, openPoint];
      var stop = [hinge, openPoint];
      lines.push(this.drawLine(door, this.doorStyle), this.drawLine(stop, this.projectionStyle), this.drawPathOutline(curve, false, this.projectionStyle));

      this.features.push(this.doors.push(lines));
    }
  }], [{
    key: 'getSupportAngle',
    value: function getSupportAngle(baseAngle, hingePnt, endPnt, radius) {
      if (hingePnt.x !== endPnt.x && hingePnt.y !== endPnt.y) {
        if (baseAngle === Math.PI || baseAngle === 0) {
          return Math.acos(Door.lineLen([hingePnt, { x: endPnt.x, y: hingePnt.y }]) / radius);
        }
        return Math.acos(Door.lineLen([hingePnt, { x: hingePnt.x, y: endPnt.y }]) / radius);
      }
      return 0;
    }
  }, {
    key: 'getDoorAngle',
    value: function getDoorAngle(curve, baseAngle, angle, supportAngle) {
      var doorAngle = 0;

      if (curve === 'concave') {
        doorAngle = baseAngle + _snapsvgCjs2.default.rad(angle) + supportAngle;
      } else {
        doorAngle = baseAngle - _snapsvgCjs2.default.rad(angle) - supportAngle;
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlidingDoor = function (_Feature) {
  _inherits(SlidingDoor, _Feature);

  function SlidingDoor(canvas, origin, outline, id, style) {
    _classCallCheck(this, SlidingDoor);

    var _this = _possibleConstructorReturn(this, (SlidingDoor.__proto__ || Object.getPrototypeOf(SlidingDoor)).call(this, canvas));

    _this.outline = _this.constructor.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.slidingDoors = [];
    _this.doorStyle = style.door.default;
    _this.projectionStyle = style.projection.default;
    return _this;
  }

  _createClass(SlidingDoor, [{
    key: 'draw',
    value: function draw() {
      var doorSegment = [this.outline[0], this.outline[1]];
      var projection = [this.outline[1], this.outline[2]];
      var lines = [];

      lines.push(this.drawLine(doorSegment, this.doorStyle), this.drawLine(projection, this.projectionStyle));

      this.features.push(this.slidingDoors.push(lines));
    }
  }]);

  return SlidingDoor;
}(_feature2.default);

exports.default = SlidingDoor;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapsvgCjs = __webpack_require__(1);

var _snapsvgCjs2 = _interopRequireDefault(_snapsvgCjs);

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bed = function (_Feature) {
  _inherits(Bed, _Feature);

  function Bed(canvas, origin, outline, id, style, label) {
    _classCallCheck(this, Bed);

    var _this = _possibleConstructorReturn(this, (Bed.__proto__ || Object.getPrototypeOf(Bed)).call(this, canvas));

    _this.outline = Bed.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
    _this.label = label !== undefined ? label : false;
    _this.beds = [];
    return _this;
  }

  _createClass(Bed, [{
    key: 'drawBed',
    value: function drawBed(outline, style, id, label) {
      var bedObjs = [];
      var hasLabel = label !== undefined ? label : false;
      var topLPnt = outline[0];
      var topRightPnt = outline[1];

      var pillBuf = 2;
      var pillLen = (Bed.lineLen(topLPnt, topRightPnt) - pillBuf * 3) / 2;
      var pillHt = pillLen * 0.66;

      var pillOnePnts = [];
      pillOnePnts = Bed.getPillPnts(pillBuf, pillBuf, pillLen, pillHt, topLPnt);
      var pillTwoPnts = [];
      pillTwoPnts = Bed.getPillPnts(pillLen + pillBuf * 2, pillBuf, pillLen, pillHt, topLPnt);

      var pillOne = this.drawPolygon(pillOnePnts, style);
      var pillTwo = this.drawPolygon(pillTwoPnts, style);
      var drawnBed = this.drawPolygon(outline, style);

      var pillAngle = _snapsvgCjs2.default.angle(topRightPnt.x, topRightPnt.y, topLPnt.x, topLPnt.y);

      Bed.rotateObject(pillOne, pillAngle, topLPnt);
      Bed.rotateObject(pillTwo, pillAngle, topLPnt);

      bedObjs.push(drawnBed, pillOne, pillTwo);

      if (hasLabel) {
        var bottomRightPnt = outline[2];
        var centerPnt = Bed.lineMidPnt(topLPnt, bottomRightPnt);
        var newLabel = this.paper.text(centerPnt.x + pillHt / 2, centerPnt.y, label);
        newLabel.attr({ textAnchor: 'middle', alignmentBaseline: 'middle', fontSize: 8 });
        bedObjs.push(newLabel);
      }

      bedObjs.id = id;
      this.beds.push(bedObjs);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.features.push(this.beds.push(this.drawBed(this.outline, this.style, this.id, this.label)));
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dresser = function (_Feature) {
  _inherits(Dresser, _Feature);

  function Dresser(canvas, origin, outline, id, style, label) {
    _classCallCheck(this, Dresser);

    var _this = _possibleConstructorReturn(this, (Dresser.__proto__ || Object.getPrototypeOf(Dresser)).call(this, canvas));

    _this.outline = Dresser.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
    _this.label = label !== undefined ? label : false;
    _this.dressers = [];
    return _this;
  }

  _createClass(Dresser, [{
    key: 'draw',
    value: function draw() {
      this.dressers.push(this.drawRectWithLabel(this.outline, this.style, this.label));
      this.features.push(this.dressers);
    }
  }]);

  return Dresser;
}(_feature2.default);

exports.default = Dresser;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteriorWall = function (_Feature) {
  _inherits(InteriorWall, _Feature);

  function InteriorWall(canvas, origin, outline, id, style) {
    _classCallCheck(this, InteriorWall);

    var _this = _possibleConstructorReturn(this, (InteriorWall.__proto__ || Object.getPrototypeOf(InteriorWall)).call(this, canvas));

    _this.outline = InteriorWall.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
    _this.interiorWalls = [];
    return _this;
  }

  _createClass(InteriorWall, [{
    key: 'draw',
    value: function draw() {
      this.features.push(this.interiorWalls.push(this.drawLine(this.outline, this.style)));
    }
  }]);

  return InteriorWall;
}(_feature2.default);

exports.default = InteriorWall;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _feature = __webpack_require__(0);

var _feature2 = _interopRequireDefault(_feature);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NightTable = function (_Feature) {
  _inherits(NightTable, _Feature);

  function NightTable(canvas, origin, outline, id, style, label) {
    _classCallCheck(this, NightTable);

    var _this = _possibleConstructorReturn(this, (NightTable.__proto__ || Object.getPrototypeOf(NightTable)).call(this, canvas));

    _this.outline = NightTable.addOrigin(outline, origin);
    _this.origin = origin;
    _this.id = id;
    _this.style = style;
    _this.label = label !== undefined ? label : false;
    _this.nightTables = [];
    return _this;
  }

  _createClass(NightTable, [{
    key: 'draw',
    value: function draw() {
      this.nightTables.push(this.drawRectWithLabel(this.outline, this.style, this.label));
      this.features.push(this.nightTables);
    }
  }]);

  return NightTable;
}(_feature2.default);

exports.default = NightTable;

/***/ })
/******/ ]);
});