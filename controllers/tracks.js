const express = require('express');
const router = express.Router();
const Track = require('../models/tracks.js');

//routes

//Index
router.get('/',(req,res)=>{
    //get all tracks
    //send to Index.jsx
    res.send("Welcome to Annasthesia's Marvelous Musical Automat");
})

//New
router.get('/newtrack',(req,res)=>{
    //render New.jsx
    res.send("Add a New Track")
})

//Edit

//Show
router.get('/:id',(req,res)=>{
    //find the specific document by id
    //send to Show.jsx
    res.send("Show Route")
})

//Update

//Delete

//Create