const Listing = require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};
module.exports.newListing=(req, res) => {
    res.render("listings/new.ejs");
  };


module.exports.show=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{
      path:"author",
    },}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist!!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };


module.exports.Create=async (req, res) => {
    if(!req.body.listing){
     throw new ExpressError (400,"send valid listing !");
    }
     const newListing = new Listing(req.body.listing);
     newListing.owner=req.user._id;
     await newListing.save();
     req.flash("success","New Listing created!!");
     res.redirect("/listings");
 
 };

module.exports.Edit       =async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  };

module.exports.Update=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","You dont have permission to edit");
      return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
  };

module.exports.Delete=async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success"," Listing Deleted!!");
    res.redirect("/listings");
  };