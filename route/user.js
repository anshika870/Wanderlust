const express = require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const usercontroller=require("../controllers/user.js");


router
        .route("/singup")
        .get(usercontroller.singup)
        .post(wrapAsync(usercontroller.singup2));

router
.route("/login")
.get(usercontroller.renderlogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash:true,}),usercontroller.login);

router.get("/logout",usercontroller.logout);




module.exports=router;