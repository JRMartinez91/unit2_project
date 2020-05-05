const React = require('react')

class Edit extends React.Component{
    render(){
        //get track variables
        const {_id,title,genre,artist,source,url} = this.props.track;
        //get brute force genre list
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
            <h1>Edit Track Info</h1>
            <form action={`/tracklist/track/${_id}/?_method=PUT`} method = "POST" id="updateTrack">
                    <p>Title:<input type="text" name="title" defaultValue={title}/></p>
                    <p>Youtube Link:<input type="url" name="url" defaultValue={url}/></p>
                    {/* Find a way to make it so either:
                    the "enter a name for the genre box only appears when "new genre" is selected from the dropdown
                    OR the dropdown menu only appears when the 'use preexisting genre' checkbox is checked */}
                    <select name="oldGenre" form="newtrack">
                        {/* Create a list of genre names by mapping over the array created above */}
                        { genreList.map((name,index)=>{
                            if(name===genre){
                                //make sure the dropdown menu selects the currently edited track's preexisting genre
                                return( <option value={name} selected>{name}</option>)
                            } else {
                                //if genre doesn't match the currently edited track, display as normal
                                return(<option value={name}>{name}</option>)
                            }
                        })}
                    </select>
                    <p>Add New Genre:<input type="checkbox" name="addingNewGenre"/></p>
                    <input type="text" name="newGenre"/>
                    <p>Optional Information</p>
                    <p>Artist:<input type="text" name="artist" defaultValue={artist}/></p>
                    <p>Source:<input type="text" name="source" defaultValue={source}/></p>
                    <p><input type="submit" name="" value="Add Track"/></p>
                </form>
            </>
        )
    }
}

module.exports = Edit;