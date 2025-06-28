const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const nvemAccountSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    course_history:{type:[Object]},
    create_date:{type:Date, default: Date.now},
})

const nvemCoursesSchema = new Schema({
    course_name:{type:String, required:true},
    content:{type:Object},
    waitlist:{type:[String], default:[]}
})

const NvemAccounts = mongoose.model('nvem_accounts', nvemAccountSchema, 'accounts');

const NvemCourses = mongoose.model('nvem_courses', nvemCoursesSchema, 'courses');




const mySchemas = {'NvemAccounts':NvemAccounts, 'NvemCourses':NvemCourses}

module.exports = mySchemas;