import express from "express";
import routes from "../routes";
import {
  postIncreaseViews,
  postAddComments,
  getAddComment,
  deleteComment,
} from "../controller/videoController";

const apiRouter = express.Router();

//upload
apiRouter.post(routes.increaseViews, postIncreaseViews);

apiRouter.post(routes.addComments, postAddComments);
apiRouter.get(routes.addComments, getAddComment);

apiRouter.delete(routes.addComments, deleteComment);

export default apiRouter;
