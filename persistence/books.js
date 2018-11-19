var exports = module.exports = {};
var conn = require("./conn.js");

exports.getBooks = function(complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from snjtb_product", [], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};
exports.getBookById = function(id, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * FROM snjtb_product where id = ? ", [id], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};
