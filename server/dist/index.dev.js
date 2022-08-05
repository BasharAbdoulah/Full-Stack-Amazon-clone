"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _Products = _interopRequireDefault(require("./models/Products.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _util = require("@firebase/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var stripe = "sk_test_51LQrH6EMY6St7oZJnL7e9XEEfFe4FE0o4wL5NTJCSwqYe4Dp7F4jjk8TqQ5RpHHFQgTTmVlVrVYhaLJaJaspF3Yt00REbbAHzi";
// API
// - App config
var app = (0, _express["default"])(); // Middlewares

app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _express.json)());

_dotenv["default"].config();

app.use((0, _cors["default"])()); // Connect to DB

_mongoose["default"].connect("".concat(process.env.MONGO_URL), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("DB is conccted");
})["catch"](function (err) {
  return console.log(err);
});

app.get("/orders", function _callee(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Products["default"].find({}));

        case 3:
          orders = _context.sent;
          res.status(200).send(orders);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // API routes

app.post("/payment", function _callee2(request, response) {
  var order, newProduct;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          order = request.body.order;
          newProduct = new _Products["default"]({
            order: order
          });
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newProduct.save());

        case 5:
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](2);
          response.status(404).json({
            Error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 7]]);
});
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  return console.log("Server is running on port ".concat(PORT));
});