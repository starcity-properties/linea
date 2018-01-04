!function webpackUniversalModuleDefinition(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t(require("snapsvg-cjs")):"function"===typeof define&&define.amd?define("linea-min",["snapsvg-cjs"],t):"object"===typeof exports?exports["linea-min"]=t(require("snapsvg-cjs")):e["linea-min"]=t(e.Snap)}("undefined"!==typeof self?self:this,function(e){return function(e){function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="/",__webpack_require__(__webpack_require__.s=5)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={labelStyle:{textAnchor:"middle",alignmentBaseline:"middle",fontSize:8},circleStyle:{stroke:"black"},gridStyle:{major:{stroke:"#cccccc",strokeWidth:1},minor:{stroke:"#eaeaea",strokeWidth:1}},roomOutline:{default:{stroke:"#000000",strokeWidth:8,fill:"#f4e4d7",fillOpacity:.5}},interiorWallStyle:{default:{stroke:"#000000",strokeWidth:1,fill:"#f4e4d7",fillOpacity:1}},windowStyle:{default:{stroke:"#f9f9f9",strokeWidth:6,fill:"none",fillOpacity:1,strokeLinecap:"round"},open:{stroke:"yellow",strokeWidth:6,fill:"none",fillOpacity:1}},doorStyle:{door:{default:{stroke:"#c1272d",strokeWidth:6,fill:"none",fillOpacity:1},open:{stroke:"#ff00ff",strokeWidth:6,fill:"none",fillOpacity:1}},projection:{default:{stroke:"#c1272d",strokeWidth:3,fill:"none",fillOpacity:1,strokeDasharray:"4 8",strokeLinecap:"round"},open:{stroke:"#ff00ff",strokeWidth:3,fill:"none",fillOpacity:1,strokeDasharray:"0",strokeLinecap:"round"}},doorStop:{default:{stroke:"#c1272d",strokeWidth:1,fill:"none",fillOpacity:1},open:{stroke:"#ff00ff",strokeWidth:1,fill:"none",fillOpacity:1}}},bedStyle:{default:{stroke:"black",strokeWidth:1,fill:"none",fillOpacity:1}},dresserStyle:{default:{stroke:"grey",strokeWidth:1,fill:"none",fillOpacity:1}},nightTableStyle:{default:{stroke:"grey",strokeWidth:1,fill:"none",fillOpacity:1}}};t.default=n},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(3),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Feature(e){_classCallCheck(this,Feature);var t=_possibleConstructorReturn(this,(Feature.__proto__||Object.getPrototypeOf(Feature)).call(this,e));return t.features=[],t}return _inherits(Feature,e),n(Feature,[{key:"drawRectWithLabel",value:function drawRectWithLabel(e,t,r,n){var i=[],o=void 0!==r&&r,u=void 0!==e&&Feature.checkOutline(e);if(u.length<4)throw Error("Not enough valid points in Rect Outline");var l=Feature.lineMidPnt(u[0],u[2]);if(i.push(this.paper.polygon(Feature.generateLineArray(u)).attr(t)),o){var s=void 0!==n?n:a.default.labelStyle;i.push(this.paper.text(l.x,l.y,r).attr(s))}return i}}]),Feature}(o.default);t.default=l},function(t,r){t.exports=e},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(2),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(){function Drawing(e){_classCallCheck(this,Drawing),this.paper=e.paper,this.minX=e.minX,this.minY=e.minY,this.width=e.width,this.height=e.height,this.majorGrid=[],this.minorGrid=[],this.labels=[]}return n(Drawing,[{key:"drawPathOutline",value:function drawPathOutline(e,t,r){var n=Drawing.compilePath(e,t),i=this.paper.path(n),o=void 0!==r?r:a.default.roomOutline.default;return i.attr(o),i}},{key:"drawLine",value:function drawLine(e,t){var r=Drawing.generateLineArray(e),n=void 0!==t?t:a.default.interiorWallStyle.default;return this.paper.polyline(r).attr(n)}},{key:"drawPolygon",value:function drawPolygon(e,t){var r=Drawing.generateLineArray(e),n=void 0!==t?t:a.default.roomOutline.default;return this.paper.polygon(r).attr(n)}},{key:"writeLabel",value:function writeLabel(e,t,r,n){var i=Drawing.isNumber(e)&&e,o=Drawing.isNumber(t)&&t;if(i||o){var u=this.paper.text(i,o,r),l=void 0!==n?n:a.default.labelStyle;u.attr(l),this.labels.push(u)}}},{key:"drawCircle",value:function drawCircle(e,t,r){var n=void 0!==r?r:a.default.circleStyle;return this.paper.circle(e.x,e.y,t).attr(n)}},{key:"drawHorizontalGrid",value:function drawHorizontalGrid(e,t,r,n,i,o,u){for(var a=t;a<=n;a+=1){var l={outline:[{x:e*i,y:a*i},{x:r*i,y:a*i}]};a%5===0?this.majorGrid.push(this.drawLine(l.outline,o)):this.minorGrid.push(this.drawLine(l.outline,u))}}},{key:"drawVerticalGrid",value:function drawVerticalGrid(e,t,r,n,i,o,u){for(var a=e;a<=r;a+=1){var l={outline:[{x:a*i,y:t*i},{x:a*i,y:n*i}]};a%5===0?this.majorGrid.push(this.drawLine(l.outline,o)):this.minorGrid.push(this.drawLine(l.outline,u))}}},{key:"drawGrid",value:function drawGrid(e,t,r){if(e>0){var n=this.width/e,i=this.height/e,o=Math.floor(this.minX/e),u=Math.floor(this.minY/e),l=void 0!==t?t:a.default.gridStyle.major,s=void 0!==r?r:a.default.gridStyle.minor;this.drawHorizontalGrid(o,u,n,i,e,l,s),this.drawVerticalGrid(o,u,n,i,e,l,s)}else console.warn("drawGrid: Error, unitLength is not a number greater than 0")}}],[{key:"update",value:function update(e,t,r){e.forEach(function(e){e.id===t&&e.attr(r)})}},{key:"removeFeature",value:function removeFeature(){}},{key:"isNumber",value:function isNumber(e){return void 0!==e&&"number"===typeof e&&!Number.isNaN(e)}},{key:"isBoolean",value:function isBoolean(e){return!0===e||!1===e||"[object Boolean]"===toString.call(e)}},{key:"checkOutline",value:function checkOutline(e){if(void 0!==e&&Array.isArray(e)){return e.filter(function(e){return Drawing.isNumber(e.x)&&Drawing.isNumber(e.y)?e:console.warn("checkOutline: Error, outline X and Y values must be numbers => 'X: "+e.x+"' 'Y: "+e.y+"'")&&null})}return console.warn("checkOutline: Error, invalid outline => '"+e+"'")&&null}},{key:"addOrigin",value:function addOrigin(e,t){var r=Drawing.checkOutline(e);if(void 0!==r||void 0!==t){var n=Drawing.isNumber(t.x)&&t.x,i=Drawing.isNumber(t.y)&&t.y,o=r;return o&&(n||i)&&(o=o.map(function(e){var t=e;return t.x+=n,t.y+=i,t})),o}return console.warn("addOrigin: Error, invalid outline or origin")&&r}},{key:"compilePath",value:function compilePath(e,t){var r=[],n=Drawing.checkOutline(e),i=Drawing.isBoolean(t)&&t;return n.forEach(function(e,t){0===t?r.push("M",e.x,e.y):e.radius>0&&"concave"===e.curve?r.push("A",e.radius,e.radius,0,0,1,e.x,e.y):e.radius>0&&"convex"===e.curve?r.push("A",e.radius,e.radius,0,0,0,e.x,e.y):r.push("L",e.x,e.y)}),i&&r.push("Z"),r.join(" ")}},{key:"generatePointArray",value:function generatePointArray(e){var t=[];return t.push(e.x,e.y),t}},{key:"generateLineArray",value:function generateLineArray(e){var t=[];return Drawing.checkOutline(e).forEach(function(e){t.push(Drawing.generatePointArray(e))}),t}},{key:"rotateObject",value:function rotateObject(e,t,r){e.transform("r"+t+", "+r.x+", "+r.y)}},{key:"lineLen",value:function lineLen(e,t){return o.default.len(e.x,e.y,t.x,t.y)}},{key:"lineMidPnt",value:function lineMidPnt(e,t){var r={};return r.x=(e.x+t.x)/2,r.y=(e.y+t.y)/2,r}}]),Drawing}();t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(3),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Outline(e){_classCallCheck(this,Outline);var t=_possibleConstructorReturn(this,(Outline.__proto__||Object.getPrototypeOf(Outline)).call(this,e));return t.walls=[],t.features=[],t}return _inherits(Outline,e),n(Outline,[{key:"addFeature",value:function addFeature(e){for(var t=this,r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];n.forEach(function(r){r.forEach(function(r){var n=void 0!==r.outline&&r;n?(n.outline=void 0!==e&&Outline.addOrigin(n.outline,e),n.outline=void 0!==t.origin&&Outline.addOrigin(n.outline,t.origin),t.features.push(n)):console.warn("addFeature: Error, feature or feature outline is undefined "+r)})})}},{key:"drawOutline",value:function drawOutline(e,t,r){var n=void 0!==r?r:a.default.roomOutline.default,i=e&&this.drawPathOutline(e,!0,n),o=i&&this.walls.push(i)-1;i&&t?this.walls[o].id=t:console.warn("drawOutline: Warning, Floor/Room does not have an id")}}]),Outline}(o.default);t.default=l},function(e,t,r){e.exports=r(6)},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);Object.defineProperty(t,"defaultStyle",{enumerable:!0,get:function get(){return _interopRequireDefault(n).default}});var i=r(7);Object.defineProperty(t,"LineaCanvas",{enumerable:!0,get:function get(){return _interopRequireDefault(i).default}});var o=r(3);Object.defineProperty(t,"Drawing",{enumerable:!0,get:function get(){return _interopRequireDefault(o).default}});var u=r(4);Object.defineProperty(t,"Outline",{enumerable:!0,get:function get(){return _interopRequireDefault(u).default}});var a=r(8);Object.defineProperty(t,"Floorplan",{enumerable:!0,get:function get(){return _interopRequireDefault(a).default}});var l=r(9);Object.defineProperty(t,"Room",{enumerable:!0,get:function get(){return _interopRequireDefault(l).default}});var s=r(1);Object.defineProperty(t,"Feature",{enumerable:!0,get:function get(){return _interopRequireDefault(s).default}});var f=r(10);Object.defineProperty(t,"Window",{enumerable:!0,get:function get(){return _interopRequireDefault(f).default}});var c=r(11);Object.defineProperty(t,"Door",{enumerable:!0,get:function get(){return _interopRequireDefault(c).default}});var d=r(12);Object.defineProperty(t,"SlidingDoor",{enumerable:!0,get:function get(){return _interopRequireDefault(d).default}});var p=r(13);Object.defineProperty(t,"Bed",{enumerable:!0,get:function get(){return _interopRequireDefault(p).default}});var h=r(14);Object.defineProperty(t,"Dresser",{enumerable:!0,get:function get(){return _interopRequireDefault(h).default}});var y=r(15);Object.defineProperty(t,"InteriorWall",{enumerable:!0,get:function get(){return _interopRequireDefault(y).default}});var b=r(16);Object.defineProperty(t,"NightTable",{enumerable:!0,get:function get(){return _interopRequireDefault(b).default}});var _=r(17);Object.defineProperty(t,"Stairs",{enumerable:!0,get:function get(){return _interopRequireDefault(_).default}})},function(e,t,r){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),i=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(n),o=function LineaCanvas(e,t,r,n,o){_classCallCheck(this,LineaCanvas),this.paper=(0,i.default)(e),n<0||o<0?console.warn("Error, negative values for width or height are invalid"):0!==n&&0!==o||console.warn("Warning, a value of 0 for either width or height disables rendering of the element"),this.paper.attr({viewBox:t+" "+r+" "+n+" "+o}),this.id=e,this.minX=t,this.minY=r,this.width=n,this.height=o};t.default=o},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(4),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Floorplan(e,t,r,n,i){_classCallCheck(this,Floorplan);var o=_possibleConstructorReturn(this,(Floorplan.__proto__||Object.getPrototypeOf(Floorplan)).call(this,e));return o.outline=void 0!==r&&Floorplan.addOrigin(r,t),o.origin=void 0!==t&&t,o.id=void 0!==n&&n,o.style=void 0!==i?i:a.default.roomOutline.default,o.rooms=[],o.features=[],o}return _inherits(Floorplan,e),n(Floorplan,[{key:"addRoom",value:function addRoom(e){for(var t=this,r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];n.forEach(function(r){var n=void 0!==r.outline&&r;n?(n.outline=void 0!==e&&Floorplan.addOrigin(r.outline,e),n.outline=void 0!==t.origin&&Floorplan.addOrigin(r.outline,t.origin),n.features.forEach(function(t){var r=t;return r.outline=void 0!==e&&Floorplan.addOrigin(r.outline,e),r}),t.rooms.push(n)):console.warn("Room or room outline is udefined "+r)})}},{key:"draw",value:function draw(){this.drawOutline(this.outline,this.id,this.style),this.rooms.forEach(function(e){e.draw()}),this.features.forEach(function(e){e.draw()})}}]),Floorplan}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(4),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Room(e,t,r,n,i){_classCallCheck(this,Room);var o=_possibleConstructorReturn(this,(Room.__proto__||Object.getPrototypeOf(Room)).call(this,e));return o.outline=void 0!==r&&Room.addOrigin(r,t),o.origin=void 0!==t&&t,o.id=void 0!==n&&n,o.style=void 0!==i?i:a.default.roomOutline.default,o.features=[],o}return _inherits(Room,e),n(Room,[{key:"draw",value:function draw(){this.drawOutline(this.outline,this.id,this.style),this.features.forEach(function(e){e.draw()})}}]),Room}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Window(e,t,r,n,i){_classCallCheck(this,Window);var o=_possibleConstructorReturn(this,(Window.__proto__||Object.getPrototypeOf(Window)).call(this,e));if(o.outline=void 0!==r&&Window.addOrigin(r,t),o.outline.length<2)throw Error("Not enough valid points in Window Outline");return o.origin=void 0!==t&&t,o.id=void 0!==n&&n,o.style=void 0!==i?i:a.default.windowStyle.default,o.windows=[],o.features.push(o.windows),o}return _inherits(Window,e),n(Window,[{key:"draw",value:function draw(){this.windows.push(this.drawLine(this.outline,this.style))}}]),Window}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(2),o=_interopRequireDefault(i),u=r(1),a=_interopRequireDefault(u),l=r(0),s=_interopRequireDefault(l),f=function(e){function Door(e,t,r,n,i,o,u,a,l){_classCallCheck(this,Door);var f=_possibleConstructorReturn(this,(Door.__proto__||Object.getPrototypeOf(Door)).call(this,e));if(f.outline=void 0!==r&&Door.addOrigin(r,t),f.outline.length<2)throw Error("Not enough valid points in Door Outline");return f.origin=void 0!==t&&t,f.id=void 0!==o&&o,f.angle=void 0!==n&&n,f.radius=Door.lineLen(f.outline[0],f.outline[1]),f.curve=i?"concave":"convex",f.doors=[],f.doorStyle=void 0!==u?u:s.default.doorStyle.door.default,f.doorStopStyle=void 0!==a?a:s.default.doorStyle.doorStop.default,f.projectionStyle=void 0!==l?l:s.default.doorStyle.projection.default,f.features.push(f.doors),f}return _inherits(Door,e),n(Door,[{key:"draw",value:function draw(){var e=[],t=this.outline[0],r=this.outline[1],n={x:0,y:0,radius:this.radius,curve:this.curve},i=o.default.rad(o.default.angle(t.x,t.y,r.x,r.y))-Math.PI,u=Door.getDoorAngle(this.curve,i,this.angle);n.x=this.radius*Math.cos(u)+t.x,n.y=this.radius*Math.sin(u)+t.y;var a=[t,r],l=[r,n],s=[t,n];e.push(this.drawLine(a,this.doorStyle),this.drawLine(s,this.doorStopStyle),this.drawPathOutline(l,!1,this.projectionStyle)),this.doors.push(e)}}],[{key:"getDoorAngle",value:function getDoorAngle(e,t,r){var n=0;return n="concave"===e?t+o.default.rad(r):t-o.default.rad(r),n>2*Math.PI?n%=2*Math.PI:n<0&&(n=2*Math.PI-Math.abs(n)%(2*Math.PI)),n}}]),Door}(a.default);t.default=f},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function SlidingDoor(e,t,r,n,i,o){_classCallCheck(this,SlidingDoor);var u=_possibleConstructorReturn(this,(SlidingDoor.__proto__||Object.getPrototypeOf(SlidingDoor)).call(this,e));if(u.outline=void 0!==r&&SlidingDoor.addOrigin(r,t),u.outline.length<3)throw Error("Not enough valid points in SlidingDoor Outline");return u.origin=void 0!==t&&t,u.id=void 0!==n&&n,u.slidingDoors=[],u.doorStyle=void 0!==i?i:a.default.doorStyle.door.default,u.projStyle=void 0!==o?o:a.default.doorStyle.projection.default,u.features.push(u.slidingDoors),u}return _inherits(SlidingDoor,e),n(SlidingDoor,[{key:"draw",value:function draw(){var e=[this.outline[0],this.outline[1]],t=[this.outline[1],this.outline[2]],r=[];r.push(this.drawLine(e,this.doorStyle),this.drawLine(t,this.projStyle)),this.slidingDoors.push(r)}}]),SlidingDoor}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(2),o=_interopRequireDefault(i),u=r(1),a=_interopRequireDefault(u),l=r(0),s=_interopRequireDefault(l),f=function(e){function Bed(e,t,r,n,i,o,u){_classCallCheck(this,Bed);var a=_possibleConstructorReturn(this,(Bed.__proto__||Object.getPrototypeOf(Bed)).call(this,e));if(a.outline=void 0!==r&&Bed.addOrigin(r,t),a.outline.length<4)throw Error("Not enough valid points in Bed Outline");return a.origin=void 0!==t&&t,a.id=void 0!==n&&n,a.style=void 0!==i?i:s.default.bedStyle.default,a.label=void 0!==o&&o,a.labelStyle=void 0!==u?u:s.default.labelStyle,a.beds=[],a.features.push(a.beds),a}return _inherits(Bed,e),n(Bed,[{key:"draw",value:function draw(){var e=[],t=this.label,r=this.outline[0],n=this.outline[1],i=(Bed.lineLen(r,n)-6)/2,u=.66*i,a=[];a=Bed.getPillPnts(2,2,i,u,r);var l=[];l=Bed.getPillPnts(i+4,2,i,u,r);var s=this.drawPolygon(a,this.style),f=this.drawPolygon(l,this.style),c=this.drawPolygon(this.outline,this.style),d=o.default.angle(n.x,n.y,r.x,r.y);if(Bed.rotateObject(s,d,r),Bed.rotateObject(f,d,r),e.push(c,s,f),t){var p=this.outline[2],h=Bed.lineMidPnt(r,p);this.writeLabel(h.x+u/2,h.y,this.label,this.labelStyle)}e.id=this.id,this.beds.push(e)}}],[{key:"getPillPnts",value:function getPillPnts(e,t,r,n,i){return[{x:i.x+e,y:i.y+t},{x:i.x+e+r,y:i.y+t},{x:i.x+e+r,y:i.y+t+n},{x:i.x+e,y:i.y+t+n}]}}]),Bed}(a.default);t.default=f},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Dresser(e,t,r,n,i,o,u){_classCallCheck(this,Dresser);var l=_possibleConstructorReturn(this,(Dresser.__proto__||Object.getPrototypeOf(Dresser)).call(this,e));if(l.outline=void 0!==r&&Dresser.addOrigin(r,t),l.outline.length<4)throw Error("Not enough valid points in Dresser Outline");return l.origin=void 0!==t&&t,l.id=void 0!==n&&n,l.style=void 0!==i?i:a.default.dresserStyle.default,l.label=void 0!==o&&o,l.labelStyle=void 0!==u?u:a.default.labelStyle,l.dressers=[],l.features.push(l.dressers),l}return _inherits(Dresser,e),n(Dresser,[{key:"draw",value:function draw(){var e=this.drawRectWithLabel(this.outline,this.style,this.label,this.labelStyle);this.dressers.push(e)}}]),Dresser}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function InteriorWall(e,t,r,n,i){_classCallCheck(this,InteriorWall);var o=_possibleConstructorReturn(this,(InteriorWall.__proto__||Object.getPrototypeOf(InteriorWall)).call(this,e));if(o.outline=void 0!==r&&InteriorWall.addOrigin(r,t),o.outline.length<2)throw Error("Not enough valid points in InteriorWall Outline");return o.origin=void 0!==t&&t,o.id=void 0!==n&&n,o.style=void 0!==i?i:a.default.interiorWallStyle.default,o.interiorWalls=[],o.features.push(o.interiorWalls),o}return _inherits(InteriorWall,e),n(InteriorWall,[{key:"draw",value:function draw(){this.interiorWalls.push(this.drawLine(this.outline,this.style))}}]),InteriorWall}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function NightTable(e,t,r,n,i,o){_classCallCheck(this,NightTable);var u=_possibleConstructorReturn(this,(NightTable.__proto__||Object.getPrototypeOf(NightTable)).call(this,e));if(u.outline=void 0!==r&&NightTable.addOrigin(r,t),u.outline.length<4)throw Error("Not enough valid points in NightTable Outline");return u.origin=void 0!==t&&t,u.id=void 0!==n&&n,u.style=void 0!==i?i:a.default.nightTableStyle.default,u.label=void 0!==o&&o,u.nightTables=[],u.features.push(u.nightTables),u}return _inherits(NightTable,e),n(NightTable,[{key:"draw",value:function draw(){this.nightTables.push(this.drawRectWithLabel(this.outline,this.style,this.label))}}]),NightTable}(o.default);t.default=l},function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function _inherits(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(1),o=_interopRequireDefault(i),u=r(0),a=_interopRequireDefault(u),l=function(e){function Stairs(e,t,r,n,i,o){_classCallCheck(this,Stairs);var u=_possibleConstructorReturn(this,(Stairs.__proto__||Object.getPrototypeOf(Stairs)).call(this,e));if(u.outline=void 0!==r&&Stairs.checkOutline(r),u.outline.length<4)throw Error("Not enough valid points in Stairs Outline");return u.origin=void 0!==t&&t,u.span=void 0!==n&&n,u.vertical=Stairs.isBoolean(i)&&i,u.style=void 0!==o?o:a.default.stairStyle.default,u.stairs=[],u.features.push(u.stairs),u}return _inherits(Stairs,e),n(Stairs,[{key:"draw",value:function draw(){var e=this.outline.reduce(function(e,t){return e.x<t.x?e:t}).x/this.span,t=this.outline.reduce(function(e,t){return e.y<t.y?e:t}).y/this.span,r=this.outline.reduce(function(e,t){return e.x>t.x?e:t}).x/this.span,n=this.outline.reduce(function(e,t){return e.y>t.y?e:t}).y/this.span;void 0!==this.vertical&&this.vertical?this.drawVerticalGrid(e,t,r,n,this.span,this.style,this.style):void 0!==this.vertical&&this.drawHorizontalGrid(e,t,r,n,this.span,this.style,this.style)}}]),Stairs}(o.default);t.default=l}])});