"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; //Users

var USERS = "/users";
var EDIT_PROFILE = "/edit-profile";
var USER_DETAIL = "/:id";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; //Vieos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete";
var COMMENT_PROFILE = "/comment_profile/:id"; //Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; //Api

var API = "/api";
var INCREASE_VIEWS = "/:id/views";
var ADD_COMMENTS = "/:id/comments";
var ADD_SUB_COMMENT = "/:id/subComments"; //Object

var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  gitHub: GITHUB,
  gitHubCallBack: GITHUB_CALLBACK,
  me: ME,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/videos/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/videos/".concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  api: API,
  increaseViews: INCREASE_VIEWS,
  addComments: ADD_COMMENTS,
  addSubComments: ADD_SUB_COMMENT,
  commentProfile: function commentProfile(id) {
    if (id) {
      return "/comment_profile/".concat(id);
    } else {
      COMMENT_PROFILE;
    }
  }
};
var _default = routes;
exports["default"] = _default;