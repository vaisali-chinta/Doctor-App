
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DiBlackberry } from 'react-icons/di'
import { useState, useEffect } from "react";
import axios from "axios";



function App() {
  const [records, setrecords] = useState([]);
  const [arr, setarr] = useState([]);
  const [data, setdata] = useState({
    name:"",
    email:"",
    mobile:"",
    img:""
  });

  const fun = (name,value) =>{
       
    setdata(prev => ({...prev,[name] : value}))
    console.log(data)
  
  
}

const fun1 = async (e) => {
  e.preventDefault(); 

  try {
    const response = await fetch("https://api.jami.ltd/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data submitted successfully:", result);
      
      // Update records state by appending new data
      setrecords((prevRecords) => [...prevRecords, data]);

      alert("Data submitted successfully!");
    } else {
      console.log("Failed to submit the Data");
      alert("Failed to submit the data");
    }
  } catch (error) {
    console.log(error);
    alert("Error submitting data");
  }
};





  
  const fetchRecords = async () => {
    try {
      const response = await fetch("https://api.jami.ltd/getAllRecords");
      if (response.ok) {
        const data = await response.json();
        setrecords(data);
      } else {
        console.error("Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // useEffect(() => {
  //   fetchRecords();
  // }, []);


  const Edit = (record) =>{
    console.log(record)
  }


//  const Delete = (record) => {
//   console.log(record)
//   records.forEach((i) => {
//     if(i.fname===record.fname){
//       console.log(i.fname)
//     }
//   })
//  }


 const Delete = (record) => {
  const updatedRecords = records.filter((i) => i.fname !== record.fname);
  setrecords(updatedRecords);
  
};



const [file, setFile] = useState(null);
const [i,seti] = useState("")




const fun2 = () =>{
  console.log(file)
  seti(file)
  console.log(i)
  return <p>{file}</p>
}




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
  
    alert("give details")
    return;
  }

  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("mobile", user.mobile);
  formData.append("profilePicture", user.profilePicture);

  console.log(user  )

  try {
    const res = await axios.post("http://localhost:5001/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("registered successfully")
    console.log(res.data);
    setUser({ name: "", email: "", mobile: "", profilePicture: null });
  } catch (error) {
    alert("registration failed")
  }
};
  


  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>

  //   <>
  //   {/* <div style={{width:500,height:500}}>
  //     <div>
  //     <label htmlFor="">FirstName : </label>
  //     <input type="text" />
  //     </div>
  //     <br />
  //     <div><label htmlFor="">Lastname : </label>
  //     <input type="text" /></div>
  //     <br />
  //     <div><label htmlFor="">Mobile No : </label>
  //     <input type="number" /></div>
  //     <br />
  //    <div> <label htmlFor="">Date of birth : </label>
  //    <input type="date" /></div>
  //     <br />
  //    <div>
  //    <label htmlFor="">Gender : </label>
  //     <input type="radio"  name='testing' />
  //     Male
  //     <input type="radio" name='testing' />
  //     female
  //    </div>
  //     <br />
  //    <div>
  //    <label htmlFor="">Email</label>
  //    <input type="email" />
  //    </div>
  //     <br />
  //    <div>
  //    <label htmlFor="">Hobbies</label>
  //    <input type="text" />
  //    <br />
  //    <div> 
  
  //    </div>
  //    </div>
      
  //   </div> */}
  //   {/* Hello */}


  //    {/* <div> */}
  //    {/* <form action="" onSubmit={fun1}>
  //       <label htmlFor=""> First Name : <input type="text" name='name' placeholder='enter name' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
  //       <br /><br />
  //       <label htmlFor="">LastName : <input type="rollno" name='rollno'  placeholder='enter rollno' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
  //       <br /><br />
  //       <label htmlFor="">Mobile No :<input type="clg" name='clg'  placeholder='enter clg' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
        
  //       <div style={{width:"100%", height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
  //       <button > submit</button>
  //       </div>

  //   </form> */}
  //   {/* </div> */}

  //   <h2>Insert Data</h2>

  //  <form action=""   style={{display:"flex", flexDirection:"column"}} >
  //   <div><label htmlFor="">FirstName : </label>
  //   <input type="text" placeholder='Enter firstName' name='fname'  onChange={(e) => fun(e.target.name,e.target.value)}/></div>
  //   <br />
  //   <div><label htmlFor="">LastName: </label>
  //   <input type="text" placeholder='enter Last Name' name='lname' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
  //   <br />
  //  <div> <label htmlFor="">Mobile No : </label>
  //  <input type="number" name='mobile' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
  //   <br />
  //   <div><label htmlFor="">Date of birth : </label>
  //   <input type="date" name='dob' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
  //   <br />
  //  <div> <label htmlFor="">Gender : </label>
  //  <div>
  //  <input type="radio" name='gender' value={"male"} onChange={(e) => fun(e.target.name,e.target.value)}  />Male
   
  //  </div>
  //   <div><input type="radio" name='gender' value={"female"} onChange={(e) => fun(e.target.name,e.target.value)} /> Female</div></div>
  //   <br />
  //  <div> <label htmlFor="">Email</label>
  //  <input type="email"  placeholder='enter email' name='email' onChange={(e) => fun(e.target.name,e.target.value)}/></div>
  //   <br />
  //  <div> <label htmlFor="">Hobbies</label>
  //  <input type="textarea" name='hobbies' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
  //     <br />
  //     <div>
  //       <button onClick={fun1} style={{backgroundColor:"blue"}}>Submit</button>
  //     </div>

  //  </form>


  //  <div>
  //     <h2>Records</h2>
  //     <table border="1" style={{borderCollapse:"collapse"}}>
  //       <thead>
  //         <tr style={{backgroundColor:"green"}}>
  //           <th >ID</th>
  //           <th>First Name</th>
  //           <th>Last Name</th>
  //           <th>Mobile</th>
  //           <th>Date of Birth</th>
  //           <th>Gender</th>
  //           <th>Email</th>
  //           <th>Hobbies</th>
  //           <th>Edit</th>
  //           <th>Delete</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {records.map((record,index) => (
  //           <tr key={index} className='table_records'>
  //             <td>{index+1}</td>
  //             <td>{record.fname}</td>
  //             <td>{record.lname}</td>
  //             <td>{record.mobile}</td>
  //             <td>{record.dob}</td>
  //             <td>{record.gender}</td>
  //             <td>{record.email}</td>
  //             <td>{record.hobbies}</td>
  //             <td>
  //               <button onClick={()=> Edit(record)} style={{backgroundColor:"green"}}>Edit</button>
  //             </td>
  //             <td>
  //               <button onClick={() => Delete(record)} style={{backgroundColor:"red"}}>Delete</button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //   </div>
    
  //   </>


  // <>
  //    <form action=""   style={{display:"flex", flexDirection:"column"}} >
  //   <div><label htmlFor="">Name : </label>
  //   <input type="text" placeholder='Enter firstName' name='name'  onChange={(e) => fun(e.target.name,e.target.value)}/></div>
  //   <br />
  //   <div> <label htmlFor="">Email</label>
  //  <input type="email"  placeholder='enter email' name='email' onChange={(e) => fun(e.target.name,e.target.value)}/></div>
  //   <br />
  //  <div> <label htmlFor="">Mobile No : </label>
  //  <input type="number" name='mobile' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
  //   <br />
  //   <input type="file" onChange={handleFileChange} accept="image/*" />

  
  //     <div>
  //       <button onClick={fun2} style={{backgroundColor:"blue"}}>Submit</button>
  //     </div>

  //  </form>
  // </>



  // <>
  //  <div >
  //     <div>
  //       <h2>User Registration</h2>
  //       <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:200,height:300,justifyContent:"space-evenly"}} >
  //         <input
  //           type="text"
  //           name="name"
  //           placeholder="Name"
  //           value={user.name}
  //           onChange={handleChange}
          
  //         />
  //         <input
  //           type="email"
  //           name="email"
  //           placeholder="Email"
  //           value={user.email}
  //           onChange={handleChange}
        
  //         />
  //         <input
  //           type="text"
  //           name="mobile"
  //           placeholder="Mobile Number"
  //           value={user.mobile}
  //           onChange={handleChange}
          
  //         />
  //         <input
  //           type="file"
  //           accept="image/*"
  //           onChange={handleFileChange}
         
  //         />
  //         <button
  //           type="submit"
  //         >
  //           Register
  //         </button>
  //       </form>
  //     </div>

  //   </div>
  
  // </>


  <>
   <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">{updating ? "Update" : "Register"} User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required={!updating} disabled={updating} />
        <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} className="border p-2 w-full" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">{updating ? "Update" : "Register"}</button>
      </form>
      <button onClick={() => setUpdating(!updating)} className="text-blue-500 underline mt-2">{updating ? "Switch to Register" : "Switch to Update"}</button>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  </>

  )
}

export default App
