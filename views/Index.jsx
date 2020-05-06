const React = require('react');

class Index extends React.Component{

componentDidMount () {
    const script = document.createElement("script");
    script.src = "click_copy.js";
    script.async = true;
    document.body.appendChild(script);
}
    render(){
        const {jukebox, searchParameter} = this.props;
        return(
            <>
            <head>
                <link href="style.css" rel="stylesheet"></link>
                <script>
                </script>
            </head>
            <body>
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
                                <div className="outer-group-box">
                                    {/* we can asssume the first song in the category has the correct group name on hand. */}
                                    <h2 className="group-name">{group[0][searchParameter]}</h2>
                                    <div className="inner-group-box">
                                    {
                                        // each genre category is an array of tracks
                                        group.map((track,index)=>{
                                        return(
                                            <>
                                            <div className="title-card" onClick="clickAlert()">
                                                <h3><a href={`/tracklist/track/${track.id}`}>{track.title}</a></h3>
                                                {/* <p>{track.url}</p> */}
                                                {/* <p>{track.genre}</p> */}
                                                <form action={`/tracklist/${track._id}?_method=DELETE`} method="POST">
                                                    <input type="submit" value="delete"/>
                                                </form>
                                                <p><a href={`/tracklist/track/${track._id}/edit`}>Edit Track</a></p>
                                            </div>
                                            {/* // heres where the backside of the title card would go
                                            // with the options buttons and the information; */}
                                            </>
                                            )
                                        }) // end mapping over tracks
                                    }  
                                    </div>
                                </div>
                            ) 
                        }) //end mapping over groups
                    }
                </div> {/* end list of all tracks div */}
            </body>
            </>
        )
    }
}

module.exports = Index;