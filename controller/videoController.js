import routes from "../routes";
import Video from "../models/video";
import Comment from "../models/comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ _id: -1 })
      .populate("creator")
      .populate("comments");
    console.log(videos[1].creator.name);
    res.render("home", {
      pageTitle: "Home",
      videos,
    });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  console.log(searchingBy);
  //const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, duration },
    file: { location },
  } = req;
  console.log(duration);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    duration,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
  //To Do : Upload and save video 위에서 받은 변수 이용
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        model: "Comment",
        populate: { path: "creator", model: "User" },
      });

    res.render("videoDetail", { pageTitle: `${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.render("videoDetail", { pageTitle: "VideoDetail", video });
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);

    if (video.creator != req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: "editVideo", video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.render("editVideo", { pageTitle: "editVideo" });
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator != req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postIncreaseViews = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views = video.views + 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const postAddComments = async (req, res) => {
  const {
    body: { comment },
    params: { id },
    user,
  } = req;

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    user.comments.push(newComment.id);
    video.save();
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const getAddComment = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        model: "Comment",
        populate: { path: "creator", model: "User" },
      });
    const videoData = {
      video,
      user,
    };

    res.send(videoData);

    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const deleteComment = async (req, res) => {
  const {
    body: { commentId },
  } = req;
  try {
    await Comment.findOneAndRemove({ _id: commentId });

    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

// export const commentUserDetail = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     const user = await User.findById(id).populate("videos");

//     res.render("userDetail", { pageTitle: "UserDetail", user });
//   } catch (error) {
//     console.log(error);
//     res.redirect(routes.home);
//   }
// };
