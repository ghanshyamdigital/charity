"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = require("./../models/admin/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Get All User Data


router.get('/', function (req, res) {
  console.log('users');

  _user.Users.find({}).then(function (data) {
    var dataObject = {
      "title": "Users",
      "users": data
    };
    res.send({
      "data": dataObject
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); // Add New User Data

router.post('/', function (req, res, next) {
  var User = new _user.Users({
    email: req.body.email,
    password: req.body.password
  });
  User.save().then(function (doc) {
    res.send(doc);
  }, function (e) {
    res.status(400).send(e);
  });
}); // Get Single User Data

router.get('/:id', function (req, res) {
  _user.Users.find({
    "_id": req.params.id
  }).then(function (data) {
    var dataObject = {
      "modalTitle": "Edit User",
      "modalSubmit": "Update",
      "users": data
    };
    res.send({
      "data": dataObject
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); //Update Single User Data

router.post('/:id', function (req, res) {
  _user.Users.findByIdAndUpdate(req.params.id, req.body, // the callback function
  function (err, user) {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    res.send('success');
  });
}); //Delete Single User Data

router["delete"]('/:id', function (req, res) {
  _user.Users.findByIdAndRemove(req.params.id, // the callback function
  function (err, user) {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    return res.status(200).send("sucess");
  });
});
var _default = router;
exports["default"] = _default;