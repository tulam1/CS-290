var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_lamtu',
  password        : 'Dannylam123',
  database        : 'cs290_lamtu'
});

module.exports.pool = pool;
