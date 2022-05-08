const conn = require("../config/database");

module.exports = {
    createProperty: (data, callback) => {
        conn.query(
            `INSERT INTO client_properties(cid, address, p_image) VALUE(?,?,?)`,
            [
                data.cid,
                data.address,
                data.p_image
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    fetchProperties: (callback) => {
        conn.query(
            `SELECT * FROM client_properties`,
            [],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    fetchPropertyById: (id, callback) => {
        conn.query(
            `SELECT * FROM client_properties WHERE id=?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },
    updateProperty: (data, callback) => {
        conn.query(
            `UPDATE client_properties SET address=?, p_image=?, updated_on=NOW() WHERE id=?`,
            [
                data.address,
                data.p_image,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    deleteProperty: (data, callback) => {
        conn.query(
            `DELETE FROM client_properties WHERE id=?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }
}



/* insert property
 {
    "cid": 5,
    "address": "124 Flix Avenue Street Ottawa Canada",
    "p_image": null
 }
*/


/* update property
 {
    "address": "124 Flix Avenue Street Ottawa Canada",
    "p_image": null,
    "id": 2
 }
*/