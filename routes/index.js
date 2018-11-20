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
/* POST nombre de usuario por id*/
router.post('/getUserNameById', function(req, res, next) {
  var id = req.body.id;
  db_users.getUserNameById(id,function(rows,fields){
    res.json(rows[0]);
  });
});
/* POST informacion de libro por id en DB*/
router.post('/userByUsername', function(req, res, next) {
  var UserName = req.body.name;
  db_users.getUserByUser(UserName,function(rows,fields){
    res.json(rows[0]);
  });
});
/*POST verificar si el usuario existe de libro por id en DB*/
router.post('/isUser', function(req, res, next) {
  var myUser = req.body.user;
  db_users.checkUserName(myUser,function(rows,fields){
    res.json({res:rows});
  });
});
/*POST verifica si la contraseña ingresada es del usuario registrado*/
router.post('/userValidated', function(req, res, next) {
  var user = req.body.nombre_usuario;
  var password = req.body.contrasena;
  db_users.checkUserName(user,function(rows,fields){
    if (rows["validador"]!=0){
      db_users.getUserPass(user,function(rows,fields){
      if(rows[0]["contraseña"] == password)
      {
          res.json({res: "isUser"});
      }
      else{
          res.json({res: "isNotUser"});
      }
        
      });
    }else{
      res.json({res: "isNotUser"});
    }
  });
});
/*POST verificar si el usuario existe de libro por id en DB*/
router.post('/getUSerRole', function(req, res, next) {
  var iduser = req.body.id;
  db_users.getUserRole(iduser,function(rows,fields){
    res.json({res:rows});
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