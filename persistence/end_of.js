var exports = module.exports = {};
var conn = require("./conn.js");

exports.insertHistoryCreate = function(userid_history,userName_history,costo_history,token_history,status_history, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("INSERT INTO `snjtb_tpaga_hist`(`user_id`, `user_name`, `cost`, `tp_token`, `tp_status`) VALUES (?,?,?,?,?)", [userid_history,userName_history,costo_history,token_history,status_history], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getHistory = function(id_user,complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from snjtb_tpaga_hist", function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};

exports.getStatusToken_History = function(userName_history,userid_history,costo_history,complete){
conn.executeSQLStatement(function(connection) {
    connection.query("SELECT * from snjtb_tpaga_hist where user_name=? and user_id=? and cost=?  order by id_hist desc", [userName_history,userid_history,costo_history], function(err,row,fields){
            if (err) throw err;
            complete(row[0]);
        });
});
};


exports.updateTokenStatus_History = function(userName_history,token_history,status_history, complete){
conn.executeSQLStatement(function(connection) {
    connection.query("Update `snjtb_tpaga_hist` as d SET d.`tp_status`=? where user_name = ? and tp_token = ? ", [status_history,userName_history,token_history], function(err,row,fields){
            if (err) throw err;
            complete(row);
        });
});
};