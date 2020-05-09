# Unit 2 Project: Annasthesia’s Marvelous Musical Automat

## Background

This site is a utility for online tabletop games. I came up with the idea when a friend of mine was running a D&D campaign, and getting stressed out by the logistics of it all. I figured that a little something to streamline at least one part of the process would be a help, so I set out to build one.

Many people play tabletop games over the internet, and one app that’s particularly popular in facilitating this is Discord. Now, Discord has a bot called ‘RYTHM’, which can be used to provide *background music* during a video call by streaming audio from Youtube videos. *Annasthesia’s Marvelous Musical Automat* is designed to work with the RYTHM Bot. It’s main utility is to provide a close-at hand list of links that can be searched and organized according to user preference.

As a sidenote, it would have been the most obvious choice to call the site a *jukebox*, but since the site isn’t actually used to *play* music, I figured that it would be a little inapropriate. So instead I decided to call it a ‘musical automat’: it displays a big wall of links, and lets you select one at your leisure!

## Technologies Used

- HTML
- Javascript
- CSS
- Express
- React
- Mongoose
- Heroku

##Process

###New/Edit Routes

Making the Automat work required, more than anything else, a lot of data massaging.

The process for adding new tracks uses a little trick: if Mongoose is given a command to create a new document that includes keys not found in the model, it will simply ignore the keys altogether. The form for entering a new track provides two methods for selecting a new track’s genre — a dropdown menu with a list of preexisting genres, and a textbox for entering a new genre. Neither of these actually connects to the ‘genre’ part of the form. Upon form submission, the ‘genre’ key is left undefined. Rather, when the data is passed back to the controller, the Route chooses either the data from the dropdown menu or text box based on whether or not a “create new?” checkbox is clicked, and assigns *that* data to the ‘genre’ key.

###The Brute Forcing Issue

Many of the routes required creating brute force lists— inspecting each and every track one by one to compile a list of all the genres and tags that the user has created, with no duplicates. Relying so heavily on brute force searches was somewhat troublesome to me. I think in an ideal situation I would have used separate models to hold those lists, but even then the process of adding and removing data from those lists would have required at least *some* brute force searching, specifically whenever a track was created, edited or delete, because only those events could change the hypothetical list of ‘All Existing Genres/Artists/Sources/Tags’

###Tag System

Having a Tags system at all required data massaging, converting lists of tags back and forth between strings and arrays, as well as using those arrays to write lists of DOM elements in the JSX files, and making sure all the tags were formatted in a nice pretty way.

The Tag system lets the user enter a list of keywords for each track, to further group and organize then. Each tracks’ tags are displayed on its individual Show-Route page, and each of those tags functions as a link to the Tag Search page that automatically specifies *that* tag as the query parameter for the search.

The Tag Search page uses a brute force search of every tag on every track to compile a complete list with no duplicates. It then displays each tag as a clickable link, which leads back to the search page, but with that tag as a query parameter. The page then takes this query parameter and queries mongoose to get all tracks whose tags include that one.

The currently-selected tag is displayed in a different color, so to make the transition between searches less jarring, the links are styled to turn *that same color* on the Focus event— i.e. the moment they’re clicked. So the *new* selected tag will change color *before* the new page loads, whereas the *old* selected tag won’t lose that color until *after* the page loads.   

###Organizing Tracks

The Index Page of the Musical Automat can take a query parameter that instructs it whether to group tracks by Genre, Artist, or Source, which are all keys of the Track Model. To prevent the back-end form getting confused if the user tries to manually enter a different key of the Model, the Controller explicitly ignores all words other than those three.

## Future Plans

The whole point of the Musical Automat is speed and convenience. When I started out, my main goal was to make sure that users could copy RYTHM Bot commands to their clipboard with a single click. I was not able to accomplish this, thanks to the difficulties I ran into making React play nice with Event Listeners.

Also, as a much smaller thing, I’d like to polish the New/Edit pages, so that when the ‘Add New Genre’ box is checked, the ‘Select Preexisting Genre’ menu is disabled, and then it’s unchecked, the “Enter New Genre Name” textbox is disabled.

## Who the Heck is Annasthesia?

She’s the character I was playing during the D&D campaign where I initially came up with the idea for the site. Attributing it to her rather than me was an in-joke among me and the other players. :)