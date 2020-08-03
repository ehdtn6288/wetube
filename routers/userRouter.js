"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _userController = require("../controller/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router(); //여기서 export하면,  import 할때  =>   import {userRouter} from "./router"


userRouter.get(_routes["default"].home, _userController.users); //Eidt Profile

userRouter.get(_routes["default"].editProfile, _middlewares.onlyPrivate, _userController.getEditProfile);
userRouter.post(_routes["default"].editProfile, _middlewares.onlyPrivate, _middlewares.uploadAvatar, _userController.postEditProfile); //Change Password

userRouter.get(_routes["default"].changePassword, _middlewares.onlyPrivate, _userController.getChangePassword);
userRouter.post(_routes["default"].changePassword, _middlewares.onlyPrivate, _userController.postChangePassword);
userRouter.get(_routes["default"].userDetail(), _userController.userDetail);
/*!!!! userDetail은 /:id로 변하는 값을 받는다. 따라서, /:id가 포함된 경로에대한 로직이 먼저
정의되면, 그 아래있는 경로에 대해서, /:id의 변하는 텍스트값을 가진 경로로 인식하여, /:id에 대한
로직만 동작하고, 아래있는 코드는 작동하지 않는다. 
따라서, ~!!! userDetail과 같이 /:id가 포함된 경로는 제일 아래줄에 입력해주자! 

아니면, videoRouter처럼, /:id/edit과 같이 /:id 이후에 하위 경로를 포함하여 나타내면 된다. 
*/

var _default = userRouter;
exports["default"] = _default;