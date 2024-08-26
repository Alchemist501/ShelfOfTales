const nodemailer = require("nodemailer");
const catchAsync = require("./catchAsync");
module.exports = catchAsync(async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      post: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.User,
        pass: process.env.PASS,
      },
    });
    console.log(transporter);
    await transporter.sendMail({
      from: process.env.User,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("hooo");
  } catch (err) {
    console.log("Email not sent!!");
    console.log(err);
  }
});
