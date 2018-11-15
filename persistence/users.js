var exports = module.exports = {};
var conn = require("./conn.js");

exports.getCourses = function(complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from smtb_app_users", [], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};