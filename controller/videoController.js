import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  console.log(searchingBy);
  //const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  //To Do : Upload and save video 위에서 받은 변수 이용
  res.redirect(routes.videoDetail(1111));
};

export const videoDetail = (req, res) => {
  res.render("videoDetail", { pageTitle: "VideoDetil" });
  console.log(req.params);
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "editVideo" });

export const deleteVideo = (req, res) =>
  res.render("Delete Video", { pageTitle: "DeleteVideo" });
