const express = require("express");
const router = express.Router();

const { register, login, logout,adminregister, adminlogin, isAuthuser, get_all_user,dashboard,selectproduct,authorizeRoles ,get_product_activity, inviteuser, getuserrDetail} = require("../controllers/auth.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/adminregister").post(adminregister);
router.route("/adminlogin").post(adminlogin);
router.route("/sendInvite").post(adminlogin);

//  product selection
router.route("/selectProduct").post(isAuthuser,selectproduct)
router.route("/get_all_user").post(isAuthuser,authorizeRoles("Admin"),get_all_user)
router.route("/get_product_activity").post(isAuthuser,authorizeRoles("Admin"),get_product_activity)
// auth
router.route('/invite_user').post(isAuthuser,authorizeRoles("Admin"),inviteuser)
router.route('/getuserrDetail').get(isAuthuser,authorizeRoles("Admin"),getuserrDetail)
router.route("/me").get(isAuthuser, dashboard);

module.exports = router;
