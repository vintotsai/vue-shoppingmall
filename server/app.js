const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()

const index = require('./routes/index')
const users = require('./routes/users')
const goods = require('./routes/goods')

// __dirname === '/Users/mac/dev/vue-shoppingMall/server'
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('.html', ejs.__express)
app.set('view engine', 'html')
// app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 全局拦截：如果没登录，有些功能不给看。
// app.use(function (req, res, next) {
//   console.log(req.cookies)
//   let cookie = req.cookies.userId;
//   if (cookie ) {
//     next();
//   } else {
//     if (req.originalUrl == 'users/login' || req.originalUrl == 'users/logout' || req.originalUrl.indexOf('/goods/list') > -1) {
//       next();
//     } else {
//       res.json({
//         status: '10001',
//         msg: 'Oops~Need login!',
//         result: ''
//       })
//     }
//   }
// })

app.use('/', index)
app.use('/users', users)
app.use('/goods', goods)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
