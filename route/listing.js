const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const{listingSchema, reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const{isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js");


const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
  }else{
    next();
  }
};


router
.route("/")
//Index Route
.get( wrapAsync(listingController.index))
//Create Route
.post( wrapAsync(listingController.Create));

 //New Route
router.get("/new",isLoggedIn, listingController.newListing);
  

router
.route("/:id")
//Show Route
.get( wrapAsync(listingController.show))
 //Update Route
.put(isLoggedIn,isOwner, wrapAsync(listingController.Update))
  
 //Delete Route
.delete( isLoggedIn,isOwner,wrapAsync(listingController.Delete));


  
  

  
  //Edit Route
  router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.Edit));
  


module.exports=router;