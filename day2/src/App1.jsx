
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DiBlackberry } from 'react-icons/di'
import { useState, useEffect } from "react";


function App() {

  const [arr, setArr] = useState([]);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    dob: "",
    gender: "",
    email: "",
    hobbies: "",
  });

  const fun = (name,value) =>{
       
    setData(prev => ({...prev,[name] : value}))
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
      setArr([...arr, data]); 
      console.log(arr)
      alert("Data submitted successfully!");

    } else {
      console.log("Failed to submit the Data")
      alert("Failed to submit the data");
    }
  } catch (error) {
    console.log(error)
    alert("Error submitting data");
  }
};


 const [records, setRecords] = useState([]);
  // const [editData, setEditData] = useState(null);

  
  const fetchRecords = async () => {
    try {
      const response = await fetch("https://api.jami.ltd/getAllRecords");
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        console.error("Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);


  // const handleEdit = (record) => {
  //   setEditData(record);
  // };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("https://api.jami.ltd/updateRecord", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(editData),
  //     });

  //     if (response.ok) {
  //       alert("Record updated successfully!");
  //       fetchRecords(); 
  //       setEditData(null); 
  //     } else {
  //       console.error("Failed to update record");
  //     }
  //   } catch (error) {
  //     console.error("Error updating record:", error);
  //   }
  // };



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

    <>
    {/* <div style={{width:500,height:500}}>
      <div>
      <label htmlFor="">FirstName : </label>
      <input type="text" />
      </div>
      <br />
      <div><label htmlFor="">Lastname : </label>
      <input type="text" /></div>
      <br />
      <div><label htmlFor="">Mobile No : </label>
      <input type="number" /></div>
      <br />
     <div> <label htmlFor="">Date of birth : </label>
     <input type="date" /></div>
      <br />
     <div>
     <label htmlFor="">Gender : </label>
      <input type="radio"  name='testing' />
      Male
      <input type="radio" name='testing' />
      female
     </div>
      <br />
     <div>
     <label htmlFor="">Email</label>
     <input type="email" />
     </div>
      <br />
     <div>
     <label htmlFor="">Hobbies</label>
     <input type="text" />
     <br />
     <div> 
  
     </div>
     </div>
      
    </div> */}
    {/* Hello */}


     {/* <div> */}
     {/* <form action="" onSubmit={fun1}>
        <label htmlFor=""> First Name : <input type="text" name='name' placeholder='enter name' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
        <br /><br />
        <label htmlFor="">LastName : <input type="rollno" name='rollno'  placeholder='enter rollno' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
        <br /><br />
        <label htmlFor="">Mobile No :<input type="clg" name='clg'  placeholder='enter clg' onChange={(e) => fun(e.target.name,e.target.value)} /></label>
        
        <div style={{width:"100%", height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <button > submit</button>
        </div>

    </form> */}
    {/* </div> */}

   <form action=""   style={{display:"flex", flexDirection:"column"}} >
    <div><label htmlFor="">FirstName : </label>
    <input type="text" placeholder='Enter firstName' name='fname'  onChange={(e) => fun(e.target.name,e.target.value)}/></div>
    <br />
    <div><label htmlFor="">LastName: </label>
    <input type="text" placeholder='enter Last Name' name='lname' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
    <br />
   <div> <label htmlFor="">Mobile No : </label>
   <input type="number" name='mobile' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
    <br />
    <div><label htmlFor="">Date of birth : </label>
    <input type="date" name='dob' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
    <br />
   <div> <label htmlFor="">Gender : </label>
   <div>
   <input type="radio" name='gender' value={"male"} onChange={(e) => fun(e.target.name,e.target.value)}  />Male
   
   </div>
    <div><input type="radio" name='gender' value={"female"} onChange={(e) => fun(e.target.name,e.target.value)} /> Female</div></div>
    <br />
   <div> <label htmlFor="">Email</label>
   <input type="email"  placeholder='enter email' name='email' onChange={(e) => fun(e.target.name,e.target.value)}/></div>
    <br />
   <div> <label htmlFor="">Hobbies</label>
   <input type="textarea" name='hobbies' onChange={(e) => fun(e.target.name,e.target.value)} /></div>
      <br />
      <div>
        <button onClick={fun1}>Submit</button>
      </div>

   </form>


   <div>
      <h2>Records</h2>
      <table border="1" style={{borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Hobbies</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {records.map((record,index) => (
            <tr key={record.id}>
              <td>{index+1}</td>
              <td>{record.fname}</td>
              <td>{record.lname}</td>
              <td>{record.mobile}</td>
              <td>{record.dob}</td>
              <td>{record.gender}</td>
              <td>{record.email}</td>
              <td>{record.hobbies}</td>
              {/* <td>
                <button onClick={() => handleEdit(record)}>Edit</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* {editData && (
        <div>
          <h2>Edit Record</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="fname"
              value={editData.fname}
              onChange={(e) => setEditData({ ...editData, fname: e.target.value })}
            />
            <input
              type="text"
              name="lname"
              value={editData.lname}
              onChange={(e) => setEditData({ ...editData, lname: e.target.value })}
            />
            <input
              type="number"
              name="mobile"
              value={editData.mobile}
              onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
            />
            <button type="submit">Update</button>
            <button onClick={() => setEditData(null)}>Cancel</button>
          </form>
        </div>
      )} */}
    </div>
    
    </>
  )
}

export default App
