import routes from "../routes";
import Video from "../models/video";
import Comment from "../models/comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ _id: -1 })
      .populate("creator")
      .populate("comments");

    const videos_view_sorted = await Video.find({})
      .sort({ views: -1 })
      .populate("creator")
      .populate("comments");

    const videos_totalComments_sorted = await Video.find({})
      .sort({ totalComments: -1 })
      .populate("creator")
      .populate("comments");
    res.render("home", {
      pageTitle: "Home",
      videos,
      videos_view_sorted,
      videos_totalComments_sorted,
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
    })
      .populate("creator")
      .populate("comments");
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
  console.log(req.file);
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
      .populate("subComments") //~~!! populate 해줘야  view 에서 length 데이터를 제대로 가져올 수 있다. sinon, 값이 지워져도 개수에 반영되지 않는다.
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
      await Comment.find({ video: id }).remove();
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
      video: id,
      createdAt: Date.now(),
    });

    video.comments.push(newComment.id);
    video.totalComments += 1;
    user.comments.push(newComment.id);
    console.log("~~~~~!!!!" + video.totalComments);
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
        path: "subComments",
        model: "Comment",
        populate: [
          {
            path: "subComments",
            model: "Comment",
            populate: { path: "creator", model: "User" },
          },
          ,
        ],
      })
      .populate({
        path: "comments",
        model: "Comment",
        populate: [
          { path: "creator", model: "User" },
          {
            path: "subComments",
            model: "Comment",
            populate: { path: "creator", model: "User" },
          },
        ],
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
    params: { id },
  } = req;
  try {
    await Comment.findOneAndRemove({ _id: commentId });
    const subComments = await Comment.find({ comment: commentId });
    await Comment.find({ comment: commentId }).remove();

    const video = await Video.findById(id);
    console.log("~!!!!!!!!!!!!!!!!!!!!" + subComments.length);
    // console.log("~~~~~~~~~~~~~~~~~" + comments);
    video.totalComments += -1 - subComments.length;
    video.save();
    console.log("video TotalComments" + video.totalComments);
    res.status(200);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const postAddSubComment = async (req, res) => {
  const {
    body: { commentId, subComment },
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const comment = await Comment.findById(commentId);
    const newSubComment = await Comment.create({
      text: subComment,
      creator: user.id,
      video: id,
      comment: comment.id,
      createdAt: Date.now(),
    });
    comment.subComments.push(newSubComment.id);
    user.subComments.push(newSubComment.id);
    video.subComments.push(newSubComment.id);
    video.totalComments += 1;

    video.save();
    user.save();
    comment.save();
    console.log("~~~~~!!!!" + video.totalComments);
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
