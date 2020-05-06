const React = require('react');

class Index extends React.Component{
    render(){
        const {jukebox, searchParameter} = this.props;
        return(
            <>
                <h1>Annasthesia's Marvelous Musical Automat</h1>
                <nav>
                    <a href="/tracklist/newtrack">Add New Track</a>
                    <a href="/tracklist?search=genre">Sort by Genre</a>
                    <a href="/tracklist?search=artist">Sort by Artist</a>
                    <a href="/tracklist?search=source">Sort by Source</a>
                </nav>
                <div>
                    {
                        //jukebox is an array-of-arrays that contains each group category as an element
                        jukebox.map((group,index)=>{
                            return(
                                <div>
                                    {/* we can asssume the first song in the category has the correct group name on hand. */}
                                    <h2>{group[0][searchParameter]}</h2>
                                    <div>
                                    {
                                        // each genre category is an array of tracks
                                        group.map((track,index)=>{
                                        return(
                                            <div>
                                                <h3><a href={`/tracklist/track/${track.id}`}>{track.title}</a></h3>
                                                <p>{track.url}</p>
                                                <p>{track.genre}</p>
                                                <form action={`/tracklist/${track._id}?_method=DELETE`} method="POST">
                                                    <input type="submit" value="delete"/>
                                                </form>
                                                <p><a href={`/tracklist/track/${track._id}/edit`}>Edit Track</a></p>
                                            </div>
                                            )
                                        }) // end mapping over tracks
                                    }  
                                    </div>
                                </div>
                            ) 
                        }) //end mapping over groups
                    }
                </div> {/* end list of all tracks div */}
            </>
        )
    }
}

module.exports = Index;