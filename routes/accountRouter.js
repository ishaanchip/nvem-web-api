const express  = require("express");
const router = express.Router();
const schemas = require("../models/schema");

//GENERAL ROUTES
    //gathering account data
    router.get('/get-nvem-account/:email', async(req, res) =>{
        try{
            let email = req.params.email;
            const accountQuery = schemas.NvemAccounts;
            const result = await accountQuery.findOne(
                {'email':email},
                {_id:0}
            )
            console.log("success!");
            res.status(200).json({result})
        }
        catch(err){
            console.log(`there was backend error getting account info: ${err}`)
        }
    })
//HOME ROUTES
    // //creating account
    router.post('/create-nvem-account', async(req, res) =>{
        try{
            let {firstName, lastName, email} = req.body;

            //est query for account
            const accountQuery = schemas.NvemAccounts;

            //checks to see if user alr exists
            const userExists = await accountQuery.find({email:email})
            if (userExists.length === 0){                
                //preparing insert document
                    const nvemAccounInsert = {
                        first_name:firstName,
                        last_name:lastName,
                        email:email,
                        course_history:[],
                    }
                //sending account to be made
                    const newAccount = new accountQuery(nvemAccounInsert)
                    const result = await newAccount.save()
                    console.log(result)
            }

            res.status(200).json({ success: true });

        }
        catch(err){
            console.log(`Errors posting/making account in backend: ${err}`)
        }
    })

//ARTICLE
    //updating highlight data
    router.put('/update-highlight-data', async(req, res) =>{
        try{
            let {course_name, email, highlights} = req.body;
            const accountQuery = schemas.NvemAccounts;
            const updateField = `course_history.${course_name}.article_highlights`;
            const result = await accountQuery.updateOne(
                {email:email},
                {$set: {[updateField]: highlights}},
            )
            console.log('hi?')

            if (!result) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, updatedAccount: result });
            console.log('run?')
        }
        catch (err){
            console.log(`there was a backend error: could not add user highlights -> ${err}`)
        }
    })

//CODING TASK
    //updating code history data
    router.put('/update-code-history', async(req, res) =>{
        try{
            let {course_name, email, code_history} = req.body;
            const accountQuery = schemas.NvemAccounts;
            const updateField = `course_history.${course_name}.code_history`;
            const result = await accountQuery.updateOne(
                {email:email},
                {$set: {[updateField]: code_history}},
            )
            console.log('hi?')

            if (!result) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, updatedAccount: result });
            console.log('run?')
        }
        catch (err){
            console.log(`there was a backend error: could not add user code -> ${err}`)
        }
    })



//QUIZ
    //updating quiz history data
    router.put('/update-quiz-history', async(req, res) =>{
        try{
            let {course_name, email, quiz_score, quiz_history} = req.body;
            const accountQuery = schemas.NvemAccounts;
            const updateFieldOne = `course_history.${course_name}.quiz_score`;
            const updateFieldTwo = `course_history.${course_name}.quiz_history`;
            const updateFieldThree = `course_history.${course_name}.quiz_attempts`;

            const result = await accountQuery.updateOne(
                {email:email},
                {
                    $set: {[updateFieldOne]: quiz_score, [updateFieldTwo]: quiz_history},
                    $inc: {[updateFieldThree]: 1}
                },
                
            )
            console.log('hi?')

            if (!result) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            res.status(200).json({ success: true, updatedAccount: result });
            console.log('run?')
        }
        catch (err){
            console.log(`there was a backend error: could not add quiz data -> ${err}`)
        }
    })



module.exports = router;
