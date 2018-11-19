var express = require('express');
var router = express.Router();
var db_users = require('../persistence/users');
var db_books = require('../persistence/books');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest miniApp Tpaga' });
});
/* GET Listado de usuarios en DB*/
router.get('/getUsers', function(req, res, next) {
  db_users.getUsers(function(rows2,fields){
    res.json(rows2);
  });
});
/* GET Listado de libros en DB*/
router.get('/getBooks', function(req, res, next) {
  db_books.getBooks(function(rows2,fields){
    res.json(rows2);
  });
});
/* POST informacion de libro por id en DB*/
router.post('/BooksById', function(req, res, next) {
  var bookId = req.body.id;
  var respuesta = [];
  db_books.getBookById(bookId,function(rows,fields){
    respuesta = rows;
    res.json(rows);
    
  });
});



module.exports = router;