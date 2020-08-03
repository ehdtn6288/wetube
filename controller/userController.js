"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.users = exports.logout = exports.postLogin = exports.getLogin = exports.postGithubLogin = exports.githubLogin = exports.githubLoginCallback = exports.postJoin = exports.getJoin = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _user = _interopRequireDefault(require("../models/user"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;

            if (!(password != password2)) {
              _context.next = 6;
              break;
            }

            res.status(400);
            res.render("join", {
              pageTitle: "Join"
            });
            _context.next = 19;
            break;

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return (0, _user["default"])({
              //계정 가입 정보 가져오기
              name: name,
              email: email
            });

          case 9:
            user = _context.sent;
            _context.next = 12;
            return _user["default"].register(user, password);

          case 12:
            //계정 DB에 등록시키기
            next();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, email, name, avatar_url, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, email = _profile$_json.email, name = _profile$_json.name, avatar_url = _profile$_json.avatar_url;
            _context2.next = 3;
            return _user["default"].findOne({
              email: email
            });

          case 3:
            user = _context2.sent;
            _context2.prev = 4;

            if (!user) {
              _context2.next = 9;
              break;
            }

            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 9:
            _context2.next = 11;
            return _user["default"].create({
              name: name,
              email: email,
              avatarUrl: avatar_url,
              githubId: id
            });

          case 11:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](4);
            return _context2.abrupt("return", cb(_context2.t0));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 15]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var githubLogin = _passport["default"].authenticate("github");

exports.githubLogin = githubLogin;

var postGithubLogin = function postGithubLogin(req, res) {
  res.redirect(_routes["default"].home);
};

exports.postGithubLogin = postGithubLogin;

var getLogin = function getLogin(req, res) {
  // console.log(backUrl);
  res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate("local", {
  successRedirect: _routes["default"].home,
  failureRedirect: _routes["default"].login
});

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  //To Do : Process Log Out
  req.logout();
  res.redirect(_routes["default"].home);
};

exports.logout = logout;

var users = function users(req, res) {
  return res.render("users", {
    pageTitle: "Users"
  });
};

exports.users = users;

var getMe = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _user["default"].findById(req.user.id).populate({
              path: "videos",
              model: "Video",
              populate: {
                path: "creator",
                model: "User"
              }
            });

          case 3:
            user = _context3.sent;
            res.render("userDetail", {
              pageTitle: "UserDetail",
              user: user
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getMe(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var userDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _user["default"].findById(id).populate({
              path: "videos",
              model: "Video",
              populate: {
                path: "creator",
                model: "User"
              }
            });

          case 4:
            user = _context4.sent;
            console.log("이유저는 " + user.videos);
            res.render("userDetail", {
              pageTitle: "UserDetail",
              user: user
            });
            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  }));

  return function userDetail(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  res.render("editProfile", {
    pageTitle: "editProfile"
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, name, email, file;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, file = req.file;
            _context5.prev = 1;
            _context5.next = 4;
            return _user["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              avatarUrl: file ? file.path : req.user.avatarUrl
            });

          case 4:
            res.redirect(_routes["default"].me);
            _context5.next = 11;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            res.render("editProfile", {
              pageTitle: "editProfile"
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 7]]);
  }));

  return function postEditProfile(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  res.render("changePassword", {
    pageTitle: "ChangePassword"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = function postChangePassword(req, res) {
  var _req$body3 = req.body,
      oldPassword = _req$body3.oldPassword,
      newPassword = _req$body3.newPassword,
      newPassword2 = _req$body3.newPassword2;

  try {
    if (newPassword !== newPassword2) {
      res.status(400);
      res.redirect("/users".concat(_routes["default"].changePassword));
      return;
    }

    req.user.changePassword(oldPassword, newPassword);
    res.redirect(_routes["default"].me);
  } catch (error) {
    res.status(400);
    res.redirect("/users".concat(_routes["default"].changePassword));
  }
};

exports.postChangePassword = postChangePassword;