import express from "express";

import usersRouter from "./routes/users";
import indexRouter from "./routes";
import bannerRouter from "./routes/banner";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import createError from "http-errors";

// Required Module Files
let {mongoose} = require('./db/mongoose');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// make admin-lte dependencies (packages) inside node_modules static and accessible
app.use(
    "/script-adminlte",
    express.static(path.join(__dirname, "../node_modules/admin-lte/"))
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/banners', bannerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
