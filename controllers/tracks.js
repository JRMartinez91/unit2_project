const express = require('express');
const router = express.Router();
const Track = require('../models/tracks.js');

//routes

////////////////////
//Index
////////////////////
router.get('/',(req,res)=>{
    //get all tracks
    Track.find({},(error,allTracks)=>{

        //based on info from the url query, determine whether to group by Genre, Artist, or Source
        let searchParameter
        const validParameters = ['genre','artist','source']

        //if the search parameter is EMPTY or INVALID....
        if(!req.query.search || !validParameters.includes(req.query.search)){
            //.... then it defaults to Genre
            searchParameter = "genre";
        } else {
            searchParameter = req.query.search;
        }

        //construct the array of genre/artist/source names
        let groupList = []
        allTracks.map((doc,index)=>{
            if(!groupList.includes(doc[searchParameter])){
                groupList.push(doc[searchParameter]);
            }
        })

        //alphabetize the array
        groupList.sort();

        //if searching by source or artist, make sure the uncategorized ones appear LAST
        if(searchParameter==="artist"){
            groupList.splice(groupList.indexOf("No Artist"),1);
            groupList.push("No Artist")

        } else if(searchParameter==="source"){
            groupList.splice(groupList.indexOf("No Source"),1);
            groupList.push("No Source")
        }

        //use the groupList to organize an array-of-arrays
        let jukebox = [];
        for(group of groupList){
            //create an empty array for each group
            jukebox.push([])
        }

        //loop through each track in the list and add it to the right array
        for(track of allTracks){
            //check the track's group, get its index in the group list,
            //and push it to the corresponding index in the jukebox
            jukebox[groupList.indexOf(track[searchParameter])].push(track);
        }

        //send to Index.jsx
        res.render('Index',{
            jukebox: jukebox,
            searchParameter: searchParameter
        })
    })
})

////////////////////
//New
////////////////////
router.get('/newtrack',(req,res)=>{
    //obtain a brute force list of all preexisting genres
    Track.find({}, 'genre', (err,docs)=>{
        //render New.jsx
        res.render('New',{
            list: docs
        })
    })
   
})

////////////////////
//Edit
////////////////////
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

////////////////////
//Show
////////////////////
router.get('/track/:id',(req,res)=>{
    //find the specific document by id
    Track.findById(req.params.id,(error,foundTrack)=>{
        //send to Show.jsx
        res.render('Show',{
            track: foundTrack
        })
    })
})

////////////////////
//Update
////////////////////
router.put('/track/:id',(req,res)=>{
    if(req.body.addingNewGenre==="on"){
        req.body.genre = req.body.newGenre;
    } else {
        req.body.genre = req.body.oldGenre;
    }

    //parse the string of tags into an array
    //so that tags with the same text but different capitalization
    //are not duplicated, they will all be displayed
    //With The First Letter Of Each Word Capitalized
    req.body.tags = req.body.tags.split(", ")

    req.body.tags = arrayCapCase(req.body.tags);
    
    //manually set default values for a blank artist/source field
    if(req.body.artist.length<1){req.body.artist="No Artist"}
    if(req.body.source.length<1){req.body.source="No Source"}
        
    //update track document
    Track.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedTrack)=>{
        res.redirect(`/tracklist/track/${req.params.id}`)
    })
})

////////////////////
//Delete
////////////////////
router.delete('/:id',(req,res)=>{
    //delete document from collection
    Track.findByIdAndRemove(req.params.id,(err,track)=>{
        res.redirect('/tracklist');
    })
})

////////////////////
//Create
////////////////////
//THIS MUST INCLUDE A SYSTEM THAT FORBIDS DUPLICATE LINKS OR TITLES
//if a duplicate is found, redirect to New.jsx with a message that duplicates are not allowed
router.post('/',(req,res)=>{
    //"genre" is a recognized attribute of the Track model,
    //but oldGenre and newGenre are not, so they wil be ignored
    if(req.body.addingNewGenre==="on"){
        req.body.genre = req.body.newGenre;
    } else {
        req.body.genre = req.body.oldGenre;
    }
    //parse the string of tags into an array
    //so that tags with the same text but different capitalization
    //are not duplicated, they will all be displayed
    //With The First Letter Of Each Word Capitalized
    req.body.tags = req.body.tags.split(", ")
    req.body.tags = arrayCapCase(req.body.tags);

    //fill in default values for Artist and Source
    if(req.body.artist.length<1){req.body.artist="No Artist"}
    if(req.body.source.length<1){req.body.source="No Source"}

    for(word of req.body.tags){
        word[0] = word[0].toUpperCase();
        for(let i = 1; i < word.length; i++){
            if(word[i-1]===" "){
                word[i] = word[i].toUpperCase();
            }
        }
    }



    //prevent dupiclate titles or URLs
    let dupeTitle = false;
    let dupeURL = false;
    Track.find({title:req.body.title},(err,foundTracks)=>{
        if(foundTracks.length>0){
            //duplicate name detected!
            dupeTitle = true;
        }
        Track.find({url:req.body.url},(err,foundTracks)=>{
            if(foundTracks.length>0){
                //duplicate URL detected!
                dupeURL = true;
            }

            if(dupeTitle || dupeURL){
                //if a duplicate title or URL is detected,
                //do NOT create a new track
                res.render('New');
            } else {
                //if there are no duplicates, create a new track
                Track.create(req.body,(error,createdTrack)=>{
                    res.send(createdTrack)
                })
            }
        })
    })
})

////////////////////
//Tag Search
////////////////////
router.get('/tagsearch',(req,res)=>{

    //get brute force list of all tags
    let tagList = []
    Track.find({},(error, allTracks)=>{
        
        //add all tags to a single list
        allTracks.map((doc,index)=>{
            const tags = doc.tags
            for(let i = 0; i<tags.length; i++){
                if(!tagList.includes(tags[i])){
                    tagList.push(tags[i])
                }
            }
        })

        //alphabetize tags
        tagList.sort();
        
        //get the tag to search for from URL query
        let searchParameter = req.query.search;
        
        //find all tracks whose tag lists include that tag
        //pass the list of all possible tags to render the menu
        //  from which the user will select a tag
        Track.find({tags: searchParameter},(error,foundTracks)=>{
            res.render('TagSearch',{
                tracks: foundTracks,
                tagList: tagList,
                activeTag: searchParameter
            })
        })

    })


})

////////////////////
//Raw Index
////////////////////
// rend raw JSON data to browser, for debugging purposes
router.get('/rawdata',(req,res)=>{
    Track.find({},(error,data)=>{
        res.send(data);
    })
})

// Seed
// use only once!!!
router.get('/seedtracks',async (req,res)=>{

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
const newTracks =[
    {
        title: "Strings for a Space Age (1962)",
        url: 'https://www.youtube.com/watch?v=21MvljxtPjc',
        genre: "Retro",
        artist: "Bobby Christian",
        tags:[
            "retrofuture",
            "sci-fi",
            "space",
            "jazz"
        ]
    },
    {
        title: 'Blue Tango',
        url: 'https://www.youtube.com/watch?v=Iw3SYFdPrGc',
        genre: "Retro",
        artist: "Les Baxter",
        tags:[
            "jazz",
        ]
    },
    {
        title: 'Safari',
        url: 'https://www.youtube.com/watch?v=zEyDUjFf-BA',
        genre: 'Retro',
        artist: 'Edmond De Luca',
        tags:[
            'jazz',
            'world',
            'cinematic'
        ]
    },
    {
        title: "La Vie En Rose Medley",
        url:'https://www.youtube.com/watch?v=aGk6d6-osPY',
        genre: 'Retro',
        source: 'Bioshock Infinite',
        artist: 'Edith Piaf',
        tags:[
            'retrofuture',
            'lyrics',
            'soundtrack',
            'bioshock'
        ]
    },
    {
        title: 'La Mer (Burial at Sea)',
        url: 'https://www.youtube.com/watch?v=TWGNxaGtd48',
        genre: 'Retro',
        source: 'Bioshock Infinite',
        tags:[
            'retrofuture',
            'soundtrack',
            'creepy',
        ]
    },
    {
        title: 'Ambient Creepy Horror Music',
        url: 'https://www.youtube.com/watch?v=oxvDnaWe5XE',
        genre: 'Atmospheric Horror',
        artist: 'Graham Plowman',
        tags:[
            'horror',
            'atmospheric',
            'lovecraft',
            'creepy'
        ]
    },
    {
        title: 'Silent Chill Redux',
        url: 'https://www.youtube.com/watch?v=vteCosE9qnM',
        genre: 'Atmospheric Horror',
        source: 'Silent Hill',
        tags:[
            'soundtrack',
            'horror',
            'creepy',
            'chill',
            'atmospheric'
        ]
    },
    {
        title: 'Invoking Nameless Horrors',
        url: 'https://www.youtube.com/watch?v=lPs5lZjvGQo',
        genre: 'Atmospheric Horror',
        artist: 'Iron Cthulhu Apocalypse',
        tags:[
            'atmospheric',
            'horror',
            'creepy',
            'lovecraft'
        ]
    },
    {
        title: 'Dark Piano - Sociopath',
        url: 'https://www.youtube.com/watch?v=VagES3pxttQ',
        genre: 'Atmospheric Horror',
        artist: 'Lucas King',
        tags:[
            'piano',
            'instrumental',
            'creepy',
            'atmospheric',
            'horror'
        ]
    },
    {
        title: 'Wanted Dead or Alive',
        url: 'https://www.youtube.com/watch?v=W2deYsT3uCs',
        genre: 'Action',
        source: 'Payday 2',
        artist: 'Simon Viklund',
        tags:[
            'crime',
            'fast',
            'instrumental',
        ]
    },
    {
        title: 'Infinite Ammo',
        url: 'https://www.youtube.com/watch?v=7tB4kHNhEHc',
        genre: 'Action',
        source: 'Payday 2',
        artist: 'Le Castle Vania',
        tags:[
            'crime',
            'fast',
            'action',
            'electronica'
        ]
    }]


try {
    const seedTracks = await Track.create(newTracks)
    res.send(seedTracks)
    console.log("seed tracks added")
  } catch (err) {
    res.send(err.message)
  }
})

//Capitalization function, for use in Create and Update routes

//return a string with Every Word Capitalized
const capCase = (phrase) => {

        //split phrase into an array of letters
        let phraseArray = phrase.split("");

        //capitalize first letter of the array
        phraseArray[0] = phraseArray[0].toUpperCase();

        //for remaining letters...
        for(let i = 1; i < phraseArray.length; i++){
            //...capitalize the letter if the previous character is a space
            if(phraseArray[i-1]===" "){
                phraseArray[i] = phraseArray[i].toUpperCase();
            }
        }
        //convert array to string
        const newPhrase = phraseArray.reduce((acc,cur)=>{
            return acc + cur;
        })
    
        return newPhrase
}

//return an array of strings with Each Word In Each String Capitalized
const arrayCapCase = (arrayOfTags) => {

    let newTags = [];

    for(i = 0; i < arrayOfTags.length; i++){
        newTags.push(capCase(arrayOfTags[i]));
    }

    return newTags;
}

module.exports = router;