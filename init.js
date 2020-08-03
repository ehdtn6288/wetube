"use strict";

require("@babel/polyfill");

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./models/video");

require("./models/comment");

require("./models/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 4000;

var handleListening = function handleListening() {
  return console.log("\u2705  Listening on: http://localhost:".concat(PORT));
};

_app["default"].listen(PORT, handleListening);