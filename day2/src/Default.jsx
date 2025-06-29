import React, { useState } from "react";
import axios from "axios";


const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.name || !user.email || !user.mobile || !user.profilePicture) {
      toast.error("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("mobile", user.mobile);
    formData.append("profilePicture", user.profilePicture);

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("User registered successfully!");
      console.log(res.data);
      setUser({ name: "", email: "", mobile: "", profilePicture: null });
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div >
      <div>
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
        
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={handleChange}
          
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
         
          />
          <button
            type="submit"
          >
            Register
          </button>
        </form>
      </div>

    </div>
  );
};

export default App;





































const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !req.file) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save user to DB
    const newUser = new User({
      name,
      email,
      mobile,
      profilePicture: req.file.path, // Store file path in DB
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };







const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  profilePicture: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
































const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer Upload Constraints
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max size
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only .jpg, .jpeg, .png formats allowed!"));
    }
  },
});

// Register User Route
router.post("/register", upload.single("profilePicture"), registerUser);

module.exports = router;
