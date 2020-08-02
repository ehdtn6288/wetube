import express from "express";
import routes from "../routes";
import {
  postIncreaseViews,
  postAddComments,
  getAddComment,
  deleteComment,
  postAddSubComment,
} from "../controller/videoController";

const apiRouter = express.Router();

//upload
apiRouter.post(routes.increaseViews, postIncreaseViews);

apiRouter.post(routes.addComments, postAddComments);
apiRouter.get(routes.addComments, getAddComment);

apiRouter.delete(routes.addComments, deleteComment);

apiRouter.post(routes.addSubComments, postAddSubComment);

export default apiRouter;
