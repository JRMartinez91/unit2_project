const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const trackSchema = new Schema({
    title: {type:String, required:true},
    url: {type: String, required:true},
    genre: {type:String, required:true},
    source: {type:String, default:"No Source"},
    artist: {type:String, default:"No Artist"},
    tags: [{type:String}]
},{timestamps:true});

//create model from Schema
const Track = mongoose.model('Track', trackSchema);

//Export Product model
module.exports = Track;