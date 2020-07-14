import routes from "../routes";
import User from "../models/user";
import passport from "passport";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password != password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        //계정 가입 정보 가져오기
        name,
        email,
      });
      await User.register(user, password); //계정 DB에 등록시키기
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.join,
  failureFlash: true,
});

export const logout = (req, res) => {
  //To Do : Process Log Out
  res.redirect(routes.home);
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail", videos });

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });
