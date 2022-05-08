const {
    createProperty,
    fetchProperties,
    fetchPropertyById,
    updateProperty,
    deleteProperty
} = require("./property.dbschema");


module.exports = {
    createPropertyController: (req, res) => {
        const body = req.body;
        createProperty(body, (err, results) => {
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
    fetchPropertiesController: (req, res) => {
        fetchProperties((err, results) => {
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
    fetchPropertyByIdController: (req, res) => {
        const id = req.params.id;
        fetchPropertyById(id, (err, results) => {
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
    updatePropertyController: (req, res) => {
        const body = req.body;
        updateProperty(body, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: 'Property update failed'
                });
            }
            return res.json({
                success: 1,
                message: "Property has been updated successfully"
            })

        });
    },
    deletePropertyController: (req, res) => {
        const data = req.body;
        deleteProperty(data, (err, results) => {
            if(err){
                console.log(err);
                return false;
            }
            return res.json({
                success: 1,
                message: 'Property has been deleted successfully'
            })
        });
    }

}