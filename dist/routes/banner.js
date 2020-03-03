"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _banner = require("./../models/admin/banner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Get All Banner Data


router.get('    /', function (req, res) {
  console.log('users');

  _banner.Banners.find({}).then(function (data) {
    var dataObject = {
      "banners": data
    };
    res.render('banner/banners', {
      "data": dataObject
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); // Get All Banner Data

router.get('/add', function (req, res) {
  res.render('banner/banner-add');
}); // Add New Banner Data

router.post('/addBanner', function (req, res, next) {
  var Banner = new _banner.Banners({
    title: req.body.title,
    text: req.body.text,
    image: req.body.image
  });
  Banner.save().then(function (doc) {
    res.send(doc);
  }, function (e) {
    res.status(400).send(e);
  });
}); // Get Single Banner Data

router.get('/:id', function (req, res) {
  _banner.Banners.find({
    "_id": req.params.id
  }).then(function (data) {
    var dataObject = {
      "banner": data
    };
    res.send({
      "data": dataObject
    });
  })["catch"](function (err) {
    console.log(err);
  });
}); //Update Single Banner Data

router.post('/:id', function (req, res) {
  _banner.Banners.findByIdAndUpdate(req.params.id, req.body, // the callback function
  function (err, banner) {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    res.send('success');
  });
}); //Delete Single Banner Data

router["delete"]('/:id', function (req, res) {
  _banner.Banners.findByIdAndRemove(req.params.id, // the callback function
  function (err, banner) {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    return res.status(200).send("sucess");
  });
});
var _default = router;
exports["default"] = _default;