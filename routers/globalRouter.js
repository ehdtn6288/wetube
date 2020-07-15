import express from "express";
import routes from "../routes";
import { home, search } from "../controller/videoController";

import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  postGithubLogin,
  githubLogin,
  getMe,
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

//join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

//login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
  routes.gitHubCallBack,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
