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

// Route to count submitted documents
router.get('/countSubmittedForms', async (req, res) => {
    try {
        const documentCount = await contactusdata.countDocuments();
        res.json({ count: documentCount });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while counting documents' });
    }
});

// Route to count submitted documents by formType
router.get('/countSubmittedFormsByFormType', async (req, res) => {
    try {
        const formTypeCounts = await contactusdata.aggregate([
            { $group: { _id: "$formType", count: { $sum: 1 } } }
        ]);
        res.json(formTypeCounts);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while counting documents by formType' });
    }
});

module.exports = router;