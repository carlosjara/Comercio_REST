var express = require('express');
var router = express.Router();
var db_users = require('../persistence/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rest miniApp Tpaga' });
});

router.get('/getUsers', function(req, res, next) {
  db_users.getCourses(function(rows2,fields){
    res.json(rows2);
  });
});


module.exports = router;