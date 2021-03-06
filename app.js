var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');

//라우터들
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var talkRouter = require('./routes/talk');
var feedRouter = require('./routes/feed');
var tvRouter = require('./routes/tv');
var facetimeRouter = require('./routes/facetime');
var commRouter = require('./routes/comm');
var musicRouter = require('./routes/music').default;


var app = express();

// view engine setup
app.engine('.handlebars', exphbs({
  extname : 'handlebars',
  defaultLayout: 'main',
  layoutsDir : __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
//https://hackersandslackers.com/handlebars-templates-expressjs/
// app.set('view engine', 'pug'); //pug 말고 handlebars 쓸꺼야!
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//라우팅
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/talk', talkRouter);
app.use('/feed', feedRouter);
app.use('/tv', tvRouter);
app.use('/facetime', facetimeRouter);
app.use('/comm', commRouter);
app.use('/music', musicRouter);

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
  console.log(res.locals.message);
  res.render('error');
});

module.exports = app;
