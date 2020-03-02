"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config.dev"));

var _generatePassword = _interopRequireDefault(require("generate-password"));

var _user = _interopRequireDefault(require("../models/admin/user"));

var _md = _interopRequireDefault(require("md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcryptjs');

var controller = {};

controller.authenticate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var user, _user$toObject, hash, userWithoutHash, token, expiration;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].getUserByEmail(req.body.email);

          case 3:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _user["default"].getUserByName(req.body.email);

          case 7:
            _context.t0 = _context.sent;

          case 8:
            user = _context.t0;
            console.log("userData", user);

            if (!(user === null)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              email: 'Email or Username is not found.'
            }));

          case 12:
            if (!(user && bcrypt.compareSync(req.body.password, user.hash))) {
              _context.next = 20;
              break;
            }

            _user$toObject = user.toObject(), hash = _user$toObject.hash, userWithoutHash = _objectWithoutProperties(_user$toObject, ["hash"]);
            token = jwt.sign({
              sub: user._id,
              role: user.role
            }, _config["default"].secret);
            expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
            res.cookie('token', token, {
              expires: new Date(Date.now() + expiration),
              secure: false,
              // set to true if your using https
              httpOnly: true
            });
            res.redirect(302, '/dashboard');
            _context.next = 21;
            break;

          case 20:
            return _context.abrupt("return", res.status(400).send({
              password: 'Password is incorrect.'
            }));

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](0);
            console.log("Error in authenticate- ".concat(_context.t1));
            res.status(400).send('Got error in authentication');

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

controller.addUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var name, userToAdd, user, userByName, savedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = req.body.firstName + '' + req.body.lastName;
            userToAdd = (0, _user["default"])({
              email: req.body.email,
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              hashKey: (0, _md["default"])(name)
            });
            _context2.prev = 2;
            _context2.next = 5;
            return _user["default"].getUserByEmail(userToAdd.email);

          case 5:
            user = _context2.sent;

            if (!user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              email: 'Email "' + user.email + '" is already taken.'
            }));

          case 8:
            _context2.next = 10;
            return _user["default"].getUserByName(userToAdd.username);

          case 10:
            userByName = _context2.sent;

            if (!userByName) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              username: 'Username "' + userByName.username + '" is already taken.'
            }));

          case 13:
            _context2.next = 15;
            return _user["default"].addUser(userToAdd, req.body.password);

          case 15:
            savedUser = _context2.sent;
            console.log('Adding user...');
            res.send(savedUser);
            _context2.next = 24;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](2);
            console.error("Error in adding user- ".concat(_context2.t0));
            res.status(400).send('Got error in addUser');

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 20]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = controller;
exports["default"] = _default;