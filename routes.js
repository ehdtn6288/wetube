// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users

const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const USER_DETAIL = "/:id";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Vieos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const COMMENT_PROFILE = "/comment_profile/:id";

//Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//Api
const API = "/api";
const INCREASE_VIEWS = "/:id/views";
const ADD_COMMENTS = "/:id/comments";
const ADD_SUB_COMMENT = "/:id/subComments";

//Object
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,

  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
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
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  api: API,
  increaseViews: INCREASE_VIEWS,
  addComments: ADD_COMMENTS,
  addSubComments: ADD_SUB_COMMENT,
  commentProfile: (id) => {
    if (id) {
      return `/comment_profile/${id}`;
    } else {
      COMMENT_PROFILE;
    }
  },
};

export default routes;
