import multer from "multer";
import routes from "./routes";
import aws from "aws-sdk";
import multerS3 from "multer-s3";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; // 글로벌하게 줄 사용자 로그인 변수
  // console.log("현재 접속자 아이디 " + req.user);
  next();
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});
const multerVideo = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "wetubedeploy/videos",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "wetubedeploy/avatars",
  }),
});
// const multerVideo = multer({ dest: "uploads/videos" });
// const multerAvatar = multer({ dest: "uploads/avatars" });
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
