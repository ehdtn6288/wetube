import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controller/userController";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

//join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

//login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
