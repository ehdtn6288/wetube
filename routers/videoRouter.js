import express from "express";
import routes from "../routes";
import {
  videoDetail,
  deleteVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

//Detail
videoRouter.get(routes.videoDetail(), videoDetail);

//Edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

//Delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

//
// videoRouter.get(routes.commentProfile(), commentUserDetail);
export default videoRouter;
