const express = require('express');
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, },
  mobile: { type: String,},
  profilePicture: { type: String,  }, 
});

module.exports = mongoose.model("registeddetails", userSchema);
