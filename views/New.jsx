const React = require('react');
const Header = require('./Header')

class New extends React.Component {
    render(){
        //Brute force approach:
        //  go through every track one by one and compile a list of genre names encountered
        //  then save these to an array, which will then be used to create the dropdown menu below
        //  Ideally we'd have a preexisitng masterlist of genres saved elsewhere...
        //  Then again this will automatically track when all songs in a genre have been deleted and remove
        //  the genre from any list. Hrm.
        const {list} = this.props;
        //construct the array
        let genreList = []
        list.map((doc,index)=>{
            if(!genreList.includes(doc.genre)){
                genreList.push(doc.genre);
            }
        })
        //alphabetize the array
        genreList.sort();

        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
                <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400' rel='stylesheet' type='text/css'></link>
                <link href="https://fonts.googleapis.com/css2?family=Cutive&family=Engagement&family=Oregano&family=Ranga:wght@400;700&display=swap" rel="stylesheet"></link>

            </head>
            <body>
            <Header/>
            <div className="form-box-wrapper">
            <div className="form-box">
                <h1>New Track</h1>
                <form action="/tracklist" method = "POST" id="newtrack">
                    <p>Title:<input type="text" name="title"/></p>
                    <p>Youtube Link:<input type="url" name="url"/></p>
                    {/* Find a way to make it so either:
                    the "enter a name for the genre box only appears when "new genre" is selected from the dropdown
                    OR the dropdown menu only appears when the 'use preexisting genre' checkbox is checked */}
                    <p>Genre: <select name="oldGenre" form="newtrack">
                        {/* Create a list of genre names by mapping over the array created above */}
                        { genreList.map((name,index)=>{
                            return(
                                <option value={name}>{name}</option>
                            )
                        })}
                    </select></p>
                    <p>Add New Genre:<input type="checkbox" name="addingNewGenre"/></p>
                    <input type="text" name="newGenre"/>
                    <p className="centered">Optional Information</p>
                    <p>Artist:<input type="text" name="artist"/></p>
                    <p>Source:<input type="text" name="source"/></p>
                    <p>Tags:<input type="text" name="tags"/></p>
                    <p className="button-wrapper"><input className="big-button" type="submit" name="" value="Add Track"/></p>
                </form>
            </div>
            </div>
            </body>
            </>
        )
    }
}

module.exports = New;