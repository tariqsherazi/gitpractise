const mongoose = require('mongoose');
const postSchema= new mongoose.Schema({
    
    title:{type:String, required:true},
    username:{type:String},
    desc:{type:String, required:true},
    photo:{type:String },


})
module.exports=mongoose.model('Post', postSchema);