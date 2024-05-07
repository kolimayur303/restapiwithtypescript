import express = require("express");
import * as userController from "./controller";
const router = express.Router();
const auth = require("./middleware/auth");


// router.get("/", auth,userController.getAllUsers);
router.get("/",userController.getAllUsers);
router.get("/:id" ,auth,userController.getUser);
router.post("/", userController.addUser);
router.put("/:id", auth,userController.updateUser);
router.delete("/:id", auth,userController.deleteUser);

export default router;