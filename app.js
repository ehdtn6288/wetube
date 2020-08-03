"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _express = _interopRequireDefault(require("express"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _helmet = _interopRequireDefault(require("helmet"));

var _middlewares = require("./middlewares");

var _morgan = _interopRequireDefault(require("morgan"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _routes = _interopRequireDefault(require("./routes"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

require("./passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import 는 알파벳 순으로 정렬
// @babel/node 를 이용하여, ES6의 자바스크립트 코드를, 구버전의 코드형식으로 변환해주기 때문에, 최신형태의 자바스크립트 코드를 사용하여도, 호환성문제를 해결할 수 있다.
// 즉, babel을 이용하여, nodejs에서 최신 ES6 자바스크립트 코드를 사용할 수 있다.
// 기존 import방식  :  const express = require("express");
// 새로운 방식  ES6 :
// 1. import express from "express";   <node module에 추가된 패키지 이용시>
// 2. import express from "./express";   <export default express 했을 때, express를 가져오는 경우, 같은 폴더내에서>
// 3. import { express } from "express";   <export const express = require("express")와 같이 default가 아닐 때>
var app = (0, _express["default"])();
var CookieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.set("view engine", "pug");
app.set("views", _path["default"].join(__dirname, "views"));
app.use("/src", _express["default"]["static"]("src")); //정적 파일이 저장되어있는 경로가 /uploads 안에 있으므로,
// app.use("/static", express.static("static"));

app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])("dev")); // logger기능을 가진 "morgan"이라는 middleware사용하여, 요청과 응답사이에 로그를 확인하는 기능 추가

app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose["default"].connection
  })
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware); // 아래 라우터들이 get요청에 대한 응답을 하기전, 요청과 응답사이에 동착 !

app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].videos, _videoRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app; // import 할때  =>   import userRouter from "./router"
// middleware가 next()없이, res.send()으로 끝나는 함수이면, 연결을 끝게 될 수 있다.
// const middleware = (req, res, next) => {
//   res.send("Nothing happend");
// };
//  app.get("/", middleware, handleHome); 다음에서 middleware 는 res.send()로 끝나므로, 연결이 끊긴다. (next()가 없어서 다음으로 안넘어가서)

exports["default"] = _default;