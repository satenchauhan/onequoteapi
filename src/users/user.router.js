const { 
   createUserController, 
   fetchUserByIdController,
   fetchUsersController,
   updateUserController,
   deleteUserController,
   loginController
 } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/",  createUserController);
router.get("/",  fetchUsersController);
router.get("/:id",  fetchUserByIdController);
router.put("/",  updateUserController); 
router.delete("/",  deleteUserController); 
router.post("/login",loginController);


module.exports = router;



/* in body  passs this data
{
   "username": "aman kumar",
   "email": "aman@gmail.com",
   "u_type": "Admin",
   "sub_type": "premium",
   "total_clients": "120",
   "total_estimates": "750",
   "amount": "7500",
   "id":7
}
*/

/* 
data.username,
data.phone,
data.email,
data.business_name,
data.address,

*/