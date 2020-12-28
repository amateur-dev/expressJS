const mysql2 = require('mysql2');
require('dotenv').config()


// we are creating a pool of connections vs a mysql2.createConnection cause we want to run multiple queries to our database simultaneously

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    database: "node_complete",
    password: process.env.DB_PASS
})


module.exports = pool.promise();