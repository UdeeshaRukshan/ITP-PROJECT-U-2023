const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    
    name : { //attributes in student schema
        type : String,
        required: true //can't keep empty
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
})

const Student = mongoose.model("Student",studentSchema); //(tablename,schema name we created before)

module.exports = Student;