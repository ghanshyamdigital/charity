"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Banners = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var bannerSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Why no title?']
  },
  text: {
    type: String,
    required: [true, 'Why no text?']
  },
  image: {
    type: String,
    required: [true, 'Why no image?']
  },
  isVisible: {
    type: Boolean,
    "default": true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var Banners = _mongoose["default"].model('Banners', bannerSchema);

exports.Banners = Banners;