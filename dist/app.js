"use strict";

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./routes/users"));

var _routes = _interopRequireDefault(require("./routes"));

var _banner = _interopRequireDefault(require("./routes/banner"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _jwt = _interopRequireDefault(require("./helper/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Required Module Files
var _require = require('./db/mongoose'),
    mongoose = _require.mongoose;

var app = (0, _express["default"])(); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, _cookieParser["default"])());
console.log((0, _cookieParser["default"])());
app.use((0, _jwt["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../public'))); // make admin-lte dependencies (packages) inside node_modules static and accessible

app.use("/script-adminlte", _express["default"]["static"](_path["default"].join(__dirname, "../node_modules/admin-lte/")));
app.use('/', _routes["default"]);
app.use('/users', _users["default"]);
app.use('/banners', _banner["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;