const express = require("express");
const router = express.Router();
require("dotenv").config();
//importing data model schemas
let { contactusdata } = require("./models"); 

//GET all contact forms
router.get("/contactUsForms", (req, res, next) => { 
    contactusdata.find(
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//create contact form
router.post("/contactUsForms",(req, res, next) => { 
    console.log("ROUTE")
    contactusdata.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

module.exports = router;