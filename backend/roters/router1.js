const express = require('express')
const route = express.Router();
const controller = require('../controlers/Day3')

route.post("/vedadata",controller.Vedadata);
route.post("/AddData",controller.AddData);
route.get("/Update",controller.Update);
route.get("/Deleteuser",controller.Delete);
route.get("/Getgendercount",controller.getGenderCount);
route.get("/revenueofdepartment",controller.revenueofdepartment)
// route.get("/departmentgendercount",controller.departmentgendercount)
route.get("/revenuebygender",controller.revenuebygender)
route.get("/getHostellersPerDepartment",controller.getHostellersPerDepartment)

module.exports = route;