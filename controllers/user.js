const User=require("../models/user.js");

module.exports.singup=(req,res)=>{
    res.render("users/singup.ejs");
};

module.exports.singup2=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
 const newUser=new User({email,username});
 const registeredUser=await User.register(newUser,password);
 req.login(registeredUser,(err)=>{
    req.flash("success","Welcome to Wanderlust!");
    res.redirect("/listings");
 });
 
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/singup");
    }
 
};

module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome  back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};

