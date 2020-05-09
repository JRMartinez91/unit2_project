const React = require('react')
const Header = require('./Header')

class TagSearch extends React.Component{
    // based on a specific ta
    render(){

        const {tagList,tracks} = this.props;

        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
            </head>
            <body>
                {/* list of all tags */}
                <h2>Tags:</h2>
                <div>
                    {tagList.map((tag,index)=>{
                        return(
                            <a href={`tagsearch?search=${tag}`}>{tag}</a>
                        )
                    })}
                </div>
                <h2>Tracks:</h2>
                <div className="inner-group-box">
                    {tracks.map((track,index)=>{
                        return(
                            <>
                            <div className="title-card">
                                <h3>{track.title}</h3>
                                {/* <button class="copy-button" onClick={this.testFunc}>It's a button!</button> */}
                                {/* <p>{track.url}</p> */}
                                {/* <p>{track.genre}</p> */}
                                <div className="info-bar">
                                    <div className="info-bar-box">{track.artist}</div>
                                    <div className="info-bar-box">{track.source}</div>
                                    <div className="info-bar-box">{track.genre}</div>
                                </div>
                                <div className="options-bar">
                                <a href={`/tracklist/track/${track.id}`} className="option-button view-button">View</a>
                                <a href={`/tracklist/track/${track._id}/edit`} className="option-button edit-button">Edit</a>
                                <form action={`/tracklist/${track._id}?_method=DELETE`} method="POST">
                                    <input type="submit" value="Delete" className="option-button delete-button"/>
                                </form>
                                </div>
                            </div>
                            {/* // heres where the backside of the title card would go
                            // with the options buttons and the information; */}
                            </>
                        )
                    })}
                </div>
            </body>
            </>
        )
    }
}

module.exports = TagSearch;