const express = require('express');
const router = express.Router();
const Track = require('../models/tracks.js');

//routes

//Index
router.get('/',(req,res)=>{
    //get all tracks
    Track.find({},(error,allTracks)=>{
        //send to Index.jsx
        res.render('Index',{
            tracks:allTracks
        })
    })
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
    Track.findById(req.params.id,(error,foundTrack)=>{
        //send to Show.jsx
        res.render('Show',{
            track: foundTrack
        })
    })
})

//Update

//Delete

//Create
//THIS MUST INCLUDE A SYSTEM THAT FORBIDS DUPLICATE LINKS OR TITLES
//if a duplicate is found, redirect to New.jsx with a message that duplicates are not allowed

//Seed
//use only once!!!
// router.get('/seedtracks',async (req,res)=>{

// const newTracks = [
// {
//     title: "One Winged Angel",
//     url:"https://www.youtube.com/watch?v=t7wJ8pE2qKU",
//     genre:"Boss Battle",
//     source:"Final Fantasy VII",
//     artist:"Nobuo Oematsu"
// },
// {
//     title: "Mad Moxxi's Underdome Riot: Boss Wave",
//     url: "https://www.youtube.com/watch?v=1WC-MOIwBTw",
//     genre: "Boss Battle",
//     source: "Borderlands",
// },
// {
//     title: "Ode to Greed",
//     url: "https://www.youtube.com/watch?v=Ul0YbD1AIeE",
//     genre: "Boss Battle",
//     source: "Payday 2",
// }]

// try {
//     const seedTracks = await Track.create(newTracks)
//     res.send(seedTracks)
//     console.log("seed tracks added")
//   } catch (err) {
//     res.send(err.message)
//   }
// })


module.exports = router;