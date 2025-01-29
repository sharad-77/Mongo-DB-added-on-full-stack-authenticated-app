const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const User = new Schema({
    email:String,
    password:String,
    name:String
});

const Todo = new Schema({
    titel:String,
    done:Boolean,
    user_id:ObjectId
});

///For Sending this Schemas to db We use model
const Usermodel = mongoose.model('users',User);
const Todomodel = mongoose.model('todos',Todo);

///if you want to use this schema model than you have to export it

module.exports = {
    Usermodel:Usermodel,
    Todomodel:Todomodel
};