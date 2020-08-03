"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controller/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router(); //upload


apiRouter.post(_routes["default"].increaseViews, _videoController.postIncreaseViews);
apiRouter.post(_routes["default"].addComments, _videoController.postAddComments);
apiRouter.get(_routes["default"].addComments, _videoController.getAddComment);
apiRouter["delete"](_routes["default"].addComments, _videoController.deleteComment);
apiRouter.post(_routes["default"].addSubComments, _videoController.postAddSubComment);
var _default = apiRouter;
exports["default"] = _default;