const conn = require("../config/database");

module.exports = {
    createUser: (data, callBack) =>{
        conn.query(
            `INSERT INTO users (username, email, phone, business_name, address, image, user_type, subscription, total_client, total_estimate, amount, joined_on)
                        value(?,?,?,?,?,?,?,?,?,?,?,NOW())`,
            [
                data.username,
                data.email,
                data.phone,
                data.business_name,
                data.address,
                data.image,
                data.user_type,
                data.subscription,
                data.total_client,
                data.total_estimate,
                data.amount,
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    fetchUsers: callBack => {
        conn.query(
            `SELECT * FROM users`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    fetchUserById: (id, callBack) => {
        conn.query(
            `SELECT * FROM users WHERE uid = ?`,
            [id],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        conn.query(
            `UPDATE users SET username=?, email=?, phone=?, business_name=?, address=?, image=?, user_type=?, subscription=?, total_client=?, total_estimate=?, amount=?, updated_on=NOW() WHERE uid=? `,
            [
                data.username,
                data.email,
                data.phone,
                data.business_name,
                data.address,
                data.image,
                data.user_type,
                data.subscription,
                data.total_client,
                data.total_estimate,
                data.amount,
                data.uid
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }, 
    deleteUser: (data, callBack) =>{
        conn.query(
            `DELETE FROM users WHERE uid=?`,
            [data.uid],
            (error, results, fields) =>{
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        ); 
    },
    fetchUserByUserEmail: (email, callBack) => {
        conn.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }
};



/* 
    "username": "Ravi Shukla",
    "email": "ravishane@gmail.com",
    "phone": "000000000011",
    "business_name": "Moulin PVT LTD",
    "address": "Montain Hil Cross Avenue Ottawa",
    "image": null,
    "user_type": "admin",
    "subscription": "premium",
    "total_client": 0,
    "total_estimate": 0,
    "amount": 770,
*/

/* 
    "username": "Mannu Kumar",
    "email": "1212121212",
    "phone": "mannu111@gmail.com",
    "business_name": "Jalandhar Punjab",
    "address": "Dhai PVT LTD",
    "image": null,
    "user_type": "admin",
    "subscription": "premium",
    "total_client": 49,
    "total_estimate": 99,
    "amount": 9009,
    "uid": 16
*/


/* delete users
 {
     "uid" : 2
 } 

*/