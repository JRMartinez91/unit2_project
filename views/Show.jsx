const React = require('react');

class Show extends React.Component{
    render(){
        //get variables
        const {title, genre, artist, source}=this.props.track;
        let {url} = this.props.track;

        //convert youtube url for use in iframe
        url = url.replace("watch?v=","embed/")

        //only print Artist and Source if they've been defined

        let artist_label = ""
        let source_label = ""

        if(artist!=="No Artist"){
            artist_label = (<p>Artist: {artist}</p>)
        }

        if(source!=="No Source"){
            source_label = (<p>Source: {source}</p>)
        } 

        return(
            <div>
                <h1>{title}</h1>
                {/* youtube video */}
                <iframe src={url} width="560" height="315" frameBorder="0" allowFullScreen></iframe>
                {/* artist_label and source_label will either be <p> elements or empty strings */}
                <div>
                {artist_label} {source_label}
                </div>
                <p><a href="/tracklist">Back to Index</a></p>
            </div>
        )
    }
}

module.exports = Show;