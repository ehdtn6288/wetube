"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("./models/user"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _userController = require("./controller/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_user["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "http://localhost:4000/auth/github/callback"
}, _userController.githubLoginCallback));

_passport["default"].serializeUser(_user["default"].serializeUser());

_passport["default"].deserializeUser(_user["default"].deserializeUser());