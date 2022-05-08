const conn = require("../config/database");
const { 
    createUser, 
    fetchUsers, 
    fetchUserById, 
    updateUser, 
    deleteUser,
    fetchUserByUserEmail 
} = require("./user.dbschema");

const { genSaltSunc, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUserController: (req, res) =>{
        const body = req.body;
        createUser(body,(err, results) =>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success:0,
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                     success: 1,
                     data: results
                });
        });
    },
    fetchUserByIdController: (req, res) => {
        const id = req.params.id;
        fetchUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                data: results
            });
        });
    },
    fetchUsersController: (req, res) => {
        fetchUsers((err, results) => {
            if(err){
                console.log(err);
                // return false;
                if(err.code==='ECONNREFUSED'){
                    return res.status(500).json({
                        success: 0,
                        message:'Database connection error ! Please connect with database'
                    })
                }
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateUserController: (req, res) => {
        const body = req.body;
        updateUser(body,(err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'User update failed'
                })
            }
            return res.json({
                success: 1,
                message: "Updated user successfully"
            })
        })
    },
    deleteUserController: (req, res) => {
        const data = req.body;
        deleteUser(data,(err, result) => {
            if(err){
                console.log(err);
                // return false;
                if(err.errno===1451){
                    return res.status(500).json({
                        success: 0,
                        message:'This user can not delete because it is parent row'
                    })
                }
            }
            return res.json({
                success: 1,
                message:' User deleted successfully'
            })
        })
    },
    loginController: (req, res) => {
        const  body = req.body;
        fetchUserByUserEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid email address"
                })
            }else{
                const jsontoken = sign({results: results.email }, "saten123", {
                    expiresIn: "1h",
                });
                return res.json({
                    success: 1,
                    message: "User loggedin successfully",
                    token: jsontoken
                })
            }
        });
    } 
}