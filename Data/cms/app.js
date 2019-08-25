var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var complaintRouter = require('./routes/complaint');
var problemRouter = require('./routes/problem');
var getdataRouter = require('./routes/getdata');
var vipRouter = require('./routes/vip');
var weeklyRouter = require('./routes/weekly');
var leaveRouter = require('./routes/leave');
var mineRouter = require('./routes/mine');
var mineaddRouter = require('./routes/mineadd');

var app = express();
// app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//登录接口路由
app.use('/login', loginRouter);
//提交投诉接口路由
app.use('/complaint', complaintRouter);
//提交技术问题接口路由
app.use('/problem', problemRouter);
//获取数据接口路由
app.use('/getdata', getdataRouter);
//vip申请接口路由
app.use('/vip', vipRouter);
//周报路由接口
app.use('/weekly', weeklyRouter);
// 学员请假路由接口
app.use('/leave', leaveRouter);
// 个人资料修改接口路由
app.use('/mine', mineRouter);
// 提交个人资料接口路由
app.use('/mineadd', mineaddRouter);


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