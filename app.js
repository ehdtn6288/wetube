import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("Welcome to my home!");

const handleProfile = (req, res) =>
  res.send(
    "This is my profile. 만나서 반가워요. 저는 노마드 코더의 강의를 공부중입니다. "
  );

const betweenHome = (req, res, next) => {
  console.log("Between");
  next();
};
// app.use(betweenHome); middleware 연습
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev")); // logger기능을 가진 "morgan"이라는 middleware사용하여, 요청과 응답사이에 로그를 확인하는 기능 추가

app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter);

export default app; // import 할때  =>   import userRouter from "./router"

// middleware가 next()없이, res.send()으로 끝나는 함수이면, 연결을 끝게 될 수 있다.
// const middleware = (req, res, next) => {
//   res.send("Nothing happend");
// };
//  app.get("/", middleware, handleHome); 다음에서 middleware 는 res.send()로 끝나므로, 연결이 끊긴다. (next()가 없어서 다음으로 안넘어가서)
