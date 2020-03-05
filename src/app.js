import express from "express";

import usersRouter from "./routes/users";
import indexRouter from "./routes";
import ClientIndexRouter from "./views/Client/routes";
import bannerRouter from "./routes/banner";
import newsRouter from "./routes/news";
import volunteerRouter from "./routes/volunteer";
import eventsRouter from "./routes/events";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import createError from "http-errors";
import jwt from './helper/jwt'
import {UnauthorizedError} from "express-jwt/lib";

// Required Module Files
let {mongoose} = require('./db/mongoose');

let app = express();

// view engine setup
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log(cookieParser())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

// make admin-lte dependencies (packages) inside node_modules static and accessible
app.use(
    "/script-adminlte",
    express.static(path.join(__dirname, "../node_modules/admin-lte/"))
);
app.use(jwt());
app.use('/admin', indexRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/banners', bannerRouter);
app.use('/admin/news',newsRouter);
app.use('/admin/volunteers',volunteerRouter);
app.use('//adminevents',eventsRouter);

//admin -> admin functionality
/// -> client func...
app.use('/', ClientIndexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err instanceof UnauthorizedError){
    console.log('error', err.message);
    res.render('login', {msg: ''});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
