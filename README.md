# unit2_project
James Martinez's Unit 2 Project, SEIR-MAE


## Task at hand:

Most of the routes are functional.

The next step is about organizing tracks -- being able to sort them on the index page
- by Genre (default)
- by Artist
- by Source
- Alphabetical by Title
- by upload date

- Update:
    - genre, artist, and source are functional.
    - alphabetical and upload date are not.

## Next Step

- index page interface
    - what sort of buttons will lead the user to the edit/delete/view pages?
        - IDEA: buttons are stored "behind" the title-- when the "display options" button is clicked, the panel "flips around", displaying the edit/delete/view buttons as a panel in the same spot.
        - this back-box could either be created when the button is clicked, or kept hidden in "storage"-- the latter probably won't be *too* hard on memory.
    - how bout an "are you sure you want to delete?" alert
- storing masterlists of Artist, Genre, and Source as separate databases
    - turns out this isn't necessary
- gotta add the central functionality of one-click copy to clipboard

## Would be nice:

- find a way to grey out certain parts of the New/Edit menus when they become unavailable

## Interesting things I've done so far.

- massaging the data to create arrays-of-arrays
    - in particular using bracket notation to select attributes from mongoose docs
- organizing the index page via nested map functions
- deliberately including 'junk data' in the mongoose create functions, knowing that it will be ignored. The form does not create an actual 'genre' attribute for the Track object, rather, once the data from the form is passed to the Create route, the controller creates the genre attribute by choosing from one of two possible inputs on the form.
- how did we handle the "No Artist" and "No Source" defaults?

- the tag search is probably the coolest aspect of this

- difficulties with event handlers
    - wrestling with the diferences between react and express-react

- the backstory of the site-- origin of Annasthesia Mascot? :P