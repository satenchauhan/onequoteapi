const mysql = require("mysql");


const conn = mysql.createPool({
        // port: 3306,
        host: 'localhost',
        user: 'root',
        password: "",
        database: 'prismcon_onequote',
        connectionLimit: 10,    
});

/* const initDB = (conn) => {
        conn.connect((error) => {
        if (error) {
                throw error;
        } else {
                console.log("connected.........");
        }
        });
}; */

// initDB(conn)

module.exports = conn;


/* .env
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectionLimit: 10,
*/