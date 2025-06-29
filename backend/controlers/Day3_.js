const express = require("express");
const multer = require('multer');
const path = require('path');
const mydb4 = require("../models/Day3_1");
const { Console } = require("console");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb("Error: Images only (JPG/PNG)!");
    },
  });
  
  const data = async (req,res) => {
    try {
        const { name, email, mobile } = req.body;
        console.log(req.body)
        const profilePicture = req.file ? req.file.filename : "channels4_profile.jpg";
        
        const newUser = new mydb4({ name, email, mobile, profilePicture });
        await newUser.save();
        
        res.status(201).json({ message: " registered successfully", user: newUser });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
  const upd = async(req,res) =>{
    try {
        const { name, mobile } = req.body;
        const email = req.body.email;
        const user = await mydb4.findOne({ email });
        
        if (!user) return res.status(404).json({ message: "User not found" });
    
        if (req.file) {
          if (user.profilePicture) {
            fs.unlinkSync(path.join(__dirname, "../uploads", user.profilePicture));
          }
          user.profilePicture = "images.jpg";
        }
        user.name = name || user.name;
        user.mobile = mobile || user.mobile;
        
        await user.save();
        res.json({ message: "updated successfully", user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
  

exports.data = data;
exports.upd = upd;