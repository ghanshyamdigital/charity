"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Register = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var registerSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Why no username?']
  },
  email: {
    type: String,
    required: [true, 'Why no email?']
  },
  password: {
    type: String,
    required: [true, 'Why no password?']
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

var Register = _mongoose["default"].model('Registers', registerSchema);

exports.Register = Register;