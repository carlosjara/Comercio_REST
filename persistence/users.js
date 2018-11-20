var exports = module.exports = {};
var conn = require("./conn.js");

exports.getUsers = function(complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from smtb_app_users", [], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getUserByUser=function(userU,f){
	conn.executeSQLStatement(function(conn){
		conn.query("select * from smtb_app_users where nombre_usuario=?",[userU],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
};

exports.getUserRolByName = function(name, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT rol,nombre_usuario,contraseña FROM smtb_app_users where nombre_usuario = ? ", [name], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getUserNameById = function(id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT nombre_usuario FROM smtb_app_users where id = ? ", [id], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.checkUserName = function(nombre, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT count(id) as validador,id FROM smtb_app_users where nombre_usuario = ? ", [nombre], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getUserPass = function(nombre, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT contraseña FROM smtb_app_users where nombre_usuario = ? ", [nombre], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getUserRole = function(id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT rol FROM smtb_app_users where id = ? ", [id], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};