"use strict";

var _config = _interopRequireDefault(require("../config/config.dev"));

var _user = _interopRequireDefault(require("../models/admin/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expressJwt = require('express-jwt');

module.exports = jwt;

function jwt() {
  var secret = _config["default"].secret;
  return expressJwt({
    secret: secret,
    getToken: getToken
  }).unless({
    path: [// public routes that don't require authentication
    '/authenticate', '/register', '/', //  '/dashboard',
    '/login']
  });
}

function isRevoked(_x, _x2, _x3) {
  return _isRevoked.apply(this, arguments);
}

function _isRevoked() {
  _isRevoked = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, payload, done) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].getById(payload.sub);

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, true));

          case 5:
            done();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _isRevoked.apply(this, arguments);
}

var getToken = function getToken(req) {
  console.log(req.cookies.token);
  return req.cookies.token;
};