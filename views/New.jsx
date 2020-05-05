const React = require('react');

class New extends React.Component {
    render(){
        //Brute force approach:
        //  go through every track one by one and compile a list of genre names encountered
        //  then save these to an array, which will then be used to create the dropdown menu below
        //  Ideally we'd have a preexisitng masterlist of genres saved elsewhere...
        const {genres} = this.props;
        //construct the array
        let genreList = []
        genres.map((doc,index)=>{
            if(!genreList.includes(doc.genre)){
                genreList.push(doc.genre);
            }
        })
        //alphabetize the array
        genreList.sort();

        return(
            <div>
                <h1>Add New Track</h1>
                <form action="/tracklist" method = "POST" id="newtrack">
                    <p>Title:<input type="text" name="title"/></p>
                    <p>Youtube Link:<input type="url" name="url"/></p>
                    {/* Find a way to make it so either:
                    the "enter a name for the genre box only appears when "new genre" is selected from the dropdown
                    OR the dropdown menu only appears when the 'use preexisting genre' checkbox is checked */}
                    <select name="oldGenre" form="newtrack">
                        {/* Create a list of genre names by mapping over the array created above */}
                        { genreList.map((name,index)=>{
                            return(
                                <option value={name}>{name}</option>
                            )
                        })}
                    </select>
                    <p>Add New Genre:<input type="checkbox" name="addingNewGenre"/></p>
                    <input type="text" name="newGenre"/>
                    <p>Optional Information</p>
                    <p>Artist:<input type="text" name="artist"/></p>
                    <p>Source:<input type="text" name="source"/></p>
                    <p><input type="submit" name="" value="Add Track"/></p>
                </form>
            </div>
        )
    }
}

module.exports = New;