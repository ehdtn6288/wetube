"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controller/videoController");

var _userController = require("../controller/userController");

var _middlewares = require("../middlewares");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].search, _videoController.search); //join

globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, _userController.postLogin); //login

globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, _userController.postLogin);
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout);
globalRouter.get(_routes["default"].gitHub, _userController.githubLogin);
globalRouter.get(_routes["default"].gitHubCallBack, _passport["default"].authenticate("github", {
  failureRedirect: _routes["default"].login
}), _userController.postGithubLogin);
globalRouter.get(_routes["default"].me, _userController.getMe);
var _default = globalRouter;
exports["default"] = _default;