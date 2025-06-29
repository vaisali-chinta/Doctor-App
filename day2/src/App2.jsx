import React, { useState } from "react";
import axios from "axios";

const  UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profilePicture: null,
  });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    // const formDataObj = new FormData();
    // formDataObj.append("name", formData.name);
    // formDataObj.append("email", formData.email);
    // formDataObj.append("mobile", formData.mobile);
    // if (formData.profilePicture) {
    //   formDataObj.append("profilePicture", formData.profilePicture);
    // }
    setFormData({
        "name" : formData.name,
        "email" : formData.email,
        "mobile" : formData.mobile,
        "profilePicture" : formData.profilePicture
    })
    console.log(formData)


    try {
      let response;
      if (updating) {
        response = await axios.post('http://localhost:5001/update', formData);
      } else {
        console.log(formData)

        response = await axios.post("http://localhost:5001/register", formData);
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div >
      <h2 >{updating ? "Update" : "Register"} User</h2>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:200,height:300,justifyContent:"space-evenly"}}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required={!updating} disabled={updating} />
        <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2 w-full" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />
        <button type="submit" >{updating ? "Update" : "Register"}</button>
      </form>
      <button onClick={() => setUpdating(!updating)} >{updating ? "Switch to Register" : "Switch to Update"}</button>
      {message && <p >{message}</p>}
    </div>
  );
}

export default UserForm;