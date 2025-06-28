const express  = require("express");
const router = express.Router();
const schemas = require("../models/schema");


//GENERAL ROUTES
    //gathering account data
    router.get('/get-nvem-course/:course_name', async(req, res) =>{
        try{
            let course_name = req.params.course_name;
            const courseQuery = schemas.NvemCourses;
            const result = await courseQuery.findOne(
                {'course_name':course_name},
                {_id:0}
            )
            console.log("success!");
            res.status(200).json({result})
        }
        catch(err){
            console.log(`there was backend error getting course info: ${err}`)
        }
    })

//COURSE-CATALOG ROUTES

    //adding account to waitlist
    router.put('/add-to-waitlist', async(req, res) =>{
        try{
            let {course_name, email} = req.body;
            const courseQuery = schemas.NvemCourses;
            const result = await courseQuery.updateOne(
                {course_name:course_name},
                {$push: {waitlist: email}},
            )

            if (!result) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            res.status(200).json({ success: true, updatedAccount: result });
        }
        catch (err){
            console.log(`there was a backend error: could not add user to waitlist -> ${err}`)
        }
    })




//INJECTION ROUTES [sending made course-content to backend]

    //sending data to quiz
    router.put('/add-quiz-content', async(req, res) =>{
        try{
            let {course_name, question_bank} = req.body;
            const courseQuery = schemas.NvemCourses;
            const updateField = `content.question_bank`
            const result = await courseQuery.updateOne(
                {course_name:course_name},
                {$set: {[updateField]: question_bank}},
            )

            if (!result) {
                return res.status(404).json({ success: false, message: "Course not found" });
            }

            res.status(200).json({ success: true, updatedAccount: result });

        }
        catch(err){
            console.log(`there was a backend error: could not add quiz data -> ${err}`)
        }
    })

module.exports = router;