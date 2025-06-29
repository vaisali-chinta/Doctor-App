const mongoose = require('mongoose');
const mydb = require('../models/Vedadata');

const Vedadata = async (req, res) => {
    try {
        const events = await mydb.find();
        return res.status(200).json(events);
    } catch (err) {
        return res.status(500).json(err);
    }
};


const AddData = async (req, res) => {
    const data = req.body;
    mydb.insertMany(data)
        .then(result => {
            return res.status(201).json("all records are added");
        })
        .catch(err => {
            return res.status(500).json(err);
        })
};


const Update = async (req, res) => {
    try {
        const rollNumber = "22A91A61D1";
        const updatedUser = await mydb.findOneAndUpdate(
            { userRollNumber: rollNumber },
            { $set: { userName: "RAM CHARAN" } },
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};


const Delete = async (req, res) => {
    try {
        const Deleteduser = await mydb.deleteMany(
            { userCollege: "ACOE1" } && { userGender: "Male" }
        );
        if (!Deleteduser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User Deleted successfully", user: Deleteduser });

    }
    catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
}



const getGenderCount = async (req, res) => {
    try {
        const result = await mydb.aggregate([
            {
                $group: {
                    _id: "$userGender",
                    count: { $sum: 1 }
                }
            }
        ]);

        const genderCount = {};
        result.forEach(i => {
            genderCount[i._id] = i.count;
        });
        res.json(genderCount);
    } catch (error) {
        res.status(500).json({ message: "gender count is not found", error: error.message });
    }
};

//   const departmentgendercount = async(req,res) =>{
//     try{
//         const result = mydb.aggregate([
//             {
//                 $group:{
//                 _id:"$userDepartment",
//                 _id1: "$userGender",
//                 count:{$sum :1}
//             }
//         }
//         ]);
//         const genderCount = {};
//       result.forEach(i => {
//         genderCount[i._id1] = i.count;
//       });
//       res.json(genderCount);
//     }
//     catch(error){
//         res.status(500).json({ message: "gender count of depaerment is not found", error: error.message });

//     }
//   }



const revenueofdepartment = async (req, res) => {
    try {
        const result = await mydb.aggregate([
            {
                $group: {
                    _id: "$userEventCategory",
                    Teams: { $sum: 1 }

                }
            }
        ]);
        const revenue = {}
        result.forEach((i) => {
            revenue[i._id] = i.Teams * 100;
        })

        res.json(revenue);
    } catch (error) {
        res.status(500).json({ message: "Error calculating revenue by department", error: error.message });
    }
};


const revenuebygender = async (req, res) => {
    try {
        const result = await mydb.aggregate([
            {
                $group: {
                    _id: "$userGender",
                    Teams: { $sum: 1 }
                }
            }
        ]);

        const revenue = {}
        result.forEach((i) => {
            revenue[i._id] = i.Teams * 100;
        })

        res.json(revenue);
    } catch (error) {
        res.status(500).json({ message: "revenue by gender not found", error: error.message });
    }
};


const getHostellersPerDepartment = async (req, res) => {
    try {
        const result = await mydb.aggregate([
            {
                $group: {
                    _id: {
                        department: "$userEventCategory",
                        accommodation: "$userAccomodation",
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hostellers per department", error: error.message });
    }
};

exports.Vedadata = Vedadata;
exports.AddData = AddData;
exports.Update = Update;
exports.Delete = Delete;
exports.getGenderCount = getGenderCount;
exports.revenueofdepartment = revenueofdepartment
// exports.departmentgendercount = departmentgendercount
exports.revenuebygender = revenuebygender;
exports.getHostellersPerDepartment = getHostellersPerDepartment




































































