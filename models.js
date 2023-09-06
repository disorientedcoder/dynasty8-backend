const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for contactUsForms
const contactUsFormsSchema = new Schema ({
    _id:{type: String, default: uuid.v1},
    formType: {
        type: String,
        required: true
    },
    clientInformation:{
        nameAndNumber:{type:String},
        availability:{type:String},
        propertyID:{type:String}, //only for smart locks or garage slots
        bankInfo:{type:String}, //only for smart locks or garage slots
        preferredContactMethod: {type:String}, 
    },
    requestQuote:{
        requestQuoteType:{type:String}, //remote or in person
        requestQuotePropertyType:{type:String}, //type of property
        propertyLocation:{type:String}, //link of location
        propertyPhotos:{type:String}, //link of images,
        propertyZone:{type:String}, //zone property is in
        requestInterior:{type:String}, //interior of property, or size of warehouse or office
        jobType:{type:String}, //job type for office request
    },
    purchasePropertyPayment:{type:String,},
    smartLockType:{type:String}, //remote or in person
    garageSlots:{
        garageSlotsType:{type:String}, //remote or in person
        currentAmountOfSlots:{type:String}, //number of current slots
        amountSlotsWantAdded:{type:String}, //number of slots added
    },
    interiorTour:{type:String}, //type of interior want to see for tour
    formNote:{type:String,}, // additional notes or questions for the form
    staffName:{type:String,}, // staff submitting
}, {
    collection: 'contactUsData',
    timestamps: true
});

// create models from mongoose schemas
const contactusdata = mongoose.model('contactUsData', contactUsFormsSchema);
// package the models in an object to export 
module.exports = { contactusdata}