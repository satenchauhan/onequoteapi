const { createClient } = require("../clients/client.dbschema");
const {
    createContact,
    fetchContacts,
    updateContact,
    deleteContact,
    fetchContactById
} = require("./contact.dbschema");

module.exports = {
    createContactController: (req, res) => {
        const body = req.body;
        createContact(body, (err,results) => {
            if(err){
                console.log(err);
                if(err.errno===1048){
                    return res.status(500).json({
                        success: 0,
                        message:'column cid cannot be null because it is related to parent row'
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
    fetchContactsController: (req, res) => {
        fetchContacts((err, results) => {
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
        })
    },
    fetchContactByIdController: (req, res) => {
        const id = req.params.id;
        fetchContactById(id, (err, results)  => {
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
                data: results,
            });
        });
    },

    updateContactController: (req, res) => {
        const body = req.body;
        updateContact(body, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Contact update failed'
                });
            }
            return res.json({
                success: 1,
                message: "Contact has benn updated successfully"
            });
        });
    },
    deleteContactController: (req, res) => {
        const data = req.body;
        deleteContact(data, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            return res.json({
                success: 1,
                message: 'Contact has been deleted successfully'
            });
        });
    }
}