const React = require('react')
const Header = require('./Header')

class TagSearch extends React.Component{
    // based on a specific ta
    render(){

        const {tagList,tracks,activeTag} = this.props;

        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
                <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400' rel='stylesheet' type='text/css'></link>
                <link href="https://fonts.googleapis.com/css2?family=Cutive&family=Engagement&family=Oregano&family=Ranga:wght@400;700&display=swap" rel="stylesheet"></link>

            </head>
            <body>
                {/* list of all tags */}
                <Header/>
                <div className='group-name-wrapper'>
                    <div className="left-end"></div>
                    <div className="group-name">Tag Search</div>
                    <div className="right-end"></div>
                </div>
                <div className="tag-cloud">
                    {tagList.map((tag,index)=>{
                        //make sure currently active tag is highlighted
                        console.log(tag,activeTag)
                        if(tag==activeTag){
                            return(
                                <a className="tag-box tag-selected" href={`tagsearch?search=${tag}`}>{tag}</a>
                            )
                        }else{
                        //render the rest as normal
                        return(
                            <a className="tag-box" href={`tagsearch?search=${tag}`}>{tag}</a>
                        )
                    }
                    })}
                </div>
                <h3>Matching Tracks:</h3>
                <div className="inner-group-box">
                    {tracks.map((track,index)=>{
                        return(
                            <>
                            <div className="title-card">
                                <h3>{track.title}</h3>
                                <textarea className="url-display">{"!play "+track.url}</textarea>
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