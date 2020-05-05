const React = require('react');

class Index extends React.Component{
    render(){
        const {jukebox} = this.props;
        return(
            <>
                <h1>Annasthesia's Marvelous Musical Automat</h1>
                <div>
                    {
                        //jukebox is an array-of-arrays that contains each genre category as an element
                        jukebox.map((genre,index)=>{
                            return(
                                <div>
                                    {/* we can asssume the first song in the category has the correct genre name on hand. */}
                                    <h2>{genre[0].genre}</h2>
                                    <div>
                                    {
                                        // each genre category is an array of tracks
                                        genre.map((track,index)=>{
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
                        }) //end mapping over genres 
                    }
                </div> {/* end list of all tracks div */}
            </>
        )
    }
}

module.exports = Index;