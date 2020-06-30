import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
// @babel/node 를 이용하여, ES6의 자바스크립트 코드를, 구버전의 코드형식으로 변환해주기 때문에, 최신형태의 자바스크립트 코드를 사용하여도, 호환성문제를 해결할 수 있다.
// 즉, babel을 이용하여, nodejs에서 최신 ES6 자바스크립트 코드를 사용할 수 있다.
// 기존 import방식  :  const express = require("express");
// 새로운 방식  ES6 :
// 1. import express from "express";   <node module에 추가된 패키지 이용시>
// 2. import express from "./express";   <export default express 했을 때, express를 가져오는 경우, 같은 폴더내에서>
// 3. import { express } from "express";   <export const express = require("express")와 같이 default가 아닐 때>

const app = express();

// app.use(betweenHome); middleware 연습
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev")); // logger기능을 가진 "morgan"이라는 middleware사용하여, 요청과 응답사이에 로그를 확인하는 기능 추가

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // import 할때  =>   import userRouter from "./router"

// middleware가 next()없이, res.send()으로 끝나는 함수이면, 연결을 끝게 될 수 있다.
// const middleware = (req, res, next) => {
//   res.send("Nothing happend");
// };
//  app.get("/", middleware, handleHome); 다음에서 middleware 는 res.send()로 끝나므로, 연결이 끊긴다. (next()가 없어서 다음으로 안넘어가서)
