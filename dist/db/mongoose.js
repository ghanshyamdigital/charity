"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].Promise = global.Promise;
var DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/charity';

_mongoose["default"].connect(DB_URL).then(function () {
  console.log("Database Connected..");
}, function (err) {
  console.log("err", err);
});

var _default = _mongoose["default"];
exports["default"] = _default;