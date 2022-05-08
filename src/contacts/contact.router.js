const {
    createContactController,
    fetchContactByIdController,
    fetchContactsController,
    updateContactController,
    deleteContactController
} = require("./contact.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");


router.post("/", checkToken, createContactController);
router.get("/", checkToken, fetchContactsController);
router.get("/:id", checkToken, fetchContactByIdController);
router.put("/", checkToken, updateContactController);
router.delete("/", checkToken, deleteContactController);


module.exports = router;


/* 
create
{
    "cid": "abcdefghi",
    "phone": "abcdefghi",
    "email": "abcdefghi"
}

update
{
    "phone": "abcdefghi",
    "email": "abcdefghi",
    "id": 2
}
*/