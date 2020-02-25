"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controllers/users.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/", function (req, res, next) {
  res.redirect("/login");
});
router.get("/dashboard", function (req, res, next) {
  res.render('dashboard');
});
router.post('/login', function (req, res) {
  _users["default"].authenticate(req, res);
});
router.post('/register', function (req, res) {
  _users["default"].addUser(req, res);
});
var _default = router;
exports["default"] = _default;