const conn = require("../config/database");

module.exports = {
    createContact: (data, callBack) => {
        conn.query(
            `INSERT INTO client_contacts(cid, phone, email) VALUE(?,?,?)`,
            [
                data.cid,
                data.phone,
                data.email
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }, 
    fetchContacts: (callBack) => {
        conn.query(
            `SELECT * FROM client_contacts`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    fetchContactById: (id, callBack) =>{
        conn.query(
            `SELECT * FROM client_contacts WHERE id=?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateContact: (data, callBack) => {
        conn.query(
            `UPDATE client_contacts SET phone=?, email=?, updated_on=NOW() WHERE id=?`,
            [
                data.phone,
                data.email,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    }, 
    deleteContact: (data, callBack) => {
        conn.query(
            `DELETE FROM client_contacts WHERE id=?`,
            [data.id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}


/* insert contacts 
    "cid": 3,
    "phone": "9999999991",
    "email": "raghav@demo.com",
*/

/* update contacts
    "phone": "+9995555555",
    "email": "morgan1234@demo.com",
    "id":7
*/


/* delete
    {
        "id":5
    }
*/