const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const trackSchema = new Schema({
    title: {type:String, required:true},
    url: {type: String, required:true},
    genre: {type:String, required:true},
},{timestamps:true});

//create model from Schema
const Track = mongoose.model('Track', trackSchema);

//Export Product model
module.exports = Track;