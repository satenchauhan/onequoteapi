const { 
    createClientController,
    fetchClientsController,  
    fetchClientByIdController,
    updateClientController,
    deleteClientController
} = require("./client.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get('/', checkToken, fetchClientsController);
router.post('/', checkToken, createClientController);
router.get('/:id', checkToken, fetchClientByIdController);
router.put('/', checkToken, updateClientController);
router.delete('/', checkToken, deleteClientController);


module.exports = router;