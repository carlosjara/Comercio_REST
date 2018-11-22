var exports = module.exports = {};
var conn = require("./conn.js");

exports.getItems = function(complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from snjtb_cart", [], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getItems_By_id = function(id_user,complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from snjtb_cart where user_id=?", [id_user], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getItemsCountByid_UserId = function(id,id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT count(1) as conteo FROM snjtb_cart where id_product = ? and user_id = ? ", [id,id_user], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getItemsCountByUserId = function(id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT sum(product_cant) as suma FROM snjtb_cart where user_id = ? ", [id_user], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getItemsCantByid_UserId = function(id,id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT product_cant as cantidad FROM snjtb_cart where id_product = ? and user_id = ? ", [id,id_user], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};


exports.updateCantByid_userId = function(cantidad,id,id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Update `snjtb_cart` as d SET d.`product_cant`=? where id_product = ? and user_id = ? ", [cantidad,id,id_user], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.del_zero = function(id_product,id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Delete FROM snjtb_cart WHERE id_product=? and user_id = ?", [id_product,id_user], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.delete_Cart_byuser = function(id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Delete FROM snjtb_cart WHERE user_id = ?", [id_user], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};




exports.nuevoItem = function(id_product,product_price,product_name,product_author,product_cant,user_id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("INSERT INTO `snjtb_cart`(`id_product`, `product_price`, `product_name`, `product_author`, `product_cant`, `user_id`) VALUES (?,?,?,?,?,?)", [id_product,product_price,product_name,product_author,product_cant,user_id], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};


exports.getSumItemCostById = function(id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT sum(product_price*product_cant) as suma FROM snjtb_cart where user_id = ? ", [id_user], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};

exports.getOrderById = function(id_user, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT FLOOR(user_id/sum(id_cart+(product_cant*id_cart))) norder FROM snjtb_cart where user_id = ? ", [id_user], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};