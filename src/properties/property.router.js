const { 
        createPropertyController,
        fetchPropertiesController,
        fetchPropertyByIdController,
        updatePropertyController,
        deletePropertyController
  } = require("./property.controller");
 
 const router = require("express").Router();
 const { checkToken } = require("../../auth/token_validation");
 
 router.post("/", checkToken, createPropertyController);
 router.get("/", checkToken, fetchPropertiesController); 
 router.get("/:id", checkToken, fetchPropertyByIdController);
 router.put("/", checkToken, updatePropertyController); 
 router.delete("/",checkToken, deletePropertyController); 
 
 
 module.exports = router;


 /* 
 create
 {
   "cid": "abcdefg",
   "address": "abcdefg",
   "p_image":  "abcdefg",
 }
 
 update 
{
   "cid": "abcdefg",
   "address": "abcdefg",
   "p_image":  "abcdefg",
 } "id" : 2
 */