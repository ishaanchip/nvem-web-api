const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const nvemAccountSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    course_history:{type:[Object]},
    create_date:{type:Date, default: Date.now},
})

const NvemAccounts = mongoose.model('nvem_accounts', nvemAccountSchema, 'accounts');




const mySchemas = {'NvemAccounts':NvemAccounts}

module.exports = mySchemas;