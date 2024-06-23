const express = require("express");
const router = express.Router();
// import userRouter from "../modules/users/usersRouter";
// import productRouter from "../modules/products/productsRouter";
// import isAuthenticated from "../middlewares/auth";
const userRouter = require("../modules/users/usersRouter");
const productRouter = require("../modules/products/productsRouter");
const isAuthenticated = require("../middlewares/auth");
router.use(
  "/users",
  userRouter
  /* 
  #swagger.tags = ['User']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);
router.use(
  "/products",isAuthenticated,
  productRouter
  /* 
  #swagger.tags = ['Product']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);

module.exports = router;
