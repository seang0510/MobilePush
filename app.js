const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const skylog = require("./helper/logger");

// info와 error 로그 구현
skylog.info("Hello world!"); 
//MySQL Session setup
const options = {
  createDatabaseTable: true,
};


const indexRouter = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery-ui/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery.cookie')));




app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//test
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { layout: false });
});

console.log("start!!");
module.exports = app;
