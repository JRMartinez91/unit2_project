const React = require('react');
const Header = require('./Header')

class Show extends React.Component{
    render(){
        //get variables
        const {title, genre, artist, source, tags, _id}=this.props.track;
        let {url} = this.props.track;

        //convert youtube url for use in iframe
        const embedURL = url.replace("watch?v=","embed/")

        //only print Artist and Source if they've been defined

        let artist_label = ""
        let source_label = ""

        if(artist!=="No Artist"){
            artist_label = (<p>Artist: {artist}</p>)
        }

        if(source!=="No Source"){
            source_label = (<p>Source: {source}</p>)
        } 

        //print either the list of tags, or "No Tags"

        let tag_label = "Tags: ";
        let tag_array = [];

        
        if(tags.length<1){
            tag_label = "No Tags";
        }else{
            for(let i = 0; i < tags.length; i++){
                //take every tag in the list and convert it into a link
                //that goes to the tag search page, for that tag
                let tagLink = `/tracklist/tagsearch?search=${tags[i]}`;
                tag_array.push(<a href={tagLink}>{tags[i]}</a>);
            }
        }

        //determine whether to display "No Tags" or "Tags" + List of Tags
        const tagHandler = () =>{
            if(tags.length<1){
                return ""
            }else{
                return(
                    tag_array.map((tag,index)=>{
                        return(tag)
                    })
                )
            }
        }

        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
                <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400' rel='stylesheet' type='text/css'></link>
                <link href="https://fonts.googleapis.com/css2?family=Cutive&family=Engagement&family=Oregano&family=Ranga:wght@400;700&display=swap" rel="stylesheet"></link>

            </head>
            <body>
                <Header/>
            <div className="show-box">
                <h1>{title}</h1>
                {/* youtube video */}
                <iframe src={embedURL} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                {/* artist_label and source_label will either be <p> elements or empty strings */}
                <p><textarea className="url-display" value={"!play "+url}></textarea></p>
                <div>
                {artist_label} {source_label}
                <p>{tag_label}{tagHandler()}</p>
                </div>
                <p className="mini-nav"><a className="big-button" href={`/tracklist/track/${_id}/edit`}>Edit</a></p>
            </div>
            </body>
            </>
        )
    }
}

module.exports = Show;