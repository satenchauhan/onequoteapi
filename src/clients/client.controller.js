const conn = require("../config/database");

const { createClient, fetchClients, fetchClientById, updateClient, deleteClient } = require("./client.dbschema");


module.exports = {
    createClientController: (req, res) =>{
        const body = req.body;
        createClient(body, (err, results) => {
            if(err){
                console.log(err);
                if(err.errno===1048){
                    return res.status(500).json({
                        success: 0,
                        message:'column user_id cannot be null because it is related to parent row'
                    })
                }
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    fetchClientsController: (req, res) => {
        fetchClients((err, results) => {
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
            });
        });
    },
    fetchClientByIdController: (req, res) => {
        const id = req.params.id;
        fetchClientById(id, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateClientController: (req, res) => {
        const body = req.body;
        updateClient(body, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Client update failed'
                });
            }
            return res.json({
                success: 1,
                message: "Client has benn updated successfully"
            });
        });
    },
    deleteClientController: (req, res) => {
        const data = req.body;
        deleteClient(data, (err, result) => {
            if(err){
                console.log(err);
                // return false;
                if(err.code==='ER_ROW_IS_REFERENCED_2'){
                    return res.json({
                        success: 0,
                        message:'This client can not delete because its parent row'
                    })
                }
            }
            return res.json({
                success: 1,
                message:'Client has been deleted successfully'
            })
        });
    }
}