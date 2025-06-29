const express = require('express')
const route = express.Router();
// const controller = require('../controlers/Day3_')
// const controller_ = require('../controlers/Emailcontoller')
const { getQuestionsByTechName,addQuestion,addManyQuestions } = require('../controlers/questionController');


// route.post("/register",controller.data);
// route.post("/update",controller.upd);
// route.post("/send-email",controller_.sendEmail);
route.get('/questions/:techName', getQuestionsByTechName);
route.post('/addquestion', addQuestion);
route.post('/addmany', addManyQuestions);
module.exports = route;
