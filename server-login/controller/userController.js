const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
}).single("image");

const register_user = async (req, res) => {
  debugger;
  console.log(req.file);
  var mybodydata = {
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password,
    image: req.file.filename,
  };
  User.findOne({
    $or: [{ email: req.body.email }],
  }).then((user) => {
    if (user) {
      return res.json({ status: false, msg: "User already exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          mybodydata.password = hash;
          debugger;
          var data = new User(mybodydata);
          data
            .save()
            .then((user) => {
              if (user) {
                return res.json({ status: true, msg: "success!" });
              }
            })
            .catch((err) => {
              console.log(err);
              // LogError(err);
              return res.json({
                status: false,
                msg: "Please Fill All Fields.",
              });
            });
        });
      });
    }
  });
};

const login_user = async (req, res) => {
  debugger;
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ $or: [{ email: email }, { password: password }] })
    .then((user) => {
      if (!user) {
        return res.json({ status: 0, msg: "Enter a valid E-Mail" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((isMatch) => {
          if (isMatch) {
            jwt.sign(user._doc, "SGG", { expiresIn: "30d" }, (err, token) => {
              if (err) {
                return res.json({ status: 0, msg: "Server error occurred 1" });
              }
              return res.json({
                status: 1,
                msg: "Login successful",
                data: { token: "Bearer " + token },
              });
            });
          } else {
            return res.json({ status: 0, msg: "Password is incorrect" });
          }
        });
      }
    })
    .catch((err) => {
      return res.json({ status: 0, msg: "Server Error Occurred 2" });
    });
};

const allUsers = async (req, res) => {
  User.find().then((user) => {
    if (!user) {
      return res.json({ msg: "not found", data: [] });
    } else {
      return res.json({ status: true, data: user });
    }
  });
};

module.exports = { login_user, register_user, allUsers, upload };
