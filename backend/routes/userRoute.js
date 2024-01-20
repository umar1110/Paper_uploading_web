import express  from "express"

import { changeRole, deleteUser, forgetPassword, getMyDetails, getSingleUser, getUsers, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile } from "../controllers/userControllers.js";
import { isAuthenticatedRole, isAuthenticatedUser } from "../middleware/routeAuth.js";

const router = express.Router();



router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/register").post(registerUser);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticatedUser,getMyDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser,isAuthenticatedRole, getUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,isAuthenticatedRole, getSingleUser);
router.route('/admin/delete/:id').get(isAuthenticatedUser,isAuthenticatedRole, deleteUser);
router.route('/admin/role/:id').put(isAuthenticatedUser,isAuthenticatedRole, changeRole);






export default router;