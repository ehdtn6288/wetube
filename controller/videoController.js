"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postAddSubComment = exports.deleteComment = exports.getAddComment = exports.postAddComments = exports.postIncreaseViews = exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _video9 = _interopRequireDefault(require("../models/video"));

var _comment = _interopRequireDefault(require("../models/comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos, videos_view_sorted, videos_totalComments_sorted;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _video9["default"].find({}).sort({
              _id: -1
            }).populate("creator").populate("comments");

          case 3:
            videos = _context.sent;
            _context.next = 6;
            return _video9["default"].find({}).sort({
              views: -1
            }).populate("creator").populate("comments");

          case 6:
            videos_view_sorted = _context.sent;
            _context.next = 9;
            return _video9["default"].find({}).sort({
              totalComments: -1
            }).populate("creator").populate("comments");

          case 9:
            videos_totalComments_sorted = _context.sent;
            res.render("home", {
              pageTitle: "Home",
              videos: videos,
              videos_view_sorted: videos_view_sorted,
              videos_totalComments_sorted: videos_totalComments_sorted
            });
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render("home", {
              pageTitle: "Home",
              videos: []
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            _context2.prev = 2;
            _context2.next = 5;
            return _video9["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 5:
            videos = _context2.sent;
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 11:
            console.log(searchingBy); //const searchingBy = req.query.term;

            res.render("search", {
              pageTitle: "Search",
              searchingBy: searchingBy,
              videos: videos
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.search = search;

var getUpload = function getUpload(req, res) {
  res.render("upload", {
    pageTitle: "Upload"
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, description, duration, path, newVideo;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, duration = _req$body.duration, path = req.file.path;
            console.log("~~~~~~~~~~" + path);
            _context3.next = 4;
            return _video9["default"].create({
              fileUrl: path,
              title: title,
              description: description,
              duration: duration,
              creator: req.user.id
            });

          case 4:
            newVideo = _context3.sent;
            req.user.videos.push(newVideo.id);
            req.user.save();
            res.redirect(_routes["default"].videoDetail(newVideo.id)); //To Do : Upload and save video 위에서 받은 변수 이용

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _video;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _video9["default"].findById(id).populate("creator").populate("subComments") //~~!! populate 해줘야  view 에서 length 데이터를 제대로 가져올 수 있다. sinon, 값이 지워져도 개수에 반영되지 않는다.
            .populate({
              path: "comments",
              model: "Comment",
              populate: {
                path: "creator",
                model: "User"
              }
            });

          case 4:
            _video = _context4.sent;
            res.render("videoDetail", {
              pageTitle: "".concat(_video.title),
              video: _video
            });
            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.render("videoDetail", {
              pageTitle: "VideoDetail",
              video: video
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function videoDetail(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _video2;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _video9["default"].findById(id);

          case 4:
            _video2 = _context5.sent;

            if (!(_video2.creator != req.user.id)) {
              _context5.next = 9;
              break;
            }

            throw Error();

          case 9:
            res.render("editVideo", {
              pageTitle: "editVideo",
              video: _video2
            });

          case 10:
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].home);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 12]]);
  }));

  return function getEditVideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _req$body2, title, description;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            _context6.prev = 1;
            _context6.next = 4;
            return _video9["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 4:
            res.redirect(_routes["default"].videoDetail(id));
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            res.render("editVideo", {
              pageTitle: "editVideo"
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 7]]);
  }));

  return function postEditVideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _video3;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _video9["default"].findById(id);

          case 4:
            _video3 = _context7.sent;

            if (!(_video3.creator != req.user.id)) {
              _context7.next = 9;
              break;
            }

            throw Error();

          case 9:
            _context7.next = 11;
            return _video9["default"].findOneAndRemove({
              _id: id
            });

          case 11:
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            console.log(_context7.t0);

          case 16:
            res.redirect(_routes["default"].home);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13]]);
  }));

  return function deleteVideo(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteVideo = deleteVideo;

var postIncreaseViews = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, _video4;

    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.prev = 1;
            _context8.next = 4;
            return _video9["default"].findById(id);

          case 4:
            _video4 = _context8.sent;
            _video4.views = _video4.views + 1;

            _video4.save();

            res.status(200);
            _context8.next = 14;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](1);
            res.status(400);
            console.log(_context8.t0);

          case 14:
            _context8.prev = 14;
            res.end();
            return _context8.finish(14);

          case 17:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 10, 14, 17]]);
  }));

  return function postIncreaseViews(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.postIncreaseViews = postIncreaseViews;

var postAddComments = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var comment, id, user, _video5, newComment;

    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            comment = req.body.comment, id = req.params.id, user = req.user;
            _context9.prev = 1;
            _context9.next = 4;
            return _video9["default"].findById(id);

          case 4:
            _video5 = _context9.sent;
            _context9.next = 7;
            return _comment["default"].create({
              text: comment,
              creator: user.id,
              video: id,
              createdAt: Date.now()
            });

          case 7:
            newComment = _context9.sent;

            _video5.comments.push(newComment.id);

            _video5.totalComments += 1;
            user.comments.push(newComment.id);
            console.log("~~~~~!!!!" + _video5.totalComments);

            _video5.save();

            user.save();
            res.status(200);
            _context9.next = 21;
            break;

          case 17:
            _context9.prev = 17;
            _context9.t0 = _context9["catch"](1);
            res.status(400);
            console.log(_context9.t0);

          case 21:
            _context9.prev = 21;
            res.end();
            return _context9.finish(21);

          case 24:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[1, 17, 21, 24]]);
  }));

  return function postAddComments(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.postAddComments = postAddComments;

var getAddComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var id, user, _video6, videoData;

    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            id = req.params.id, user = req.user;
            _context10.prev = 1;
            _context10.next = 4;
            return _video9["default"].findById(id).populate("creator").populate({
              path: "subComments",
              model: "Comment",
              populate: [{
                path: "subComments",
                model: "Comment",
                populate: {
                  path: "creator",
                  model: "User"
                }
              },,]
            }).populate({
              path: "comments",
              model: "Comment",
              populate: [{
                path: "creator",
                model: "User"
              }, {
                path: "subComments",
                model: "Comment",
                populate: {
                  path: "creator",
                  model: "User"
                }
              }]
            });

          case 4:
            _video6 = _context10.sent;
            videoData = {
              video: _video6,
              user: user
            };
            res.send(videoData);
            res.status(200);
            _context10.next = 14;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](1);
            res.status(400);
            console.log(_context10.t0);

          case 14:
            _context10.prev = 14;
            res.end();
            return _context10.finish(14);

          case 17:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[1, 10, 14, 17]]);
  }));

  return function getAddComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getAddComment = getAddComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var commentId, id, subComments, _video7;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            commentId = req.body.commentId, id = req.params.id;
            _context11.prev = 1;
            _context11.next = 4;
            return _comment["default"].findOneAndDelete({
              _id: commentId
            });

          case 4:
            _context11.next = 6;
            return _comment["default"].find({
              comment: commentId
            });

          case 6:
            subComments = _context11.sent;
            _context11.next = 9;
            return _comment["default"].find({
              comment: commentId
            }).remove();

          case 9:
            _context11.next = 11;
            return _video9["default"].findById(id);

          case 11:
            _video7 = _context11.sent;
            console.log("~!!!!!!!!!!!!!!!!!!!!" + subComments.length); // console.log("~~~~~~~~~~~~~~~~~" + comments);

            _video7.totalComments += -1 - subComments.length;

            _video7.save();

            console.log("video TotalComments" + _video7.totalComments);
            res.status(200);
            _context11.next = 23;
            break;

          case 19:
            _context11.prev = 19;
            _context11.t0 = _context11["catch"](1);
            res.status(400);
            console.log(_context11.t0);

          case 23:
            _context11.prev = 23;
            res.end();
            return _context11.finish(23);

          case 26:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[1, 19, 23, 26]]);
  }));

  return function deleteComment(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;

var postAddSubComment = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var _req$body3, commentId, subComment, id, user, _video8, comment, newSubComment;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _req$body3 = req.body, commentId = _req$body3.commentId, subComment = _req$body3.subComment, id = req.params.id, user = req.user;
            _context12.prev = 1;
            _context12.next = 4;
            return _video9["default"].findById(id);

          case 4:
            _video8 = _context12.sent;
            _context12.next = 7;
            return _comment["default"].findById(commentId);

          case 7:
            comment = _context12.sent;
            _context12.next = 10;
            return _comment["default"].create({
              text: subComment,
              creator: user.id,
              video: id,
              comment: comment.id,
              createdAt: Date.now()
            });

          case 10:
            newSubComment = _context12.sent;
            comment.subComments.push(newSubComment.id);
            user.subComments.push(newSubComment.id);

            _video8.subComments.push(newSubComment.id);

            _video8.totalComments += 1;

            _video8.save();

            user.save();
            comment.save();
            console.log("~~~~~!!!!" + _video8.totalComments);
            res.status(200);
            _context12.next = 26;
            break;

          case 22:
            _context12.prev = 22;
            _context12.t0 = _context12["catch"](1);
            res.status(400);
            console.log(_context12.t0);

          case 26:
            _context12.prev = 26;
            res.end();
            return _context12.finish(26);

          case 29:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[1, 22, 26, 29]]);
  }));

  return function postAddSubComment(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}(); // export const commentUserDetail = async (req, res) => {
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


exports.postAddSubComment = postAddSubComment;