const express  = require("express");
const router = express.Router();
const schemas = require("../models/schema");


//Home routes
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

module.exports = router;
