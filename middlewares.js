"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.uploadAvatar = exports.uploadVideo = exports.localsMiddleware = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _routes = _interopRequireDefault(require("./routes"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "Wetube";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null; // 글로벌하게 줄 사용자 로그인 변수
  // console.log("현재 접속자 아이디 " + req.user);

  next();
}; // const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_PRIVATE_KEY,
// });
// const multerVideo = multer({
//   storage: multerS3({
//     s3: s3,
//     acl: "public-read",
//     bucket: "practicewetube/videos",
//   }),
// });
// const multerAvatar = multer({
//   storage: multerS3({
//     s3: s3,
//     acl: "public-read",
//     bucket: "practicewetube/avatars",
//   }),
// });


exports.localsMiddleware = localsMiddleware;
var multerVideo = (0, _multer["default"])({
  dest: "src/uploads/videos"
});
var multerAvatar = (0, _multer["default"])({
  dest: "src/uploads/avatars"
});
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
  }
};

exports.onlyPrivate = onlyPrivate;