const mongoose = require('mongoose');
const { Vedadata } = require('../controlers/Day3');


const Vedadata1 = new mongoose.Schema({
    userTeamCode: { type: String },
    userRollNumber: { type: String },
    userName: { type: String },
    userMobile:{type:String},
    userCollege: { type: String },
    userEmail: { type: String},
    userGender: { type: String},
    userDepartment: { type: String },
    userLocation: { type: String },
    userYear: { type: Number },
    userEventCategory: { type: String },
    userEvent: { type: String },
    userTeamsize: { type: Number },
    userAccomodation: { type: String },
    otherCollege: { type: String, default: '' },
})

module.exports = mongoose.model("Vedadata",Vedadata1)