var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getUsers', indexRouter);
app.use('/getUserNameById', indexRouter);
app.use('/userByUsername', indexRouter);
app.use('/isUser', indexRouter);
app.use('/userValidated', indexRouter);
app.use('/getUSerRole', indexRouter);

app.use('/getBooks', indexRouter);
app.use('/BooksById', indexRouter);

app.use('/getCartItems_o_id', indexRouter);
app.use('/getCartItems', indexRouter);
app.use('/CartItems_id_idUSer', indexRouter);
app.use('/Cantidad_id_idUSer', indexRouter);
app.use('/Update_Cant_item', indexRouter);
app.use('/del_one_item', indexRouter);
app.use('/del_all_item', indexRouter);
app.use('/delete_Cart_byuser', indexRouter);
app.use('/newItemCart', indexRouter);
app.use('/CartItems_id', indexRouter);
app.use('/getSumItemCostById', indexRouter);
app.use('/getOrderById', indexRouter);


app.use('/save_history_created', indexRouter);
app.use('/getHistory', indexRouter);
app.use('/getLastStatusToken_History', indexRouter);
app.use('/updateTokenStatus', indexRouter);



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
app.listen(8081,function () {
    console.log('Corriendo en el puerto: 8081');
});
module.exports = app;


