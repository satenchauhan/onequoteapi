const conn = require("../config/database");

module.exports = {
    createClient:(data, callBack) => {
        conn.query(
            `INSERT INTO clients (user_id, client_name, business_name, account_type, assigned_to, main_phone, main_email, main_address, billing_address, balance, invoice)
                VALUE(?,?,?,?,?,?,?,?,?,?,?)`,
            [ 
                data.user_id, 
                data.client_name, 
                data.business_name, 
                data.account_type, 
                data.assigned_to, 
                data.main_phone, 
                data.main_email, 
                data.main_address, 
                data.billing_address, 
                data.balance, 
                data.invoice
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    fetchClients: (callBack) => {
        conn.query(
            `SELECT * FROM clients`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    fetchClientById: (id,callBack) => {
        conn.query(
            `SELECT * FROM clients WHERE client_id=?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateClient: (data, callBack) => {
        conn.query(
            `UPDATE clients SET client_name=?, business_name=?, account_type=?, assigned_to=?, main_phone=?, main_email=?, main_address=?, billing_address=?, balance=?, invoice=?, updated_on=NOW() WHERE client_id=? `,
            [
                data.client_name, 
                data.business_name, 
                data.account_type, 
                data.assigned_to, 
                data.main_phone, 
                data.main_email, 
                data.main_address, 
                data.billing_address, 
                data.balance, 
                data.invoice,
                data.client_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteClient: (data, callBack) =>{
        conn.query(
            `DELETE FROM clients WHERE client_id=?`,
            [data.client_id],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }

}

/* insert client

    "user_id": 20,
    "client_name": "Gaurav Sinha",
    "business_name": "Sinha Telecom Ltd",
    "account_type": "individual",
    "assigned_to": "Rakesh Gupta",
    "main_phone": "+912100000",
    "main_email": "sinha12@demo.com",
    "main_address": "122, Janalandhar Punjab",
    "billing_address": "123, Jalanadhar Punjab",
    "balance": 550000,
    "property_images": null,
    "invoice": "#Estimat110"
*/

/* update client
    "client_name": "Gaurav Sinha 2",
    "business_name": "Sinha 2 Telecom Ltd",
    "account_type": "individual",
    "assigned_to": "Rakesh Gupta",
    "main_phone": "+912100000",
    "main_email": "sinha12@demo.com",
    "main_address": "122, Janalandhar Punjab",
    "billing_address": "123, Jalanadhar Punjab",
    "balance": 550000,
    "property_images": null,
    "invoice": "#Estimat110",
    "client_id": 4
*/

/* delete
    {
         "clinet_id": 4
    }
*/