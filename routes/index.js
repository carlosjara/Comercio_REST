var express = require('express');
var _ = require('lodash');
var router = express.Router();
var db_users = require('../persistence/users');
var db_books = require('../persistence/books');
var db_cart = require('../persistence/cart');
var db_end = require('../persistence/end_of');

/* -------------------- Users ---------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest miniApp Tpaga' });
});
/* GET Listado de usuarios en DB*/
router.get('/getUsers', function(req, res, next) {
  db_users.getUsers(function(rows2, fields) {
    res.json(rows2);
  });
});
/* POST nombre de usuario por id*/
router.post('/getUserNameById', function(req, res, next) {
  var id = req.body.id;
  db_users.getUserNameById(id, function(rows, fields) {
    res.json(rows[0]);
  });
});
/* POST informacion de libro por id en DB*/
router.post('/userByUsername', function(req, res, next) {
  var UserName = req.body.name;
  db_users.getUserByUser(UserName, function(rows, fields) {
    res.json(rows[0]);
  });
});
/*POST verificar si el usuario existe de libro por id en DB*/
router.post('/isUser', function(req, res, next) {
  var myUser = req.body.user;
  db_users.checkUserName(myUser, function(rows, fields) {
    res.json({ res: rows });
  });
});
/*POST verifica si la contraseña ingresada es del usuario registrado*/
router.post('/userValidated', function(req, res, next) {
  var user = req.body.nombre_usuario;
  var password = req.body.contrasena;
  db_users.checkUserName(user, function(rows, fields) {
    if (rows["validador"] != 0) {
      db_users.getUserPass(user, function(rows, fields) {
        if (rows[0]["contraseña"] == password) {
          res.json({ res: "isUser" });
        }
        else {
          res.json({ res: "isNotUser" });
        }

      });
    }
    else {
      res.json({ res: "isNotUser" });
    }
  });
});
/*POST verificar si el usuario existe de libro por id en DB*/
router.post('/getUSerRole', function(req, res, next) {
  var iduser = req.body.id;
  db_users.getUserRole(iduser, function(rows, fields) {
    res.json({ res: rows });
  });
});


/* -------------------- BOOKS ---------------*/

/* GET Listado de libros en DB*/
router.get('/getBooks', function(req, res, next) {
  db_books.getBooks(function(rows2, fields) {
    res.json(rows2);
  });
});
/* POST informacion de libro por id en DB*/
router.post('/BooksById', function(req, res, next) {
  var bookId = req.body.id;
  var respuesta = [];
  db_books.getBookById(bookId, function(rows, fields) {
    respuesta = rows;
    res.json(rows);

  });
});

/* -------------------- CART ---------------*/

/* GET cart items en DB*/
router.get('/getCartItems', function(req, res, next) {
  db_cart.getItems(function(rows2, fields) {
    res.json(rows2);
  });
});

/* GET cart items by is en DB*/
router.post('/getCartItems_o_id', function(req, res, next) {
  var id = req.body.id;
  db_cart.getItems_By_id(id,function(rows2, fields) {
    res.json(rows2);
  });
});


/* POST CART to get items by user id and product id   en DB*/
router.post('/CartItems_id_idUSer', function(req, res, next) {
  var id = req.body.id_product;
  var id_user = req.body.user_id;
  var respuesta = [];
  db_cart.getItemsCountByid_UserId(id, id_user, function(rows, fields) {
    respuesta = rows;
    res.json(respuesta);

  });
});

/* POST CART to get product cant by user id and product id en DB*/
router.post('/Cantidad_id_idUSer', function(req, res, next) {
  var id = req.body.id_product;
  var id_user = req.body.user_id;
  var respuesta = [];
  db_cart.getItemsCantByid_UserId(id, id_user, function(rows, fields) {
    respuesta = rows;
    res.json(respuesta);
  });
});

/* POST CART to update cant en DB*/
router.post('/Update_Cant_item', function(req, res, next) {
  var id = req.body.id_product;
  var id_user = req.body.user_id;
  var cantidad = 0;
  var actualizar = _.after(1, function() {
    cantidad = cantidad + 1;
    db_cart.updateCantByid_userId(cantidad, id, id_user, function(rows2, fields) {
      res.json(rows2);
    });
  });
  db_cart.getItemsCantByid_UserId(id, id_user, function(rows, fields) {
    cantidad = rows["cantidad"];
    actualizar();
  });
});

/* POST CART to delete 1 product en DB*/
router.post('/del_one_item', function(req, res, next) {
  var id = req.body.id_product;
  var id_user = req.body.user_id;
  var cantidad = 0;

  var actualizar = _.after(1, function() {
    cantidad = cantidad - 1;
    console.log(cantidad);
    if(cantidad <= 0){
      db_cart.del_zero(id, id_user, function(rows2, fields) {
        res.json(rows2);
      });
    }
    else {
      db_cart.updateCantByid_userId(cantidad, id, id_user, function(rows2, fields) {
        res.json(rows2);
      });
    }
  });
  db_cart.getItemsCantByid_UserId(id, id_user, function(rows, fields) {
    cantidad = rows["cantidad"];
    actualizar();
  });
});

/* POST CART to delete all products en DB*/
router.post('/del_all_item', function(req, res, next) {
  var id = req.body.id_product;
  var id_user = req.body.user_id;
  var cantidad   = 0;
  var actualizar = _.after(1, function() {
    db_cart.del_zero(id, id_user, function(rows2, fields) {
        res.json(rows2);
      });
    
  });
  db_cart.getItemsCantByid_UserId(id, id_user, function(rows, fields) {
    cantidad = rows["cantidad"];
    console.log(cantidad);
    actualizar();
  });
});

/* POST CART to delete all products en DB*/
router.post('/delete_Cart_byuser', function(req, res, next) {
  var id_user = req.body.user_id;
  db_cart.delete_Cart_byuser(id_user, function(rows2, fields) {
        res.json(rows2);
  });
});



/* POST CART to insert new item en DB*/
router.post('/newItemCart', function(req, res, next) {
  var id_product = req.body.id_product;
  var product_price = req.body.product_price;
  var product_name = req.body.product_name;
  var product_author = req.body.product_author;
  var product_cant = req.body.product_cant;
  var user_id = req.body.user_id;

  db_cart.nuevoItem(id_product, product_price, product_name, product_author, product_cant, user_id, function(rows2, fields) {
    res.json({ respuesta: rows2 });
  });

});

/* POST CART to get items by user id   en DB*/
router.post('/CartItems_id', function(req, res, next) {
  var id_user = req.body.user_id;
  var respuesta = [];
  db_cart.getItemsCountByUserId(id_user, function(rows, fields) {
    respuesta = rows;
    res.json(respuesta);

  });
});

/* POST CART to get sum cost by user id   en DB*/
router.post('/getSumItemCostById', function(req, res, next) {
  var id_user = req.body.user_id;
  var respuesta = [];
  db_cart.getSumItemCostById(id_user, function(rows, fields) {
    respuesta = rows;
    res.json(respuesta);
  });
});

/* POST CART to get bill order no user id   en DB*/
router.post('/getOrderById', function(req, res, next) {
  var id_user = req.body.user_id;
  var respuesta = [];
  db_cart.getOrderById(id_user, function(rows, fields) {
    respuesta = rows;
    res.json(respuesta);
  });
});


/* -------------------- HISTORY ---------------*/

/* GET Listado de registros en DB*/
router.get('/getHistory', function(req, res, next) {
  db_end.getBooks(function(rows2, fields) {
    res.json(rows2);
  });
});

/* POST token status from transaction en DB*/
router.post('/getLastStatusToken_History', function(req, res, next) {
  var userName_history =req.body.userName_history;
  var userid_history = req.body.userid_history;
  var costo_history = req.body.costo_history;
  console.log (" "+userName_history+" "+userid_history+" "+costo_history+" ")
  db_end.getStatusToken_History(userName_history,userid_history,costo_history,function(rows2, fields) {
    res.json(rows2);
  });
});

/* POST update token status from transaction en DB*/
router.post('/updateTokenStatus', function(req, res, next) {
  var userName_history =req.body.userName_history;
  var token_history = req.body.token_history;
  var status_history = req.body.status_history;
  db_end.updateTokenStatus_History(userName_history,token_history,status_history,function(rows2, fields) {
    res.json(rows2);
  });
});


/* POST guardar registro de transaccion en DB*/
router.post('/save_history_created', function(req, res, next) {
  var userName_history =req.body.userName_history;
  var userid_history = req.body.userid_history;
  var token_history =  req.body.token_history;
  var costo_history = req.body.costo_history;
  var status_history = req.body.status_history;
  
  var respuesta = [];
    db_end.insertHistoryCreate(userid_history,userName_history,costo_history,token_history,status_history, function(rows, fields) {
    respuesta = rows;
    res.json(rows);

  });
});

module.exports = router;
