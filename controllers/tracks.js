const express = require('express');
const router = express.Router();
const Track = require('../models/tracks.js');

//routes

//Index
router.get('/',(req,res)=>{
    //get all tracks
    Track.find({},(error,allTracks)=>{
        //create an object where each key is a genre and each value is an array of the songs in that genre

        //construct the array of genre titles
        let genreList = []
        allTracks.map((doc,index)=>{
            if(!genreList.includes(doc.genre)){
                genreList.push(doc.genre);
            }
        })

        //alphabetize the array
        genreList.sort();

        //use the array to organize an array-of-arrays
        let jukebox = [];
        for(genre of genreList){
            //create an empty array for each genre
            jukebox.push([])
        }

        //loop through each track in the list and add it to the right array
        for(track of allTracks){
            //check the track's genre, get its index in the genre list,
            //and push it to the corresponding index in the jukebox
            jukebox[genreList.indexOf(track.genre)].push(track);
        }

        //send to Index.jsx
        res.render('Index',{
            jukebox: jukebox
        })
    })
})

//New
router.get('/newtrack',(req,res)=>{
    //obtain a brute force list of all preexisting genres
    Track.find({}, 'genre', (err,docs)=>{
        //render New.jsx
        res.render('New',{
            list: docs
        })
    })
   
})

//Edit
router.get('/track/:id/edit',(req,res)=>{
    //find the track in question by id
    Track.findById(req.params.id,(err,foundTrack)=>{
        //get genrelist
        Track.find({},'genre',(err,genres)=>{
            //render Edit.jsx'
            res.render('Edit',{
                track: foundTrack, list: genres
            })
        })
    })
})


//Show
router.get('/track/:id',(req,res)=>{
    //find the specific document by id
    Track.findById(req.params.id,(error,foundTrack)=>{
        //send to Show.jsx
        res.render('Show',{
            track: foundTrack
        })
    })
})

//Update
router.put('/track/:id',(req,res)=>{
        if(req.body.addingNewGenre==="on"){
            req.body.genre = req.body.newGenre;
        } else {
            req.body.genre = req.body.oldGenre;
        }
        
        //update track document
        Track.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedTrack)=>{
            res.redirect(`/tracklist/track/${req.params.id}`)
        })
})

//Delete
router.delete('/:id',(req,res)=>{
    //delete document from collection
    Track.findByIdAndRemove(req.params.id,(err,track)=>{
        res.redirect('/tracklist');
    })
})

//Create
//THIS MUST INCLUDE A SYSTEM THAT FORBIDS DUPLICATE LINKS OR TITLES
//if a duplicate is found, redirect to New.jsx with a message that duplicates are not allowed
router.post('/',(req,res)=>{
    if(req.body.addingNewGenre==="on"){
        req.body.genre = req.body.newGenre;
    } else {
        req.body.genre = req.body.oldGenre;
    }
    //"genre" is a recognized attribute of the Track model,
    //but oldGenre and newGenre are not, so they wil be ignored
    Track.create(req.body,(error,createdTrack)=>{
        res.send(createdTrack)
    })
})

//Raw Index
// rend raw JSON data to browser, for debugging purposes
router.get('/rawdata',(req,res)=>{
    Track.find({},(error,data)=>{
        res.send(data);
    })
})

//Seed
// use only once!!!
// router.get('/seedtracks',async (req,res)=>{

// const newTracks = [
// {
//     title: "King Nothing",
//     url:"https://www.youtube.com/watch?v=8PW7JeFKA-A",
//     genre:"Heavy Metal",
//     artist:"Metallica"
// },
// {
//     title: "Il Vento d'Oro",
//     url: "https://www.youtube.com/watch?v=U0TXIXTzJEY",
//     genre: "Anime",
//     artist: "Yugo Kanno",
//     source: "Jojo's Bizarre Adventure",
//     stand: "Gold Experience"
// },
// {
//     title: "Yellowline",
//     url: "https://www.youtube.com/watch?v=DAK24FQ7DrA",
//     genre: "Anime",
//     source: "Redline",
//     artist: "James Shimoji",
//     racer: "Sweet JP",
//     director: "Takeski Koike"
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