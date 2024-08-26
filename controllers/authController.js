const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  // Remove password from output
  user.password = undefined;
  const emailToken = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();
  const url = `${process.env.BASE_URL}users/${user._id}/verify/${emailToken.token}`;
  await sendEmail(user.email, "Verify Email", url);
  res.redirect(
    "/users/:id/verify/:token",
    {
      message: "A mail sent to your account, Please verify!",
    },
    statusCode
  );
};
exports.signup = catchAsync(async (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.passwordConfirm
  ) {
    return next(new AppError("Please fill the fields", 404));
  }
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, req, res);
});

exports.verifyEmail = catchAsync(async (req, res) => {
  console.lig("hiii");
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send({ message: "Invalid link" });
  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) return res.status(400).send({ message: "Invalid link" });
  await User.updateOne({ _id: user._id, verified: true });
  await token.remove();
  res
    .status(200)
    .send({ message: "Email verified successfully" })
    .redirect("/", { title: "Shelf Of Tales" }, 200);
});
//
///
////
//////
///////
////
///
///
///
///
//
///
//

exports.signupp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  // console.log(url);
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, req, res);
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});
exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.userName || !req.body.password) {
    return next(new AppError("Please provide username or password", 400));
  }
  const user = await User.findOne({ userName: req.body.userName }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("userName or password incorrect", 400));
  }
  createSendToken(user, 200, req, res);
  next();
});
