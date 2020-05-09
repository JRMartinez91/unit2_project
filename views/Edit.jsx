const React = require('react')
const Header = require('./Header')

class Edit extends React.Component{
    render(){
        //get track variables
        const {_id,title,genre,artist,source,tags} = this.props.track;
        let {url} = this.props.track
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
        //convert tags array into string
        let tagList = "";
        for(let i = 0; i<tags.length; i++){
            tagList += tags[i];
            //add a comma between tags, but not after the last one
            if(i<(tags.length-1)){
                tagList += ", ";
            }
        }
        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
            </head>
            <body>
                <Header/>
            <div className="form-box-wrapper">
                <div className="video-wrapper">
                    <iframe src={url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                </div>
            <div className="form-box">
            <h1>Edit Track Info</h1>
            <form action={`/tracklist/track/${_id}/?_method=PUT`} method = "POST" id="updateTrack">
                    <p>Title:<input type="text" name="title" defaultValue={title}/></p>
                    <p>Youtube Link:<input type="url" name="url" defaultValue={url}/></p>
                    {/* Find a way to make it so either:
                    the "enter a name for the genre box only appears when "new genre" is selected from the dropdown
                    OR the dropdown menu only appears when the 'use preexisting genre' checkbox is checked */}
                    <p>Genre:
                    <select name="oldGenre" form="updateTrack">
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
                    </select></p>
                    <p>Add New Genre?:<input type="checkbox" name="addingNewGenre"/></p>
                    <p>New Genre:<input type="text" name="newGenre"/>(optional)</p>
                    <p>Optional Information</p>
                    <p>Artist:<input type="text" name="artist" defaultValue={artist}/></p>
                    <p>Source:<input type="text" name="source" defaultValue={source}/></p>
                    <p>Tags:<input type="text" name="tags" defaultValue={tagList}/></p>
                    <p><input type="submit" name="" value="Add Track"/></p>
                </form>
            </div>
            </div>
            </body>
            </>
        )
    }
}

module.exports = Edit;